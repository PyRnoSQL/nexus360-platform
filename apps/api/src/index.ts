import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { json, urlencoded } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { googleSheetsService } from './services/googleSheets.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(compression());
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ extended: true, limit: '50mb' }));

// Uploads directory
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// Rate limiting
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Demo users
const DEMO_USERS = {
  dg: { id: '1', username: 'dg', role: 'DG', name: 'Délégué Général' },
  cd: { id: '2', username: 'cd', role: 'COMMISSAIRE', name: 'Commissaire Divisionnaire' },
  op: { id: '3', username: 'op', role: 'OFFICIER', name: 'Officier de Police' },
  admin: { id: '4', username: 'admin', role: 'SUPER_ADMIN', name: 'Super Administrateur' }
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Non autorisé' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nexus360-secret');
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Token invalide' });
  }
};

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = DEMO_USERS[username.toLowerCase()];
  if (user && password === '1234') {
    const token = jwt.sign(user, process.env.JWT_SECRET || 'nexus360-secret', { expiresIn: '24h' });
    res.json({ success: true, token, user });
  } else {
    res.status(401).json({ success: false, error: 'Identifiants invalides' });
  }
});

// File upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier' });
  const apiUrl = process.env.API_URL || `http://localhost:${PORT}`;
  res.json({ success: true, url: `${apiUrl}/uploads/${req.file.filename}` });
});

// Form options from Google Sheets
app.get('/api/forms/options/:module', authenticateToken, async (req, res) => {
  const module = req.params.module;
  try {
    let options = {};
    switch(module) {
      case 'finance':
        options = await googleSheetsService.getFinanceOptions();
        break;
      case 'hr':
        options = await googleSheetsService.getHROptions();
        break;
      case 'operations':
        options = await googleSheetsService.getIncidentsOptions();
        break;
      case 'logistique':
        options = await googleSheetsService.getFleetOptions();
        break;
      case 'formation':
        options = await googleSheetsService.getTrainingOptions();
        break;
      case 'lean':
        options = await googleSheetsService.getLeanOptions();
        break;
      default:
        options = {};
    }
    res.json({ success: true, options });
  } catch (error) {
    console.error('Error fetching options:', error);
    res.status(500).json({ success: false, error: 'Erreur lors du chargement des options' });
  }
});

// Form submission
const formSubmissions = [];
app.post('/api/forms/submit', authenticateToken, (req, res) => {
  const userRole = req.user?.role;
  if (userRole !== 'OFFICIER' && userRole !== 'SUPER_ADMIN') {
    return res.status(403).json({ error: 'Accès réservé aux officiers et super administrateurs' });
  }
  const submission = {
    id: Date.now(),
    ...req.body,
    submittedBy: req.user.username,
    submittedAt: new Date().toISOString()
  };
  formSubmissions.unshift(submission);
  console.log(`📝 Form submitted: ${submission.formType} by ${submission.submittedBy}`);
  res.json({ success: true, message: 'Formulaire soumis avec succès', id: submission.id });
});

app.get('/api/forms/submissions', authenticateToken, (req, res) => {
  const userRole = req.user?.role;
  let submissions = formSubmissions;
  if (userRole === 'OFFICIER') {
    submissions = formSubmissions.filter(s => s.submittedBy === req.user.username);
  }
  res.json({ success: true, submissions });
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on port ${PORT}`);
  console.log(`📊 Google Sheets Integration: Active`);
  console.log(`🔐 JWT Secret: ${process.env.JWT_SECRET ? 'Configured' : 'Using default'}`);
});
