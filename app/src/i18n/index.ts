import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import arCommon from "./locales/ar/common.json";
import arLanding from "./locales/ar/landing.json";
import enCommon from "./locales/en/common.json";
import enLanding from "./locales/en/landing.json";

export type AppLanguage = "en" | "ar";

const LANGUAGE_STORAGE_KEY = "@omicronnote/language";
const i18n = createInstance();

function normalizeLanguage(language?: string | null): AppLanguage {
  if (!language) {
    return "en";
  }

  return language.toLowerCase().startsWith("ar") ? "ar" : "en";
}

function getDeviceLanguage(): AppLanguage {
  const primaryLocale = getLocales()[0];

  return normalizeLanguage(
    primaryLocale?.languageTag ?? primaryLocale?.languageCode ?? "en"
  );
}

export const initI18n = i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      landing: enLanding,
    },
    ar: {
      common: arCommon,
      landing: arLanding,
    },
  },
  lng: getDeviceLanguage(),
  fallbackLng: "en",
  supportedLngs: ["en", "ar"],
  defaultNS: "common",
  ns: ["common", "landing"],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export async function hydrateStoredLanguage() {
  await initI18n;

  const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (!storedLanguage) {
    return getDeviceLanguage();
  }

  const nextLanguage = normalizeLanguage(storedLanguage);

  if (i18n.resolvedLanguage !== nextLanguage) {
    await i18n.changeLanguage(nextLanguage);
  }

  return nextLanguage;
}

export async function setAppLanguage(language: AppLanguage) {
  await initI18n;
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  await i18n.changeLanguage(language);

  return language;
}

export async function toggleAppLanguage() {
  await initI18n;

  const currentLanguage = normalizeLanguage(i18n.resolvedLanguage);
  const nextLanguage = currentLanguage === "ar" ? "en" : "ar";

  return setAppLanguage(nextLanguage);
}

export function isRTL(language = i18n.resolvedLanguage) {
  return i18n.dir(language).toLowerCase() === "rtl";
}

export default i18n;
