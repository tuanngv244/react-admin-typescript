/// languages/i18n.ts
import { initReactI18next } from "react-i18next";
import i18next, { LanguageDetectorAsyncModule } from "i18next";

import en from "./locales/en.json";
import vi from "./locales/vi.json";
import { STORAGE } from "@/constants/storage";
import { ELanguages } from "@/constants/i18n";

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: (cb) => cb("vi"),
  init: () => {},
  cacheUserLanguage: () => {},
};

const resources = {
  vi: { translation: vi },
  en: { translation: en },
};

i18next.use(languageDetector).use(initReactI18next).init({
  fallbackLng: ELanguages.VI,
  debug: false,
  resources: resources,
  compatibilityJSON: "v3",
});

const initLanguage = () => {
  const initialLanguage =
    localStorage.getItem(STORAGE.language) || ELanguages.EN;
  i18next.changeLanguage(initialLanguage);
};

const setLanguage = (value: ELanguages) => {
  localStorage.setItem(STORAGE.language, value);
  i18next.changeLanguage(value);
};

const languageOptions = [
  {
    label: "Vietnamese",
    value: ELanguages.VI,
  },
  {
    label: "English",
    value: ELanguages.EN,
  },
];

export { languageOptions, initLanguage, setLanguage };

const I18nApp = i18next;
export default I18nApp;
