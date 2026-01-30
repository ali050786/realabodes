import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-50 border-t border-border bg-background">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="font-serif text-2xl text-gradient-gold">
              Real Abodes
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Opening doors to a better living. Your trusted partner in real estate excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-foreground">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {['Home', 'Projects', 'Blog', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm underline-hover inline-block"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-foreground">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:info@realabodes.in" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>info@realabodes.in</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Phone className="w-4 h-4" />
                <span>+91 9876 543 210</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>The Evoq, Wakad<br />Pune, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-foreground">Stay Updated</h4>
            <p className="text-muted-foreground text-sm">
              Subscribe to receive updates on new projects.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                className="p-2.5 bg-gradient-gold rounded-lg text-primary-foreground hover:shadow-gold transition-shadow"
                aria-label="Subscribe"
              >
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Real Abodes. All rights reserved.
            <span className="mx-2">|</span>
            <a href="https://blinkwiser.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Designed by BlinkWiser
            </a>
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
