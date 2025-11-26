import React, { useState } from 'react';
import { MessageCircle, Lightbulb, Palette, Rocket } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';
import EditableText from './atoms/EditableText';
import EditableImage from './atoms/EditableImage';
import EditableButton from './atoms/EditableButton';
import { ProcessStepEditPopup } from './cms/EditingPopups';
import SectionWrapper from './cms/SectionWrapper';

const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showStepEditPopup, setShowStepEditPopup] = useState(false);
  const [editingStepIndex, setEditingStepIndex] = useState(0);
  const { sections, updateSection, isEditMode } = useCMS();
  const section = sections.find(s => s.id === 'process');
  
  if (!section) return null;

  const { content } = section;

  const updateContent = (field: string, value: any) => {
    updateSection('process', { [field]: value });
  };

  const updateStep = (index: number, config: any) => {
    const newSteps = [...steps];
    newSteps[index] = {
      ...newSteps[index],
      number: config.number,
      icon: (LucideIcons as any)[config.icon] || MessageCircle,
      title: config.title,
      description: config.description,
      duration: config.duration,
      deliverables: config.deliverables,
      image: config.image,
      details: config.details
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
    <section id="process" className="brutalist-section bg-bg-primary ">
      <div className="brutalist-container">
        <div className="text-center mb-16">
          <div className="util-label mb-4">003-PROCESS</div>
          <EditableText
            elementId="process-headline"
            onUpdate={(value) => updateContent('headline', value)}
            className="text-3xl md:text-5xl font-bold text-text-primary mb-6"
            as="h2"
          >
            {content.headline || 'Our Simple Process'}
          </EditableText>
          
          <EditableText
            elementId="process-description"
            onUpdate={(value) => updateContent('description', value)}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
            as="p"
            multiline
          >
            {content.description || 'We\'ve streamlined our workflow to deliver exceptional results efficiently. Here\'s how we transform your ideas into reality.'}
          </EditableText>
        </div>

        {/* Contained with borders */}
        <div className="border-l border-r border-border-primary px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start py-8">
            {/* Interactive Steps List */}
            <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => handleStepClick(index)}
                className={`group cursor-pointer transition-all duration-300 relative ${
                  activeStep === index
                    ? 'bg-primary/5 border border-primary'
                    : 'bg-bg-primary hover:bg-bg-secondary border border-border-primary'
                } rounded-brutalist p-6`}
              >
                {isEditMode && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-brutalist flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-border-primary">
                    <span className="text-white text-xs">✎</span>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  {/* Step Number */}
                  <div className={`w-12 h-12 rounded-brutalist flex items-center justify-center font-bold text-lg transition-colors border ${
                    activeStep === index
                      ? 'bg-primary text-white border-primary'
                      : 'bg-bg-primary text-text-primary border-border-primary group-hover:bg-bg-secondary'
                  }`}>
                    {step.number}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-bold transition-colors ${
                        activeStep === index ? 'text-primary' : 'text-text-primary'
                      }`}>
                        {step.title}
                      </h3>
                      <span className="text-sm font-bold text-text-primary bg-bg-secondary px-3 py-1 rounded-brutalist border border-border-primary uppercase tracking-wide">
                        {step.duration}
                      </span>
                    </div>
                    
                    <p className={`text-text-secondary leading-relaxed mb-3 transition-all duration-300 ${
                      activeStep === index ? 'opacity-100' : 'opacity-70'
                    }`}>
                      {step.description}
                    </p>
                    
                    {activeStep === index && (
                      <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                        <p className="text-sm text-text-secondary italic">
                          {step.details}
                        </p>
                        <div>
                          <h4 className="text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">Key Deliverables:</h4>
                          <div className="flex flex-wrap gap-2">
                            {step.deliverables.map((deliverable, idx) => (
                              <span key={idx} className="text-xs bg-bg-primary text-text-primary px-3 py-1 rounded-brutalist border border-border-primary font-bold">
                                {deliverable}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Display */}
          <div className="lg:sticky lg:top-8">
            <div className="aspect-square bg-bg-secondary border border-border-primary rounded-brutalist-sm overflow-hidden">
              <EditableImage
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                elementId={`process-step-image-${activeStep}`}
                onUpdate={(newSrc, newAlt) => {
                  // Update the step image
                  console.log('Update step image:', newSrc, newAlt);
                }}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            
            {/* Step Info Card */}
            <div className="mt-6 bg-bg-primary border border-border-primary rounded-brutalist p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary border border-border-primary rounded-brutalist flex items-center justify-center">
                  {React.createElement(steps[activeStep].icon, { className: "w-6 h-6 text-white" })}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{steps[activeStep].title}</h3>
                  <p className="text-sm text-text-secondary font-bold">{steps[activeStep].duration}</p>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {steps[activeStep].details}
              </p>
            </div>
          </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-bg-secondary border border-border-primary rounded-brutalist p-8">
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
              className="text-text-secondary mb-6 max-w-2xl mx-auto"
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
    </section>
    </SectionWrapper>
  );
};

export default Process;