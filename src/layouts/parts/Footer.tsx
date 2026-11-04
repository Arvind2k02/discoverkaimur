import { Link } from "react-router";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-2" style={{
            fontFamily: 'var(--font-heading)',
            color: 'hsl(var(--primary))'
          }}>
              Kaimur, Bihar
            </h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Discover the ancient hills, sacred temples, cascading waterfalls, and rich cultural
              heritage of Kaimur — Bihar's hidden gem.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 opacity-90">Explore</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/places" className="hover:opacity-100 transition-opacity">Famous Places</Link></li>
              <li><Link to="/culture" className="hover:opacity-100 transition-opacity">Culture & Festivals</Link></li>
              <li><Link to="/food" className="hover:opacity-100 transition-opacity">Local Food</Link></li>
              <li><Link to="/roadmap" className="hover:opacity-100 transition-opacity">Travel Roadmap</Link></li>
              <li><Link to="/about" className="hover:opacity-100 transition-opacity">About</Link></li>
              <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 opacity-90">Quick Facts</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>District HQ: Bhabhua</li>
              <li>Best Time: Oct – March</li>
              <li>Language: Bhojpuri, Hindi</li>
              <li>State: Bihar, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-sm opacity-50">
          © {currentYear} Kaimur Travel Guide. Celebrating the heritage of Bihar.
        </div>
      </div>
    </footer>;
}
