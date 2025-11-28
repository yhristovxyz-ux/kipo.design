import React from 'react';
import { Users, Target, Grid, Zap } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';
import EditableText from './atoms/EditableText';
import SectionWrapper from './cms/SectionWrapper';
import { ApproachCard } from '@/design-system';

const Approach: React.FC = () => {
  const { updateSection } = useCMS();

  const updateContent = (field: string, value: string) => {
    updateSection('approach', { [field]: value });
  };

  const principles = [
    {
      icon: Users,
      title: 'User-Centered',
      description: 'Every design decision is backed by user research and testing to ensure we create experiences that truly serve your audience.',
      stat: '100% User Tested'
    },
    {
      icon: Target,
      title: 'Conversion-Focused',
      description: 'We design with clear goals in mind, optimizing every interaction to drive the actions that matter most to your business.',
      stat: '3x Avg. Conversion'
    },
    {
      icon: Grid,
      title: 'Modular & Scalable',
      description: 'Our systematic approach ensures your design can grow with your business, maintaining consistency at every scale.',
      stat: '50+ Components'
    },
    {
      icon: Zap,
      title: 'Speed + Quality',
      description: 'Rapid iteration combined with meticulous attention to detail means you get exceptional results, fast.',
      stat: '2-4 Week Delivery'
    }
  ];

  return (
    <SectionWrapper sectionId="approach">
    <section className="brutalist-section bg-bg-secondary ">
      <div className="brutalist-container">
        <div className="text-center mb-16">
          <div className="util-label mb-4">005-APPROACH</div>
          <EditableText
            elementId="approach-headline"
            onUpdate={(value) => updateContent('headline', value)}
            className="text-3xl md:text-5xl font-bold text-text-primary mb-6"
            as="h2"
          >
            Design That Works Because It's
            <br />
            <span className="text-primary">Built On Understanding</span>
          </EditableText>
          
          <EditableText
            elementId="approach-description"
            onUpdate={(value) => updateContent('description', value)}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
            as="p"
            multiline
          >
            Our approach combines strategic thinking with creative execution, ensuring every project delivers measurable results.
          </EditableText>
        </div>

        {/* Full-width contained grid */}
        <div className="border-l border-r border-border-primary">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px brutalist-hatch">
            {principles.map((principle, index) => (
              <ApproachCard
                key={index}
                principle={principle}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    </SectionWrapper>
  );
};

export default Approach;