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
import EditableText from '../atoms/EditableText';
import EditableButton from '../atoms/EditableButton';
import SectionWrapper from '../cms/SectionWrapper';

const HeroSection: React.FC = () => {
  const { sections, updateSection } = useCMS();
  const section = sections.find(s => s.id === 'hero');
  
  if (!section) return null;

  const { content } = section;

  const updateContent = (field: string, value: any) => {
    updateSection('hero', { [field]: value });
  };

  return (
    <SectionWrapper sectionId="hero">
      <section className="relative min-h-screen flex items-center justify-center bg-white pt-24">
        <div className="brutalist-container w-full">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge - Brutalist style */}
            <div className="inline-flex items-center gap-2 mb-12 border-2 border-zinc-900 rounded-brutalist px-4 py-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <EditableText
                elementId="hero-badge"
                onUpdate={(value) => updateContent('badge', value)}
                as="span"
                className="text-xs font-bold uppercase tracking-wider text-zinc-900"
              >
                {content.badge}
              </EditableText>
            </div>

            {/* Main Headline - Large, Bold, Geometric */}
            <EditableText
              elementId="hero-headline"
              onUpdate={(value) => updateContent('headline', value)}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 leading-[1.1] mb-4"
              as="h1"
            >
              {content.headline}
            </EditableText>
            
            <EditableText
              elementId="hero-subheadline"
              onUpdate={(value) => updateContent('subheadline', value)}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 leading-[1.1] mb-8"
              as="h1"
            >
              {content.subheadline}
            </EditableText>

            {/* Description */}
            <EditableText
              elementId="hero-description"
              onUpdate={(value) => updateContent('description', value)}
              className="text-lg md:text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed mb-12"
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

            {/* Stats - Brutalist Grid */}
            <div className="mt-24 pt-12 border-t-2 border-zinc-900">
              <div className="brutalist-grid-divided grid-cols-3">
                {content.stats?.map((stat: any, index: number) => (
                  <div key={index} className="bg-white p-8 text-center">
                    <EditableText
                      elementId={`hero-stat-value-${index}`}
                      onUpdate={(value) => {
                        const newStats = [...content.stats];
                        newStats[index] = { ...newStats[index], value };
                        updateContent('stats', newStats);
                      }}
                      className="text-3xl md:text-4xl font-bold font-mono text-zinc-900 mb-2"
                      as="div"
                    >
                      {stat.value}
                    </EditableText>
                    <EditableText
                      elementId={`hero-stat-label-${index}`}
                      onUpdate={(value) => {
                        const newStats = [...content.stats];
                        newStats[index] = { ...newStats[index], label: value };
                        updateContent('stats', newStats);
                      }}
                      className="text-xs font-bold uppercase tracking-wider text-zinc-500"
                      as="div"
                    >
                      {stat.label}
                    </EditableText>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};

export default HeroSection;