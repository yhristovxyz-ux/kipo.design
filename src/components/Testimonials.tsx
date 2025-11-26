import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';
import EditableText from './atoms/EditableText';
import EditableImage from './atoms/EditableImage';
import SectionWrapper from './cms/SectionWrapper';
import { Card, CardContent, Avatar } from '@/design-system';

const Testimonials: React.FC = () => {
  const { sections, updateSection } = useCMS();
  const section = sections.find(s => s.id === 'testimonials');

  const updateContent = (field: string, value: any) => {
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
      <section className="brutalist-section bg-white border-t-2 border-zinc-900">
        <div className="brutalist-container">
          <div className="text-center mb-16">
            <EditableText
              elementId="testimonials-headline"
              onUpdate={(value) => updateContent('headline', value)}
              className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6"
              as="h2"
            >
              What Our Clients Say
            </EditableText>
            <EditableText
              elementId="testimonials-description"
              onUpdate={(value) => updateContent('description', value)}
              className="text-xl text-zinc-600 max-w-3xl mx-auto"
              as="p"
              multiline
            >
              Don't just take our word for it. Here's what our clients have to say 
              about working with kipo.design.
            </EditableText>
          </div>

          {/* Testimonials */}
          <div className="brutalist-grid">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="relative"
              >
                <CardContent className="p-8">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-brutalist flex items-center justify-center border-2 border-zinc-900">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <EditableText
                    elementId={`testimonial-quote-${index}`}
                    onUpdate={(value) => console.log('Update quote:', value)}
                    className="text-zinc-700 text-lg mb-6 leading-relaxed"
                    as="blockquote"
                    multiline
                  >
                    "{testimonial.quote}"
                  </EditableText>
                  
                  <div className="flex items-center">
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      size="md"
                      className="mr-4"
                    />
                    <div>
                      <EditableText
                        elementId={`testimonial-author-${index}`}
                        onUpdate={(value) => console.log('Update author:', value)}
                        className="font-bold text-zinc-900"
                        as="div"
                      >
                        {testimonial.author}
                      </EditableText>
                      <div className="text-zinc-600 text-sm">
                        <EditableText
                          elementId={`testimonial-role-${index}`}
                          onUpdate={(value) => console.log('Update role:', value)}
                          as="span"
                        >
                          {testimonial.role}
                        </EditableText>
                        , 
                        <EditableText
                          elementId={`testimonial-company-${index}`}
                          onUpdate={(value) => console.log('Update company:', value)}
                          as="span"
                        >
                          {testimonial.company}
                        </EditableText>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Client Logos */}
          <div className="text-center">
            <EditableText
              elementId="testimonials-clients-title"
              onUpdate={(value) => updateContent('clientsTitle', value)}
              className="text-zinc-600 mb-8 text-sm font-bold uppercase tracking-wider"
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
                  className="text-zinc-900 font-bold text-lg hover:text-primary transition-colors duration-200"
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