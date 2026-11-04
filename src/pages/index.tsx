import { home } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { Link } from "react-router";
import { ChevronDown, MapPin, Music, Utensils, Navigation, ArrowRight } from 'lucide-react';
import ContentImage from '@/components/ContentImage';
import { useJsonLdSiteUrl } from '@/lib/json-ld-site-url-context';
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const
    }
  }
};
const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};
const sectionsMeta = [{
  icon: MapPin
}, {
  icon: Music
}, {
  icon: Utensils
}, {
  icon: Navigation
}];
export default function HomePage() {
  const site = useJsonLdSiteUrl();
  const ogImage = `${site}/assets/media/uploads-hero-3x8515y2aq-1784981458432-file-c4zq9dwjjt-e58a575a.jpg.jpg`;
  return <>
      <Helmet>
        <title>Kaimur Bihar — Culture, Places & Travel Guide</title>
        <meta name="description" content="Explore Kaimur, Bihar — ancient temples, stunning waterfalls, rich culture, and delicious local food. Your complete travel roadmap to Bihar's hidden gem." />
        <link rel="canonical" href={`${site}/`} />
        <meta property="og:title" content="Kaimur Bihar — Culture, Places & Travel Guide" />
        <meta property="og:description" content="Discover ancient temples, cascading waterfalls, vibrant festivals, and soul-warming food in Kaimur — Bihar's hidden gem." />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={`${site}/`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kaimur Bihar — Culture, Places & Travel Guide" />
        <meta name="twitter:description" content="Discover ancient temples, cascading waterfalls, vibrant festivals, and soul-warming food in Kaimur — Bihar's hidden gem." />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">
          {JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [{
            '@type': 'WebSite',
            '@id': `${site}/#website`,
            name: 'Kaimur Bihar Travel Guide',
            url: `${site}/`
          }, {
            '@type': 'TouristDestination',
            '@id': `${site}/#organization`,
            name: 'Kaimur, Bihar',
            url: `${site}/`,
            description: 'Kaimur is a district in Bihar, India, known for ancient temples, waterfalls, and rich cultural heritage.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Bhabhua',
              addressRegion: 'Bihar',
              addressCountry: 'IN'
            },
            touristType: ['Cultural tourism', 'Nature tourism', 'Heritage tourism']
          }, {
            '@type': 'WebPage',
            '@id': `${site}/#webpage`,
            url: `${site}/`,
            name: 'Kaimur Bihar — Culture, Places & Travel Guide',
            description: 'Explore Kaimur, Bihar — ancient temples, stunning waterfalls, rich culture, and delicious local food.',
            isPartOf: {
              '@id': `${site}/#website`
            },
            about: {
              '@id': `${site}/#organization`
            },
            datePublished: '2026-07-04',
            dateModified: '2026-07-04'
          }]
        })}
        </script>
      </Helmet>
      {/* ── HERO ── */}
      <section className="relative h-[92vh] min-h-[560px] flex items-center justify-center overflow-hidden">
        <ContentImage
          src="/assets/media/uploads-hero-3x8515y2aq-1784981458432-file-c4zq9dwjjt-e58a575a.jpg.jpg"
          alt="Kaimur hills landscape at sunrise"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          width={1600}
          height={900}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/40 to-gray-900/70" />

        <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p variants={fadeUp} className="text-sm font-medium tracking-widest uppercase text-yellow-300 mb-4">
            Bihar's Hidden Gem
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{
          fontFamily: 'var(--font-heading)'
        }}>
            Discover Kaimur
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ancient temples, cascading waterfalls, vibrant festivals, and soul-warming food —
            welcome to the heart of Bihar's cultural heritage.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/places" className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-sm">
              Explore Places
            </Link>
            <Link to="/roadmap" className="px-8 py-3 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/30 font-semibold hover:bg-white/25 transition-colors text-sm">
              View Roadmap
            </Link>
          </motion.div>
        </motion.div>

        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1.5,
        duration: 1
      }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60">
          <ChevronDown size={28} className="animate-bounce" />
        </motion.div>
      </section>
      {/* ── STATS STRIP ── */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[{
            value: '108 AD',
            label: 'Oldest Temple'
          }, {
            value: '5+',
            label: 'Waterfalls'
          }, {
            value: '1,000+',
            label: 'Years of History'
          }, {
            value: 'Oct–Mar',
            label: 'Best Season'
          }].map(s => <div key={s.label}>
                <p className="text-2xl font-bold" style={{
              fontFamily: 'var(--font-heading)'
            }}>{s.value}</p>
                <p className="text-sm opacity-80 mt-1">{s.label}</p>
              </div>)}
          </div>
        </div>
      </section>
      {/* ── EXPLORE SECTIONS ── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{
          once: true
        }} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
              Everything Kaimur
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-foreground" style={{
            fontFamily: 'var(--font-heading)'
          }}>
              What to Explore
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mt-4 max-w-xl mx-auto">
              From sacred temples to local flavours — dive deep into every aspect of Kaimur.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {home.sections.map((sec, i) => {
            const Icon = sectionsMeta[i].icon;
            return <motion.div key={sec.href} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: i * 0.1,
              ease: 'easeOut' as const
            }}>
                  <Link to={sec.href} className="group block rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-lg transition-shadow">
                    <div className="relative h-56 overflow-hidden">
                      <ContentImage src={sec.img} alt={sec.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={560} />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <p className="text-xs text-yellow-300 font-medium uppercase tracking-widest mb-1">{sec.eyebrow}</p>
                          <h3 className="text-xl font-bold text-white" style={{
                        fontFamily: 'var(--font-heading)'
                      }}>
                            {sec.label}
                          </h3>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <ArrowRight size={16} className="text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{sec.description}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                        <Icon size={14} />
                        {sec.cta}
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                </motion.div>;
          })}
          </div>
        </div>
      </section>
      {/* ── CTA BANNER ── */}
      <section className="bg-primary text-primary-foreground py-16 text-center">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }} className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{
          fontFamily: 'var(--font-heading)'
        }}>
            Ready to Explore Kaimur?
          </h2>
          <p className="opacity-85 mb-8 text-lg">
            Pack your bags and experience the untouched beauty, ancient heritage, and warm hospitality of Bihar's Kaimur district.
          </p>
          <Link to="/roadmap" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-primary font-semibold hover:bg-white/90 transition-colors">
            <Navigation size={16} />
            Start Planning
          </Link>
        </motion.div>
      </section>
    </>;
}
