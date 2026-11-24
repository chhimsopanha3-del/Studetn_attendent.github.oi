import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('edutrack_lang') || 'km';
    } catch (e) {
      return 'km';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('edutrack_lang', lang);
    } catch (e) {}

    if (lang === 'km') {
      document.documentElement.lang = 'km';
    } else {
      document.documentElement.lang = 'en';
    }
  }, [lang]);

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'km' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
