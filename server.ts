import app from './api/index.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 3000;

// Serve frontend in local production / preview mode
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`CPMAI Backend Server running on port ${PORT}`);
  console.log(`Neon Database: Connected via SSL pooler`);
  console.log(`Vercel AI Gateway: Ready`);
});
