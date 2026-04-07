import type { Metadata } from "next";

import { BlogPageContent, getBlogIndexMetadata } from "@/app/blog/page-content";

export const metadata: Metadata = getBlogIndexMetadata("en");

export default function EnglishBlogPage() {
  return <BlogPageContent language="en" />;
}
