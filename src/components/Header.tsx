/**
 * @fileoverview Header component with Momentic.ai-inspired design
 * @module components/Header
 * 
 * Navigation header with glassmorphism effect and dark theme.
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
    <header className={`fixed ${topOffset} left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'glass border-b border-dark-border' 
        : 'bg-dark-bg/80 backdrop-blur-lg border-b border-dark-border'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-mono font-semibold text-white">
              kipo.design
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
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
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-surface border-t border-dark-border shadow-2xl">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 font-medium"
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