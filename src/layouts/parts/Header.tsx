import { Link, useLocation } from "react-router";
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
const navItems = [{
  href: '/places',
  label: 'Places'
}, {
  href: '/culture',
  label: 'Culture'
}, {
  href: '/food',
  label: 'Food'
}, {
  href: '/roadmap',
  label: 'Roadmap'
}, {
  href: '/about',
  label: 'About'
}, {
  href: '/contact',
  label: 'Contact'
}];
export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/assets/kaimur-logo-site-bg.png"
              alt="Kaimur Bihar"
              className="h-14 w-14 object-contain"
              width={768}
              height={768}
            />
          </Link>

          <nav className="hidden md:flex gap-6">
            {navItems.map(item => {
            const isActive = location.pathname === item.href;
            return <Link key={item.href} to={item.href} className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary border-b-2 border-primary pb-0.5' : 'text-muted-foreground'}`}>
                  {item.label}
                </Link>;
          })}
          </nav>

          <Link to="/roadmap" className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            Plan Your Visit
          </Link>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 hover:bg-muted rounded-md transition-colors" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMobileMenuOpen && <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-1">
              {navItems.map(item => {
            const isActive = location.pathname === item.href;
            return <Link key={item.href} to={item.href} className={`text-sm font-medium transition-colors py-2 px-2 rounded-md hover:bg-muted ${isActive ? 'text-primary bg-muted' : 'text-muted-foreground hover:text-primary'}`} onClick={() => setIsMobileMenuOpen(false)}>
                    {item.label}
                  </Link>;
          })}
              <Link to="/roadmap" className="mt-2 text-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Plan Your Visit
              </Link>
            </nav>
          </div>}
      </div>
    </header>;
}
