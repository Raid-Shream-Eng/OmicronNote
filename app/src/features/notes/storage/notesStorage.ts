/**
 * Student Guide:
 * This file is the persistence layer for notes.
 * It knows how to load notes from AsyncStorage and save them back to the device.
 * The goal is to keep storage code separate from Redux and separate from UI code.
 * If you later replace AsyncStorage with a database, this file is one of the main places that changes.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
// Imports the note type from the notes feature model so storage stays independent from UI folders.
import type { Note } from "../model/noteModel";

// Uses one storage key for every persisted note so note state survives device restarts.
const NOTES_STORAGE_KEY = "@omicronnote/notes";

// Restores saved notes from device storage before the app starts rendering note screens.
export async function loadStoredNotes(): Promise<Note[] | null> {
  const storedNotes = await AsyncStorage.getItem(NOTES_STORAGE_KEY);

  if (!storedNotes) {
    return null;
  }

  try {
    return JSON.parse(storedNotes) as Note[];
  } catch (error) {
    console.error("Failed to parse stored notes", error);
    return null;
  }
}

// Persists the latest note collection so edits and deletes survive app restarts.
export async function saveStoredNotes(notes: Note[]) {
  await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
}
