import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, CheckCircle, Upload, X } from 'lucide-react';

const MODULES = [
  { id: 'finance', name: 'Finances & Budget', icon: '💰' },
  { id: 'hr', name: 'Ressources Humaines', icon: '👥' },
  { id: 'operations', name: 'Opérations & Sécurité', icon: '🛡️' },
  { id: 'logistique', name: 'Logistique & Parc', icon: '🚗' },
  { id: 'formation', name: 'Formation', icon: '📚' },
  { id: 'lean', name: 'LEAN & Performance', icon: '📊' },
];

const OPTIONS = {
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
  program_name: [
    'Actualisation des procédures d\'enquête — CIAP - Mutengene', 'Analyse du renseignement — CIAP - Mutengene', 'Analyse du renseignement — ENSP - Yaoundé',
    'Communication et gestion des tensions — CIAP - Mutengene', 'Communication et gestion des tensions — ENSP - Yaoundé', 'Criminalistique et médecine légale — CIAP - Mutengene',
    'Criminalistique et médecine légale — ENSP - Yaoundé', 'Droits fondamentaux en contexte policier — CIAP - Mutengene', 'Droits fondamentaux en contexte policier — ENSP - Yaoundé',
    'Enquête numérique et cybersécurité — CIAP - Mutengene', 'Enquête numérique et cybersécurité — ENSP - Yaoundé', 'Éthique et déontologie policière — CIAP - Mutengene',
    'Éthique et déontologie policière — ENSP - Yaoundé', 'Forensique informatique appliquée — CIAP - Mutengene', 'Forensique informatique appliquée — ENSP - Yaoundé',
    'Formation de base CIAP — CIAP - Mutengene', 'Formation initiale des Gardiens de la Paix — CIAP - Mutengene', 'Formation initiale des Gardiens de la Paix — ENSP - Yaoundé',
    'Formation initiale des Inspecteurs — CIAP - Mutengene', 'Formation initiale des Inspecteurs — ENSP - Yaoundé', 'Gestion des crises et négociation — CIAP - Mutengene',
    'Gestion des crises et négociation — ENSP - Yaoundé', 'Gestion des foules et maintien de l\'ordre — CIAP - Mutengene', 'Gestion des foules et maintien de l\'ordre — ENSP - Yaoundé',
    'Investigation criminelle avancée — CIAP - Mutengene', 'Investigation criminelle avancée — ENSP - Yaoundé', 'Lutte contre la criminalité en ligne — CIAP - Mutengene',
    'Lutte contre la criminalité en ligne — ENSP - Yaoundé', 'Médiation des conflits intercommunautaires — CIAP - Mutengene', 'Médiation des conflits intercommunautaires — ENSP - Yaoundé',
    'Module d\'intégration ENSP — CIAP - Mutengene', 'Module d\'intégration ENSP — ENSP - Yaoundé', 'Opérations spéciales de nuit — ENSP - Yaoundé',
    'Police de proximité et relations communautaires — CIAP - Mutengene', 'Police de proximité et relations communautaires — ENSP - Yaoundé', 'Protection des populations vulnérables — CIAP - Mutengene',
    'Protection des populations vulnérables — ENSP - Yaoundé', 'Recyclage annuel en techniques d\'intervention — CIAP - Mutengene', 'Recyclage annuel en techniques d\'intervention — ENSP - Yaoundé',
    'Remise à niveau opérationnelle — CIAP - Mutengene', 'Remise à niveau opérationnelle — ENSP - Yaoundé', 'Techniques d\'assaut et de protection rapprochée — CIAP - Mutengene',
    'Techniques d\'assaut et de protection rapprochée — ENSP - Yaoundé'
  ],
  program_type: ['Formation en cybercriminalité', 'Formation en droits de l\'homme', 'Formation en médiation communautaire', 'Formation initiale', 'Formation spécialisée', 'Formation tactique avancée', 'Recyclage opérationnel'],
  process_name: ['Archivage des dossiers judiciaires', 'Contrôle des identités', 'Délivrance de laissez-passer', 'Délivrance des certificats de résidence', 'Gestion de la paie du personnel', 'Gestion des gardes à vue', 'Processus de recrutement', 'Rédaction des procès-verbaux', 'Traitement des demandes de visa', 'Traitement des plaintes', 'Transmission des rapports d\'enquête'],
  boolean: ['FALSE', 'TRUE']
};

