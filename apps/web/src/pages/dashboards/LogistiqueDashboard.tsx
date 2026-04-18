import React from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardEmbed } from '../../components/DashboardEmbed';
import { getDashboardUrlByRole, getDashboardTitle, getDashboardDescription } from '../../config/dashboards';

export const LogistiqueDashboard = ({ user }) => {
  const { t } = useTranslation();
  const userRole = user?.role;
  
  return (
    <div className="p-6">
      <div className="mb-12">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">{t('dashboard.logistics_fleet')}</h1>
          <p className="text-gray-400">État de la flotte et maintenance préventive</p>
        </div>
        <DashboardEmbed 
          title={getDashboardTitle('logistics_fleet')}
          embedUrl={getDashboardUrlByRole(userRole, 'logistics_fleet')}
          description={getDashboardDescription('logistics_fleet')}
          userRole={userRole}
        />
      </div>

      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">{t('dashboard.logistics_failures')}</h1>
          <p className="text-gray-400">Prédiction des défaillances et alertes maintenance</p>
        </div>
        <DashboardEmbed 
          title={getDashboardTitle('logistics_failures')}
          embedUrl={getDashboardUrlByRole(userRole, 'logistics_failures')}
          description={getDashboardDescription('logistics_failures')}
          userRole={userRole}
        />
      </div>
    </div>
  );
};
