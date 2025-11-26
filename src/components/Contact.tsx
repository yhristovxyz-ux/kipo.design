import React, { useState } from 'react';
import { Send, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';
import EditableText from './atoms/EditableText';
import SectionWrapper from './cms/SectionWrapper';
import { Input, Button, Card, CardContent, ContactInfo } from '@/design-system';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });

  const { sections, updateSection } = useCMS();
  const section = sections.find(s => s.id === 'contact');

  const updateContent = (field: string, value: any) => {
    updateSection('contact', { [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', company: '', budget: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@kipo.design' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA' }
  ];

  return (
    <SectionWrapper sectionId="contact">
      <section id="contact" className="brutalist-section bg-bg-primary ">
        <div className="brutalist-container">
          <div className="mb-16">
            <EditableText
              elementId="contact-headline"
              onUpdate={(value) => updateContent('headline', value)}
              className="text-4xl md:text-5xl font-bold text-text-primary mb-6"
              as="h2"
            >
              Ready to Start Your Project?
            </EditableText>
            <EditableText
              elementId="contact-description"
              onUpdate={(value) => updateContent('description', value)}
              className="text-lg text-text-secondary max-w-2xl"
              as="p"
              multiline
            >
              Let's discuss how we can help you create exceptional digital experiences
              that drive real business results.
            </EditableText>
          </div>

        {/* Contained with borders */}
        <div className="border-l border-r border-border-primary px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <EditableText
                    elementId="contact-form-title"
                    onUpdate={(value) => updateContent('formTitle', value)}
                    className="text-2xl font-bold text-text-primary mb-6"
                    as="h3"
                  >
                    Tell us about your project
                  </EditableText>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contained with borders */}
        <div className="border-l border-r border-border-primary px-8 py-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">
                          Name *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">
                          Email *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

        {/* Contained with borders */}
        <div className="border-l border-r border-border-primary px-8 py-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">
                          Company
                        </label>
                        <Input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your company"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">
                          Budget Range
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border-primary rounded-brutalist focus:border-primary focus:outline-none transition-colors bg-bg-primary text-text-primary font-medium"
                        >
                          <option value="">Select budget range</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k-25k">$10,000 - $25,000</option>
                          <option value="25k-50k">$25,000 - $50,000</option>
                          <option value="50k+">$50,000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">
                        Project Details *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-border-primary rounded-brutalist focus:border-primary focus:outline-none transition-colors resize-none bg-bg-primary text-text-primary"
                        placeholder="Tell us about your project, goals, and timeline..."
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                    >
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-8">
                  <EditableText
                    elementId="contact-info-title"
                    onUpdate={(value) => updateContent('infoTitle', value)}
                    className="text-xl font-bold text-text-primary mb-6"
                    as="h3"
                  >
                    Get in Touch
                  </EditableText>

                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <ContactInfo
                        key={index}
                        icon={info.icon}
                        label={info.label}
                        value={info.value}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-bg-tertiary border-border-primary">
                <CardContent className="p-8">
                  <EditableText
                    elementId="contact-cta-title"
                    onUpdate={(value) => updateContent('ctaTitle', value)}
                    className="text-xl font-bold mb-4 text-white"
                    as="h3"
                  >
                    Free Consultation
                  </EditableText>
                  <EditableText
                    elementId="contact-cta-description"
                    onUpdate={(value) => updateContent('ctaDescription', value)}
                    className="text-text-secondary mb-6 text-sm"
                    as="p"
                    multiline
                  >
                    Schedule a 30-minute call to discuss your project and explore how we can help.
                  </EditableText>
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="w-full bg-bg-primary text-text-primary hover:bg-bg-secondary border-white"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book a Call
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};

export default Contact;