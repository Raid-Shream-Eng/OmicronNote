/**
 * Student Guide:
 * This is the route file for the home screen.
 * Expo Router uses file names as routes, so `index.tsx` becomes `/`.
 * The file stays intentionally small and simply renders the landing screen component.
 * This is a good example of keeping route files thin and moving UI into screen files.
 */
import { LandingScreen } from "./src/Screens/landingScreen";

export default function Index() {
  return <LandingScreen />;
}
