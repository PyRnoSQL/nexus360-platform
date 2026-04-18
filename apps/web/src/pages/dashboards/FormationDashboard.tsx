import React from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardEmbed } from '../../components/DashboardEmbed';
import { getDashboardUrlByRole, getDashboardTitle, getDashboardDescription } from '../../config/dashboards';

export const FormationDashboard = ({ user }) => {
  const { t } = useTranslation();
  const userRole = user?.role;
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">{t('dashboard.training')}</h1>
        <p className="text-gray-400">Évaluation de l'efficacité des programmes de formation</p>
      </div>
      <DashboardEmbed 
        title={getDashboardTitle('training')}
        embedUrl={getDashboardUrlByRole(userRole, 'training')}
        description={getDashboardDescription('training')}
        userRole={userRole}
      />
    </div>
  );
};
