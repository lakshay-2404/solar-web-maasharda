const LEAD_QUEUE_DB_NAME = "maa-sharda-runtime";
const LEAD_QUEUE_STORE_NAME = "queued-leads";
const LEAD_QUEUE_DB_VERSION = 1;
const LEAD_BACKGROUND_SYNC_TAG = "maa-sharda-lead-sync";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

function openLeadQueueDatabase() {
  return new Promise((resolve, reject) => {
    const request = self.indexedDB.open(
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
    request.onerror = () =>
      reject(request.error || new Error("IndexedDB open failed."));
  });
}

async function readQueuedLeads() {
  const database = await openLeadQueueDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(LEAD_QUEUE_STORE_NAME, "readonly");
    const store = transaction.objectStore(LEAD_QUEUE_STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () =>
      reject(request.error || new Error("Unable to read queued leads."));
    transaction.oncomplete = () => database.close();
  });
}

async function deleteQueuedLead(id) {
  const database = await openLeadQueueDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(LEAD_QUEUE_STORE_NAME, "readwrite");
    const store = transaction.objectStore(LEAD_QUEUE_STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () =>
      reject(request.error || new Error("Unable to delete queued lead."));
    transaction.oncomplete = () => database.close();
  });
}

async function flushQueuedLeads() {
  const queuedLeads = await readQueuedLeads();

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
      }
    } catch {
      break;
    }
  }
}

self.addEventListener("sync", (event) => {
  if (event.tag === LEAD_BACKGROUND_SYNC_TAG) {
    event.waitUntil(flushQueuedLeads());
  }
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "FLUSH_QUEUED_LEADS") {
    event.waitUntil(flushQueuedLeads());
  }
});

self.addEventListener("push", (event) => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {};
  }

  const title = data.title || "Maa Sharda";
  const options = {
    body: data.body || "Naya update available hai.",
    icon: data.icon || "/api/app-icon?size=192",
    badge: data.badge || "/api/app-icon?size=96&variant=badge",
    tag: data.tag || "maa-sharda-update",
    data: data.data || {
      url: data.url || "/",
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl =
    event.notification.data && event.notification.data.url
      ? event.notification.data.url
      : "/";

  event.waitUntil(
    (async () => {
      const windowClients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      for (const client of windowClients) {
        if ("focus" in client) {
          if ("navigate" in client) {
            await client.navigate(targetUrl);
          }

          return client.focus();
        }
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }

      return undefined;
    })()
  );
});
