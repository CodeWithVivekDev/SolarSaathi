import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenEstimator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why Assessment Matters', href: '#why-it-matters' },
    { label: 'Sample Estimate', href: '#sample-estimate' },
    { label: 'Methodology', href: '#methodology' },
    { label: 'FAQs', href: '#faqs' },
  ];

  return (
    <header className="relative z-30 flex items-center justify-between pb-6 md:pb-8 border-b border-gray-100/80">
      {/* Brand Logo & Tag */}
      <a 
        href="#home" 
        className="flex items-center gap-2.5 text-gray-900 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-lg py-1 px-1.5 transition-transform"
        aria-label="SolarSaathi Home"
      >
        <div className="w-8 h-8 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green group-hover:rotate-45 transition-transform duration-300">
          {/* Custom geometric radial sunburst SVG icon */}
          <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="14" fill="#2e7d32" />
            <path d="M50 4 L53 36 L47 36 Z" fill="#2e7d32" />
            <path d="M50 96 L53 64 L47 64 Z" fill="#2e7d32" />
            <path d="M4 50 L36 53 L36 47 Z" fill="#2e7d32" />
            <path d="M96 50 L64 53 L64 47 Z" fill="#2e7d32" />
            <path d="M17.5 17.5 L40.5 39.5 L36.5 43.5 Z" fill="#2e7d32" />
            <path d="M82.5 82.5 L59.5 60.5 L63.5 56.5 Z" fill="#2e7d32" />
            <path d="M82.5 17.5 L60.5 39.5 L56.5 36.5 Z" fill="#2e7d32" />
            <path d="M17.5 82.5 L39.5 60.5 L43.5 63.5 Z" fill="#2e7d32" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-display font-extrabold text-xl tracking-tight text-gray-900 leading-none">
            SolarSaathi
          </span>
          <span className="text-[10px] font-semibold text-brand-green tracking-wider uppercase mt-0.5">
            Independent Solar Sizing
          </span>
        </div>
      </a>

      {/* Desktop Navigation Links */}
      <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-brand-green after:transition-all after:duration-200"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Primary CTA Button */}
      <div className="hidden sm:flex items-center gap-3">
        <button
          onClick={onOpenEstimator}
          className="inline-flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-pill hover:bg-brand-dark-hover hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
          aria-label="Check My Roof - Launch Solar Estimator"
        >
          <span>Check My Roof</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden p-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
        aria-expanded={mobileMenuOpen}
        aria-label="Toggle Navigation Menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div 
          className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl p-5 mt-2 flex flex-col gap-4 lg:hidden z-50 animate-in fade-in duration-150"
          role="dialog"
          aria-label="Mobile Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-gray-700 hover:text-brand-green py-1.5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenEstimator();
            }}
            className="w-full flex items-center justify-center gap-2 bg-brand-green text-white py-3 rounded-full font-semibold shadow-md hover:bg-brand-green-hover transition-colors mt-2"
          >
            <span>Check My Roof</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
