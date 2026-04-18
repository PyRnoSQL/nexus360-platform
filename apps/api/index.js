import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

const DEMO_USERS = {
  dg: { id: '1', username: 'dg', role: 'DG', name: 'Délégué Général' },
  cd: { id: '2', username: 'cd', role: 'COMMISSAIRE', name: 'Commissaire Divisionnaire' },
  op: { id: '3', username: 'op', role: 'OFFICIER', name: 'Officier de Police' },
  admin: { id: '4', username: 'admin', role: 'SUPER_ADMIN', name: 'Super Administrateur' }
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Non autorisé' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret'); next(); } 
  catch { res.status(403).json({ error: 'Token invalide' }); }
};

const requireFormAccess = (req, res, next) => {
  const role = req.user?.role;
  if (role !== 'OFFICIER' && role !== 'SUPER_ADMIN') 
    return res.status(403).json({ error: 'Accès réservé aux officiers et super administrateurs' });
  next();
};

app.get('/health', (req, res) => res.json({ status: 'healthy', timestamp: new Date().toISOString() }));

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = DEMO_USERS[username.toLowerCase()];
  if (user && password === '1234') {
    const token = jwt.sign(user, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
    res.json({ success: true, token, user });
  } else { res.status(401).json({ success: false, error: 'Identifiants invalides' }); }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => { const ext = path.extname(file.originalname); cb(null, `${uuidv4()}${ext}`); }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.post('/api/upload', authenticate, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier' });
  res.json({ success: true, url: `/uploads/${req.file.filename}` });
});

const TRAINING_PROGRAMS = [
  'Actualisation des procédures d\'enquête — CIAP - Mutengene',
  'Analyse du renseignement — CIAP - Mutengene',
  'Analyse du renseignement — ENSP - Yaoundé',
  'Communication et gestion des tensions — CIAP - Mutengene',
  'Communication et gestion des tensions — ENSP - Yaoundé',
  'Criminalistique et médecine légale — CIAP - Mutengene',
  'Criminalistique et médecine légale — ENSP - Yaoundé',
  'Droits fondamentaux en contexte policier — CIAP - Mutengene',
  'Droits fondamentaux en contexte policier — ENSP - Yaoundé',
  'Enquête numérique et cybersécurité — CIAP - Mutengene',
  'Enquête numérique et cybersécurité — ENSP - Yaoundé',
  'Éthique et déontologie policière — CIAP - Mutengene',
  'Éthique et déontologie policière — ENSP - Yaoundé',
  'Forensique informatique appliquée — CIAP - Mutengene',
  'Forensique informatique appliquée — ENSP - Yaoundé',
  'Formation de base CIAP — CIAP - Mutengene',
  'Formation initiale des Gardiens de la Paix — CIAP - Mutengene',
  'Formation initiale des Gardiens de la Paix — ENSP - Yaoundé',
  'Formation initiale des Inspecteurs — CIAP - Mutengene',
  'Formation initiale des Inspecteurs — ENSP - Yaoundé',
  'Gestion des crises et négociation — CIAP - Mutengene',
  'Gestion des crises et négociation — ENSP - Yaoundé',
  'Gestion des foules et maintien de l\'ordre — CIAP - Mutengene',
  'Gestion des foules et maintien de l\'ordre — ENSP - Yaoundé',
  'Investigation criminelle avancée — CIAP - Mutengene',
  'Investigation criminelle avancée — ENSP - Yaoundé',
  'Lutte contre la criminalité en ligne — CIAP - Mutengene',
  'Lutte contre la criminalité en ligne — ENSP - Yaoundé',
  'Médiation des conflits intercommunautaires — CIAP - Mutengene',
  'Médiation des conflits intercommunautaires — ENSP - Yaoundé',
  'Module d\'intégration ENSP — CIAP - Mutengene',
  'Module d\'intégration ENSP — ENSP - Yaoundé',
  'Opérations spéciales de nuit — ENSP - Yaoundé',
  'Police de proximité et relations communautaires — CIAP - Mutengene',
  'Police de proximité et relations communautaires — ENSP - Yaoundé',
  'Protection des populations vulnérables — CIAP - Mutengene',
  'Protection des populations vulnérables — ENSP - Yaoundé',
  'Recyclage annuel en techniques d\'intervention — CIAP - Mutengene',
  'Recyclage annuel en techniques d\'intervention — ENSP - Yaoundé',
  'Remise à niveau opérationnelle — CIAP - Mutengene',
  'Remise à niveau opérationnelle — ENSP - Yaoundé',
  'Techniques d\'assaut et de protection rapprochée — CIAP - Mutengene',
  'Techniques d\'assaut et de protection rapprochée — ENSP - Yaoundé'
];

