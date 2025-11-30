/*
  # Fix security issues
  
  1. Function Security
    - Fix search_path mutability for update_updated_at_column function
    - Add SECURITY DEFINER and set explicit search_path
  
  2. Index Optimization
    - Remove unused idx_projects_slug index
    - The slug column already has a UNIQUE constraint which creates an implicit index
    - No need for an additional separate index
*/

-- Fix function search path mutability
-- Drop and recreate with proper security settings
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate triggers
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

-- Remove unused index (slug already has UNIQUE constraint with implicit index)
DROP INDEX IF EXISTS idx_projects_slug;
