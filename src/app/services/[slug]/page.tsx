import type { Metadata } from "next";

import { getAllServiceSlugs } from "@/lib/service-catalog";

import {
  buildServiceMetadata,
  ServiceDetailPageContent,
} from "./page-content";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildServiceMetadata(slug, "hi");
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  return <ServiceDetailPageContent slug={slug} language="hi" />;
}
