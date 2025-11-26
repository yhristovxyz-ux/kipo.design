import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';
import EditableText from './atoms/EditableText';
import EditableImage from './atoms/EditableImage';
import Tag from './atoms/Tag';
import SectionWrapper from './cms/SectionWrapper';
import { Card, CardContent, Badge } from '@/design-system';

const Projects: React.FC = () => {
  const { sections, updateSection } = useCMS();
  const section = sections.find(s => s.id === 'projects');

  const updateContent = (field: string, value: any) => {
    updateSection('projects', { [field]: value });
  };

  const projects = [
    {
      id: 1,
      title: 'FinanceFlow Dashboard',
      description: 'A comprehensive financial management platform with real-time analytics and intuitive user experience.',
      image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['UX/UI Design', 'Web App', 'Dashboard'],
      year: '2024',
      client: 'FinTech Startup'
    },
    {
      id: 2,
      title: 'EcoShop E-commerce',
      description: 'Sustainable shopping platform with advanced filtering and seamless checkout experience.',
      image: 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['E-commerce', 'Mobile App', 'Branding'],
      year: '2024',
      client: 'Retail Brand'
    },
    {
      id: 3,
      title: 'MedConnect Telemedicine',
      description: 'Healthcare platform connecting patients with doctors through secure video consultations.',
      image: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Healthcare', 'Web Platform', 'Security'],
      year: '2023',
      client: 'Healthcare Provider'
    },
    {
      id: 4,
      title: 'EduTech Learning Platform',
      description: 'Interactive online learning platform with gamification and progress tracking.',
      image: 'https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['EdTech', 'Learning', 'Interactive'],
      year: '2023',
      client: 'Education Startup'
    },
    {
      id: 5,
      title: 'FoodieApp Mobile',
      description: 'Food delivery app with smart recommendations and seamless ordering experience.',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Mobile App', 'Food Tech', 'AI'],
      year: '2023',
      client: 'Food Delivery'
    },
    {
      id: 6,
      title: 'PropTech Platform',
      description: 'Real estate platform with advanced search, virtual tours, and property management.',
      image: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Real Estate', 'Web Platform', 'VR'],
      year: '2023',
      client: 'Real Estate'
    }
  ];

  return (
    <SectionWrapper sectionId="projects">
      <section id="work" className="brutalist-section bg-white border-t-2 border-zinc-900">
        <div className="brutalist-container">
          <div className="mb-16">
            <EditableText
              elementId="projects-headline"
              onUpdate={(value) => updateContent('headline', value)}
              className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6"
              as="h2"
            >
              Featured Projects
            </EditableText>
            <EditableText
              elementId="projects-description"
              onUpdate={(value) => updateContent('description', value)}
              className="text-lg text-zinc-600 max-w-2xl"
              as="p"
              multiline
            >
              Explore our latest work and see how we've helped businesses
              transform their digital presence.
            </EditableText>
          </div>

          <div className="brutalist-grid">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <EditableImage
                    src={project.image}
                    alt={project.title}
                    elementId={`project-image-${project.id}`}
                    onUpdate={(newSrc, newAlt) => {
                      console.log('Update project image:', newSrc, newAlt);
                    }}
                    className="w-full h-56 object-cover"
                  />
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4 font-mono text-xs text-zinc-500">
                    <EditableText
                      elementId={`project-year-${project.id}`}
                      onUpdate={(value) => console.log('Update year:', value)}
                      className="font-mono text-xs text-zinc-500"
                      as="span"
                    >
                      {project.year}
                    </EditableText>
                    <span>•</span>
                    <EditableText
                      elementId={`project-client-${project.id}`}
                      onUpdate={(value) => console.log('Update client:', value)}
                      className="font-mono text-xs text-zinc-500"
                      as="span"
                    >
                      {project.client}
                    </EditableText>
                  </div>

                  <EditableText
                    elementId={`project-title-${project.id}`}
                    onUpdate={(value) => console.log('Update title:', value)}
                    className="text-xl font-bold text-zinc-900 mb-3"
                    as="h3"
                  >
                    {project.title}
                  </EditableText>

                  <EditableText
                    elementId={`project-description-${project.id}`}
                    onUpdate={(value) => console.log('Update description:', value)}
                    className="text-zinc-600 mb-4 leading-relaxed text-sm"
                    as="p"
                    multiline
                  >
                    {project.description}
                  </EditableText>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border-2 border-zinc-900 text-zinc-900 px-6 py-3 font-bold hover:bg-zinc-900 hover:text-white transition-all duration-200 rounded-brutalist uppercase tracking-wide text-sm"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};

export default Projects;