import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { hydrateStoredLanguage } from "./src/i18n";
import { store } from "./src/store/store";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

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
