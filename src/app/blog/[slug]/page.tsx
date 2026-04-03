import { notFound } from 'next/navigation';
import { blogs } from '../data';
import Link from 'next/link';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-8 py-16 md:py-24">
      <Link href="/blog" className="inline-flex items-center text-sm font-bold text-secondary mb-8 hover:gap-2 transition-all">
        <span className="material-symbols-outlined text-sm mr-2">arrow_back</span>
        Back to All Articles
      </Link>
      
      <span className="inline-block bg-primary-container text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
        {blog.category}
      </span>
      
      <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6 leading-tight">
        {blog.title}
      </h1>
      
      <p className="text-xl text-on-surface-variant leading-relaxed mb-10">
        {blog.desc}
      </p>

      <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden mb-16 shadow-2xl border border-surface-container-high">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
      </div>

      <article className="prose prose-lg prose-green max-w-none text-on-surface">
        <p>This is a dynamically generated article page for <strong>{blog.title}</strong>. In a full production application, this block would fetch Rich Text Content or Markdown from a CMS like Sanity, Contentful, or a local database.</p>
        <p>For now, we have successfully migrated the User Interface to Next.js and established the dynamic routing parameters for <code>/blog/{slug}</code>.</p>
        <div className="mt-12 p-8 bg-surface-container-low rounded-xl border-l-4 border-secondary">
          <h3 className="text-primary font-bold text-2xl mb-2">Want to learn more?</h3>
          <p className="mb-6">Book a free site survey with Maa Sharda Distributors today to evaluate your solar potential.</p>
          <Link href="/calculator" className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 inline-block">
            Calculate My Savings
          </Link>
        </div>
      </article>
    </main>
  );
}
