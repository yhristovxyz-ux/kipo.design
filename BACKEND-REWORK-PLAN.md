# Backend Rework Implementation Plan

## Overview

Rework the CMS backend to meet requirements:
1. Inline editable sections with SVG text input for icons
2. Section reordering (already works, needs persistence)
3. Projects with inner pages and CRUD operations

## Implementation Phases

### Phase 1: Data Layer & Types

**Files to Create:**
- `src/types/cms.types.ts` - All CMS type definitions
- `src/types/project.types.ts` - Project-specific types
- `src/services/storage.service.ts` - LocalStorage persistence
- `src/services/project.service.ts` - Project CRUD operations

**Tasks:**
1. Define proper TypeScript interfaces
2. Add Zod validation schemas
3. Implement LocalStorage service
4. Add project management to CMSContext

### Phase 2: SVG Icon Editor

**Files to Create:**
- `src/design-system/components/editors/SVGEditor.tsx`
- `src/design-system/components/modals/Modal.tsx`
- `src/design-system/components/forms/Textarea.tsx`

**Tasks:**
1. Create Modal component in design system
2. Create Textarea component with validation
3. Build SVGEditor with preview
4. Update icon configuration to support SVG text

### Phase 3: Component Refactoring

**Files to Refactor:**
- Split `src/components/cms/EditingPopups.tsx` into:
  - `src/components/cms/popups/ButtonEditPopup.tsx`
  - `src/components/cms/popups/ServiceCardEditPopup.tsx`
  - `src/components/cms/popups/ProcessStepEditPopup.tsx`
  - `src/components/cms/popups/IconSelector.tsx`

**Tasks:**
1. Extract each popup into separate file
2. Use design system components
3. Add proper validation
4. Implement SVG support in IconSelector

### Phase 4: Project Management

**Files to Create:**
- `src/components/projects/ProjectEditor.tsx`
- `src/components/projects/ProjectForm.tsx`
- `src/components/projects/ProjectDetail.tsx`
- `src/components/projects/ProjectList.tsx`

**Files to Update:**
- `src/components/Projects.tsx` - Use new components
- `src/contexts/CMSContext.tsx` - Add project management

**Tasks:**
1. Build ProjectForm with validation
2. Create ProjectEditor with CRUD
3. Add project management to context
4. Update Projects component

### Phase 5: Project Inner Pages

**Files to Create:**
- `src/components/projects/ProjectDetailPage.tsx`
- `src/components/projects/ProjectContentEditor.tsx`
- `src/App.tsx` - Add routing

**Tasks:**
1. Add react-router routes for projects
2. Create project detail page component
3. Build content editor for inner pages
4. Add navigation between list/detail

## Detailed Implementation

### 1. Type Definitions

```typescript
// src/types/cms.types.ts
export interface IconConfig {
  type: 'lucide' | 'svg';
  value: string;
}

export interface SectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
  content: Record<string, unknown>;
}
```

### 2. Project Types

```typescript
// src/types/project.types.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  image?: string;
  icon?: IconConfig;
  tags: string[];
  year: string;
  client: string;
  content?: ProjectContent;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectContent {
  overview: string;
  challenge: string;
  solution: string;
  results: string;
  gallery: MediaItem[];
}
```

### 3. Storage Service

```typescript
// src/services/storage.service.ts
export class StorageService {
  private static instance: StorageService;
  
  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }
  
  save<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  load<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}
```

### 4. SVG Editor Component

```typescript
// src/design-system/components/editors/SVGEditor.tsx
interface SVGEditorProps {
  value: string;
  onChange: (svg: string) => void;
  onClose: () => void;
}

export const SVGEditor: React.FC<SVGEditorProps> = ({
  value,
  onChange,
  onClose
}) => {
  const [svg, setSvg] = useState(value);
  const [error, setError] = useState('');
  
  const validateSVG = (text: string): boolean => {
    // Validation logic
    return text.includes('<svg');
  };
  
  return (
    <Modal onClose={onClose}>
      <Textarea
        value={svg}
        onChange={(e) => setSvg(e.target.value)}
        error={error}
      />
      <div>Preview: {/* SVG preview */}</div>
      <Button onClick={() => onChange(svg)}>Save</Button>
    </Modal>
  );
};
```

### 5. Project CRUD

```typescript
// src/services/project.service.ts
export class ProjectService {
  private storage = StorageService.getInstance();
  private key = 'projects';
  
  getAll(): Project[] {
    return this.storage.load<Project[]>(this.key) || [];
  }
  
  getById(id: string): Project | null {
    const projects = this.getAll();
    return projects.find(p => p.id === id) || null;
  }
  
  create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
    const newProject: Project = {
      ...project,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const projects = this.getAll();
    projects.push(newProject);
    this.storage.save(this.key, projects);
    
    return newProject;
  }
  
  update(id: string, updates: Partial<Project>): Project | null {
    const projects = this.getAll();
    const index = projects.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    projects[index] = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.storage.save(this.key, projects);
    return projects[index];
  }
  
  delete(id: string): boolean {
    const projects = this.getAll();
    const filtered = projects.filter(p => p.id !== id);
    
    if (filtered.length === projects.length) return false;
    
    this.storage.save(this.key, filtered);
    return true;
  }
}
```

## File Structure After Rework

```
src/
├── types/
│   ├── cms.types.ts
│   ├── project.types.ts
│   └── index.ts
├── services/
│   ├── storage.service.ts
│   ├── project.service.ts
│   └── index.ts
├── contexts/
│   └── CMSContext.tsx (updated)
├── components/
│   ├── projects/
│   │   ├── ProjectList.tsx
│   │   ├── ProjectEditor.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── ProjectContentEditor.tsx
│   │   └── index.ts
│   ├── cms/
│   │   ├── popups/
│   │   │   ├── ButtonEditPopup.tsx
│   │   │   ├── ServiceCardEditPopup.tsx
│   │   │   ├── ProcessStepEditPopup.tsx
│   │   │   ├── IconSelector.tsx
│   │   │   └── index.ts
│   │   ├── SectionManager.tsx
│   │   ├── EditingToolbar.tsx
│   │   └── SectionWrapper.tsx
│   └── Projects.tsx (refactored)
└── design-system/
    └── components/
        ├── editors/
        │   ├── SVGEditor.tsx
        │   └── index.ts
        ├── modals/
        │   ├── Modal.tsx
        │   └── index.ts
        └── forms/
            ├── Textarea.tsx
            └── index.ts
```

## Next Steps

Ready to implement. Start with Phase 1?
