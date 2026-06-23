import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { hu } from './locales/hu';

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('trafiqo.lang') : null;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hu: { translation: hu },
  },
  lng: stored || 'hu', // default Hungarian
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem('trafiqo.lang', lng);
    document.documentElement.lang = lng;
  } catch {
    /* ignore */
  }
});

export default i18n;
