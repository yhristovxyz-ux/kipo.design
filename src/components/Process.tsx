import React, { useState } from 'react';
import { MessageCircle, Lightbulb, Palette, Rocket } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';
import EditableText from './atoms/EditableText';
import EditableButton from './atoms/EditableButton';
import { ProcessStepEditPopup } from './cms/EditingPopups';
import SectionWrapper from './cms/SectionWrapper';
import { ProcessStep } from '@/design-system';

const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showStepEditPopup, setShowStepEditPopup] = useState(false);
  const [editingStepIndex, setEditingStepIndex] = useState(0);
  const { sections, updateSection, isEditMode } = useCMS();
  const section = sections.find(s => s.id === 'process');
  
  if (!section) return null;

  const { content } = section;

  const updateContent = (field: string, value: unknown) => {
    updateSection('process', { [field]: value });
  };

  const updateStep = (index: number, config: Record<string, unknown>) => {
    const newSteps = [...steps];
    const IconComponent = (LucideIcons as Record<string, React.ComponentType>)[config.icon as string] || MessageCircle;
    newSteps[index] = {
      ...newSteps[index],
      number: config.number as string,
      icon: IconComponent,
      title: config.title as string,
      description: config.description as string,
      duration: config.duration as string,
      deliverables: config.deliverables as string[],
      image: config.image as string,
      details: config.details as string
    };
    updateContent('steps', newSteps);
  };

  const handleStepClick = (index: number) => {
    if (isEditMode) {
      setEditingStepIndex(index);
      setShowStepEditPopup(true);
    } else {
      setActiveStep(index);
    }
  };

  const steps = [
    {
      number: '01',
      icon: MessageCircle,
      title: 'Discovery & Strategy',
      description: 'We start with a deep dive into your business goals, target audience, and project requirements through collaborative workshops.',
      duration: '1-2 weeks',
      deliverables: ['Project roadmap', 'User personas', 'Technical requirements'],
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      details: 'Our discovery phase involves stakeholder interviews, competitive analysis, and user research to establish a solid foundation for your project.'
    },
    {
      number: '02',
      icon: Lightbulb,
      title: 'Concept & Planning',
      description: 'Based on our research, we create wireframes, user flows, and initial concepts that align with your vision and objectives.',
      duration: '1-2 weeks',
      deliverables: ['Wireframes', 'User flows', 'Information architecture'],
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      details: 'We transform insights into actionable plans, creating detailed wireframes and user journeys that guide the design process.'
    },
    {
      number: '03',
      icon: Palette,
      title: 'Design & Development',
      description: 'We bring concepts to life with high-fidelity designs and robust development, ensuring every detail meets our quality standards.',
      duration: '3-6 weeks',
      deliverables: ['Visual designs', 'Interactive prototypes', 'Development'],
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      details: 'Our design and development teams work in parallel, creating pixel-perfect designs and clean, scalable code.'
    },
    {
      number: '04',
      icon: Rocket,
      title: 'Launch & Optimize',
      description: 'We deploy your project with thorough testing, provide training, and offer ongoing support to ensure continued success.',
      duration: '1-2 weeks',
      deliverables: ['Live deployment', 'Documentation', 'Training & support'],
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      details: 'We ensure a smooth launch with comprehensive testing, documentation, and ongoing support to maximize your success.'
    }
  ];

  return (
    <SectionWrapper sectionId="process">
      <section id="process" className="brutalist-section bg-bg-primary">
        <div className="brutalist-container">
          {/* Section header */}
          <div className="mb-16">
            <div className="util-label mb-4">003-PROCESS</div>
            <EditableText
              elementId="process-headline"
              onUpdate={(value) => updateContent('headline', value)}
              className="text-4xl md:text-5xl font-bold text-text-primary mb-6"
              as="h2"
            >
              {content.headline || 'Our Process'}
            </EditableText>
            
            <EditableText
              elementId="process-description"
              onUpdate={(value) => updateContent('description', value)}
              className="text-lg text-text-secondary max-w-2xl"
              as="p"
              multiline
            >
              {content.description || 'We\'ve streamlined our workflow to deliver exceptional results efficiently. Here\'s how we transform your ideas into reality.'}
            </EditableText>
          </div>

          {/* Full-width contained grid - matches Services section */}
          <div className="border-l border-r border-border-primary">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px brutalist-hatch">
              {steps.map((step, index) => (
                <ProcessStep
                  key={index}
                  step={step}
                  index={index}
                  isActive={activeStep === index}
                  onClick={() => handleStepClick(index)}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 border border-border-primary rounded-section p-8 bg-bg-secondary">
            <div className="max-w-2xl mx-auto text-center">
              <EditableText
                elementId="process-cta-headline"
                onUpdate={(value) => updateContent('ctaHeadline', value)}
                className="text-2xl font-bold text-text-primary mb-4"
                as="h3"
              >
                {content.ctaHeadline || 'Ready to Get Started?'}
              </EditableText>
              
              <EditableText
                elementId="process-cta-description"
                onUpdate={(value) => updateContent('ctaDescription', value)}
                className="text-text-secondary mb-6"
                as="p"
                multiline
              >
                {content.ctaDescription || 'Let\'s discuss your project and see how our proven process can help you achieve your goals.'}
              </EditableText>
              
              <EditableButton
                variant="primary"
                size="lg"
                href="#contact"
                icon={Rocket}
                editableId="process-cta-button"
                onUpdate={(config) => updateContent('ctaButton', config)}
              >
                {content.ctaButton?.text || 'Start Your Project'}
              </EditableButton>
            </div>
          </div>
        </div>
      </section>

      <ProcessStepEditPopup
        isOpen={showStepEditPopup}
        onClose={() => setShowStepEditPopup(false)}
        onSave={(config) => updateStep(editingStepIndex, config)}
        initialConfig={steps[editingStepIndex] ? {
          number: steps[editingStepIndex].number,
          icon: steps[editingStepIndex].icon.name || 'MessageCircle',
          title: steps[editingStepIndex].title,
          description: steps[editingStepIndex].description,
          duration: steps[editingStepIndex].duration,
          deliverables: steps[editingStepIndex].deliverables,
          image: steps[editingStepIndex].image,
          details: steps[editingStepIndex].details
        } : undefined}
      />
    </SectionWrapper>
  );
};

export default Process;