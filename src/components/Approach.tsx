import React from 'react';
import { Users, Target, Grid, Zap } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';
import EditableText from './atoms/EditableText';
import Icon from './atoms/Icon';
import SectionWrapper from './cms/SectionWrapper';

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
    <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <EditableText
            elementId="approach-headline"
            onUpdate={(value) => updateContent('headline', value)}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            as="h2"
          >
            Design That Works Because It's
            <br />
            <span className="text-indigo-600">Built On Understanding</span>
          </EditableText>
          
          <EditableText
            elementId="approach-description"
            onUpdate={(value) => updateContent('description', value)}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            as="p"
            multiline
          >
            Our approach combines strategic thinking with creative execution, ensuring every project delivers measurable results.
          </EditableText>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-y-12 translate-x-12 opacity-50 group-hover:opacity-75 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors">
                  <Icon
                    name={principle.icon.name || 'Users'}
                    size={24}
                    className="text-indigo-600"
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
                  className="text-xl font-semibold text-gray-900 mb-4"
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
                  className="text-gray-600 mb-6 leading-relaxed"
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
                  className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full inline-block"
                  as="div"
                >
                  {principle.stat}
                </EditableText>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </SectionWrapper>
  );
};

export default Approach;