import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import englishLocales from './en.json';
import georgianLocales from './ka.json';

i18n.use(initReactI18next).init({
    lng: 'en',
    fallBackLng: 'en',
    resources: {
        en: {
            translation: englishLocales
        },
        ka: {
            translation: georgianLocales
        },
    },
});