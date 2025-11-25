/**
 * @fileoverview Header component with brutalist design
 * @module components/Header
 * 
 * Geometric navigation header with strict alignment and bold typography.
 */

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/design-system';
import { useCMS } from '../contexts/CMSContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isEditMode } = useCMS();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Studio', href: '#studio' },
    { name: 'Contact', href: '#contact' },
  ];

  // Adjust top position when in edit mode
  const topOffset = isEditMode ? 'top-[60px]' : 'top-0';

  return (
    <header className={`fixed ${topOffset} left-0 right-0 z-40 transition-colors duration-150 ${
      isScrolled 
        ? 'bg-white border-b-2 border-zinc-900' 
        : 'bg-white border-b-2 border-zinc-200'
    }`}>
      <div className="brutalist-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-mono font-bold text-zinc-900 uppercase tracking-tight">
              kipo.design
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-zinc-900 hover:text-primary transition-colors duration-150 uppercase tracking-wide"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-zinc-900 hover:text-primary transition-colors border-2 border-zinc-900 rounded-brutalist"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t-2 border-zinc-900">
          <div className="brutalist-container py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors duration-150 uppercase tracking-wide border-2 border-zinc-200 rounded-brutalist"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => {
                  setIsMenuOpen(false);
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start a Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;