import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { hydrateStoredLanguage } from "./src/i18n";

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

  return <Stack screenOptions={{ headerShown: false }} />;
}
