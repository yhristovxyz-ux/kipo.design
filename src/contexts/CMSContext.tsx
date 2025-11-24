import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

export interface ButtonConfig {
  text: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
}

export interface IconConfig {
  name: string;
  color?: string;
  size?: number;
}

export interface SectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
  content: Record<string, any>;
}

interface CMSContextType {
  isEditMode: boolean;
  setEditMode: (enabled: boolean) => void;
  showSectionManager: boolean;
  setShowSectionManager: (show: boolean) => void;
  sections: SectionConfig[];
  updateSection: (sectionId: string, content: Record<string, any>) => void;
  reorderSections: (sections: SectionConfig[]) => void;
  duplicateSection: (sectionId: string) => void;
  toggleSection: (sectionId: string) => void;
  deleteSection?: (sectionId: string) => void;
  selectedElement: string | null;
  setSelectedElement: (elementId: string | null) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const defaultSections: SectionConfig[] = [
  {
    id: 'hero',
    name: 'Hero Section',
    enabled: true,
    order: 1,
    content: {
      badge: 'Available for new projects',
      headline: 'Design That Moves.',
      subheadline: 'Ideas That Convert.',
      description: 'We build scalable, user-first digital products and design systems for teams that think ahead.',
      primaryButton: { text: 'Let\'s Build Something Brilliant', href: '#contact', variant: 'primary' },
      secondaryButton: { text: 'See Our Work', href: '#work', variant: 'secondary' },
      stats: [
        { value: '50+', label: 'Projects Delivered' },
        { value: '98%', label: 'Client Satisfaction' },
        { value: '3x', label: 'Conversion Increase' }
      ]
    }
  },
  {
    id: 'services',
    name: 'Services Section',
    enabled: true,
    order: 2,
    content: {
      headline: 'What We Do',
      description: 'We specialize in creating digital experiences that not only look great but drive real business results.',
      services: [
        {
          icon: { name: 'Palette' },
          title: 'UX/UI Design',
          description: 'User-centered design that combines beautiful aesthetics with intuitive functionality.',
          features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design']
        },
        {
          icon: { name: 'Code' },
          title: 'Web Design & Development',
          description: 'Modern, responsive websites built with the latest technologies and best practices.',
          features: ['Responsive Design', 'Performance Optimization', 'SEO Integration', 'CMS Development']
        },
        {
          icon: { name: 'Layers' },
          title: 'Design Systems',
          description: 'Scalable design systems that maintain consistency across all your digital products.',
          features: ['Component Libraries', 'Style Guides', 'Documentation', 'Token Management']
        },
        {
          icon: { name: 'Smartphone' },
          title: 'Product Design',
          description: 'End-to-end product design from concept to launch, focused on user needs and business goals.',
          features: ['Product Strategy', 'User Testing', 'Conversion Optimization', 'Launch Support']
        }
      ]
    }
  },
  {
    id: 'process',
    name: 'Process Section',
    enabled: true,
    order: 3,
    content: {
      headline: 'Our Simple Process',
      description: 'We\'ve streamlined our workflow to deliver exceptional results efficiently. Here\'s how we transform your ideas into reality.',
      ctaHeadline: 'Ready to Get Started?',
      ctaDescription: 'Let\'s discuss your project and see how our proven process can help you achieve your goals.',
      ctaButton: { text: 'Start Your Project', href: '#contact', variant: 'primary' },
      steps: [
        {
          number: '01',
          icon: { name: 'MessageCircle' },
          title: 'Discovery & Strategy',
          description: 'We start with a deep dive into your business goals, target audience, and project requirements through collaborative workshops.',
          duration: '1-2 weeks',
          deliverables: ['Project roadmap', 'User personas', 'Technical requirements'],
          image: { type: 'image', url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800' },
          details: 'Our discovery phase involves stakeholder interviews, competitive analysis, and user research to establish a solid foundation for your project.'
        }
      ]
    }
  },
  {
    id: 'studio',
    name: 'Studio Section',
    enabled: true,
    order: 4,
    content: {
      headline: 'Meet the Studio Behind kipo.design',
      description: 'Founded by Yordan Hristov, we\'re a boutique design studio that combines strategic thinking with creative execution to deliver exceptional results.',
      stat1Value: '5+',
      stat1Label: 'Years Experience',
      stat2Value: '50+',
      stat2Label: 'Happy Clients',
      stat3Value: '200+',
      stat3Label: 'Projects Completed',
      stat4Value: '98%',
      stat4Label: 'Client Satisfaction'
    }
  },
  {
    id: 'approach',
    name: 'Approach Section',
    enabled: true,
    order: 5,
    content: {
      headline: 'Design That Works Because It\'s Built On Understanding',
      description: 'Our approach combines strategic thinking with creative execution, ensuring every project delivers measurable results.'
    }
  },
  {
    id: 'projects',
    name: 'Projects Section',
    enabled: true,
    order: 6,
    content: {
      headline: 'Featured Projects',
      description: 'Explore our latest work and see how we\'ve helped businesses transform their digital presence.'
    }
  },
  {
    id: 'testimonials',
    name: 'Testimonials Section',
    enabled: true,
    order: 7,
    content: {
      headline: 'What Our Clients Say',
      description: 'Don\'t just take our word for it. Here\'s what our clients have to say about working with kipo.design.',
      clientsTitle: 'Trusted by innovative companies'
    }
  },
  {
    id: 'contact',
    name: 'Contact Section',
    enabled: true,
    order: 8,
    content: {
      headline: 'Ready to Start Your Project?',
      description: 'Let\'s discuss how we can help you create exceptional digital experiences that drive real business results.',
      formTitle: 'Tell us about your project',
      infoTitle: 'Get in Touch',
      ctaTitle: 'Free Consultation',
      ctaDescription: 'Schedule a 30-minute call to discuss your project and explore how we can help.'
    }
  },
  {
    id: 'footer',
    name: 'Footer Section',
    enabled: true,
    order: 9,
    content: {
      brand: 'kipo.design',
      description: 'Creating exceptional digital experiences that drive real business results.',
      copyright: '© 2024 kipo.design. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    }
  }
];

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [showSectionManager, setShowSectionManager] = useState(false);
  const [sections, setSections] = useState<SectionConfig[]>(defaultSections);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const updateSection = (sectionId: string, content: Record<string, any>) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, content: { ...section.content, ...content } }
        : section
    ));
  };

  const reorderSections = (newSections: SectionConfig[]) => {
    setSections(newSections.map((section, index) => ({ ...section, order: index + 1 })));
  };

  const duplicateSection = (sectionId: string) => {
    const sectionToDuplicate = sections.find(s => s.id === sectionId);
    if (sectionToDuplicate) {
      const newSection: SectionConfig = {
        ...sectionToDuplicate,
        id: `${sectionId}-copy-${Date.now()}`,
        name: `${sectionToDuplicate.name} (Copy)`,
        order: sections.length + 1
      };
      setSections(prev => [...prev, newSection]);
    }
  };

  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId
        ? { ...section, enabled: !section.enabled }
        : section
    ));
  };

  const deleteSection = (sectionId: string) => {
    setSections(prev => prev.filter(section => section.id !== sectionId));
  };

  return (
    <CMSContext.Provider value={{
      isEditMode,
      setEditMode,
      showSectionManager,
      setShowSectionManager,
      sections,
      updateSection,
      reorderSections,
      duplicateSection,
      toggleSection,
      deleteSection,
      selectedElement,
      setSelectedElement
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};