const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Demo users
const DEMO_USERS = {
  dg: { id: '1', username: 'dg', role: 'DG', name: 'Délégué Général' },
  cd: { id: '2', username: 'cd', role: 'COMMISSAIRE', name: 'Commissaire' },
  op: { id: '3', username: 'op', role: 'OFFICIER', name: 'Officier' },
  admin: { id: '4', username: 'admin', role: 'SUPER_ADMIN', name: 'Super Admin' }
};

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = DEMO_USERS[username.toLowerCase()];
  
  if (user && password === '1234') {
    const token = jwt.sign(user, 'secret123', { expiresIn: '24h' });
    res.json({ success: true, token, user });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

// Form options
app.get('/api/forms/options/:module', (req, res) => {
  res.json({ success: true, options: {
    region: ['Centre', 'Littoral', 'Nord', 'Ouest', 'Sud'],
    incident_type: ['Vol', 'Agression', 'Cambriolage'],
    city: ['Yaoundé', 'Douala', 'Garoua']
  } });
});

// Submit form
app.post('/api/forms/submit', (req, res) => {
  console.log('Form received:', req.body);
  res.json({ success: true, message: 'Form submitted' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
