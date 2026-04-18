import React from 'react';

export const LogistiqueDashboard = ({ user }) => {
  const title = 'LogistiqueDashboard'.replace('Dashboard', '');
  return (
    <div className="p-8">
      <div className="bg-navy-800/50 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-white mb-4">
          Tableau de bord - 
        </h1>
        <p className="text-gray-400">
          Dashboard en cours de chargement...
        </p>
      </div>
    </div>
  );
};
