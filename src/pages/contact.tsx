import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { useState, useRef } from 'react';
import { MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
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

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const site = useJsonLdSiteUrl();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const gotchaRef = useRef<HTMLInputElement>(null);

  const title = 'Contact Us — Kaimur Bihar Travel Guide';
  const description = 'Have a question about visiting Kaimur, Bihar? Get in touch with us — we\'re happy to help you plan your trip.';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot check — if filled, silently do nothing
    if (gotchaRef.current?.value) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get('name') as string).trim();
    const email = (data.get('email') as string).trim();
    const topic = data.get('topic') as string;
    const message = (data.get('message') as string).trim();

    if (!name || !email || !message) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      // Field mapping: only the message textarea goes in messages_attributes[0].body.
      // All other fields (dropdowns, radios, checkboxes) must be added to conversation.data as { "Label": value } pairs.
      const res = await fetch('/api/contact/contact-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation: {
            messages_attributes: [{ body: message }],
            data: {
              __gd_contact_form_title: 'Contact Kaimur Travel Guide',
              'Topic': topic,
            },
          },
          user: { email, name },
        }),
      });

      const responseText = await res.text();
      let result: { success?: boolean; error?: string };
      try {
        result = JSON.parse(responseText) as { success?: boolean; error?: string };
      } catch {
        throw new Error(`Contact service returned an invalid response (HTTP ${res.status}).`);
      }

      if (!res.ok || !result.success) {
        setStatus('error');
        setErrorMsg(result.error || `Could not send your message (HTTP ${res.status}). Please try again.`);
      } else {
        setStatus('success');
        form.reset();
      }
    } catch (error) {
      setStatus('error');
      setErrorMsg(
        error instanceof Error
          ? error.message
          : 'Network error. Please check your connection and try again.',
      );
    }
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${site}/contact`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${site}/contact`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            '@id': `${site}/contact#webpage`,
            name: title,
            url: `${site}/contact`,
            isPartOf: { '@id': `${site}/#website` },
            about: { '@id': `${site}/#organization` },
          })}
        </script>
      </Helmet>

      {/* Page Hero */}
      <section className="relative h-48 md:h-64 flex items-center justify-center overflow-hidden">
        <ContentImage
          src="/assets/media/uploads-hero-3x8515y2aq-1784981458432-file-c4zq9dwjjt-e58a575a.jpg.jpg"
          alt="Kaimur Bihar landscape"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          width={1600}
          height={512}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/65 to-gray-900/80" />
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4"
        >
          <motion.p variants={fadeUp} className="text-sm font-medium uppercase tracking-widest text-yellow-300 mb-2">
            Get in Touch
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Contact Us
          </motion.h1>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">

            {/* Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' as const }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  We'd love to hear from you
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Planning a trip to Kaimur? Have a question about the best time to visit, local transport, or hidden gems? Drop us a message and we'll get back to you.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Location</p>
                    <p className="text-muted-foreground text-sm">Kaimur District, Bihar, India</p>
                    <p className="text-muted-foreground text-sm">District HQ: Bhabhua</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Best Time to Visit</p>
                    <p className="text-muted-foreground text-sm">August to March</p>
                    <p className="text-muted-foreground text-sm">Cool, pleasant weather</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-2xl p-5 border border-border">
                <p className="text-sm font-semibold text-foreground mb-2">Quick Tips</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>Nearest railway: Bhabhua Road station</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>Budget: ₹1,500–₹2,500 per day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>Language: Bhojpuri & Hindi</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' as const }}
              className="lg:col-span-3"
            >
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-16 px-8 bg-card border border-border rounded-2xl h-full">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thanks for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5"
                >
                  {/* Honeypot — positioned off-screen, never included in POST body */}
                  <input
                    ref={gotchaRef}
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ position: 'absolute', left: '-9999px' }}
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                        Your Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Rahul Kumar"
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-foreground mb-1.5">
                      Topic
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      defaultValue="Trip Planning"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                    >
                      <option value="Trip Planning">Trip Planning</option>
                      <option value="Places to Visit">Places to Visit</option>
                      <option value="Local Food">Local Food</option>
                      <option value="Culture & Festivals">Culture & Festivals</option>
                      <option value="Transport & Accommodation">Transport & Accommodation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                      Your Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your travel plans or ask us anything about Kaimur..."
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
