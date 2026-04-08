/**
 * Student Guide:
 * This file configures internationalization for the whole app.
 * It loads translation namespaces, manages the current language, handles RTL/LTR direction,
 * saves language choice on the device, and restores startup routes after language-triggered reloads.
 * If text direction or translation behavior feels confusing, read this file slowly from top to bottom.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { DevSettings, I18nManager, Platform } from "react-native";

import arCommon from "./locales/ar/common.json";
import arLanding from "./locales/ar/landing.json";
// Loads the Arabic text used by the notes screen and note list components.
import arNotes from "./locales/ar/notes.json";
// Loads the Arabic text used by the settings screen.
import arSettings from "./locales/ar/settings.json";
// Loads the Arabic text used by the task screen and task components.
import arTasks from "./locales/ar/tasks.json";
import enCommon from "./locales/en/common.json";
import enLanding from "./locales/en/landing.json";
// Loads the English text used by the notes screen and note list components.
import enNotes from "./locales/en/notes.json";
// Loads the English text used by the settings screen.
import enSettings from "./locales/en/settings.json";
// Loads the English text used by the task screen and task components.
import enTasks from "./locales/en/tasks.json";

export type AppLanguage = "en" | "ar";
// Limit saved resume routes to real Expo Router files so router.replace stays type-safe.
export type AppResumeRoute = "/" | "/notes" | "/tasks" | "/settings";

const LANGUAGE_STORAGE_KEY = "@omicronnote/language";
// Keeps the user's last valid screen so the app can reopen it after a restart.
const LAST_ROUTE_STORAGE_KEY = "@omicronnote/last-route";
// Stores the screen we should return to after an RTL/LTR language switch reloads the app.
const PENDING_ROUTE_STORAGE_KEY = "@omicronnote/pending-route";

const i18n = createInstance();

function normalizeLanguage(language?: string | null): AppLanguage {
  if (!language) return "en";
  return language.toLowerCase().startsWith("ar") ? "ar" : "en";
}

// Restricts restored routes to real app routes before they are reused.
function isAppResumeRoute(route: string): route is AppResumeRoute {
  return (
    route === "/" ||
    route === "/notes" ||
    route === "/tasks" ||
    route === "/settings"
  );
}

export const initI18n = i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      landing: enLanding,
      // Registers the English notes translation namespace.
      notes: enNotes,
      // Registers the English settings translation namespace.
      settings: enSettings,
      // Registers the English task translation namespace.
      tasks: enTasks,
    },
    ar: {
      common: arCommon,
      landing: arLanding,
      // Registers the Arabic notes translation namespace.
      notes: arNotes,
      // Registers the Arabic settings translation namespace.
      settings: arSettings,
      // Registers the Arabic task translation namespace.
      tasks: arTasks,
    },
  },

  // Starts the app in English unless the user later saves a different preference.
  lng: "en",

  fallbackLng: "en",
  supportedLngs: ["en", "ar"],

  defaultNS: "common",
  // Declares every translation namespace the app can read from.
  ns: ["common", "landing", "notes", "settings", "tasks"],

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

// Saves the current route before a forced reload so the app can reopen the same screen.
async function storePendingRoute(route: AppResumeRoute) {
  await AsyncStorage.setItem(PENDING_ROUTE_STORAGE_KEY, route);
}

// Persists the latest screen so ordinary app restarts can reopen it too.
export async function storeLastRoute(route: AppResumeRoute) {
  await AsyncStorage.setItem(LAST_ROUTE_STORAGE_KEY, route);
}

// Restores the last saved screen when there is no one-time pending route to consume.
export async function getStoredLastRoute(): Promise<AppResumeRoute | null> {
  const lastRoute = await AsyncStorage.getItem(LAST_ROUTE_STORAGE_KEY);

  if (!lastRoute || !isAppResumeRoute(lastRoute)) {
    return null;
  }

  return lastRoute;
}

// Reads and clears the saved route after launch so it is used only once.
export async function consumePendingRoute(): Promise<AppResumeRoute | null> {
  const pendingRoute = await AsyncStorage.getItem(PENDING_ROUTE_STORAGE_KEY);

  if (!pendingRoute) {
    return null;
  }

  await AsyncStorage.removeItem(PENDING_ROUTE_STORAGE_KEY);

  if (isAppResumeRoute(pendingRoute)) {
    return pendingRoute;
  }

  return null;
}

async function reloadApp() {
  if (Platform.OS === "web") {
    return;
  }

  if (__DEV__) {
    DevSettings.reload();
  }
}

export async function hydrateStoredLanguage() {
  await initI18n;

  const storedLanguage = await getStoredLanguage();

  // Defaults to English until the user explicitly saves a different language.
  const nextLanguage = storedLanguage ?? "en";

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

export async function setAppLanguage(
  language: AppLanguage,
  resumeRoute?: AppResumeRoute,
) {
  await initI18n;

  const shouldBeRTL = language === "ar";
  const directionChanged = I18nManager.isRTL !== shouldBeRTL;

  await storeLanguage(language);
  await i18n.changeLanguage(language);

  if (directionChanged) {
    // When layout direction changes, React Native reloads the app, so keep the current route first.
    if (resumeRoute) {
      await storePendingRoute(resumeRoute);
    }

    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);

    await reloadApp();

    return language;
  }
  return language;
}

// Allows callers to pass the current screen so language changes can restore that route after reload.
export async function toggleAppLanguage(resumeRoute?: AppResumeRoute) {
  try {
    await initI18n;

    const current = normalizeLanguage(i18n.resolvedLanguage);
    const next = current === "ar" ? "en" : "ar";

    return setAppLanguage(next, resumeRoute);
  } catch (error: unknown) {
    console.error("Failed to toggle app language", error);
  }
}

export function isRTL(language = i18n.resolvedLanguage) {
  return i18n.dir(language).toLowerCase() === "rtl";
}

export default i18n;
