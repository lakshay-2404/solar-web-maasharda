import type { Metadata } from "next";

import { BlogPageContent, getBlogIndexMetadata } from "./page-content";

export const metadata: Metadata = getBlogIndexMetadata("hi");

export default function BlogPage() {
  return <BlogPageContent language="hi" />;
}
