import React, { useState } from 'react';
import { Send, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';
import EditableText from './atoms/EditableText';
import SectionWrapper from './cms/SectionWrapper';

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
      <section id="contact" className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <EditableText
              elementId="contact-headline"
              onUpdate={(value) => updateContent('headline', value)}
              className="text-4xl md:text-5xl font-normal text-gray-900 mb-6"
              as="h2"
            >
              Ready to Start Your Project?
            </EditableText>
            <EditableText
              elementId="contact-description"
              onUpdate={(value) => updateContent('description', value)}
              className="text-lg text-gray-600 max-w-2xl"
              as="p"
              multiline
            >
              Let's discuss how we can help you create exceptional digital experiences
              that drive real business results.
            </EditableText>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border-2 border-gray-200 p-8">
                <EditableText
                  elementId="contact-form-title"
                  onUpdate={(value) => updateContent('formTitle', value)}
                  className="text-2xl font-medium text-gray-900 mb-6"
                  as="h3"
                >
                  Tell us about your project
                </EditableText>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
                        placeholder="Your company"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white px-8 py-4 font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    Send Message
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 p-8">
                <EditableText
                  elementId="contact-info-title"
                  onUpdate={(value) => updateContent('infoTitle', value)}
                  className="text-xl font-medium text-gray-900 mb-6"
                  as="h3"
                >
                  Get in Touch
                </EditableText>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 border border-gray-300 flex items-center justify-center flex-shrink-0 mt-1">
                        <info.icon className="w-4 h-4 text-gray-700" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 font-mono uppercase">{info.label}</div>
                        <EditableText
                          elementId={`contact-info-${index}`}
                          onUpdate={(value) => updateContent(`contactInfo${index}`, value)}
                          className="text-sm text-gray-900"
                          as="div"
                        >
                          {info.value}
                        </EditableText>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 text-white border-2 border-gray-900 p-8">
                <EditableText
                  elementId="contact-cta-title"
                  onUpdate={(value) => updateContent('ctaTitle', value)}
                  className="text-xl font-medium mb-4"
                  as="h3"
                >
                  Free Consultation
                </EditableText>
                <EditableText
                  elementId="contact-cta-description"
                  onUpdate={(value) => updateContent('ctaDescription', value)}
                  className="text-gray-300 mb-6 text-sm"
                  as="p"
                  multiline
                >
                  Schedule a 30-minute call to discuss your project and explore how we can help.
                </EditableText>
                <button className="w-full bg-white text-gray-900 px-6 py-3 font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Book a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};

export default Contact;