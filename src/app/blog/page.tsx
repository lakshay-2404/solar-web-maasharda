"use client";

import Link from "next/link";
import { blogs } from "./data";

export default function BlogIndex() {
  return (
    <main className="max-w-7xl mx-auto px-8 py-16">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="relative overflow-hidden rounded-xl bg-primary-container p-12 md:p-20 flex flex-col md:flex-row items-center gap-12">
          <div className="z-10 flex-1">
            <span className="inline-block bg-secondary px-3 py-1 rounded text-white text-xs font-bold uppercase tracking-widest mb-6">Expert Insights</span>
            <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Solar Powering <br/>Yamunanagar
            </h1>
            <p className="text-on-primary-container text-lg max-w-lg mb-8 leading-relaxed">
              Stay informed with the latest solar technology, local subsidy updates, and installation guides curated specifically for Haryana's industrial hub.
            </p>
          </div>
          <div className="relative flex-1 w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
            <img 
              alt="Solar Energy" 
              className="absolute inset-0 w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYlBWkzPBFOwxhSpDpwulcEPqbu9vWEogktK2O2CNvNd22HydrogopiMqq-hVBeSUeD-bSYsLqmHV4pbc0ckWMEkDWCndRP1QE6oiPIu-v9hqG1wAOZ6KzG7XHPNhVbEmi4wQBqVFwmvGbdSSQxUTOWTPnWMuvX5FvwYKqmTzLLNoUYq02hJHzz951wcDtMuf5aj1KTczE3C_i8mMoMIhD0J2aNe6W1MtXh8eyoWDFiLxSt84lSSrjjj-8R1Ax-cP2fvjTh1Is9go"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {blogs.map(blog => (
          <article key={blog.slug} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-lg border border-surface-container-high flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="aspect-video overflow-hidden">
              <img alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={blog.image}/>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-3">{blog.category}</span>
              <h3 className="text-primary text-xl font-bold mb-3 leading-snug">{blog.title}</h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-6">{blog.desc}</p>
              <Link className="mt-auto flex items-center text-secondary font-bold text-sm gap-2 hover:gap-4 transition-all" href={`/blog/${blog.slug}`}>
                Padhein <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* Newsletter Section */}
      <section className="bg-surface-container-low rounded-xl p-10 md:p-16 text-center shadow-lg">
        <h2 className="text-primary text-3xl font-extrabold mb-4">Never Miss a Solar Update</h2>
        <p className="text-on-surface-variant max-w-xl mx-auto mb-10">Get the latest pricing and subsidy news delivered straight to your inbox once a month.</p>
        <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
          <input className="flex-1 rounded-lg border border-outline-variant bg-white px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Your email address" type="email" />
          <button className="bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition-all" type="button" onClick={() => alert("Subscribed successfully!")}>Subscribe Now</button>
        </form>
      </section>
    </main>
  );
}
