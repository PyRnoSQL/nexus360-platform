// Dashboard Embed Configuration
// Your Looker Studio Dashboard URLs

export const DASHBOARD_URLS = {
  executive: {
    title: "Direction Générale - Tableau de Bord Stratégique",
    url: "https://lookerstudio.google.com/embed/reporting/7bdba7fa-9b0e-4296-a5fd-b603b78ef6c1/page/dvotF",
    description: "Indicateurs stratégiques et performance globale"
  },
  finance: {
    title: "Finances - Performance et Conformité Institutionnelle",
    url: "https://lookerstudio.google.com/embed/reporting/7bdba7fa-9b0e-4296-a5fd-b603b78ef6c1/page/p_m9sh8rbb2d",
    description: "Suivi budgétaire et conformité financière"
  },
  hr: {
    title: "RH - Intégrité de la Paie et Analyse des Effectifs",
    url: "https://lookerstudio.google.com/embed/reporting/7bdba7fa-9b0e-4296-a5fd-b603b78ef6c1/page/p_8nafrxbb2d",
    description: "Gestion du personnel et analyse des effectifs"
  },
  operations_incidents: {
    title: "Opérations - Suivi et Analyses des Incidents",
    url: "https://lookerstudio.google.com/embed/reporting/7bdba7fa-9b0e-4296-a5fd-b603b78ef6c1/page/p_7z9tkzbb2d",
    description: "Incidents et Interventions"
  },
  operations_risks: {
    title: "Opérations - Intelligence Prédictive des Risques",
    url: "https://lookerstudio.google.com/embed/reporting/7bdba7fa-9b0e-4296-a5fd-b603b78ef6c1/page/p_grilfivg2d",
    description: "Prédiction des risques et recommandations"
  },
  logistics_fleet: {
    title: "Logistique - Suivi de l'État de la Flotte",
    url: "https://lookerstudio.google.com/embed/reporting/7bdba7fa-9b0e-4296-a5fd-b603b78ef6c1/page/p_a4inf4bb2d",
    description: "État de la flotte et maintenance préventive"
  },
  logistics_failures: {
    title: "Logistique - Intelligence Prédictive des Défaillances",
    url: "https://lookerstudio.google.com/embed/reporting/7bdba7fa-9b0e-4296-a5fd-b603b78ef6c1/page/p_6bk2a7ln2d",
    description: "Prédiction des défaillances et alertes"
  },
  training: {
    title: "Formation - Évaluation de l'Efficacité des Programmes",
    url: "https://lookerstudio.google.com/embed/reporting/7bdba7fa-9b0e-4296-a5fd-b603b78ef6c1/page/p_9wwhy6bb2d",
    description: "Évaluation des programmes de formation"
  },
  lean: {
    title: "LEAN - Amélioration Continue",
    url: "https://lookerstudio.google.com/embed/reporting/7bdba7fa-9b0e-4296-a5fd-b603b78ef6c1/page/p_wjffmdcb2d",
    description: "Amélioration continue et performance"
  }
};

export const getDashboardUrl = (key: string): string => {
  return DASHBOARD_URLS[key]?.url || "";
};

export const isDashboardConfigured = (key: string): boolean => {
  const url = DASHBOARD_URLS[key]?.url;
  return url && url !== "";
};
