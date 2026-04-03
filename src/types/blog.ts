export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  coverImage: {
    url: string;
    alt: string;
  };
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  body: null;
}
