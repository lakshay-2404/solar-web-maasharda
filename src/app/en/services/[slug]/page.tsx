import type { Metadata } from "next";

import {
  buildServiceMetadata,
  ServiceDetailPageContent,
} from "@/app/services/[slug]/page-content";

interface EnglishServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EnglishServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildServiceMetadata(slug, "en");
}

export { generateStaticParams } from "@/app/services/[slug]/page";

export default async function EnglishServiceDetailPage({
  params,
}: EnglishServiceDetailPageProps) {
  const { slug } = await params;
  return <ServiceDetailPageContent slug={slug} language="en" />;
}
