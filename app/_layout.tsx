import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import {
  consumePendingRoute,
  getStoredLastRoute,
  hydrateStoredLanguage,
  storeLastRoute,
} from "./src/i18n";
import { store } from "./src/store/store";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  // Needed so we can send the user back to the route saved before the language-change reload.
  const router = useRouter();
  // Tracks the current file-based route so we can save it for the next app launch.
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    async function prepareLanguage() {
      try {
        await hydrateStoredLanguage();
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    }

    void prepareLanguage();

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

    async function restorePendingRoute() {
      // Consume the stored route once so we do not keep redirecting on later renders.
      const pendingRoute = await consumePendingRoute();
      // Fall back to the last saved route on normal app restarts.
      const restoreRoute = pendingRoute ?? (await getStoredLastRoute());

      if (isMounted && restoreRoute && restoreRoute !== pathname) {
        router.replace(restoreRoute);
      }
    }

    void restorePendingRoute();

    return () => {
      isMounted = false;
    };
  }, [isReady, pathname, router]);

  // Saves the current route so the next app start can return to the same screen.
  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (pathname === "/" || pathname === "/tasks") {
      void storeLastRoute(pathname);
    }
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
      </Stack>
    </Provider>
  );
}
