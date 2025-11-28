import React from 'react';
import { useCMS } from '../contexts/CMSContext';
import EditableText from './atoms/EditableText';
import SectionWrapper from './cms/SectionWrapper';
import { TestimonialCard } from '@/design-system';

const Testimonials: React.FC = () => {
  const { updateSection } = useCMS();

  const updateContent = (field: string, value: string) => {
    updateSection('testimonials', { [field]: value });
  };

  const testimonials = [
    {
      quote: "kipo.design transformed our entire digital presence. The team's attention to detail and user-centric approach resulted in a 300% increase in conversions.",
      author: "Sarah Johnson",
      role: "CEO",
      company: "TechFlow Solutions",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5
    },
    {
      quote: "Working with kipo.design was a game-changer. They didn't just design a website; they created a complete digital ecosystem that perfectly represents our brand.",
      author: "Michael Chen",
      role: "Founder",
      company: "InnovateNow",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5
    }
  ];

  const clients = [
    'TechFlow', 'InnovateNow', 'EcoShop', 'MedConnect', 'EduTech', 'PropTech'
  ];

  return (
    <SectionWrapper sectionId="testimonials">
      <section className="brutalist-section bg-bg-primary ">
        <div className="brutalist-container">
          <div className="text-center mb-16">
          <div className="util-label mb-4">007-TESTIMONIALS</div>
            <EditableText
              elementId="testimonials-headline"
              onUpdate={(value) => updateContent('headline', value)}
              className="text-3xl md:text-5xl font-bold text-text-primary mb-6"
              as="h2"
            >
              What Our Clients Say
            </EditableText>
            <EditableText
              elementId="testimonials-description"
              onUpdate={(value) => updateContent('description', value)}
              className="text-xl text-text-secondary max-w-3xl mx-auto"
              as="p"
              multiline
            >
              Don't just take our word for it. Here's what our clients have to say 
              about working with kipo.design.
            </EditableText>
          </div>

          {/* Testimonials - Full-width contained grid */}
          <div className="border-l border-r border-border-primary">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px brutalist-hatch">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Client Logos */}
          <div className="text-center">
            <EditableText
              elementId="testimonials-clients-title"
              onUpdate={(value) => updateContent('clientsTitle', value)}
              className="text-text-secondary mb-8 text-sm font-bold uppercase tracking-wider"
              as="p"
            >
              Trusted by innovative companies
            </EditableText>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {clients.map((client, index) => (
                <EditableText
                  key={index}
                  elementId={`client-${index}`}
                  onUpdate={(value) => console.log('Update client:', value)}
                  className="text-text-primary font-bold text-lg hover:text-primary transition-colors duration-200"
                  as="div"
                >
                  {client}
                </EditableText>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};

export default Testimonials;