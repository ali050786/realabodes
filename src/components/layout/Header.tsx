import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUIStore } from '@/stores/useUIStore';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUIStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerWidth < 768 ? 20 : 50;
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine effective state for styling
  // If menu is open, we force the "scrolled" look (solid bg) for readability
  const isSolid = isScrolled || isMobileMenuOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.nav
        initial={{
          backgroundColor: "transparent",
          backdropFilter: "blur(0px)",
          borderBottomColor: "transparent",
          paddingBlock: "24px"
        }}
        animate={{
          backgroundColor: isSolid ? "hsl(0 0% 100% / 0.9)" : "transparent",
          backdropFilter: isSolid ? "blur(12px)" : "blur(0px)",
          borderBottomColor: isSolid ? "hsl(var(--border))" : "transparent",
          paddingBlock: isSolid ? (window.innerWidth < 768 ? "12px" : "12px") : (window.innerWidth < 768 ? "16px" : "24px")
        }}
        style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid' }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full"
      >
        <div className="container mx-auto flex items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
              style={{ height: '45px' }}
            >
              {/* White logo - visible when header is transparent */}
              <img
                src="/assets/whitelogo.svg"
                alt="Real Abodes"
                className={`h-[45px] w-auto transition-opacity duration-300 ${isSolid ? 'opacity-0' : 'opacity-100'}`}
                style={{ position: isSolid ? 'absolute' : 'relative' }}
              />
              {/* Dark logo - visible when header has white background */}
              <img
                src="/assets/logo-v.svg"
                alt="Real Abodes"
                className={`h-[45px] w-auto transition-opacity duration-300 ${isSolid ? 'opacity-100' : 'opacity-0'}`}
                style={{ position: isSolid ? 'relative' : 'absolute' }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium tracking-wide uppercase underline-hover transition-colors ${isSolid
                  ? (location.pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground')
                  : 'text-white hover:text-white/80'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/contact"
              className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${isSolid
                ? 'bg-gradient-gold text-primary-foreground hover:shadow-gold'
                : 'bg-transparent border border-white text-white hover:bg-white/10'
                }`}
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className={`md:hidden p-2 transition-colors duration-300 ${isSolid ? 'text-foreground' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-card border-t border-border shadow-lg"
          >
            <div className="container mx-auto px-6 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-lg font-medium ${location.pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-gold text-primary-foreground rounded-full text-sm font-medium mt-4 w-full justify-center"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
