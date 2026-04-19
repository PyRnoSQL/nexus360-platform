import React from 'react';
import { useTranslation } from 'react-i18next';

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
      className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 transition-colors"
    >
      <span className="text-base leading-none">🌐</span>
      <span className="text-xs font-medium text-gray-200">
        {currentLang === 'fr' ? 'EN' : 'FR'}
      </span>
    </button>
  );
};
