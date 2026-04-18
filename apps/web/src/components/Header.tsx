import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export const Header = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  return (
    <header className="bg-navy-800 border-b border-navy-700 py-4 px-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">DGSN - National Security Command Center</h1>
          <p className="text-sm text-gray-400 mt-1">NEXUS360 | Plateforme Nationale d'Intelligence Opérationnelle</p>
        </div>
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-700 hover:bg-navy-600 transition-colors"
        >
          <Languages className="w-5 h-5 text-gold-500" />
          <span className="text-sm font-medium text-white">
            {currentLang === 'fr' ? 'ENGLISH' : 'FRANÇAIS'}
          </span>
        </button>
      </div>
    </header>
  );
};
