import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";

import type { BlogPost } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllBlogSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
}

export function getAllBlogPosts(): BlogPost[] {
  const slugs = getAllBlogSlugs();

  return slugs
    .map((slug) => getBlogPostMeta(slug))
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b!.publishedAt).getTime() - new Date(a!.publishedAt).getTime()
    ) as BlogPost[];
}

export function getBlogPostMeta(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    publishedAt: data.publishedAt,
    readTime: stats.text,
    coverImage: {
      url: data.coverImage || "/images/blog/default.jpg",
      alt: data.title,
    },
    metaTitle: data.metaTitle || data.title,
    metaDescription: data.metaDescription || data.excerpt,
    keywords: data.keywords || [],
    body: null,
  };
}

export async function getBlogPostWithContent(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    meta: {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      category: data.category,
      publishedAt: data.publishedAt,
      readTime: stats.text,
      coverImage: {
        url: data.coverImage || "/images/blog/default.jpg",
        alt: data.title,
      },
      metaTitle: data.metaTitle || data.title,
      metaDescription: data.metaDescription || data.excerpt,
      keywords: data.keywords || [],
      body: null,
    } satisfies BlogPost,
    content,
  };
}