app.get('/api/forms/options/:module', authenticate, (req, res) => {
  res.json({ success: true, options: {
    region: ['Adamaoua', 'Centre', 'Est', 'Extrême-Nord', 'Littoral', 'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest'],
    unit: ['Brigade Anti-Criminalité', 'Brigade de Recherches', 'Compagnie de Sécurisation', 'Direction Centrale de la Police Judiciaire', 'Direction de la Sécurité Publique', 'Direction de la Surveillance du Territoire', 'Groupement Mobile d\'Intervention', 'Police de l\'Air et des Frontières', 'Police des Frontières', 'Unité Spéciale d\'Intervention'],
    budget_line: ['Achats Spéciaux', 'Carburant et Lubrifiants', 'Équipements de Sécurité', 'Formation et Renforcement des Capacités', 'Frais Opérationnels', 'Infrastructure et Bâtiments', 'Maintenance des Véhicules', 'Personnel et Soldes', 'Technologie et Systèmes d\'Information'],
    rank: ['Gardien de la Paix', 'Inspecteur de Police', 'Officier de Police', 'Commissaire de Police', 'Commissaire Divisionnaire'],
    incident_type: ['Accident de la circulation', 'Agression physique', 'Cambriolage', 'Cybercriminalité', 'Enlèvement et séquestration', 'Fraude et escroquerie', 'Perturbation de l\'ordre public', 'Port illégal d\'armes', 'Terrorisme et extrémisme', 'Trafic de drogue', 'Trafic de personnes', 'Vandalisme', 'Violence domestique', 'Vol avec violence'],
    city: ['Yaoundé', 'Douala', 'Garoua', 'Bafoussam', 'Bamenda', 'Ngaoundéré', 'Maroua', 'Bertoua', 'Ebolowa', 'Buea', 'Kribi', 'Limbé', 'Kumba', 'Mbalmayo', 'Edéa', 'Foumban', 'Dschang', 'Nkongsamba', 'Bafia', 'Obala', 'Sangmélima', 'Abong-Mbang', 'Batouri', 'Yokadouma', 'Meiganga', 'Tibati', 'Tignère', 'Mokolo', 'Kousséri', 'Yagoua', 'Pitoa', 'Guider', 'Mora', 'Wum', 'Kumbo', 'Mbengwi', 'Nkambe', 'Tiko', 'Mundemba', 'Loum', 'Mbanga', 'Banyo', 'Tcholliré', 'Lolodorf', 'Mbouda'],
    severity: ['1', '2', '3', '4', '5'],
    assigned_precinct: ['Brigade Anti-Criminalité', 'Brigade de Gendarmerie', 'Brigade Mobile', 'Commissariat Central', 'Commissariat d\'Arrondissement', 'Commissariat Régional', 'Poste de Police'],
    status: ['Clôturé', 'En attente de validation', 'En cours', 'Ouvert', 'Résolu'],
    asset_type: ['Ambulance de brigade', 'Camionnette de transport', 'Fourgon blindé', 'Moto de liaison', 'Véhicule de commandement', 'Véhicule de patrouille', 'Véhicule tout-terrain'],
    program_name: TRAINING_PROGRAMS,
    program_type: ['Formation en cybercriminalité', 'Formation en droits de l\'homme', 'Formation en médiation communautaire', 'Formation initiale', 'Formation spécialisée', 'Formation tactique avancée', 'Recyclage opérationnel'],
    process_name: ['Archivage des dossiers judiciaires', 'Contrôle des identités', 'Délivrance de laissez-passer', 'Délivrance des certificats de résidence', 'Gestion de la paie du personnel', 'Gestion des gardes à vue', 'Processus de recrutement', 'Rédaction des procès-verbaux', 'Traitement des demandes de visa', 'Traitement des plaintes', 'Transmission des rapports d\'enquête'],
    boolean: ['FALSE', 'TRUE']
  } });
});

const submissions = [];
app.post('/api/forms/submit', authenticate, requireFormAccess, (req, res) => {
  const submission = { id: Date.now(), ...req.body, submittedBy: req.user.username, submittedAt: new Date().toISOString() };
  submissions.unshift(submission);
  console.log(`📝 Form submitted: ${submission.formType} by ${submission.submittedBy}`);
  res.json({ success: true, message: 'Formulaire soumis avec succès', id: submission.id });
});

app.get('/api/forms/submissions', authenticate, (req, res) => {
  let userSubmissions = submissions;
  if (req.user?.role === 'OFFICIER') userSubmissions = submissions.filter(s => s.submittedBy === req.user.username);
  res.json({ success: true, submissions: userSubmissions });
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on port ${PORT}`);
  console.log(`📊 43 Training Programs loaded`);
});
