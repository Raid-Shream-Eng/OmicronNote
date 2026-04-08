/**
 * Student Guide:
 * This is the route file for the settings section.
 * Expo Router maps this file to the `/settings` path.
 * It acts as a lightweight bridge between the router and the actual screen component.
 * This pattern helps keep screen code out of the route layer.
 */
import { SettingsScreen } from "./src/Screens/settingsScreen";

// Exposes the settings screen as a file-based Expo Router route.
export default function SettingsRoute() {
  return <SettingsScreen />;
}
