/*
 * Blog Post Page — YouNeedLED
 * Renders individual blog posts with Article schema markup
 * Uses ALL_BLOG_POSTS from blogData.ts for full content
 */
import { Link, useParams } from "wouter";
import { ALL_BLOG_POSTS } from "@/lib/blogData";
import { SITE } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = ALL_BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <section className="py-20 bg-white">
        <div className="container text-center">
          <h1 className="font-heading text-3xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <p className="text-slate-600 mb-6">The blog post you're looking for doesn't exist or has been moved.</p>
          <Link href="/blog" className="text-[#0e319a] font-medium hover:underline">Back to Blog</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        ogImage={post.image}
        ogType="article"
      />
      {/* Hero */}
      <section className="py-12 lg:py-16 bg-[#0e319a]">
        <div className="container max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {post.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="w-4 h-4" /> {post.category}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-white">
        <div className="container max-w-3xl">
          <div className="aspect-[16/9] rounded-xl overflow-hidden -mt-6 shadow-lg">
            <img
              src={post.image}
              srcSet={post.image.startsWith('/blog-images/') ? `${post.image.replace(/-800w\.webp$/, '-400w.webp')} 400w, ${post.image} 800w, ${post.image.replace(/-800w\.webp$/, '-1200w.webp')} 1200w` : undefined}
              sizes="(max-width: 768px) 100vw, 800px"
              alt={post.title}
              className="w-full h-full object-cover max-w-full"
              loading="eager"
              width="1200"
              height="675"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container max-w-3xl">
          <div className="prose prose-slate prose-headings:font-heading prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-p:leading-relaxed prose-p:text-slate-600 prose-strong:text-slate-900 prose-li:text-slate-600 max-w-none">
            {renderMarkdown(post.content)}
          </div>
        </div>
      </section>

      {/* Related Services — internal links based on category */}
      <section className="py-10 bg-slate-50 border-t border-slate-200">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Related Services</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {getRelatedServices(post.category).map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-[#0e319a] hover:shadow-sm transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0e319a]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#0e319a] text-xs font-bold">{svc.label.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 group-hover:text-[#0e319a] transition-colors">{svc.label}</div>
                  <div className="text-xs text-slate-500">{svc.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="container max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">Ready to Get Started?</h2>
          <p className="text-slate-600 mb-6">Contact You Need L.E.D. for a free consultation on your security and technology needs.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-[#f97015] text-white font-semibold rounded-lg hover:bg-[#e06010] transition-colors">
              Get a Free Quote
            </Link>
            <a href="tel:+16093350123" className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#0e319a] text-[#0e319a] font-semibold rounded-lg hover:bg-[#0e319a] hover:text-white transition-colors">
              Call (609) 335-0123
            </a>
          </div>
        </div>
      </section>

      {/* Article Schema — full BlogPosting with all Google-recommended fields */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${SITE.url}/blog/${post.slug}`,
            },
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Person",
              name: "Derek Weikel",
              jobTitle: "Owner & Lead Technician",
              worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
            },
            publisher: {
              "@type": "Organization",
              name: SITE.name,
              url: SITE.url,
              telephone: SITE.phone,
              address: {
                "@type": "PostalAddress",
                streetAddress: "199 New Rd Ste 61",
                addressLocality: "Linwood",
                addressRegion: "NJ",
                postalCode: "08221",
                addressCountry: "US",
              },
              logo: {
                "@type": "ImageObject",
                url: `${SITE.url}/logo-optimized.png`,
                width: 300,
                height: 60,
              },
            },
            image: {
              "@type": "ImageObject",
              url: post.image.startsWith('http') ? post.image : `${SITE.url}${post.image}`,
              width: 1200,
              height: 675,
            },
            url: `${SITE.url}/blog/${post.slug}`,
            articleSection: post.category,
            keywords: `${post.category}, South Jersey, security cameras, VoIP, access control, fire alarm, You Need L.E.D.`,
          }),
        }}
      />
    </>
  );
}

/* Map blog categories to related service page links */
function getRelatedServices(category: string): { label: string; href: string; description: string }[] {
  const ALL_SERVICES = [
    { label: "Security Camera Installation", href: "/services/video-surveillance", description: "4K AI cameras, LPR, cloud storage", categories: ["Commercial Security", "Security Cameras", "Retail Security", "Hotel Security", "Beachfront Security", "Apartment Security", "Cannabis Security", "Law Enforcement", "Security", "Residential Security", "Comparison Guide", "Cost Guide"] },
    { label: "Access Control Systems", href: "/services/access-control", description: "Keyless entry, RFID, mobile credentials", categories: ["Access Control", "Commercial Security", "Apartment Security", "Hotel Security"] },
    { label: "Fire Alarm Systems", href: "/services/fire-alarm-systems", description: "NFPA 72 compliant, NJ DCA licensed", categories: ["Fire Safety", "Apartment Security", "Commercial Security"] },
    { label: "Intrusion Detection", href: "/services/intrusion-detection", description: "24/7 monitored burglar alarms", categories: ["Security", "Commercial Security", "Retail Security", "Hotel Security"] },
    { label: "Hosted VoIP Phone Systems", href: "/services/voip", description: "Cloud PBX, Teams integration", categories: ["VoIP", "Technology", "Industry Trends"] },
    { label: "LEDConnect AI Voice Agent", href: "/services/ai-voice-agent", description: "24/7 AI receptionist for your business", categories: ["LEDConnect AI", "Technology", "Industry Trends", "VoIP"] },
    { label: "Jobsite Security", href: "/services/jobsite-security", description: "Solar-powered wireless cameras", categories: ["Commercial Security", "Security"] },
    { label: "Digital Signage", href: "/services/digital-signage", description: "LED video walls, menu boards", categories: ["Technology", "Industry Trends", "Retail Security"] },
  ];

  // Return services that match the category, up to 4; always include cameras + one other
  const matched = ALL_SERVICES.filter((s) => s.categories.includes(category));
  if (matched.length >= 2) return matched.slice(0, 4);
  // Fallback: return top 4 general services
  return ALL_SERVICES.slice(0, 4);
}

/* Simple markdown-to-JSX renderer for blog content */
function renderMarkdown(content: string) {
  const blocks = content.split("\n\n");
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;

    // Headings
    if (block.startsWith("#### ")) {
      elements.push(<h4 key={i}>{cleanInlineMarkdown(block.slice(5))}</h4>);
      continue;
    }
    if (block.startsWith("### ")) {
      elements.push(<h3 key={i}>{cleanInlineMarkdown(block.slice(4))}</h3>);
      continue;
    }
    if (block.startsWith("## ")) {
      elements.push(<h2 key={i}>{cleanInlineMarkdown(block.slice(3))}</h2>);
      continue;
    }

    // Tables
    if (block.includes(" | ") && block.includes("---")) {
      const rows = block.split("\n").filter(r => r.trim() && !r.trim().match(/^\|?\s*-+/));
      if (rows.length >= 1) {
        const headers = rows[0].split("|").map(c => c.trim()).filter(Boolean);
        const dataRows = rows.slice(1).map(r => r.split("|").map(c => c.trim()).filter(Boolean));
        elements.push(
          <div key={i} className="overflow-x-auto my-6">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  {headers.map((h, j) => <th key={j} className="text-left p-2 bg-slate-100 font-semibold text-slate-900 border-b">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, ri) => (
                  <tr key={ri} className="border-b border-slate-100">
                    {row.map((cell, ci) => <td key={ci} className="p-2 text-slate-600">{cleanInlineMarkdown(cell)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Unordered lists
    if (block.match(/^[\*\-]\s/m)) {
      const items = block.split("\n").filter(l => l.trim());
      elements.push(
        <ul key={i}>
          {items.map((item, j) => {
            const text = item.replace(/^[\*\-]\s+/, "").trim();
            return <li key={j}>{renderInlineMarkdown(text, j)}</li>;
          })}
        </ul>
      );
      continue;
    }

    // Ordered lists
    if (block.match(/^\d+\.\s/m)) {
      const items = block.split("\n").filter(l => l.trim());
      elements.push(
        <ol key={i}>
          {items.map((item, j) => {
            const text = item.replace(/^\d+\.\s+/, "").trim();
            return <li key={j}>{renderInlineMarkdown(text, j)}</li>;
          })}
        </ol>
      );
      continue;
    }

    // Regular paragraph
    elements.push(<p key={i}>{renderInlineMarkdown(block, i)}</p>);
  }

  return elements;
}

function cleanInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\[(.+?)\]\(.*?\)/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .trim();
}

function renderInlineMarkdown(text: string, keyBase: number): React.ReactNode {
  // Handle bold, links, and code inline
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let partKey = 0;

  while (remaining.length > 0) {
    // Find the next markdown pattern
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);
    const codeMatch = remaining.match(/`(.+?)`/);

    // Find earliest match
    const matches = [
      boldMatch ? { type: "bold", index: boldMatch.index!, length: boldMatch[0].length, content: boldMatch[1] } : null,
      linkMatch ? { type: "link", index: linkMatch.index!, length: linkMatch[0].length, content: linkMatch[1], href: linkMatch[2] } : null,
      codeMatch ? { type: "code", index: codeMatch.index!, length: codeMatch[0].length, content: codeMatch[1] } : null,
    ].filter(Boolean).sort((a, b) => a!.index - b!.index);

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const first = matches[0]!;
    if (first.index > 0) {
      parts.push(remaining.slice(0, first.index));
    }

    if (first.type === "bold") {
      parts.push(<strong key={`${keyBase}-${partKey++}`}>{first.content}</strong>);
    } else if (first.type === "link") {
      // Convert internal links
      const href = (first as any).href;
      if (href && href !== "" && !href.startsWith("#")) {
        parts.push(<span key={`${keyBase}-${partKey++}`} className="text-[#0e319a] font-medium">{first.content}</span>);
      } else {
        parts.push(<span key={`${keyBase}-${partKey++}`}>{first.content}</span>);
      }
    } else if (first.type === "code") {
      parts.push(<code key={`${keyBase}-${partKey++}`} className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">{first.content}</code>);
    }

    remaining = remaining.slice(first.index + first.length);
  }

  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : <>{parts}</>;
}
