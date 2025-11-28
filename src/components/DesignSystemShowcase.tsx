import React from 'react';
import { ArrowRight, Mail, Phone, MapPin, MessageCircle, Users } from 'lucide-react';
import Button from './atoms/Button';
import { 
  Stat, 
  SectionHeader, 
  IconBox, 
  ContactInfo,
  ServiceCard,
  ProcessStep,
  ProjectCard,
  TestimonialCard,
  ApproachCard,
  Isocon
} from '../design-system';

const DesignSystemShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Header */}
      <header className="border-b border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Design System</h1>
              <p className="util-label mt-1">Utilitarian / Technical Blueprint</p>
            </div>
            <a href="/" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
              ← Back to Site
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Colors */}
        <section className="mb-16">
          <div className="util-label mb-4">001-COLORS</div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">Color Palette</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Backgrounds */}
            <div className="brutalist-block">
              <h3 className="util-label mb-4">Backgrounds</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 border border-[var(--color-border-primary)]" style={{backgroundColor: '#FAFAF8'}}></div>
                  <div>
                    <div className="text-sm font-mono">#FAFAF8</div>
                    <div className="text-xs text-[var(--color-text-tertiary)]">Primary</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 border border-[var(--color-border-primary)]" style={{backgroundColor: '#F5F5F5'}}></div>
                  <div>
                    <div className="text-sm font-mono">#F5F5F5</div>
                    <div className="text-xs text-[var(--color-text-tertiary)]">Secondary</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 border border-[var(--color-border-primary)]" style={{backgroundColor: '#F0F0ED'}}></div>
                  <div>
                    <div className="text-sm font-mono">#F0F0ED</div>
                    <div className="text-xs text-[var(--color-text-tertiary)]">Tertiary</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="brutalist-block">
              <h3 className="util-label mb-4">Text</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 border border-[var(--color-border-primary)]" style={{backgroundColor: '#1A1A1A'}}></div>
                  <div>
                    <div className="text-sm font-mono">#1A1A1A</div>
                    <div className="text-xs text-[var(--color-text-tertiary)]">Primary</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 border border-[var(--color-border-primary)]" style={{backgroundColor: '#525252'}}></div>
                  <div>
                    <div className="text-sm font-mono">#525252</div>
                    <div className="text-xs text-[var(--color-text-tertiary)]">Secondary</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 border border-[var(--color-border-primary)]" style={{backgroundColor: '#737373'}}></div>
                  <div>
                    <div className="text-sm font-mono">#737373</div>
                    <div className="text-xs text-[var(--color-text-tertiary)]">Tertiary</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent & Functional */}
            <div className="brutalist-block">
              <h3 className="util-label mb-4">Accent & Functional</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 border border-[var(--color-border-primary)]" style={{backgroundColor: '#0066FF'}}></div>
                  <div>
                    <div className="text-sm font-mono">#0066FF</div>
                    <div className="text-xs text-[var(--color-text-tertiary)]">Accent</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 border border-[var(--color-border-primary)]" style={{backgroundColor: '#059669'}}></div>
                  <div>
                    <div className="text-sm font-mono">#059669</div>
                    <div className="text-xs text-[var(--color-text-tertiary)]">Success</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 border border-[var(--color-border-primary)]" style={{backgroundColor: '#DC2626'}}></div>
                  <div>
                    <div className="text-sm font-mono">#DC2626</div>
                    <div className="text-xs text-[var(--color-text-tertiary)]">Error</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="util-divider"></div>

        {/* Typography */}
        <section className="mb-16">
          <div className="util-label mb-4">002-TYPOGRAPHY</div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">Typography</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="brutalist-block">
              <h3 className="util-label mb-4">Headings</h3>
              <div className="space-y-4">
                <div>
                  <h1 className="text-5xl font-bold text-[var(--color-text-primary)]">Heading 1</h1>
                  <p className="util-timestamp mt-1">56px / 3.5rem</p>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-[var(--color-text-primary)]">Heading 2</h2>
                  <p className="util-timestamp mt-1">48px / 3rem</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[var(--color-text-primary)]">Heading 3</h3>
                  <p className="util-timestamp mt-1">40px / 2.5rem</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[var(--color-text-primary)]">Heading 4</h4>
                  <p className="util-timestamp mt-1">32px / 2rem</p>
                </div>
              </div>
            </div>

            <div className="brutalist-block">
              <h3 className="util-label mb-4">Body Text</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-lg text-[var(--color-text-primary)]">Large body text for emphasis</p>
                  <p className="util-timestamp mt-1">18px / 1.125rem</p>
                </div>
                <div>
                  <p className="text-base text-[var(--color-text-primary)]">Base body text for general content</p>
                  <p className="util-timestamp mt-1">15px / 0.9375rem</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)]">Small text for secondary information</p>
                  <p className="util-timestamp mt-1">13px / 0.8125rem</p>
                </div>
                <div>
                  <p className="util-label">Technical Label</p>
                  <p className="util-timestamp mt-1">11px / 0.6875rem - Monospace</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="util-divider"></div>

        {/* Buttons */}
        <section className="mb-16">
          <div className="util-label mb-4">003-BUTTONS</div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">Buttons</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="brutalist-block">
              <h3 className="util-label mb-4">Variants</h3>
              <div className="space-y-4">
                <div>
                  <Button variant="primary" size="md">Primary Button</Button>
                  <p className="util-timestamp mt-2">Electric blue background</p>
                </div>
                <div>
                  <Button variant="secondary" size="md">Secondary Button</Button>
                  <p className="util-timestamp mt-2">Paper background with border</p>
                </div>
                <div>
                  <Button variant="outline" size="md">Outline Button</Button>
                  <p className="util-timestamp mt-2">Transparent with border</p>
                </div>
              </div>
            </div>

            <div className="brutalist-block">
              <h3 className="util-label mb-4">Sizes</h3>
              <div className="space-y-4">
                <div>
                  <Button variant="primary" size="lg" icon={ArrowRight}>Large Button</Button>
                  <p className="util-timestamp mt-2">px-8 py-4 text-lg</p>
                </div>
                <div>
                  <Button variant="primary" size="md" icon={ArrowRight}>Medium Button</Button>
                  <p className="util-timestamp mt-2">px-6 py-3 text-base</p>
                </div>
                <div>
                  <Button variant="primary" size="sm" icon={ArrowRight}>Small Button</Button>
                  <p className="util-timestamp mt-2">px-4 py-2 text-sm</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="util-divider"></div>

        {/* Spacing */}
        <section className="mb-16">
          <div className="util-label mb-4">004-SPACING</div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">Spacing Scale</h2>
          
          <div className="brutalist-block">
            <h3 className="util-label mb-4">8px Base Grid</h3>
            <div className="space-y-3">
              {[
                { name: 'space-1', value: '8px', rem: '0.5rem' },
                { name: 'space-2', value: '16px', rem: '1rem' },
                { name: 'space-3', value: '24px', rem: '1.5rem' },
                { name: 'space-4', value: '32px', rem: '2rem' },
                { name: 'space-6', value: '48px', rem: '3rem' },
                { name: 'space-8', value: '64px', rem: '4rem' },
                { name: 'space-12', value: '96px', rem: '6rem' },
              ].map((space) => (
                <div key={space.name} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-mono text-[var(--color-text-secondary)]">{space.name}</div>
                  <div className="h-8 bg-[var(--color-accent-primary)] border border-[var(--color-border-primary)]" style={{width: space.value}}></div>
                  <div className="text-sm text-[var(--color-text-tertiary)]">{space.value} / {space.rem}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="util-divider"></div>

        {/* Borders & Containers */}
        <section className="mb-16">
          <div className="util-label mb-4">005-BORDERS</div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">Borders & Containers</h2>
          
          <div className="space-y-6">
            <div className="brutalist-block">
              <h3 className="util-label mb-4">Border Colors (Muted)</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 border-2 border-[var(--color-border-primary)]"></div>
                  <div>
                    <div className="text-sm font-mono">#D4D4D4</div>
                    <div className="text-xs text-[var(--color-text-tertiary)]">Primary Border</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 border-2 border-[var(--color-border-secondary)]"></div>
                  <div>
                    <div className="text-sm font-mono">#E5E5E5</div>
                    <div className="text-xs text-[var(--color-text-tertiary)]">Secondary Border</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="brutalist-block">
                <h3 className="util-label mb-4">Section Radius (1px)</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">Large sections and containers</p>
                <div className="brutalist-block bg-[var(--color-bg-secondary)]">
                  <p className="text-[var(--color-text-primary)]">1px border radius for subtle rounding</p>
                </div>
              </div>

              <div className="brutalist-block">
                <h3 className="util-label mb-4">Interactive Radius (6px)</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">Buttons, inputs, chips</p>
                <div className="brutalist-element p-4 bg-[var(--color-bg-secondary)]">
                  <p className="text-[var(--color-text-primary)]">6px border radius for interactive elements</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="util-divider"></div>

        {/* Patterns */}
        <section className="mb-16">
          <div className="util-label mb-4">006-PATTERNS</div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">Background Patterns</h2>
          
          <div className="brutalist-block">
            <h3 className="util-label mb-4">Diagonal Hatching</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">Used for technical zones like footers</p>
            <div className="brutalist-hatch border border-[var(--color-border-primary)] p-8 rounded-section">
              <p className="text-[var(--color-text-primary)]">Content with hatched background pattern</p>
              <p className="util-timestamp mt-2">45deg diagonal stripes, 4% opacity</p>
            </div>
          </div>
        </section>

        <div className="util-divider"></div>

        {/* New Components */}
        <section className="mb-16">
          <div className="util-label mb-4">007-NEW-COMPONENTS</div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">New Components</h2>
          
          <div className="space-y-8">
            {/* Stat Component */}
            <div className="brutalist-block">
              <h3 className="util-label mb-4">Stat Component</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">Display metrics and statistics</p>
              <div className="grid grid-cols-3 gap-6">
                <Stat value="100+" label="Projects" />
                <Stat value="50+" label="Clients" />
                <Stat value="5yrs" label="Experience" />
              </div>
            </div>

            {/* SectionHeader Component */}
            <div className="brutalist-block">
              <h3 className="util-label mb-4">Section Header</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">Consistent section headers</p>
              <SectionHeader 
                label="001-EXAMPLE" 
                title="Section Title" 
                description="Optional description text for the section"
              />
            </div>

            {/* IconBox Component */}
            <div className="brutalist-block">
              <h3 className="util-label mb-4">Icon Box</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">Icon containers with borders</p>
              <div className="flex gap-4">
                <IconBox icon="Mail" size="sm" variant="default" />
                <IconBox icon="Phone" size="md" variant="default" />
                <IconBox icon="MapPin" size="lg" variant="default" />
                <IconBox icon="Check" size="md" variant="primary" />
              </div>
            </div>

            {/* ContactInfo Component */}
            <div className="brutalist-block">
              <h3 className="util-label mb-4">Contact Info</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">Contact information with icons</p>
              <div className="space-y-4">
                <ContactInfo icon={Mail} label="Email" value="hello@kipo.design" />
                <ContactInfo icon={Phone} label="Phone" value="+1 (555) 123-4567" />
                <ContactInfo icon={MapPin} label="Location" value="San Francisco, CA" />
              </div>
            </div>
          </div>
        </section>

        <div className="util-divider"></div>

        {/* Utility Classes */}
        <section className="mb-16">
          <div className="util-label mb-4">008-UTILITIES</div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">Utility Classes</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="brutalist-block">
              <h3 className="util-label mb-4">Text Utilities</h3>
              <div className="space-y-3">
                <div>
                  <p className="util-label">.util-label</p>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-1">Technical monospace label</p>
                </div>
                <div>
                  <p className="util-timestamp">.util-timestamp</p>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-1">Monospace metadata</p>
                </div>
              </div>
            </div>

            <div className="brutalist-block">
              <h3 className="util-label mb-4">Layout Utilities</h3>
              <div className="space-y-3">
                <div>
                  <code className="text-xs font-mono text-[var(--color-text-primary)]">.util-container</code>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-1">Bordered container</p>
                </div>
                <div>
                  <code className="text-xs font-mono text-[var(--color-text-primary)]">.brutalist-block</code>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-1">Bento grid item</p>
                </div>
                <div>
                  <code className="text-xs font-mono text-[var(--color-text-primary)]">.util-divider</code>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-1">Edge-to-edge separator</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Isocons Section */}
      <section className="brutalist-section bg-bg-primary">
        <div className="brutalist-container">
          <SectionHeader
            label="ISOCONS"
            title="Isometric Icons"
            description="Colorful isometric icons for visual interest"
          />

          <div className="border-l border-r border-border-primary">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-px brutalist-hatch">
              {['palette', 'code', 'layers', 'smartphone', 'messageCircle', 'lightbulb', 'rocket', 'users', 'target', 'grid', 'zap', 'briefcase'].map((icon) => (
                <div key={icon} className="bg-bg-primary p-8 border-t border-border-primary flex flex-col items-center justify-center">
                  <Isocon name={icon} size={96} />
                  <p className="text-xs text-text-tertiary mt-4 font-mono">{icon}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Card Components Section */}
      <section className="brutalist-section bg-bg-primary">
        <div className="brutalist-container">
          <SectionHeader
            label="CARD COMPONENTS"
            title="Section Cards"
            description="Reusable card components with isometric icons"
          />

          {/* Service Card */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Service Card</h3>
            <div className="border-l border-r border-border-primary">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px brutalist-hatch">
                <ServiceCard
                  service={{
                    icon: { name: 'Palette' },
                    title: 'UX/UI Design',
                    description: 'User-centered design that combines beautiful aesthetics with intuitive functionality.',
                    features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design']
                  }}
                  index={0}
                  onUpdate={() => {}}
                />
              </div>
            </div>
          </div>

          {/* Process Step */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Process Step</h3>
            <div className="border-l border-r border-border-primary">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-px brutalist-hatch">
                <ProcessStep
                  step={{
                    number: '01',
                    icon: MessageCircle,
                    title: 'Discovery',
                    description: 'Understanding your needs and goals',
                    duration: '1-2 weeks',
                    deliverables: ['Research Report', 'Strategy Document'],
                    details: 'Deep dive into requirements'
                  }}
                  index={0}
                  isActive={false}
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>

          {/* Project Card */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Project Card</h3>
            <div className="border-l border-r border-border-primary">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px brutalist-hatch">
                <ProjectCard
                  project={{
                    id: 1,
                    title: 'FinanceFlow Dashboard',
                    description: 'Financial management platform with real-time analytics',
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
                    tags: ['UX/UI', 'Web App', 'Dashboard'],
                    year: '2024',
                    client: 'FinTech'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Testimonial Card</h3>
            <div className="border-l border-r border-border-primary">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px brutalist-hatch">
                <TestimonialCard
                  testimonial={{
                    quote: 'Working with this team was an absolute pleasure. They delivered beyond our expectations.',
                    author: 'John Doe',
                    role: 'CEO',
                    company: 'Tech Corp',
                    avatar: 'https://i.pravatar.cc/150?img=1',
                    rating: 5
                  }}
                  index={0}
                />
              </div>
            </div>
          </div>

          {/* Approach Card */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Approach Card</h3>
            <div className="border-l border-r border-border-primary">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-px brutalist-hatch">
                <ApproachCard
                  principle={{
                    icon: Users,
                    title: 'User-Centered',
                    description: 'We put users at the heart of everything we design',
                    stat: '98% Satisfaction'
                  }}
                  index={0}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="util-hatch bg-[var(--color-bg-tertiary)] border-t border-[var(--color-border-primary)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="util-timestamp">Design System v1.0 - Utilitarian / Technical Blueprint</p>
        </div>
      </footer>
    </div>
  );
};

export default DesignSystemShowcase;
