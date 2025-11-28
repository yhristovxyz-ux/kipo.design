/**
 * Storage utility for Vercel serverless functions
 * Uses Vercel Blob Storage for persistence
 */

import { put, head, list } from '@vercel/blob';

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

/**
 * Read JSON data from blob storage
 */
export async function readJSON(filename) {
  try {
    const url = `https://blob.vercel-storage.com/${filename}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${BLOB_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to read ${filename}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
}

/**
 * Write JSON data to blob storage
 */
export async function writeJSON(filename, data) {
  try {
    const blob = await put(filename, JSON.stringify(data, null, 2), {
      access: 'public',
      token: BLOB_TOKEN,
    });
    return blob;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
}

/**
 * Upload file to blob storage
 */
export async function uploadFile(filename, file) {
  try {
    const blob = await put(filename, file, {
      access: 'public',
      token: BLOB_TOKEN,
    });
    return blob.url;
  } catch (error) {
    console.error(`Error uploading ${filename}:`, error);
    throw error;
  }
}

/**
 * Check if file exists
 */
export async function fileExists(filename) {
  try {
    await head(`https://blob.vercel-storage.com/${filename}`, {
      token: BLOB_TOKEN,
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * List all files
 */
export async function listFiles(prefix = '') {
  try {
    const { blobs } = await list({
      prefix,
      token: BLOB_TOKEN,
    });
    return blobs;
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
}
