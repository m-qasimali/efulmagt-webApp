import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) // load translations using HTTP
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass i18n instance to react-i18next
  .init({
    fallbackLng: {
        'en-GB': ['en'], // fallback to 'en' if 'en-GB' is missing
        default: ['en']
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false // react already escapes by default
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json' // path to load translations
    }
  });

export default i18n;