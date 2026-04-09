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
export async function prepareApp(store: AppStore) {
  const storedNotes = await loadStoredNotes();
  store.dispatch(hydrateNotes(storedNotes));
  await hydrateStoredLanguage();
}
export async function resolveStartupRoute() {
  const pendingRoute = await consumePendingRoute();

  if (pendingRoute) {
    return pendingRoute;
  }

  return getStoredLastRoute();
}
export function isMainAppRoute(pathname: string): pathname is AppResumeRoute {
  return (
    pathname === "/" ||
    pathname === "/notes" ||
    pathname === "/tasks" ||
    pathname === "/settings"
  );
}
export async function rememberMainRoute(pathname: string) {
  if (!isMainAppRoute(pathname)) {
    return;
  }

  await storeLastRoute(pathname);
}