const FIELDS = {
  finance: [
    { name: 'transaction_id', labelKey: 'transaction_id', type: 'text' },
    { name: 'transaction_date', labelKey: 'transaction_date', type: 'date' },
    { name: 'region', labelKey: 'region', type: 'select', options: 'region' },
    { name: 'unit', labelKey: 'unit', type: 'select', options: 'unit' },
    { name: 'budget_line', labelKey: 'budget_line', type: 'select', options: 'budget_line' },
    { name: 'allocated_amount', labelKey: 'allocated_amount', type: 'number' },
    { name: 'committed_amount', labelKey: 'committed_amount', type: 'number' },
    { name: 'disbursed_amount', labelKey: 'disbursed_amount', type: 'number' },
    { name: 'is_fraud_flagged', labelKey: 'is_fraud_flagged', type: 'select', options: 'boolean' },
    { name: 'processing_days', labelKey: 'processing_days', type: 'number' }
  ],
  hr: [
    { name: 'employee_id', labelKey: 'employee_id', type: 'text' },
    { name: 'matricule', labelKey: 'matricule', type: 'text' },
    { name: 'full_name', labelKey: 'full_name', type: 'text' },
    { name: 'region', labelKey: 'region', type: 'select', options: 'region' },
    { name: 'unit', labelKey: 'unit', type: 'select', options: 'unit' },
    { name: 'rank', labelKey: 'rank', type: 'select', options: 'rank' },
    { name: 'base_salary', labelKey: 'base_salary', type: 'number' },
    { name: 'present_verified', labelKey: 'present_verified', type: 'select', options: 'boolean' },
    { name: 'assignment_verified', labelKey: 'assignment_verified', type: 'select', options: 'boolean' },
    { name: 'training_hours', labelKey: 'training_hours', type: 'number' },
    { name: 'performance_score', labelKey: 'performance_score', type: 'number' },
    { name: 'attendance_rate', labelKey: 'attendance_rate', type: 'number' }
  ],
  operations: [
    { name: 'incident_id', labelKey: 'incident_id', type: 'text' },
    { name: 'officer_id', labelKey: 'officer_id', type: 'text' },
    { name: 'incident_type', labelKey: 'incident_type', type: 'select', options: 'incident_type' },
    { name: 'region', labelKey: 'region', type: 'select', options: 'region' },
    { name: 'city', labelKey: 'city', type: 'select', options: 'city' },
    { name: 'description', labelKey: 'description', type: 'textarea' },
    { name: 'incident_date', labelKey: 'incident_date', type: 'date' },
    { name: 'severity', labelKey: 'severity', type: 'select', options: 'severity' },
    { name: 'assigned_precinct', labelKey: 'assigned_precinct', type: 'select', options: 'assigned_precinct' },
    { name: 'assigned_email', labelKey: 'assigned_email', type: 'email' },
    { name: 'status', labelKey: 'status', type: 'select', options: 'status' },
    { name: 'response_time_minutes', labelKey: 'response_time_minutes', type: 'number' },
    { name: 'evidence_photo', labelKey: 'evidence_photo', type: 'file', accept: 'image/png,image/jpeg,image/jpg,image/webp' }
  ],
  logistique: [
    { name: 'asset_id', labelKey: 'asset_id', type: 'text' },
    { name: 'asset_type', labelKey: 'asset_type', type: 'select', options: 'asset_type' },
    { name: 'vehicle_registration', labelKey: 'vehicle_registration', type: 'text' },
    { name: 'region', labelKey: 'region', type: 'select', options: 'region' },
    { name: 'unit', labelKey: 'unit', type: 'select', options: 'unit' },
    { name: 'purchase_date', labelKey: 'purchase_date', type: 'date' },
    { name: 'purchase_cost', labelKey: 'purchase_cost', type: 'number' },
    { name: 'current_mileage', labelKey: 'current_mileage', type: 'number' },
    { name: 'last_maintenance_date', labelKey: 'last_maintenance_date', type: 'date' },
    { name: 'fuel_consumption_liters', labelKey: 'fuel_consumption_liters', type: 'number' },
    { name: 'fuel_expected_liters', labelKey: 'fuel_expected_liters', type: 'number' },
    { name: 'operational_hours', labelKey: 'operational_hours', type: 'number' },
    { name: 'maintenance_cost_ytd', labelKey: 'maintenance_cost_ytd', type: 'number' },
    { name: 'engine_temp_warning', labelKey: 'engine_temp_warning', type: 'select', options: 'boolean' },
    { name: 'oil_pressure_warning', labelKey: 'oil_pressure_warning', type: 'select', options: 'boolean' },
    { name: 'brake_wear_pct', labelKey: 'brake_wear_pct', type: 'number' }
  ],
  formation: [
    { name: 'training_id', labelKey: 'training_id', type: 'text' },
    { name: 'program_name', labelKey: 'program_name', type: 'select', options: 'program_name' },
    { name: 'region', labelKey: 'region', type: 'select', options: 'region' },
    { name: 'program_type', labelKey: 'program_type', type: 'select', options: 'program_type' },
    { name: 'start_date', labelKey: 'start_date', type: 'date' },
    { name: 'end_date', labelKey: 'end_date', type: 'date' },
    { name: 'total_cost', labelKey: 'total_cost', type: 'number' },
    { name: 'participants_count', labelKey: 'participants_count', type: 'number' },
    { name: 'completions_count', labelKey: 'completions_count', type: 'number' },
    { name: 'pre_training_score', labelKey: 'pre_training_score', type: 'number' },
    { name: 'post_training_score', labelKey: 'post_training_score', type: 'number' },
    { name: 'field_performance_improvement', labelKey: 'field_performance_improvement', type: 'number' }
  ],
  lean: [
    { name: 'improvement_id', labelKey: 'improvement_id', type: 'text' },
    { name: 'region', labelKey: 'region', type: 'select', options: 'region' },
    { name: 'process_name', labelKey: 'process_name', type: 'select', options: 'process_name' },
    { name: 'baseline_time_hours', labelKey: 'baseline_time_hours', type: 'number' },
    { name: 'improved_time_hours', labelKey: 'improved_time_hours', type: 'number' },
    { name: 'baseline_cost_fcfa', labelKey: 'baseline_cost_fcfa', type: 'number' },
    { name: 'improved_cost_fcfa', labelKey: 'improved_cost_fcfa', type: 'number' },
    { name: 'implementation_date', labelKey: 'implementation_date', type: 'date' },
    { name: 'savings_realized_fcfa', labelKey: 'savings_realized_fcfa', type: 'number' },
    { name: 'quality_impact_score', labelKey: 'quality_impact_score', type: 'number' },
    { name: 'adopted_by_other_units', labelKey: 'adopted_by_other_units', type: 'text' }
  ]
};

