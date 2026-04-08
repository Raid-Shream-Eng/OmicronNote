/**
 * Student Guide:
 * This is the route file for the note detail editor screen.
 * Expo Router maps this file to the `/note-details` path.
 * This screen is used for both creating a new note and editing an existing note.
 * The route stays tiny so all editor logic remains inside the screen component itself.
 */
import { NoteDetailsScreen } from "./src/Screens/noteDetailsScreen";

// Exposes the note detail editor as a file-based Expo Router route.
export default function NoteDetailsRoute() {
  return <NoteDetailsScreen />;
}
