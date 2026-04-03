import type { Metadata } from "next";
import { SunMedium } from "lucide-react";

import BlogCard from "@/components/blog/BlogCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Solar Energy Blog | Maa Sharda Distributors",
  description:
    "Solar panels, subsidy support, sizing aur installation ke baare mein complete guides - simple Hinglish mein.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-cream">
      <section className="relative overflow-hidden bg-green-900 px-6 py-14 text-white md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-amber-400">
              Knowledge Hub
            </p>
            <h1 className="text-4xl font-medium leading-tight md:text-6xl">
              सोलर जानकारी और मार्गदर्शन
            </h1>
            <p className="mt-4 max-w-xl text-white/75">
              Subsidy, installation, sizing aur practical planning - sab kuch simple Hinglish mein.
            </p>
          </ScrollReveal>
        </div>
        <SunMedium className="pointer-events-none absolute right-[-1.5rem] top-4 h-40 w-40 rotate-12 text-white/10 md:right-10 md:top-8 md:h-56 md:w-56" />
      </section>

      <section className="mx-auto -mt-8 max-w-6xl px-6 pb-16 md:px-8 md:pb-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <ScrollReveal key={post.slug}>
              <BlogCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
