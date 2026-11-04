import { places } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { MapPin, Clock, Star } from 'lucide-react';
import ContentImage from '@/components/ContentImage';
import { useJsonLdSiteUrl } from '@/lib/json-ld-site-url-context';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function PlacesPage() {
  const site = useJsonLdSiteUrl();
  const title = 'Famous Places in Kaimur Bihar — Temples, Waterfalls & Forts';
  const description = 'Explore the must-visit destinations of Kaimur, Bihar — from the ancient Mundeshwari Devi Temple to stunning waterfalls and scenic reservoirs.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${site}/places`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${site}/assets/media/uploads-hero-3x8515y2aq-1784981458432-file-c4zq9dwjjt-e58a575a.jpg.jpg`} />
        <meta property="og:url" content={`${site}/places`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${site}/places#webpage`,
            name: title,
            url: `${site}/places`,
            isPartOf: { '@id': `${site}/#website` },
            about: { '@id': `${site}/#organization` },
          })}
        </script>
      </Helmet>

      {/* Page Hero */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <ContentImage
          src="/assets/media/uploads-hero-3x8515y2aq-1784981458432-file-c4zq9dwjjt-e58a575a.jpg.jpg"
          alt="Famous places in Kaimur Bihar"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          width={1600}
          height={640}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/75" />
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4"
        >
          <motion.p variants={fadeUp} className="text-sm font-medium uppercase tracking-widest text-yellow-300 mb-2">
            Must-Visit Destinations
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Famous Places
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/80 mt-3 text-lg">
            Kaimur, Bihar
          </motion.p>
        </motion.div>
      </section>

      {/* Places Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.places.map((place, i) => (
              <motion.div
                key={place.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
                className="group rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-56 overflow-hidden">
                  <ContentImage
                    src={place.img}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    {place.tag}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                      {place.name}
                    </h2>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 ml-2">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      {place.rating}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {place.description}
                  </p>
                  <ul className="mb-4 space-y-1">
                    {place.details.map((d) => (
                      <li key={d} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-primary" />
                      {place.highlight}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {place.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
