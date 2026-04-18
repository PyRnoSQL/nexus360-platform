import React from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardEmbed } from '../../components/DashboardEmbed';
import { getDashboardUrlByRole, getDashboardTitle, getDashboardDescription } from '../../config/dashboards';

export const OperationsDashboard = ({ user }) => {
  const { t } = useTranslation();
  const userRole = user?.role;
  
  return (
    <div className="p-6">
      <div className="mb-12">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">{t('dashboard.operations_incidents')}</h1>
          <p className="text-gray-400">Suivi et analyse des incidents de sécurité</p>
        </div>
        <DashboardEmbed 
          title={getDashboardTitle('operations_incidents')}
          embedUrl={getDashboardUrlByRole(userRole, 'operations_incidents')}
          description={getDashboardDescription('operations_incidents')}
          userRole={userRole}
        />
      </div>

      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">{t('dashboard.operations_risks')}</h1>
          <p className="text-gray-400">Prédiction des risques et recommandations de déploiement</p>
        </div>
        <DashboardEmbed 
          title={getDashboardTitle('operations_risks')}
          embedUrl={getDashboardUrlByRole(userRole, 'operations_risks')}
          description={getDashboardDescription('operations_risks')}
          userRole={userRole}
        />
      </div>
    </div>
  );
};
