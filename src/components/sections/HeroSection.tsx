import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-200 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl animate-float"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
              <EditableText
                elementId="hero-badge"
                onUpdate={(value) => updateContent('badge', value)}
                as="span"
              >
                {content.badge}
              </EditableText>
            </div>

            {/* Main Headline */}
            <EditableText
              elementId="hero-headline"
              onUpdate={(value) => updateContent('headline', value)}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
              as="h1"
            >
              {content.headline}
              <br />
              <span className="text-indigo-600">
                <EditableText
                  elementId="hero-subheadline"
                  onUpdate={(value) => updateContent('subheadline', value)}
                  as="span"
                >
                  {content.subheadline}
                </EditableText>
              </span>
            </EditableText>

            {/* Description */}
            <EditableText
              elementId="hero-description"
              onUpdate={(value) => updateContent('description', value)}
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              as="p"
              multiline
            >
              {content.description}
            </EditableText>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <EditableButton
                variant="primary"
                size="lg"
                href={content.primaryButton?.href}
                icon={ArrowRight}
                editableId="hero-primary-button"
                onUpdate={(config) => updateContent('primaryButton', config)}
              >
                {content.primaryButton?.text}
              </EditableButton>
              
              <EditableButton
                variant="secondary"
                size="lg"
                href={content.secondaryButton?.href}
                icon={Play}
                iconPosition="left"
                editableId="hero-secondary-button"
                onUpdate={(config) => updateContent('secondaryButton', config)}
              >
                {content.secondaryButton?.text}
              </EditableButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-200">
              {content.stats?.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <EditableText
                    elementId={`hero-stat-value-${index}`}
                    onUpdate={(value) => {
                      const newStats = [...content.stats];
                      newStats[index] = { ...newStats[index], value };
                      updateContent('stats', newStats);
                    }}
                    className="text-3xl md:text-4xl font-bold text-gray-900"
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
                    className="text-gray-600 mt-2"
                    as="div"
                  >
                    {stat.label}
                  </EditableText>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};

export default HeroSection;