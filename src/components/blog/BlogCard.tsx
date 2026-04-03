import Image from "next/image";
import Link from "next/link";

import type { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="overflow-hidden rounded-[24px] bg-white shadow-[0_12px_32px_rgba(27,67,50,0.08)] transition-transform hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </div>
      </Link>
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
          <span className="rounded-full bg-green-100 px-3 py-1 text-green-900">
            {post.category}
          </span>
          <span>{post.readTime}</span>
        </div>
        <div className="space-y-2">
          <Link href={`/blog/${post.slug}`} className="block">
            <h3 className="text-xl font-medium text-green-900 transition-colors hover:text-amber-500">
              {post.title}
            </h3>
          </Link>
          <p className="text-sm leading-7 text-neutral-600">{post.excerpt}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-medium text-amber-500 transition-opacity hover:opacity-80"
          >
            पढ़ें -&gt;
          </Link>
        </div>
      </div>
    </article>
  );
}
