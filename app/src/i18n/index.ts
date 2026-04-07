import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";
import RNRestart from "react-native-restart";

import arCommon from "./locales/ar/common.json";
import arLanding from "./locales/ar/landing.json";
import enCommon from "./locales/en/common.json";
import enLanding from "./locales/en/landing.json";

export type AppLanguage = "en" | "ar";

const LANGUAGE_STORAGE_KEY = "@omicronnote/language";

const i18n = createInstance();

function normalizeLanguage(language?: string | null): AppLanguage {
  if (!language) return "en";
  return language.toLowerCase().startsWith("ar") ? "ar" : "en";
}

function getDeviceLanguage(): AppLanguage {
  const primaryLocale = getLocales()[0];

  return normalizeLanguage(
    primaryLocale?.languageTag ?? primaryLocale?.languageCode ?? "en",
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

async function storeLanguage(language: AppLanguage) {
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}

async function getStoredLanguage(): Promise<AppLanguage | null> {
  const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (!storedLanguage) return null;

  return normalizeLanguage(storedLanguage);
}

export async function hydrateStoredLanguage() {
  await initI18n;

  const storedLanguage = await getStoredLanguage();

  const nextLanguage = storedLanguage ?? getDeviceLanguage();

  // 🔴 Determine if the app SHOULD be RTL (Arabic) or LTR (English)
  const shouldBeRTL = nextLanguage === "ar";

  // 🔴 Apply RTL setting BEFORE app renders (no restart here yet)
  if (I18nManager.isRTL !== shouldBeRTL) {
    I18nManager.allowRTL(shouldBeRTL); // allow RTL globally
    I18nManager.forceRTL(shouldBeRTL); // force layout direction
  }

  if (i18n.resolvedLanguage !== nextLanguage) {
    await i18n.changeLanguage(nextLanguage);
  }

  return nextLanguage;
}

export async function setAppLanguage(language: AppLanguage) {
  await initI18n;

  const shouldBeRTL = language === "ar";
  const directionChanged = I18nManager.isRTL !== shouldBeRTL;

  await storeLanguage(language);
  await i18n.changeLanguage(language);

  if (directionChanged) {
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);

    RNRestart.restart();

    return language;
  }
  return language;
}

export async function toggleAppLanguage() {
  await initI18n;

  const current = normalizeLanguage(i18n.resolvedLanguage);
  const next = current === "ar" ? "en" : "ar";

  return setAppLanguage(next);
}

export function isRTL(language = i18n.resolvedLanguage) {
  return i18n.dir(language).toLowerCase() === "rtl";
}

export default i18n;
