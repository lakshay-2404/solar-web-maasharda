import type { Metadata } from "next";

import { getAllBlogSlugs } from "@/lib/blog";

import {
  BlogPostPageContent,
  buildBlogPostMetadata,
} from "./page-content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return buildBlogPostMetadata(slug, "hi");
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  return <BlogPostPageContent slug={slug} language="hi" />;
}
