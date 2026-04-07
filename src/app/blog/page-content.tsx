import type { Metadata } from "next";
import { SunMedium } from "lucide-react";

import BlogCard from "@/components/blog/BlogCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getAllBlogPosts } from "@/lib/blog";
import type { SiteLanguage } from "@/lib/site-language";

export function getBlogIndexMetadata(language: SiteLanguage): Metadata {
  return language === "en"
    ? {
        title: "Solar Energy Blog | Maa Sharda Distributors",
        description:
          "Complete guides on solar panels, subsidy support, sizing, and installation in simple English and Hinglish.",
      }
    : {
        title: "सौर लेख | Maa Sharda Distributors",
        description:
          "सौर पैनल, सब्सिडी सहायता, क्षमता निर्धारण और स्थापना पर सरल हिंदी मार्गदर्शिकाएं।",
      };
}

interface BlogPageContentProps {
  language?: SiteLanguage;
}

export function BlogPageContent({ language = "hi" }: BlogPageContentProps) {
  const posts = getAllBlogPosts();
  const copy = {
    hi: {
      eyebrow: "ज्ञान केंद्र",
      title: "सौर जानकारी और मार्गदर्शन",
      description:
        "सब्सिडी, स्थापना, क्षमता निर्धारण और व्यवहारिक योजना की साफ़ जानकारी।",
    },
    en: {
      eyebrow: "Knowledge Hub",
      title: "Solar knowledge and guidance",
      description:
        "Subsidy, installation, sizing, and practical planning in a simple, approachable style.",
    },
  }[language];

  return (
    <div className="min-h-screen bg-cream">
      <section className="relative overflow-hidden bg-green-900 px-6 py-14 text-white md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-amber-400">
              {copy.eyebrow}
            </p>
            <h1 className="text-4xl font-medium leading-tight md:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-xl text-white/75">{copy.description}</p>
          </ScrollReveal>
        </div>
        <SunMedium className="pointer-events-none absolute right-[-1.5rem] top-4 h-40 w-40 rotate-12 text-white/10 md:right-10 md:top-8 md:h-56 md:w-56" />
      </section>

      <section className="mx-auto -mt-8 max-w-6xl px-6 pb-16 md:px-8 md:pb-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <ScrollReveal key={post.slug}>
              <BlogCard post={post} language={language} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
