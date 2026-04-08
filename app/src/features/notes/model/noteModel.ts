/**
 * Student Guide:
 * This file is the notes feature domain model.
 * It defines the note data shape, constants such as labels and folders,
 * helper factories for creating notes, and preview logic shared by the UI.
 * This file is intentionally UI-agnostic, which means screens, components,
 * storage, and Redux can all depend on it without creating circular design problems.
 */
// Defines every label a note can belong to so filters and editors stay consistent.
export const NOTE_LABELS = ["Personal", "Work", "Study", "Ideas"] as const;

// Defines the folder options used to organize notes across the app.
export const NOTE_FOLDERS = [
  "Inbox",
  "Homework",
  "Workout",
  "Projects",
] as const;

// Defines the supported note content modes.
export const NOTE_TYPES = ["text", "checklist"] as const;

// Defines the lightweight formatting presets used by the note editor.
export const NOTE_TEXT_STYLES = ["plain", "highlight", "focus"] as const;

// Defines the visual cover presets used for note thumbnails and detail headers.
export const NOTE_COVER_STYLES = ["sunrise", "ocean", "forest"] as const;

// Defines the sort options available on the notes screen.
export const NOTE_SORT_OPTIONS = [
  "updated",
  "created",
  "title",
  "type",
] as const;

// Creates string literal types from the shared label options above.
export type NoteLabel = (typeof NOTE_LABELS)[number];

// Creates string literal types from the shared folder options above.
export type NoteFolder = (typeof NOTE_FOLDERS)[number];

// Creates string literal types from the shared note type options above.
export type NoteType = (typeof NOTE_TYPES)[number];

// Creates string literal types from the shared formatting options above.
export type NoteTextStyle = (typeof NOTE_TEXT_STYLES)[number];

// Creates string literal types from the shared cover options above.
export type NoteCoverStyle = (typeof NOTE_COVER_STYLES)[number];

// Creates string literal types from the shared sort options above.
export type NoteSortOption = (typeof NOTE_SORT_OPTIONS)[number];

// Describes one checklist row inside checklist notes.
export type NoteChecklistItem = {
  id: string;
  text: string;
  done: boolean;
};

// Describes the full note record shared by list, detail, filters, and persistence.
export type Note = {
  id: string;
  title: string;
  content: string;
  labels: NoteLabel[];
  folder: NoteFolder;
  pinned: boolean;
  locked: boolean;
  noteType: NoteType;
  textStyle: NoteTextStyle;
  coverStyle: NoteCoverStyle;
  checklist: NoteChecklistItem[];
  createdAt: string;
  updatedAt: string;
};

// Generates a stable-ish id for newly created notes and checklist rows.
export function createEntityId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Builds a new note with sensible defaults so creation works from a single helper.
export function createNoteDraft(overrides: Partial<Note> = {}): Note {
  const timestamp = new Date().toISOString();

  return {
    id: createEntityId("note"),
    title: "",
    content: "",
    labels: ["Personal"],
    folder: "Inbox",
    pinned: false,
    locked: false,
    noteType: "text",
    textStyle: "plain",
    coverStyle: "sunrise",
    checklist: [],
    createdAt: timestamp,
    updatedAt: timestamp,
    ...overrides,
  };
}

// Accepts a translated fallback so preview cards do not hardcode English in the domain helper.
export function getNotePreview(note: Note, fallbackText = "No preview available yet.") {
  const checklistPreview = note.checklist
    .slice(0, 2)
    .map((item) => `${item.done ? "[x]" : "[ ]"} ${item.text}`)
    .join("  ");

  const rawPreview = note.noteType === "checklist" ? checklistPreview : note.content;

  return rawPreview.trim().slice(0, 120) || fallbackText;
}