export const Forms = ({ user }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [previews, setPreviews] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selected) {
      const initial = {};
      FIELDS[selected].forEach(f => { if (f.type !== 'file') initial[f.name] = ''; });
      setFormData(initial);
    }
  }, [selected]);

  const handleFileChange = (fieldName, file) => {
    if (file.size > 10 * 1024 * 1024) {
      alert('Le fichier ne doit pas dépasser 10MB');
      return;
    }
    setFiles({ ...files, [fieldName]: file });
    setPreviews({ ...previews, [fieldName]: URL.createObjectURL(file) });
  };

  const uploadFile = async (file) => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: fd,
    });
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const uploadedUrls = {};
      for (const [name, file] of Object.entries(files)) {
        uploadedUrls[name] = await uploadFile(file);
      }
      await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ formType: selected, module: selected, formData: { ...formData, ...uploadedUrls } })
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      const initial = {};
      FIELDS[selected].forEach(f => { if (f.type !== 'file') initial[f.name] = ''; });
      setFormData(initial);
      setFiles({});
      Object.values(previews).forEach(URL.revokeObjectURL);
      setPreviews({});
    } catch(err) { alert(t('common.error')); }
    finally { setSubmitting(false); }
  };

  if (selected) {
    const fields = FIELDS[selected];
    const moduleName = MODULES.find(m => m.id === selected)?.name;
    
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <button onClick={() => setSelected(null)} className="mb-4 text-gold-500 hover:text-gold-400">← {t('forms.back')}</button>
        <div className="glass rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-2">{moduleName}</h2>
          <p className="text-gray-400 mb-6">{t('forms.all_fields_required')}</p>
          {submitted && <div className="mb-4 p-3 bg-green-500/20 text-green-400 rounded-lg flex items-center gap-2"><CheckCircle className="w-4 h-4" /> {t('forms.success')}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map(field => {
                const options = field.options ? OPTIONS[field.options] : null;
                if (field.type === 'file') {
                  return (
                    <div key={field.name} className="md:col-span-2">
                      <label className="block text-sm text-gray-300 mb-2">{t(`forms.fields.${field.labelKey}`)}</label>
                      <div className="border-2 border-dashed border-navy-600 rounded-lg p-6 text-center">
                        {previews[field.name] ? (
                          <div className="relative inline-block">
                            <img src={previews[field.name]} alt="Preview" className="max-h-48 rounded-lg" />
                            <button type="button" onClick={() => { setFiles({ ...files, [field.name]: undefined }); setPreviews({ ...previews, [field.name]: undefined }); }} className="absolute top-2 right-2 p-1 bg-red-500 rounded-full"><X className="w-4 h-4" /></button>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                            <p className="text-sm text-gray-400">PNG, JPEG, WEBP jusqu'à 10MB</p>
                            <input type="file" accept={field.accept} onChange={(e) => e.target.files?.[0] && handleFileChange(field.name, e.target.files[0])} className="hidden" id={field.name} />
                            <label htmlFor={field.name} className="inline-block mt-3 px-4 py-2 bg-navy-700 rounded-lg cursor-pointer text-sm">Sélectionner</label>
                          </>
                        )}
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                    <label className="block text-sm text-gray-300 mb-2">{t(`forms.fields.${field.labelKey}`)} *</label>
                    {options ? (
                      <select value={formData[field.name] || ''} onChange={e => setFormData({ ...formData, [field.name]: e.target.value })} required className="w-full px-4 py-2 bg-navy-800 border border-navy-700 rounded-lg text-white focus:border-gold-500">
                        <option value="">{t('forms.select')}</option>
                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea value={formData[field.name] || ''} onChange={e => setFormData({ ...formData, [field.name]: e.target.value })} required rows={4} className="w-full px-4 py-2 bg-navy-800 border border-navy-700 rounded-lg text-white focus:border-gold-500" />
                    ) : (
                      <input type={field.type} value={formData[field.name] || ''} onChange={e => setFormData({ ...formData, [field.name]: e.target.value })} required className="w-full px-4 py-2 bg-navy-800 border border-navy-700 rounded-lg text-white focus:border-gold-500" />
                    )}
                  </div>
                );
              })}
            </div>
            <button type="submit" disabled={submitting} className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold rounded-lg disabled:opacity-50">
              {submitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : t('forms.submit')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-2">{t('forms.title')}</h1>
      <p className="text-gray-400 mb-6">{t('forms.subtitle')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODULES.map(m => (
          <button key={m.id} onClick={() => setSelected(m.id)} className="glass rounded-xl p-6 text-left hover:border-gold-500/30 transition-all group">
            <div className="text-4xl mb-3">{m.icon}</div>
            <h3 className="text-lg font-semibold text-white group-hover:text-gold-500">{m.name}</h3>
            <div className="mt-4 text-gold-500 text-sm opacity-0 group-hover:opacity-100">→ {t('forms.submit')}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
