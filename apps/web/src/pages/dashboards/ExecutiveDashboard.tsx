import React from 'react';

export const ExecutiveDashboard = ({ user }) => {
  return (
    <div className="p-8">
      <div className="bg-navy-800/50 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-white mb-4">
          Direction Générale - Tableau de Bord
        </h1>
        <p className="text-gray-400">
          Bienvenue sur le dashboard exécutif. Les dashboards Looker Studio seront intégrés ici.
        </p>
      </div>
    </div>
  );
};
