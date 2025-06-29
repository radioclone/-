import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { enUS } from './translations/en';
import { jaJP } from './translations/ja';
import { deDE } from './translations/de';
import { daDK } from './translations/da';
import { arAR } from './translations/ar';
import { heIL } from './translations/he';
import { hiIN } from './translations/hi';
import { urPK } from './translations/ur';
import { zhCN } from './translations/zh';
import { esES } from './translations/es';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enUS },
      ja: { translation: jaJP },
      de: { translation: deDE },
      da: { translation: daDK },
      ar: { translation: arAR },
      he: { translation: heIL },
      hi: { translation: hiIN },
      ur: { translation: urPK },
      zh: { translation: zhCN },
      es: { translation: esES },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;