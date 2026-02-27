/*
 * Blog Listing Page — YouNeedLED
 */
import { Link } from "wouter";
import { BLOG_POSTS } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { ArrowRight } from "lucide-react";

export default function Blog() {
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
            Expert articles on commercial security, VoIP technology, and business protection strategies.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-100">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <p className="text-xs text-slate-500 mb-2">
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} &middot; {post.readTime}
                </p>
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
