/**
 * @fileoverview Hero Section - Brutalist Design
 * @module components/sections/HeroSection
 * 
 * Centered hero with large typography, geometric layout, and logo grid.
 * Follows brutalist design principles.
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCMS } from '../../contexts/CMSContext';
import { Stat } from '../../design-system/components/primitives/Stat';
import EditableText from '../atoms/EditableText';
import EditableButton from '../atoms/EditableButton';
import SectionWrapper from '../cms/SectionWrapper';

interface StatItem {
  value: string;
  label: string;
}

const HeroSection: React.FC = () => {
  const { sections, updateSection } = useCMS();
  const section = sections.find(s => s.id === 'hero');
  
  if (!section) return null;

  const { content } = section;

  const updateContent = (field: string, value: unknown) => {
    updateSection('hero', { [field]: value });
  };

  return (
    <SectionWrapper sectionId="hero">
      <section className="relative min-h-screen flex items-center justify-center bg-bg-primary pt-24">
        <div className="brutalist-container w-full">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge - Design system style */}
            <div className="inline-flex items-center gap-2 mb-12 brutalist-element px-4 py-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <EditableText
                elementId="hero-badge"
                onUpdate={(value) => updateContent('badge', value)}
                as="span"
                className="text-xs font-bold uppercase tracking-wider text-text-primary"
              >
                {content.badge}
              </EditableText>
            </div>

            {/* Main Headline - Large, Bold, Geometric */}
            <EditableText
              elementId="hero-headline"
              onUpdate={(value) => updateContent('headline', value)}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.1] mb-4"
              as="h1"
            >
              {content.headline}
            </EditableText>
            
            <EditableText
              elementId="hero-subheadline"
              onUpdate={(value) => updateContent('subheadline', value)}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] mb-8"
              as="h1"
            >
              {content.subheadline}
            </EditableText>

            {/* Description */}
            <EditableText
              elementId="hero-description"
              onUpdate={(value) => updateContent('description', value)}
              className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-12"
              as="p"
              multiline
            >
              {content.description}
            </EditableText>

            {/* CTA Button - Single, centered */}
            <div className="flex justify-center mb-24">
              <EditableButton
                variant="primary"
                size="xl"
                href={content.primaryButton?.href}
                icon={ArrowRight}
                editableId="hero-primary-button"
                onUpdate={(config) => updateContent('primaryButton', config)}
              >
                {content.primaryButton?.text}
              </EditableButton>
            </div>

            {/* Stats - Contained with hatching */}
            <div className="mt-24">
              <div className="border-l border-r border-border-primary">
                <div className="grid grid-cols-3 gap-px brutalist-hatch">
                  {(content.stats as StatItem[] | undefined)?.map((stat, index) => (
                    <div key={index} className="bg-bg-primary p-8">
                      <Stat value={stat.value} label={stat.label} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};

export default HeroSection;