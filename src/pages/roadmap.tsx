import { roadmap } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { Navigation, Train, Thermometer, Hotel, MessageCircle, Banknote, Camera } from 'lucide-react';
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

const travelTipsMeta = [
  {
    icon: Train
  },
  {
    icon: Thermometer
  },
  {
    icon: Hotel
  },
  {
    icon: MessageCircle
  },
  {
    icon: Banknote
  },
  {
    icon: Camera
  },
];

export default function RoadmapPage() {
  const site = useJsonLdSiteUrl();
  const title = '4-Day Kaimur Bihar Travel Itinerary — Complete Roadmap';
  const description = 'Plan your perfect trip to Kaimur, Bihar with our 4-day travel roadmap — temples, waterfalls, culture, and food, with practical tips for getting there and staying.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${site}/roadmap`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${site}/assets/media/uploads-hero-3x8515y2aq-1784981458432-file-c4zq9dwjjt-e58a575a.jpg.jpg`} />
        <meta property="og:url" content={`${site}/roadmap`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${site}/roadmap#webpage`,
            name: title,
            url: `${site}/roadmap`,
            isPartOf: { '@id': `${site}/#website` },
            about: { '@id': `${site}/#organization` },
          })}
        </script>
      </Helmet>
      {/* Page Hero */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <ContentImage
          src="/assets/media/uploads-hero-3x8515y2aq-1784981458432-file-c4zq9dwjjt-e58a575a.jpg.jpg"
          alt="Kaimur hills travel roadmap"
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
            <Navigation size={14} className="inline mr-1" />
            Plan Your Trip
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            4-Day Travel Roadmap
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/80 mt-3 text-lg">
            The perfect itinerary for Kaimur, Bihar
          </motion.p>
        </motion.div>
      </section>
      {/* Heritage route map */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground text-center mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Explore Kaimur Heritage
          </h2>
          <figure>
            <img
              src="/assets/media/kaimur-heritage-roadmap.jpg"
              alt="Illustrated map of Kaimur showing Bhabhua, Mohania, Sasaram, Kaimur Wildlife Sanctuary, waterfalls, forts, temples, and main roads"
              className="w-full h-auto rounded-2xl border border-border shadow-md"
              width={768}
              height={610}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              An illustrated guide to Kaimur’s heritage sites, nature spots, and routes.
            </figcaption>
          </figure>
        </div>
      </section>
      {/* Day Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {roadmap.roadmapDays.map((day, i) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
              >
                <div className={`${day.color} px-6 py-5`}>
                  <p className="text-xs font-semibold text-white/80 uppercase tracking-widest">{day.day}</p>
                  <h2 className="text-xl font-bold text-white mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    {day.title}
                  </h2>
                </div>
                <div className="p-6 space-y-5">
                  {day.stops.map((stop) => (
                    <div key={stop.place} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-1" />
                        <div className="w-px flex-1 bg-border mt-1" />
                      </div>
                      <div className="pb-2">
                        <p className="text-xs font-medium text-primary uppercase tracking-wide">{stop.time}</p>
                        <p className="text-sm font-semibold text-foreground mt-0.5">{stop.place}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{stop.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Travel Tips */}
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
              Before You Go
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-foreground"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Essential Travel Tips
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {roadmap.travelTips.map((item, i) => {
              const Icon = travelTipsMeta[i].icon;

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const }}
                  className="bg-card border border-border rounded-xl p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <p className="font-semibold text-foreground text-sm">{item.label}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.tip}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
