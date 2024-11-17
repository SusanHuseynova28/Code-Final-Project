import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./languages/en.json";
import ru from "./languages/ru.json";
import az from "./languages/az.json"


i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    az: { translation: az }
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, 
  },

});

export default i18n;