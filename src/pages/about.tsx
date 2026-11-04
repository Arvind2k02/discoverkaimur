import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from "react-router";
import { motion } from 'motion/react';
import { Lightbulb, Users, Target, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useJsonLdSiteUrl } from '@/lib/json-ld-site-url-context';
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const
    }
  }
};
const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};
const values = [{
  icon: Lightbulb,
  title: 'Innovation',
  description: 'We embrace new ideas and continuously look for better ways to solve problems and deliver value.'
}, {
  icon: Users,
  title: 'Collaboration',
  description: 'Great things happen when people work together. We foster open communication and shared ownership.'
}, {
  icon: Target,
  title: 'Focus',
  description: 'We stay laser-focused on what matters most — delivering outcomes that make a real difference.'
}, {
  icon: Shield,
  title: 'Integrity',
  description: 'We do what we say, say what we mean, and hold ourselves to the highest standards of honesty.'
}];
const title = 'About Kaimur Bihar — Heritage, Culture & Travel Info';
const description = 'Learn about Kaimur district in Bihar — its ancient history, cultural traditions, natural wonders, and why it is one of India\'s most fascinating hidden destinations.';
export default function AboutPage() {
  const site = useJsonLdSiteUrl();
  const pageUrl = `${site}/about`;
  const ogImage = `${site}/assets/media/uploads-hero-3x8515y2aq-1784981458432-file-c4zq9dwjjt-e58a575a.jpg.jpg`;
  return <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">
          {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': `${pageUrl}#webpage`,
          name: title,
          url: pageUrl,
          isPartOf: {
            '@id': `${site}/#website`
          },
          about: {
            '@id': `${site}/#organization`
          }
        })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="border-b border-border bg-muted">
        <div className="container mx-auto px-4 py-20 md:py-28 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-2xl mx-auto">
            <motion.p variants={fadeUp} className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4">
              About Us
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              Built with purpose,
              <br className="hidden md:block" /> driven by people
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
              We're a small, focused team on a mission to build tools and experiences that
              genuinely help people. Everything we create starts with a simple question: does
              this make someone's life easier?
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{
          once: true
        }}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-foreground mb-4">
              Our story
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-4">
              It started with a frustration — the tools available were either too complex, too
              expensive, or just not built with real users in mind. So we decided to build
              something better.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-4">
              From day one, our focus has been on simplicity and substance. We believe the best
              products are the ones that get out of your way and let you do your best work.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
              Today, we're proud to serve a growing community of users who share our belief that
              good design and thoughtful engineering can change how people work.
            </motion.p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 24
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          ease: 'easeOut' as const
        }} className="grid grid-cols-2 gap-4">
            {[{
            stat: '2019',
            label: 'Founded'
          }, {
            stat: '10k+',
            label: 'Users'
          }, {
            stat: '99.9%',
            label: 'Uptime'
          }, {
            stat: '4.9★',
            label: 'Avg. rating'
          }].map(item => <Card key={item.label} className="text-center">
                <CardContent className="py-6">
                  <p className="text-3xl font-bold text-foreground">{item.stat}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
                </CardContent>
              </Card>)}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted border-y border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-foreground mb-3">
              What we stand for
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
              Our values aren't just words on a wall — they shape every decision we make.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map(v => <motion.div key={v.title} variants={fadeUp}>
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mb-4">
                      <v.icon size={20} className="text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {v.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true
      }} variants={stagger} className="max-w-xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl font-bold text-foreground mb-4">
            Want to get in touch?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground mb-8">
            Whether you have a question, a partnership idea, or just want to say hello — we'd
            love to hear from you.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">Contact us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/">Back to home</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </>;
}
