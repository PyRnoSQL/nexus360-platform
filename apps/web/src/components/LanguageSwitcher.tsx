import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 transition-colors text-sm"
    >
      <Languages className="w-4 h-4 text-gold-500" />
      <span className="font-medium text-gray-200">
        {currentLang === 'fr' ? 'ENGLISH' : 'FRANÇAIS'}
      </span>
    </button>
  );
};
