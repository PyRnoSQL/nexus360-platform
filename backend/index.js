import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Demo users
const DEMO_USERS = {
  dg: { id: '1', username: 'dg', role: 'DG', name: 'Délégué Général' },
  cd: { id: '2', username: 'cd', role: 'COMMISSAIRE', name: 'Commissaire Divisionnaire' },
  op: { id: '3', username: 'op', role: 'OFFICIER', name: 'Officier de Police' },
  admin: { id: '4', username: 'admin', role: 'SUPER_ADMIN', name: 'Super Administrateur' }
};

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = DEMO_USERS[username.toLowerCase()];
  
  if (user && password === '1234') {
    const token = jwt.sign(user, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
    res.json({ success: true, token, user });
  } else {
    res.status(401).json({ success: false, error: 'Identifiants invalides' });
  }
});

// Form options endpoint
app.get('/api/forms/options/:module', (req, res) => {
  res.json({ success: true, options: {
    region: ['Adamaoua', 'Centre', 'Est', 'Extrême-Nord', 'Littoral', 'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest'],
    incident_type: ['Vol', 'Agression', 'Cambriolage', 'Homicide', 'Accident'],
    city: ['Yaoundé', 'Douala', 'Garoua', 'Bafoussam', 'Bamenda'],
    status: ['Ouvert', 'En cours', 'Résolu']
  } });
});

// Form submission endpoint
app.post('/api/forms/submit', (req, res) => {
  console.log('Form submitted:', req.body);
  res.json({ success: true, message: 'Formulaire soumis avec succès', id: Date.now() });
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on port ${PORT}`);
});
