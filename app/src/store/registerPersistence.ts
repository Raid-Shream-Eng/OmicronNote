/**
 * Student Guide:
 * This file connects Redux state changes to device persistence.
 * Its job is to watch the store and save notes only when they change after hydration.
 * Moving this logic here keeps persistence details out of `store.ts`.
 * This is a good example of separating store setup from store side effects.
 */
import { saveStoredNotes } from "../features/notes/storage/notesStorage";
import type { AppStore } from "./store";

// Registers store-level persistence outside store.ts so store setup stays easier to scan.
export function registerStorePersistence(store: AppStore) {
  // Tracks the last notes array reference so unchanged state does not trigger extra writes.
  let previousPersistedNotes = store.getState().notes.items;

  return store.subscribe(() => {
    const currentNotesState = store.getState().notes;

    // Waits for hydration so we do not overwrite storage with placeholder startup data.
    if (!currentNotesState.hydrated) {
      return;
    }

    // Skips persistence when the notes collection reference has not changed.
    if (currentNotesState.items === previousPersistedNotes) {
      return;
    }

    previousPersistedNotes = currentNotesState.items;
    void saveStoredNotes(currentNotesState.items);
  });
}
