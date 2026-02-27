/*
 * Blog Post Page — YouNeedLED
 * Renders individual blog posts with Article schema markup
 */
import { Link, useParams } from "wouter";
import { BLOG_POSTS, SITE } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

// Full blog post content
const BLOG_CONTENT: Record<string, string> = {
  "environmental-monitoring-server-rooms": `
Server rooms are the nerve center of modern business operations. A single environmental failure — overheating, humidity spike, or water leak — can cause catastrophic downtime and data loss. Environmental monitoring sensors provide the early warning system every IT director needs.

## Essential Sensors for Server Room Protection

### Temperature Monitoring
Rack-level temperature sensors are the foundation of any environmental monitoring strategy. Place sensors at the top and bottom of each rack to detect hot spots before they become critical. Modern sensors provide real-time readings with configurable alert thresholds.

### Humidity Sensors
Relative humidity should be maintained between 40-60% in server environments. Too low causes static discharge risk; too high promotes condensation and corrosion. Continuous humidity monitoring with trend analysis helps maintain optimal conditions.

### Water/Leak Detection
Water leak sensors placed under raised floors, near CRAC units, and around pipe penetrations provide immediate alerts when moisture is detected. Rope-style sensors can cover large areas and pinpoint leak locations.

### Airflow Monitoring
Differential pressure sensors between hot and cold aisles ensure proper airflow patterns. Airflow sensors at CRAC unit outputs verify cooling system performance.

### Smoke Detection
Early warning smoke detection systems designed for server rooms use air sampling technology to detect smoke particles at extremely low concentrations — often before visible smoke appears.

## Turning Data Into Action

The real value of environmental monitoring comes from intelligent alerting. Configure tiered alerts:
- **Warning**: Conditions approaching thresholds (e.g., temperature rising above 75°F)
- **Critical**: Conditions exceeding safe limits (e.g., temperature above 85°F)
- **Emergency**: Immediate action required (e.g., water detected, smoke detected)

Integrate monitoring with your building management system and DCIM platform for automated responses like adjusting cooling or shutting down non-critical loads.

## Conclusion

Environmental monitoring is not optional for any organization that depends on its IT infrastructure. The cost of sensors and monitoring is a fraction of the potential losses from an undetected environmental failure. Contact You Need L.E.D. to design a comprehensive monitoring solution for your server room.
  `,
  "fiber-backbone-security-systems": `
As security camera resolutions increase and the number of devices on networks grows, traditional copper cabling is reaching its limits. Fiber optic backbone infrastructure provides the bandwidth, distance, and reliability that modern security systems demand.

## Single-Mode vs Multi-Mode: The Key Decision

### Multi-Mode Fiber
Multi-mode fiber uses a larger core (50 or 62.5 microns) that allows multiple light paths. It's the cost-effective choice for shorter distances.

- **Best for**: Runs under 550 meters (OM3/OM4)
- **Cost**: Lower cost transceivers and connectors
- **Use case**: Building backbone, floor-to-floor connections, campus buildings close together
- **Bandwidth**: 10 Gbps up to 400m (OM4)

### Single-Mode Fiber
Single-mode fiber uses a smaller core (9 microns) that allows only one light path, enabling much longer distances.

- **Best for**: Runs over 550 meters, up to 80+ km
- **Cost**: Higher cost transceivers, but fiber itself is similar in price
- **Use case**: Building-to-building connections, campus perimeter, remote camera locations
- **Bandwidth**: 10 Gbps+ at virtually unlimited distances

## Making the Right Choice for Security

For most commercial security installations, consider these factors:

**Choose Multi-Mode when:**
- All camera runs are under 300 meters
- Budget is a primary concern
- The building is a single structure
- No plans for significant expansion

**Choose Single-Mode when:**
- Any camera run exceeds 300 meters
- Connecting multiple buildings on a campus
- Future-proofing for higher bandwidth needs
- Running fiber to perimeter cameras or remote locations

## Indoor vs Outdoor Considerations

Outdoor fiber runs require armored or direct-burial rated cable. Consider aerial installation on existing poles where trenching isn't practical. Always include spare fibers — the cable cost is minimal compared to installation labor.

## Conclusion

The right fiber choice depends on your specific distances, expansion plans, and budget. You Need L.E.D. specializes in fiber optic infrastructure for security systems and can design the optimal backbone for your installation.
  `,
  "alarm-com-unified-platform": `
Managing separate security systems — video, access control, intrusion detection — through different interfaces is inefficient and creates blind spots. Alarm.com's unified platform brings everything together in a single pane of glass.

## The Power of Integration

### Video + Intrusion
When an intrusion alarm triggers, the system automatically pulls up the nearest camera feeds. Monitoring operators can visually verify the alarm in seconds, dramatically reducing false alarm dispatches and speeding response to real events.

### Access Control + Video
Every door access event is linked to the corresponding camera footage. Review who entered, when, and see the video proof — all from one interface. Failed access attempts trigger video recording and alerts.

### Environmental + Automation
Temperature sensors, water leak detectors, and energy monitoring integrate with building automation. HVAC systems respond to occupancy data from access control. Lights follow schedules and sensor triggers.

## Key Benefits

**Faster Verification**: Video verification of alarms reduces false dispatches by up to 90% and speeds real emergency response.

**Reduced Complexity**: One app, one login, one interface for all security systems. Training is simpler and management is more efficient.

**Smarter Automation**: Cross-system rules enable powerful automation. "When the last person badges out, arm the alarm, lock all doors, and set cameras to high-sensitivity recording."

**Better Analytics**: Unified data enables insights that siloed systems can't provide. Correlate access patterns with video analytics for comprehensive security intelligence.

## Real-World Applications

A retail chain using Alarm.com's unified platform reduced false alarm fines by 85% through video verification, cut energy costs by 20% through occupancy-based HVAC control, and improved incident response time by 60%.

## Conclusion

The future of commercial security is integrated, intelligent, and cloud-managed. Alarm.com's unified platform delivers on this promise today. Contact You Need L.E.D. to learn how integration can transform your security operations.
  `,
};

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <section className="py-20 bg-white">
        <div className="container text-center">
          <h1 className="font-heading text-3xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-[#0e319a] font-medium hover:underline">Back to Blog</Link>
        </div>
      </section>
    );
  }

  const content = BLOG_CONTENT[post.slug] || "";

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
          <div className="flex items-center gap-4 text-white/60 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-white">
        <div className="container max-w-3xl">
          <div className="aspect-[16/9] rounded-xl overflow-hidden -mt-6 shadow-lg">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="eager" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container max-w-3xl">
          <div className="prose prose-slate prose-headings:font-heading prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-p:leading-relaxed prose-p:text-slate-600 prose-strong:text-slate-900 prose-li:text-slate-600 max-w-none">
            {content.split("\n\n").map((block, i) => {
              const trimmed = block.trim();
              if (!trimmed) return null;
              if (trimmed.startsWith("## ")) return <h2 key={i}>{trimmed.replace("## ", "")}</h2>;
              if (trimmed.startsWith("### ")) return <h3 key={i}>{trimmed.replace("### ", "")}</h3>;
              if (trimmed.startsWith("- **")) {
                return (
                  <ul key={i}>
                    {trimmed.split("\n").map((line, j) => {
                      const match = line.match(/^- \*\*(.+?)\*\*:?\s*(.*)$/);
                      if (match) return <li key={j}><strong>{match[1]}</strong>: {match[2]}</li>;
                      const simple = line.match(/^- (.+)$/);
                      if (simple) return <li key={j}>{simple[1]}</li>;
                      return null;
                    })}
                  </ul>
                );
              }
              // Handle bold text within paragraphs
              const parts = trimmed.split(/\*\*(.+?)\*\*/g);
              return (
                <p key={i}>
                  {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
                </p>
              );
            })}
          </div>
        </div>
      </section>

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Organization", name: SITE.name },
            publisher: {
              "@type": "Organization",
              name: SITE.name,
              url: SITE.url,
            },
            image: post.image,
          }),
        }}
      />
    </>
  );
}
