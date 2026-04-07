"use client";

import type { LeadFormData } from "@/types/lead";

const LEAD_QUEUE_DB_NAME = "maa-sharda-runtime";
const LEAD_QUEUE_STORE_NAME = "queued-leads";
const LEAD_QUEUE_DB_VERSION = 1;
export const LEAD_BACKGROUND_SYNC_TAG = "maa-sharda-lead-sync";

interface QueuedLeadRecord {
  id: string;
  payload: LeadFormData;
  queuedAt: string;
}

function canUseIndexedDb() {
  return typeof window !== "undefined" && "indexedDB" in window;
}

function openLeadQueueDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    if (!canUseIndexedDb()) {
      reject(new Error("IndexedDB is not available."));
      return;
    }

    const request = window.indexedDB.open(
      LEAD_QUEUE_DB_NAME,
      LEAD_QUEUE_DB_VERSION
    );

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(LEAD_QUEUE_STORE_NAME)) {
        database.createObjectStore(LEAD_QUEUE_STORE_NAME, {
          keyPath: "id",
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("IndexedDB open failed."));
  });
}

async function readQueuedLeads() {
  const database = await openLeadQueueDatabase();

  return new Promise<QueuedLeadRecord[]>((resolve, reject) => {
    const transaction = database.transaction(LEAD_QUEUE_STORE_NAME, "readonly");
    const store = transaction.objectStore(LEAD_QUEUE_STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve((request.result || []) as QueuedLeadRecord[]);
    request.onerror = () => reject(request.error || new Error("Unable to read queued leads."));
    transaction.oncomplete = () => database.close();
  });
}

async function deleteQueuedLead(id: string) {
  const database = await openLeadQueueDatabase();

  return new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(LEAD_QUEUE_STORE_NAME, "readwrite");
    const store = transaction.objectStore(LEAD_QUEUE_STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error || new Error("Unable to delete queued lead."));
    transaction.oncomplete = () => database.close();
  });
}

export async function queueLeadSubmission(payload: LeadFormData) {
  const database = await openLeadQueueDatabase();
  const record: QueuedLeadRecord = {
    id: `${payload.phone}-${Date.now()}`,
    payload,
    queuedAt: new Date().toISOString(),
  };

  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(LEAD_QUEUE_STORE_NAME, "readwrite");
    const store = transaction.objectStore(LEAD_QUEUE_STORE_NAME);
    const request = store.put(record);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error || new Error("Unable to queue lead."));
    transaction.oncomplete = () => database.close();
  });
}

export async function flushQueuedLeadSubmissions() {
  if (typeof window === "undefined") {
    return { sentCount: 0, remainingCount: 0 };
  }

  const queuedLeads = canUseIndexedDb() ? await readQueuedLeads() : [];

  if (!navigator.onLine || !queuedLeads.length) {
    return {
      sentCount: 0,
      remainingCount: queuedLeads.length,
    };
  }

  let sentCount = 0;

  for (const record of queuedLeads) {
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record.payload),
      });

      if (response.ok || (response.status < 500 && response.status !== 429)) {
        await deleteQueuedLead(record.id);
        sentCount += 1;
      }
    } catch {
      break;
    }
  }

  const remainingLeads = canUseIndexedDb() ? await readQueuedLeads() : [];

  return {
    sentCount,
    remainingCount: remainingLeads.length,
  };
}

export async function requestLeadBackgroundSync() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return false;
  }

  const registration = await navigator.serviceWorker.ready;

  if (registration.sync?.register) {
    await registration.sync.register(LEAD_BACKGROUND_SYNC_TAG);
    return true;
  }

  registration.active?.postMessage({ type: "FLUSH_QUEUED_LEADS" });
  return false;
}
