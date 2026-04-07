import type { Metadata } from "next";

import {
  BlogPostPageContent,
  buildBlogPostMetadata,
} from "@/app/blog/[slug]/page-content";

interface EnglishBlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export { generateStaticParams } from "@/app/blog/[slug]/page";

export async function generateMetadata({
  params,
}: EnglishBlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildBlogPostMetadata(slug, "en");
}

export default async function EnglishBlogPostPage({
  params,
}: EnglishBlogPostPageProps) {
  const { slug } = await params;
  return <BlogPostPageContent slug={slug} language="en" />;
}
