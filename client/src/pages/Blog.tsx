/*
 * Blog Listing Page — YouNeedLED
 * Lists all 20 blog posts with category filtering
 */
import { useState } from "react";
import { Link } from "wouter";
import { ALL_BLOG_POSTS } from "@/lib/blogData";
import SEOHead from "@/components/SEOHead";
import { ArrowRight, Search } from "lucide-react";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Show all posts sorted newest-first — scheduling is handled by only adding posts to blogData.ts when ready to publish
  const published = [...ALL_BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(published.map((p) => p.category)))];

  const filtered = activeCategory === "All"
    ? published
    : published.filter((p) => p.category === activeCategory);

  return (
    <>
      <SEOHead
        title="Security Blog | Expert Articles on Cameras, VoIP & Access Control"
        description="Expert articles on commercial security, VoIP technology, fire alarm systems, and business protection strategies from You Need L.E.D."
        canonical="/blog"
      />
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-[#0e319a]">
        <div className="container text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-5">Security Insights Blog</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Expert articles on commercial security, VoIP technology, fire alarm systems, and business protection strategies.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white border-b border-slate-200 sticky top-[72px] z-10">
        <div className="container">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-[#0e319a] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <p className="text-sm text-slate-500 mb-8">{filtered.length} article{filtered.length !== 1 ? "s" : ""}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-100">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-[#0e319a] bg-blue-50 px-2 py-0.5 rounded">{post.category}</span>
                  <span className="text-xs text-slate-500">
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} &middot; {post.readTime}
                  </span>
                </div>
                <h2 className="font-heading text-lg font-semibold text-slate-900 group-hover:text-[#0e319a] transition-colors leading-snug mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-600 line-clamp-3 mb-3">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#0e319a] group-hover:gap-2 transition-all">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
