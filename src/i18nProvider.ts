import polyglotI18nProvider from "ra-i18n-polyglot";
import en from "../i18n/en";
import vi from "../i18n/vi";

const translation = { en, vi };

export const i18nProvider = polyglotI18nProvider(
  (locale: string) => translation[locale as 'en' | 'vi'] ?? translation.vi, // Explicitly type locale
  'vi', // default locale
  [
    {
      locale: "vi",
      name: " Tiếng Việt"
    },
    {
      locale: "en",
      name: "English"
    }
  ]
);
