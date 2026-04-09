import { saveStoredNotes } from "../features/notes/storage/notesStorage";
import type { AppStore } from "./store";
export function registerStorePersistence(store: AppStore) {
  let previousPersistedNotes = store.getState().notes.items;

  return store.subscribe(() => {
    const currentNotesState = store.getState().notes;
    if (!currentNotesState.hydrated) {
      return;
    }
    if (currentNotesState.items === previousPersistedNotes) {
      return;
    }

    previousPersistedNotes = currentNotesState.items;
    void saveStoredNotes(currentNotesState.items);
  });
}
