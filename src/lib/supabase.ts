import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      sections: {
        Row: {
          id: string;
          name: string;
          enabled: boolean;
          order: number;
          content: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          enabled?: boolean;
          order?: number;
          content?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          enabled?: boolean;
          order?: number;
          content?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          slug: string;
          image: string | null;
          icon: Record<string, unknown> | null;
          tags: string[];
          year: string;
          client: string;
          content: Record<string, unknown> | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: string;
          description: string;
          slug: string;
          image?: string | null;
          icon?: Record<string, unknown> | null;
          tags?: string[];
          year: string;
          client: string;
          content?: Record<string, unknown> | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          slug?: string;
          image?: string | null;
          icon?: Record<string, unknown> | null;
          tags?: string[];
          year?: string;
          client?: string;
          content?: Record<string, unknown> | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
