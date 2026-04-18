import React from 'react';
import { useTranslation } from 'react-i18next';
import { Lock } from 'lucide-react';
import { DashboardEmbed } from '../../components/DashboardEmbed';
import { getDashboardUrlByRole, getDashboardTitle, getDashboardDescription, canAccessDashboard } from '../../config/dashboards';

export const RHDashboard = ({ user }) => {
  const { t } = useTranslation();
  const userRole = user?.role;
  const dashboardKey = 'hr';
  
  if (!canAccessDashboard(userRole, dashboardKey)) {
    return (
      <div className="p-6">
        <div className="glass rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Accès non autorisé</h2>
          <p className="text-gray-400">Vous n'avez pas les droits pour accéder à ce dashboard.</p>
        </div>
      </div>
    );
  }
  
  const embedUrl = getDashboardUrlByRole(userRole, dashboardKey);
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">{t('dashboard.hr')}</h1>
        <p className="text-gray-400">Gestion du personnel et analyse des effectifs</p>
      </div>
      <DashboardEmbed 
        title={getDashboardTitle(dashboardKey)}
        embedUrl={embedUrl}
        description={getDashboardDescription(dashboardKey)}
        userRole={userRole}
      />
    </div>
  );
};
