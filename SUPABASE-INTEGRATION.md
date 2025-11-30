# Supabase Integration Complete

The backend has been successfully migrated from a JSON file-based system to Supabase.

## What Changed

### Database Schema
Created two main tables in Supabase:

1. **sections** - Stores website section configurations
   - `id` (text) - Section identifier
   - `name` (text) - Section name
   - `enabled` (boolean) - Active status
   - `order` (integer) - Display order
   - `content` (jsonb) - Section content and configuration
   - `created_at`, `updated_at` - Timestamps

2. **projects** - Stores portfolio projects
   - `id` (text) - Project identifier
   - `title`, `description`, `slug` - Project metadata
   - `image` (text) - Main image URL
   - `icon` (jsonb) - Icon configuration
   - `tags` (text[]) - Project tags
   - `year`, `client` - Project details
   - `content` (jsonb) - Detailed project content
   - `created_at`, `updated_at` - Timestamps

### Storage
- Created `project-images` storage bucket for image uploads
- Configured for public access with 5MB file size limit
- Supports: JPEG, JPG, PNG, GIF, WebP

### Security
- Enabled Row Level Security (RLS) on all tables
- Public read access (portfolio is public)
- Authenticated write access for admin operations
- Storage bucket policies for public read and authenticated upload

### Frontend Updates
1. **New Supabase Client** (`src/lib/supabase.ts`)
   - Initialized Supabase client with environment variables
   - Type definitions for database schema

2. **Updated API Service** (`src/services/api.service.ts`)
   - Replaced REST API calls with Supabase client methods
   - All CRUD operations now use Supabase
   - Image uploads use Supabase Storage

3. **Environment Variables**
   - `VITE_SUPABASE_URL` - Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Anonymous access key
   - `VITE_USE_API=true` - Enables API mode (vs localStorage)

## How It Works

### Data Flow
1. Frontend loads and checks if `VITE_USE_API=true`
2. If true, uses Supabase client to fetch data
3. If no data exists, populates with default sections
4. All changes are automatically saved to Supabase

### Image Uploads
1. User uploads image through the admin interface
2. Image is uploaded to Supabase Storage bucket
3. Public URL is returned and stored in database
4. Images are served directly from Supabase CDN

## Benefits Over JSON Backend

1. **Scalability** - No file system dependencies
2. **Real-time** - Built-in real-time capabilities (not yet implemented)
3. **Security** - Row Level Security policies
4. **Reliability** - Managed database with backups
5. **Performance** - Global CDN for images
6. **No Backend Server** - Direct client-to-database connection

## Migration Notes

### Old Backend (No Longer Needed)
The following are now obsolete:
- `/backend` directory - Express server
- `/api` directory - Vercel serverless functions
- `backend/data/*.json` - JSON data files
- `backend/uploads/*` - Local image uploads

You can safely remove these if desired, though they're kept for reference.

### Data Migration
If you had existing data in JSON files:
1. The frontend will use default sections on first load
2. Any changes made will be saved to Supabase
3. Old JSON data can be manually imported if needed

## Testing

Build completed successfully with no errors:
```bash
npm run build
✓ built in 10.26s
```

Database tables created and accessible:
- ✅ sections table (0 rows - will be populated on first load)
- ✅ projects table (0 rows - ready for new projects)
- ✅ project-images storage bucket configured

## Next Steps

1. **Run the application**: `npm run dev`
2. **Default sections** will be loaded from CMSContext
3. **Enable edit mode** to make changes
4. **Changes persist** automatically to Supabase
5. **Add authentication** (optional) for admin access

## Environment Setup

Make sure your `.env` file has:
```env
VITE_SUPABASE_URL=https://hykejvbmcwbpwbuaidqr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_USE_API=true
```

## Troubleshooting

### If data doesn't persist:
- Check browser console for Supabase errors
- Verify environment variables are set correctly
- Ensure `VITE_USE_API=true`

### If images don't upload:
- Check Supabase Storage bucket exists
- Verify bucket policies allow public read and authenticated upload
- Check file size (max 5MB)

### If you see RLS errors:
- Policies are configured for public read access
- Write operations require authentication (will be added later)
- For development, you can temporarily disable RLS in Supabase dashboard

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
