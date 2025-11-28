import React from 'react';
import { useCMS } from '../contexts/CMSContext';
import EditableText from './atoms/EditableText';
import SectionWrapper from './cms/SectionWrapper';
import { ServiceCard } from '@/design-system';

const defaultServices = [
  {
    icon: { name: 'Palette' },
    title: 'UX/UI Design',
    description: 'User-centered design that combines beautiful aesthetics with intuitive functionality.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: { name: 'Code' },
    title: 'Web Design & Development',
    description: 'Modern, responsive websites built with the latest technologies and best practices.',
    features: ['Responsive Design', 'Performance Optimization', 'SEO Integration', 'CMS Development'],
    color: 'bg-green-50 text-green-600'
  },
  {
    icon: { name: 'Layers' },
    title: 'Design Systems',
    description: 'Scalable design systems that maintain consistency across all your digital products.',
    features: ['Component Libraries', 'Style Guides', 'Documentation', 'Token Management'],
    color: 'bg-purple-50 text-purple-600'
  },
  {
    icon: { name: 'Smartphone' },
    title: 'Product Design',
    description: 'End-to-end product design from concept to launch, focused on user needs and business goals.',
    features: ['Product Strategy', 'User Testing', 'Conversion Optimization', 'Launch Support'],
    color: 'bg-orange-50 text-orange-600'
  }
];

const Services: React.FC = () => {
  const { sections, updateSection } = useCMS();
  const section = sections.find(s => s.id === 'services');
  
  if (!section) return null;

  const { content } = section;

  const updateContent = (field: string, value: string) => {
    updateSection('services', { [field]: value });
  };

  const handleServiceUpdate = (index: number, field: string, value: string) => {
    const services = (content.services as typeof defaultServices) || defaultServices;
    const newServices = [...services];
    newServices[index] = {
      ...newServices[index],
      [field]: value
    };
    updateContent('services', JSON.stringify(newServices));
  };

  const services = (content.services as typeof defaultServices) || defaultServices;

  return (
    <SectionWrapper sectionId="services">
      <section id="services" className="brutalist-section bg-bg-primary">
        <div className="brutalist-container">
          <div className="mb-16">
            <div className="util-label mb-4">002-SERVICES</div>
            <EditableText
              elementId="services-headline"
              onUpdate={(value) => updateContent('headline', value)}
              className="text-4xl md:text-5xl font-bold text-text-primary mb-6"
              as="h2"
            >
              {content.headline || 'What We Do'}
            </EditableText>

            <EditableText
              elementId="services-description"
              onUpdate={(value) => updateContent('description', value)}
              className="text-lg text-text-secondary max-w-2xl"
              as="p"
              multiline
            >
              {content.description || 'We specialize in creating digital experiences that not only look great but drive real business results.'}
            </EditableText>
          </div>

          {/* Full-width contained grid */}
          <div className="border-l border-r border-border-primary">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px brutalist-hatch">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  service={service}
                  index={index}
                  onUpdate={handleServiceUpdate}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};

export default Services;