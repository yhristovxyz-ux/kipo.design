import React, { useState } from 'react';
import { Play, Users, Target, Zap, Award } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';
import EditableText from './atoms/EditableText';
import EditableImage from './atoms/EditableImage';
import { StudioContentEditPopup } from './cms/EditingPopups';
import SectionWrapper from './cms/SectionWrapper';

const Studio: React.FC = () => {
  const [activeContent, setActiveContent] = useState(0);
  const [showContentEditPopup, setShowContentEditPopup] = useState(false);
  const [editingContentIndex, setEditingContentIndex] = useState(0);
  const { sections, updateSection, isEditMode } = useCMS();
  const section = sections.find(s => s.id === 'studio');
  
  if (!section) return null;

  const { content } = section;

  const updateContent = (field: string, value: any) => {
    updateSection('studio', { [field]: value });
  };

  const updateStudioContent = (index: number, config: any) => {
    const newContent = [...studioContent];
    newContent[index] = {
      ...newContent[index],
      title: config.title,
      description: config.description,
      media: {
        type: config.mediaType,
        url: config.mediaUrl,
        alt: config.title
      },
      icon: (LucideIcons as any)[config.icon] || Target,
      stats: config.stats
    };
    // Update the content in CMS context
    updateContent('studioContent', newContent);
  };

  const handleContentClick = (index: number) => {
    if (isEditMode) {
      setEditingContentIndex(index);
      setShowContentEditPopup(true);
    } else {
      setActiveContent(index);
    }
  };
  
  const studioContent = [
    {
      id: 0,
      title: 'Our Design Philosophy',
      description: 'We believe great design starts with understanding. Every pixel, every interaction, every decision is rooted in user research and business strategy.',
      media: {
        type: 'video',
        url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Design process in action'
      },
      icon: Target,
      stats: '100+ User Interviews'
    },
    {
      id: 1,
      title: 'Collaborative Approach',
      description: 'We work as an extension of your team, bringing fresh perspectives while respecting your vision and business goals.',
      media: {
        type: 'video',
        url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Team collaboration'
      },
      icon: Users,
      stats: '98% Client Retention'
    },
    {
      id: 2,
      title: 'Rapid Prototyping',
      description: 'We move fast without breaking things. Our iterative approach means you see progress quickly and can provide feedback early.',
      media: {
        type: 'video',
        url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Rapid prototyping process'
      },
      icon: Zap,
      stats: '2-4 Week Delivery'
    },
    {
      id: 3,
      title: 'Award-Winning Results',
      description: 'Our work has been recognized by industry leaders and has helped our clients achieve measurable business growth.',
      media: {
        type: 'video',
        url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Award-winning designs'
      },
      icon: Award,
      stats: '15+ Design Awards'
    }
  ];

  return (
    <SectionWrapper sectionId="studio">
    <section id="studio" className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <EditableText
            elementId="studio-headline"
            onUpdate={(value) => updateContent('headline', value)}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            as="h2"
          >
            Meet the Studio Behind
            <br />
            <span className="text-indigo-600">kipo.design</span>
          </EditableText>
          
          <EditableText
            elementId="studio-description"
            onUpdate={(value) => updateContent('description', value)}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            as="p"
            multiline
          >
            Founded by Yordan Hristov, we're a boutique design studio that combines strategic thinking with creative execution to deliver exceptional results.
          </EditableText>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Content List */}
          <div className="space-y-4">
            {studioContent.map((content, index) => (
              <div
                key={content.id}
                onClick={() => handleContentClick(index)}
                className={`group cursor-pointer p-6 rounded-2xl transition-all duration-300 relative ${
                  activeContent === index
                    ? 'bg-white shadow-lg border-2 border-indigo-200'
                    : 'bg-white/50 hover:bg-white hover:shadow-md border-2 border-transparent'
                }`}
              >
                {isEditMode && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs">✎</span>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    activeContent === index
                      ? 'bg-indigo-600 text-white'
                      : 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200'
                  }`}>
                    <content.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-semibold transition-colors ${
                        activeContent === index ? 'text-indigo-600' : 'text-gray-900'
                      }`}>
                        {content.title}
                      </h3>
                      <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                        {content.stats}
                      </span>
                    </div>
                    
                    <p className={`text-gray-600 leading-relaxed transition-all duration-300 ${
                      activeContent === index ? 'opacity-100' : 'opacity-70'
                    }`}>
                      {content.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Media Display */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl overflow-hidden shadow-xl">
              <div className="relative w-full h-full">
                <EditableImage
                  src={studioContent[activeContent].media.url}
                  alt={studioContent[activeContent].media.alt}
                  elementId={`studio-media-${activeContent}`}
                  onUpdate={(newSrc, newAlt) => {
                    // Update the media content
                    console.log('Update studio media:', newSrc, newAlt);
                  }}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                
                {/* Video Play Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-8 h-8 text-indigo-600 ml-1" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg"></div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
              <div className="w-10 h-10 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Studio Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-gray-200">
          <div className="text-center">
            <EditableText
              elementId="studio-stat-1-value"
              onUpdate={(value) => updateContent('stat1Value', value)}
              className="text-3xl md:text-4xl font-bold text-gray-900"
              as="div"
            >
              5+
            </EditableText>
            <EditableText
              elementId="studio-stat-1-label"
              onUpdate={(value) => updateContent('stat1Label', value)}
              className="text-gray-600 mt-2"
              as="div"
            >
              Years Experience
            </EditableText>
          </div>
          <div className="text-center">
            <EditableText
              elementId="studio-stat-2-value"
              onUpdate={(value) => updateContent('stat2Value', value)}
              className="text-3xl md:text-4xl font-bold text-gray-900"
              as="div"
            >
              50+
            </EditableText>
            <EditableText
              elementId="studio-stat-2-label"
              onUpdate={(value) => updateContent('stat2Label', value)}
              className="text-gray-600 mt-2"
              as="div"
            >
              Happy Clients
            </EditableText>
          </div>
          <div className="text-center">
            <EditableText
              elementId="studio-stat-3-value"
              onUpdate={(value) => updateContent('stat3Value', value)}
              className="text-3xl md:text-4xl font-bold text-gray-900"
              as="div"
            >
              200+
            </EditableText>
            <EditableText
              elementId="studio-stat-3-label"
              onUpdate={(value) => updateContent('stat3Label', value)}
              className="text-gray-600 mt-2"
              as="div"
            >
              Projects Completed
            </EditableText>
          </div>
          <div className="text-center">
            <EditableText
              elementId="studio-stat-4-value"
              onUpdate={(value) => updateContent('stat4Value', value)}
              className="text-3xl md:text-4xl font-bold text-gray-900"
              as="div"
            >
              98%
            </EditableText>
            <EditableText
              elementId="studio-stat-4-label"
              onUpdate={(value) => updateContent('stat4Label', value)}
              className="text-gray-600 mt-2"
              as="div"
            >
              Client Satisfaction
            </EditableText>
          </div>
        </div>
      </div>

      <StudioContentEditPopup
        isOpen={showContentEditPopup}
        onClose={() => setShowContentEditPopup(false)}
        onSave={(config) => updateStudioContent(editingContentIndex, config)}
        initialConfig={studioContent[editingContentIndex] ? {
          title: studioContent[editingContentIndex].title,
          description: studioContent[editingContentIndex].description,
          mediaUrl: studioContent[editingContentIndex].media.url,
          mediaType: studioContent[editingContentIndex].media.type,
          icon: studioContent[editingContentIndex].icon.name || 'Target',
          stats: studioContent[editingContentIndex].stats
        } : undefined}
      />
    </section>
    </SectionWrapper>
  );
};

export default Studio;