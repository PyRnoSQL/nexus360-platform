import React from 'react';

export const Welcome = ({ user }) => {
  return (
    <div className="p-8">
      <div className="bg-navy-800/50 rounded-xl p-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          Bonjour, {user?.name}!
        </h1>
        <p className="text-gray-400 mb-6">
          Bienvenue sur NEXUS360 - Plateforme Nationale d'Intelligence Opérationnelle
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-navy-700/50 rounded-lg p-4">
            <h3 className="text-gold-500 font-semibold mb-2">Accès rapide</h3>
            <p className="text-gray-300 text-sm">Utilisez le menu de gauche pour naviguer</p>
          </div>
          <div className="bg-navy-700/50 rounded-lg p-4">
            <h3 className="text-gold-500 font-semibold mb-2">Statistiques</h3>
            <p className="text-gray-300 text-sm">Bienvenue sur la plateforme DGSN</p>
          </div>
        </div>
      </div>
    </div>
  );
};
