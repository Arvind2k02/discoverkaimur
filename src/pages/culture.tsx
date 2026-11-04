import { culture } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
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

export default function CulturePage() {
  const site = useJsonLdSiteUrl();
  const title = 'Culture & Traditions of Kaimur Bihar — Festivals, Dance & Crafts';
  const description = 'Discover the rich cultural heritage of Kaimur, Bihar — from the sacred Chhath Puja festival to vibrant folk dances, traditional handicrafts, and ancient customs.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${site}/culture`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${site}/assets/media/chhath%20puja.jpg`} />
        <meta property="og:url" content={`${site}/culture`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${site}/culture#webpage`,
            name: title,
            url: `${site}/culture`,
            isPartOf: { '@id': `${site}/#website` },
            about: { '@id': `${site}/#organization` },
          })}
        </script>
      </Helmet>

      {/* Page Hero */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <ContentImage
          src="/assets/media/chhath%20puja.jpg"
          alt="Chhath Puja festival in Kaimur Bihar"
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
            Heritage & Traditions
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Culture of Kaimur
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/80 mt-3 text-lg">
            Where ancient traditions breathe through every festival, dance, and craft
          </motion.p>
        </motion.div>
      </section>

      {/* Culture Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {culture.cultureItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' as const }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
              >
                <div className="rounded-2xl overflow-hidden h-72 md:h-80">
                  <ContentImage
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-primary uppercase tracking-widest mb-1">{item.subtitle}</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{item.description}</p>
                  <ul className="space-y-2">
                    {item.facts.map((fact) => (
                      <li key={fact} className="flex items-center gap-3 text-sm text-foreground">
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Festival Calendar */}
      <section className="py-16 bg-muted border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
              Plan Around Celebrations
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-foreground"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Festival Calendar
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {culture.festivals.map((fest, i) => (
              <motion.div
                key={fest.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const }}
                className="bg-card border border-border rounded-xl p-4 flex gap-4 items-start"
              >
                <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 text-center shrink-0">
                  <p className="text-xs font-semibold leading-tight">{fest.month}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{fest.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{fest.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
