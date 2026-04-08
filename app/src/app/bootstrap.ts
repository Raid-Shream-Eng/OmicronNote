/**
 * Student Guide:
 * This file holds app startup logic that should not clutter `_layout.tsx`.
 * It prepares data before the UI appears, restores the route that should open on startup,
 * and remembers only the main section routes for future launches.
 * Think of this file as the "app startup service" for the project.
 * If the app boot flow changes later, this is one of the first places to revisit.
 */
import type { AppResumeRoute } from "../i18n";
import {
  consumePendingRoute,
  getStoredLastRoute,
  hydrateStoredLanguage,
  storeLastRoute,
} from "../i18n";
import { loadStoredNotes } from "../features/notes/storage/notesStorage";
import { hydrateNotes } from "../features/notes/state/notesSlice";
import type { AppStore } from "../store/store";

// Collects app startup work in one place so the root layout stays focused on routing.
export async function prepareApp(store: AppStore) {
  // Restores note data from device storage before feature screens render.
  const storedNotes = await loadStoredNotes();
  store.dispatch(hydrateNotes(storedNotes));

  // Restores the saved language and text direction before the UI becomes visible.
  await hydrateStoredLanguage();
}

// Resolves the route the app should restore after startup or an RTL/LTR reload.
export async function resolveStartupRoute() {
  const pendingRoute = await consumePendingRoute();

  if (pendingRoute) {
    return pendingRoute;
  }

  return getStoredLastRoute();
}

// Restricts remembered routes to the main top-level app sections.
export function isMainAppRoute(pathname: string): pathname is AppResumeRoute {
  return (
    pathname === "/" ||
    pathname === "/notes" ||
    pathname === "/tasks" ||
    pathname === "/settings"
  );
}

// Persists only the main routes so detail screens do not become the app's default return point.
export async function rememberMainRoute(pathname: string) {
  if (!isMainAppRoute(pathname)) {
    return;
  }

  await storeLastRoute(pathname);
}
