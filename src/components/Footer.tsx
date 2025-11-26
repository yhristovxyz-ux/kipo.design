import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';
import EditableText from './atoms/EditableText';
import SectionWrapper from './cms/SectionWrapper';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { sections, updateSection } = useCMS();
  const section = sections.find(s => s.id === 'footer');

  const updateContent = (field: string, value: any) => {
    updateSection('footer', { [field]: value });
  };

  const footerLinks = {
    Services: [
      { name: 'UX/UI Design', href: '#services' },
      { name: 'Web Development', href: '#services' },
      { name: 'Design Systems', href: '#services' },
      { name: 'Product Design', href: '#services' }
    ],
    Company: [
      { name: 'Studio', href: '#studio' },
      { name: 'Work', href: '#work' },
      { name: 'Process', href: '#process' },
      { name: 'Contact', href: '#contact' }
    ],
    Resources: [
      { name: 'Blog', href: '#' },
      { name: 'Case Studies', href: '#work' },
      { name: 'Design System', href: '#' },
      { name: 'Style Guide', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' }
  ];

  return (
    <SectionWrapper sectionId="footer">
      <footer className="bg-zinc-900 text-white border-t-2 border-zinc-900">
        <div className="brutalist-container py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <EditableText
                elementId="footer-brand"
                onUpdate={(value) => updateContent('brand', value)}
                className="text-xl font-mono font-bold mb-4"
                as="h3"
              >
                kipo.design
              </EditableText>
              <EditableText
                elementId="footer-description"
                onUpdate={(value) => updateContent('description', value)}
                className="text-zinc-400 mb-6 leading-relaxed text-sm"
                as="p"
                multiline
              >
                Creating exceptional digital experiences that drive real business results.
              </EditableText>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-9 h-9 border-2 border-zinc-700 rounded-brutalist flex items-center justify-center hover:border-white hover:bg-white hover:text-zinc-900 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <EditableText
                  elementId={`footer-category-${category.toLowerCase()}`}
                  onUpdate={(value) => updateContent(`category${category}`, value)}
                  className="font-bold mb-4 text-sm font-mono uppercase text-zinc-400 tracking-wider"
                  as="h4"
                >
                  {category}
                </EditableText>
                <ul className="space-y-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <EditableText
                        elementId={`footer-link-${category.toLowerCase()}-${index}`}
                        onUpdate={(value) => console.log('Update link:', value)}
                        className="text-zinc-400 hover:text-white transition-colors duration-200 text-sm"
                        as="a"
                      >
                        {link.name}
                      </EditableText>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t-2 border-zinc-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <EditableText
                elementId="footer-copyright"
                onUpdate={(value) => updateContent('copyright', value)}
                className="text-zinc-500 text-xs font-mono font-bold"
                as="p"
              >
                © {currentYear} kipo.design. All rights reserved.
              </EditableText>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <EditableText
                  elementId="footer-privacy"
                  onUpdate={(value) => updateContent('privacy', value)}
                  className="text-zinc-500 hover:text-white text-xs font-mono font-bold transition-colors duration-200"
                  as="a"
                >
                  Privacy Policy
                </EditableText>
                <EditableText
                  elementId="footer-terms"
                  onUpdate={(value) => updateContent('terms', value)}
                  className="text-zinc-500 hover:text-white text-xs font-mono font-bold transition-colors duration-200"
                  as="a"
                >
                  Terms of Service
                </EditableText>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </SectionWrapper>
  );
};

export default Footer;