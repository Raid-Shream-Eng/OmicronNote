/**
 * Student Guide:
 * This is the route file for the notes section.
 * Expo Router maps this file to the `/notes` path.
 * Its only job is to expose the notes screen through file-based routing.
 * The real feature logic lives inside the screen and feature folders under `src`.
 */
import { NotesScreen } from "./src/Screens/notesScreen";

// Exposes the notes list screen as a file-based Expo Router route.
export default function NotesRoute() {
  return <NotesScreen />;
}
