import React from 'react';
import { Users, Target, Grid, Zap } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';
import EditableText from './atoms/EditableText';
import Icon from './atoms/Icon';
import SectionWrapper from './cms/SectionWrapper';
import { Card, CardContent } from '@/design-system';

const Approach: React.FC = () => {
  const { sections, updateSection } = useCMS();
  const section = sections.find(s => s.id === 'approach');
  
  if (!section) return null;

  const { content } = section;

  const updateContent = (field: string, value: any) => {
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
    <section className="brutalist-section bg-zinc-50 border-t-2 border-zinc-900">
      <div className="brutalist-container">
        <div className="text-center mb-16">
          <EditableText
            elementId="approach-headline"
            onUpdate={(value) => updateContent('headline', value)}
            className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6"
            as="h2"
          >
            Design That Works Because It's
            <br />
            <span className="text-primary">Built On Understanding</span>
          </EditableText>
          
          <EditableText
            elementId="approach-description"
            onUpdate={(value) => updateContent('description', value)}
            className="text-xl text-zinc-600 max-w-3xl mx-auto"
            as="p"
            multiline
          >
            Our approach combines strategic thinking with creative execution, ensuring every project delivers measurable results.
          </EditableText>
        </div>

        <div className="brutalist-grid-divided grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 rounded-none"
            >
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-white border-2 border-zinc-900 rounded-brutalist flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-colors">
                  <Icon
                    name={principle.icon.name || 'Users'}
                    size={24}
                    className="text-zinc-900 group-hover:text-white transition-colors"
                    editableId={`approach-icon-${index}`}
                  />
                </div>
                
                <EditableText
                  elementId={`approach-title-${index}`}
                  onUpdate={(value) => {
                    const newPrinciples = [...principles];
                    newPrinciples[index] = { ...newPrinciples[index], title: value };
                    updateContent('principles', newPrinciples);
                  }}
                  className="text-xl font-bold text-zinc-900 mb-4"
                  as="h3"
                >
                  {principle.title}
                </EditableText>
                
                <EditableText
                  elementId={`approach-description-${index}`}
                  onUpdate={(value) => {
                    const newPrinciples = [...principles];
                    newPrinciples[index] = { ...newPrinciples[index], description: value };
                    updateContent('principles', newPrinciples);
                  }}
                  className="text-zinc-600 mb-6 leading-relaxed"
                  as="p"
                  multiline
                >
                  {principle.description}
                </EditableText>
                
                <EditableText
                  elementId={`approach-stat-${index}`}
                  onUpdate={(value) => {
                    const newPrinciples = [...principles];
                    newPrinciples[index] = { ...newPrinciples[index], stat: value };
                    updateContent('principles', newPrinciples);
                  }}
                  className="text-sm font-bold text-zinc-900 bg-zinc-100 px-4 py-2 rounded-brutalist inline-block border-2 border-zinc-900 uppercase tracking-wide"
                  as="div"
                >
                  {principle.stat}
                </EditableText>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
    </SectionWrapper>
  );
};

export default Approach;