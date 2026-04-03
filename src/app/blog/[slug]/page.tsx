import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BlogCard from "@/components/blog/BlogCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getAllBlogPosts, getAllBlogSlugs, getBlogPostWithContent } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostWithContent(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.meta.metaTitle,
    description: post.meta.metaDescription,
    keywords: post.meta.keywords,
    openGraph: {
      title: post.meta.metaTitle,
      description: post.meta.metaDescription,
      images: [post.meta.coverImage.url],
      type: "article",
      publishedTime: post.meta.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostWithContent(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllBlogPosts();
  const related = allPosts.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <article className="bg-cream">
        <div className="relative h-56 w-full md:h-96">
          <Image
            src={post.meta.coverImage.url}
            alt={post.meta.coverImage.alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-green-950/50" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs font-medium uppercase tracking-widest text-amber-400">
              {post.meta.category}
            </span>
            <h1 className="mt-2 max-w-3xl text-2xl font-medium text-white md:text-4xl">
              {post.meta.title}
            </h1>
            <p className="mt-2 text-sm text-white/70">
              {post.meta.readTime} ·{" "}
              {new Date(post.meta.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-10 md:py-16">
          <ScrollReveal>
            <div className="prose max-w-none prose-lg prose-a:text-amber-600 prose-headings:font-medium prose-headings:text-green-900 prose-strong:text-green-900">
              <MDXRemote source={post.content} />
            </div>
          </ScrollReveal>
        </div>

        {related.length > 0 ? (
          <section className="bg-[#f4f4f1]">
            <div className="section-padding mx-auto max-w-6xl">
              <ScrollReveal>
                <h2 className="mb-6 text-xl font-medium text-green-900">और पढ़ें</h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <ScrollReveal key={item.slug}>
                    <BlogCard post={item} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>

      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between bg-green-900 px-4 py-3 md:hidden">
        <p className="text-sm font-medium text-white">मुफ्त सोलर प्लान चाहिए?</p>
        <Link
          href="/#lead-capture"
          className="rounded-btn bg-amber-500 px-4 py-2 text-sm font-medium whitespace-nowrap text-white"
        >
          मुफ्त प्लान लें
        </Link>
      </div>
    </>
  );
}
