import Image from "next/image";
import Link from "next/link";

import type { BlogPost } from "@/types/blog";

import BlogCard from "./BlogCard";

interface BlogPostLayoutProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  children: React.ReactNode;
}

export default function BlogPostLayout({
  post,
  relatedPosts,
  children,
}: BlogPostLayoutProps) {
  return (
    <div className="bg-cream">
      <section className="section-padding border-b border-border">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-4">
            <Link href="/blog" className="text-sm font-medium text-amber-500">
              Back to blog
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
              <span className="rounded-full bg-green-100 px-3 py-1 text-green-900">
                {post.category}
              </span>
              <span>{post.readTime}</span>
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="max-w-3xl text-4xl font-medium leading-tight text-green-900 md:text-5xl">
              {post.title}
            </h1>
            <p className="max-w-2xl text-lg text-neutral-600">{post.excerpt}</p>
          </div>

          <div className="relative aspect-[16/9] overflow-hidden rounded-card">
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt}
              fill
              className="object-cover"
              priority
              sizes="(min-width: 768px) 896px, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-3xl">
          <div className="prose-maa">{children}</div>
        </div>
      </section>

      <section className="section-padding border-t border-border">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
                Related Reads
              </p>
              <h2 className="section-headline text-green-900">Aur kya padhein?</h2>
            </div>
            <Link href="/blog" className="text-sm font-medium text-green-900 hover:text-amber-500">
              View all posts
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
