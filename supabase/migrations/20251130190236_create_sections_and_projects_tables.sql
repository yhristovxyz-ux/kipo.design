/*
  # Create sections and projects tables
  
  1. New Tables
    - `sections`
      - `id` (text, primary key) - Unique section identifier
      - `name` (text) - Section name
      - `enabled` (boolean) - Whether section is active
      - `order` (integer) - Display order
      - `content` (jsonb) - Section configuration and content
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `projects`
      - `id` (text, primary key) - Unique project identifier
      - `title` (text) - Project title
      - `description` (text) - Project description
      - `slug` (text, unique) - URL-friendly identifier
      - `image` (text) - Main project image URL
      - `icon` (jsonb) - Icon configuration
      - `tags` (text[]) - Project tags array
      - `year` (text) - Project year
      - `client` (text) - Client name
      - `content` (jsonb) - Detailed project content
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
  
  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (portfolio is public)
    - Add policies for authenticated admin write access
  
  3. Indexes
    - Add index on sections.order for efficient sorting
    - Add index on projects.slug for lookups
    - Add index on projects.created_at for sorting
*/

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id text PRIMARY KEY,
  name text NOT NULL,
  enabled boolean DEFAULT true,
  "order" integer NOT NULL DEFAULT 0,
  content jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  slug text UNIQUE NOT NULL,
  image text,
  icon jsonb,
  tags text[] DEFAULT ARRAY[]::text[],
  year text NOT NULL,
  client text NOT NULL,
  content jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_sections_order ON sections("order");
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- Enable Row Level Security
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies for sections table
-- Allow public read access (portfolio is public)
CREATE POLICY "Anyone can view sections"
  ON sections FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert sections
CREATE POLICY "Authenticated users can insert sections"
  ON sections FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update sections
CREATE POLICY "Authenticated users can update sections"
  ON sections FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete sections
CREATE POLICY "Authenticated users can delete sections"
  ON sections FOR DELETE
  TO authenticated
  USING (true);

-- Policies for projects table
-- Allow public read access
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert projects
CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update projects
CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete projects
CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
DROP TRIGGER IF EXISTS update_sections_updated_at ON sections;
CREATE TRIGGER update_sections_updated_at
  BEFORE UPDATE ON sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
