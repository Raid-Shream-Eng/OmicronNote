/**
 * Student Guide:
 * This is the root layout for the whole Expo Router app.
 * It wraps the routed screens with Redux, runs app startup preparation,
 * restores the last main route, and defines the stack of top-level screens.
 * When you want to understand how the app starts, begin reading here,
 * then continue into `src/app/bootstrap.ts` and `src/store/store.ts`.
 */
import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
// Imports startup helpers so the root layout can stay focused on routing and providers.
import {
  prepareApp as prepareApplication,
  rememberMainRoute,
  resolveStartupRoute,
} from "./src/app/bootstrap";
import { store } from "./src/store/store";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  // Needed so we can send the user back to the route saved before the language-change reload.
  const router = useRouter();
  // Tracks the current file-based route so we can save it for the next app launch.
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    // Prepares app data and language before the routed screens appear.
    async function initializeApp() {
      try {
        // Delegates boot-time note hydration and language setup to the app bootstrap helper.
        await prepareApplication(store);
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    }

    void initializeApp();

    return () => {
      isMounted = false;
    };
  }, []);

  // After the app boots, restore any route saved before the RTL/LTR language switch forced a reload.
  useEffect(() => {
    if (!isReady) {
      return;
    }

    let isMounted = true;

    async function restoreStartupRoute() {
      // Resolves either the one-time reload route or the last main route visited by the user.
      const restoreRoute = await resolveStartupRoute();

      if (isMounted && restoreRoute && restoreRoute !== pathname) {
        router.replace(restoreRoute);
      }
    }

    void restoreStartupRoute();

    return () => {
      isMounted = false;
    };
  }, [isReady, pathname, router]);

  // Saves the current route so the next app start can return to the same screen.
  useEffect(() => {
    if (!isReady) {
      return;
    }

    // Remembers only main app routes so regular restarts return to the last section screen.
    void rememberMainRoute(pathname);
  }, [isReady, pathname]);

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="notes" />
        <Stack.Screen name="tasks" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="note-details" />
      </Stack>
    </Provider>
  );
}
