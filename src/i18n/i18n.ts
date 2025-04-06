import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enCommon from './locales/en/common.json';
import deCommon from './locales/de/common.json';

// Configure i18next
i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources: {
      en: {
        common: enCommon
      },
      de: {
        common: deCommon
      }
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    // Common namespace used around the app
    ns: ['common'],
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false // React already safes from XSS
    }
  });

export default i18n;
