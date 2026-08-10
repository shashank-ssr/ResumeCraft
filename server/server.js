import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

import { registerHandler, loginHandler, meHandler, authenticateToken } from './server/auth';
import {
  getResumesHandler,
  getResumeByIdHandler,
  createResumeHandler,
  updateResumeHandler,
  deleteResumeHandler,
  duplicateResumeHandler
} from './server/resumes';
import { suggestSummaryHandler, enhanceBulletsHandler } from './server/ai';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // API Routes
  const apiRouter = express.Router();

  // Health check
  apiRouter.get('/health', (req, res) => {
    res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
  });

  // Auth Routes
  apiRouter.post('/auth/register', registerHandler);
  apiRouter.post('/auth/login', loginHandler);
  apiRouter.get('/auth/me', authenticateToken, meHandler);

  // Resume Routes
  apiRouter.get('/resumes', authenticateToken, getResumesHandler);
  apiRouter.post('/resumes', authenticateToken, createResumeHandler);
  apiRouter.get('/resumes/:id', getResumeByIdHandler);
  apiRouter.put('/resumes/:id', authenticateToken, updateResumeHandler);
  apiRouter.delete('/resumes/:id', authenticateToken, deleteResumeHandler);
  apiRouter.post('/resumes/:id/duplicate', authenticateToken, duplicateResumeHandler);

  // AI Assistant Routes
  apiRouter.post('/ai/suggest-summary', suggestSummaryHandler);
  apiRouter.post('/ai/enhance-bullets', enhanceBulletsHandler);

  app.use('/api', apiRouter);

  // Vite middleware in non-production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ResumeCraft server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
