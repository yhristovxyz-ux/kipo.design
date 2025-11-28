/**
 * Health check endpoint
 * GET /api/health
 */

import { handleCors } from './lib/cors.js';

export default function handler(req, res) {
  return handleCors(req, res, () => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: 'serverless',
    });
  });
}
