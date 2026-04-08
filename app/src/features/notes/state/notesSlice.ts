/**
 * Student Guide:
 * This file contains the Redux slice for the notes feature.
 * It owns the note collection state and all note mutations such as add, update,
 * delete, duplicate, pin, lock, and checklist updates.
 * In this project, the slice is the single source of truth for note data in memory.
 * If a screen changes note data, it should usually do so through actions from this file.
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Imports the note domain model from the notes feature instead of a UI components folder.
import {
  createEntityId,
  createNoteDraft,
  Note,
  NoteChecklistItem,
} from "../model/noteModel";

// Describes the Redux state owned by the notes feature.
type NotesState = {
  items: Note[];
  hydrated: boolean;
};

// Seeds the app with a few realistic notes so the notes experience is useful on first launch.
const sampleNotes: Note[] = [
  createNoteDraft({
    id: "note-sample-1",
    title: "Weekly project check-in",
    content:
      "Prepare the agenda, collect blockers from the team, and summarize the next release goals.",
    labels: ["Work"],
    folder: "Projects",
    pinned: true,
    textStyle: "focus",
    coverStyle: "ocean",
    createdAt: "2026-04-05T08:00:00.000Z",
    updatedAt: "2026-04-08T06:30:00.000Z",
  }),
  createNoteDraft({
    id: "note-sample-2",
    title: "Workout reset",
    content:
      "Keep the warmup light, focus on core stability, and log the recovery session after training.",
    labels: ["Personal"],
    folder: "Workout",
    coverStyle: "forest",
    createdAt: "2026-04-03T10:15:00.000Z",
    updatedAt: "2026-04-07T18:15:00.000Z",
  }),
  createNoteDraft({
    id: "note-sample-3",
    title: "Homework checklist",
    labels: ["Study"],
    folder: "Homework",
    noteType: "checklist",
    textStyle: "highlight",
    coverStyle: "sunrise",
    checklist: [
      { id: "check-sample-1", text: "Finish algebra exercises", done: true },
      { id: "check-sample-2", text: "Review science notes", done: false },
      { id: "check-sample-3", text: "Pack tomorrow's bag", done: false },
    ],
    createdAt: "2026-04-02T14:00:00.000Z",
    updatedAt: "2026-04-06T20:10:00.000Z",
  }),
];

// Provides a predictable initial state before device storage hydration completes.
const initialState: NotesState = {
  items: sampleNotes,
  hydrated: false,
};

// Refreshes the updated timestamp whenever a note changes.
function withUpdatedTimestamp(note: Note) {
  return {
    ...note,
    updatedAt: new Date().toISOString(),
  };
}

// Centralizes every note mutation so list and detail screens stay in sync.
const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // Replaces the initial sample notes with the notes restored from device storage.
    hydrateNotes: (state, action: PayloadAction<Note[] | null>) => {
      state.items =
        action.payload && action.payload.length > 0 ? action.payload : sampleNotes;
      state.hydrated = true;
    },
    // Adds a new note record to the start of the collection.
    addNote: (state, action: PayloadAction<Note>) => {
      state.items.unshift(action.payload);
    },
    // Saves all field changes coming from the note detail editor.
    updateNote: (state, action: PayloadAction<Note>) => {
      state.items = state.items.map((note) =>
        note.id === action.payload.id ? withUpdatedTimestamp(action.payload) : note,
      );
    },
    // Deletes a note permanently by id.
    deleteNote: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((note) => note.id !== action.payload);
    },
    // Creates a copy of an existing note so users can reuse a note as a template.
    duplicateNote: (state, action: PayloadAction<string>) => {
      const sourceNote = state.items.find((note) => note.id === action.payload);

      if (!sourceNote) {
        return;
      }

      state.items.unshift(
        createNoteDraft({
          ...sourceNote,
          id: createEntityId("note"),
          title: `${sourceNote.title || "Untitled note"} (Copy)`,
          checklist: sourceNote.checklist.map((item) => ({
            ...item,
            id: createEntityId("check"),
          })),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      );
    },
    // Toggles the pin state so important notes can stay at the top.
    togglePinNote: (state, action: PayloadAction<string>) => {
      state.items = state.items.map((note) =>
        note.id === action.payload
          ? withUpdatedTimestamp({ ...note, pinned: !note.pinned })
          : note,
      );
    },
    // Toggles the lock flag so locked-note filters have real data to work with.
    toggleLockNote: (state, action: PayloadAction<string>) => {
      state.items = state.items.map((note) =>
        note.id === action.payload
          ? withUpdatedTimestamp({ ...note, locked: !note.locked })
          : note,
      );
    },
    // Replaces the checklist rows for one note after checklist editing.
    updateChecklist: (
      state,
      action: PayloadAction<{ noteId: string; checklist: NoteChecklistItem[] }>,
    ) => {
      state.items = state.items.map((note) =>
        note.id === action.payload.noteId
          ? withUpdatedTimestamp({
              ...note,
              checklist: action.payload.checklist,
              noteType: "checklist",
            })
          : note,
      );
    },
  },
});

export const {
  hydrateNotes,
  addNote,
  updateNote,
  deleteNote,
  duplicateNote,
  togglePinNote,
  toggleLockNote,
  updateChecklist,
} = notesSlice.actions;

export default notesSlice.reducer;
