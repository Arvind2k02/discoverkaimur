import { food } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { Utensils } from 'lucide-react';
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

export default function FoodPage() {
  const site = useJsonLdSiteUrl();
  const title = 'Local Food of Kaimur Bihar — Litti Chokha, Sattu & More';
  const description = 'Taste the authentic flavours of Kaimur, Bihar — from the iconic Litti Chokha and Sattu Sharbat to the festive Thekua sweet. A food lover\'s guide to Bihar\'s culinary heritage.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${site}/food`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${site}/assets/media/Litti-Chokha.jpg`} />
        <meta property="og:url" content={`${site}/food`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${site}/food#webpage`,
            name: title,
            url: `${site}/food`,
            isPartOf: { '@id': `${site}/#website` },
            about: { '@id': `${site}/#organization` },
          })}
        </script>
      </Helmet>

      {/* Page Hero */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <ContentImage
          src="/assets/media/Litti-Chokha.jpg"
          alt="Litti Chokha — traditional food of Bihar"
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
            <Utensils size={14} className="inline mr-1" />
            Taste of Kaimur
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Local Food & Flavours
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/80 mt-3 text-lg">
            Bold, earthy, and deeply rooted in tradition
          </motion.p>
        </motion.div>
      </section>

      {/* Food Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {food.foods.map((food, i) => (
              <motion.div
                key={food.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' as const }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
              >
                <div className="rounded-2xl overflow-hidden h-72 md:h-80">
                  <ContentImage
                    src={food.img}
                    alt={food.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-3">
                    {food.tag}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {food.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{food.description}</p>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-foreground mb-2">Key Ingredients</p>
                    <ul className="space-y-1">
                      {food.ingredients.map((ing) => (
                        <li key={ing} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-muted-foreground border-t border-border pt-3">
                    📍 {food.where}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Tips */}
      <section className="py-16 bg-muted border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold text-foreground"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Food Traveller Tips
            </motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {food.tips.map((t, i) => (
              <motion.div
                key={t.tip}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' as const }}
                className="bg-card border border-border rounded-xl p-4 text-sm text-muted-foreground leading-relaxed"
              >
                {t.tip}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
