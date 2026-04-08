/**
 * Student Guide:
 * This file is the main notes workspace screen.
 * It reads notes from Redux, applies searching, filtering, sorting, and recent-note grouping,
 * then passes the final data into presentational components.
 * This screen is a good example of a "container screen" that coordinates feature state and UI pieces.
 */
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomNav } from "../Navigation/bottomNav";
import { HeaderProfile } from "../Landing/header";
import landingStyles from "../Landing/style";
import { AddNote } from "../Notes/Components/addNote";
import { NoteHeader } from "../Notes/Components/noteHeader";
import { NoteList } from "../Notes/Components/noteList";
import noteStyles from "../Notes/Components/style";
// Imports note filters and types from the notes feature model instead of a UI components folder.
import {
  NOTE_FOLDERS,
  NOTE_LABELS,
  NOTE_SORT_OPTIONS,
  Note,
  NoteFolder,
  NoteLabel,
  NoteSortOption,
} from "../features/notes/model/noteModel";
import { isRTL } from "../i18n";
// Imports note actions from the notes feature state so the screen depends on feature state, not generic store paths.
import {
  deleteNote,
  duplicateNote,
  togglePinNote,
} from "../features/notes/state/notesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const profileImage = require("../../../assets/images/icon.png");

// Defines the quick filter options available on the notes screen.
type QuickFilter = "all" | "pinned" | "locked" | "checklist";

// Converts the raw sort key into a translation key so sort chips localize cleanly.
function getSortLabelKey(sortOption: NoteSortOption) {
  switch (sortOption) {
    case "created":
      return "sortCreated";
    case "title":
      return "sortTitle";
    case "type":
      return "sortType";
    default:
      return "sortUpdated";
  }
}

// Converts the quick-filter key into a translation key so filter chips localize cleanly.
function getQuickFilterLabelKey(filterOption: QuickFilter) {
  switch (filterOption) {
    case "pinned":
      return "filterPinned";
    case "locked":
      return "filterLocked";
    case "checklist":
      return "filterChecklist";
    default:
      return "filterAll";
  }
}

// Converts the persisted folder value into a translation key for folder chips.
function getFolderLabelKey(folder: "All" | NoteFolder) {
  switch (folder) {
    case "Inbox":
      return "folderInbox";
    case "Homework":
      return "folderHomework";
    case "Workout":
      return "folderWorkout";
    case "Projects":
      return "folderProjects";
    default:
      return "filterAll";
  }
}

// Converts the persisted label value into a translation key for label chips.
function getLabelKey(label: "All" | NoteLabel) {
  switch (label) {
    case "Personal":
      return "labelPersonal";
    case "Work":
      return "labelWork";
    case "Study":
      return "labelStudy";
    case "Ideas":
      return "labelIdeas";
    default:
      return "filterAll";
  }
}

// Sorts notes while keeping pinned items at the top, then applying the active sort mode.
function sortNotes(notes: Note[], sortOption: NoteSortOption) {
  return [...notes].sort((left, right) => {
    if (left.pinned !== right.pinned) {
      return left.pinned ? -1 : 1;
    }

    switch (sortOption) {
      case "created":
        return right.createdAt.localeCompare(left.createdAt);
      case "title":
        return left.title.localeCompare(right.title);
      case "type":
        return left.noteType.localeCompare(right.noteType);
      default:
        return right.updatedAt.localeCompare(left.updatedAt);
    }
  });
}

export function NotesScreen() {
  // Reads the current language so notes layout mirrors correctly in RTL.
  const { t, i18n } = useTranslation(["landing", "notes"]);
  const rtl = isRTL(i18n.resolvedLanguage);

  // Reads note data from Redux so the list and detail screens stay in sync.
  const notes = useAppSelector((state) => state.notes.items);
  const dispatch = useAppDispatch();

  // Holds the search query used to filter notes by title and content.
  const [query, setQuery] = useState("");
  // Tracks the selected label filter on the notes screen.
  const [activeLabel, setActiveLabel] = useState<"All" | NoteLabel>("All");
  // Tracks the selected folder filter on the notes screen.
  const [activeFolder, setActiveFolder] = useState<"All" | NoteFolder>("All");
  // Tracks the quick filter for pinned, locked, or checklist notes.
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  // Tracks the selected sort mode for the notes list.
  const [sortOption, setSortOption] = useState<NoteSortOption>("updated");
  // Keeps a handle to the search field for empty-state focus or future enhancements.
  const searchInputRef = useRef<TextInput>(null);

  // Builds the recent-notes section from the most recently updated notes.
  const recentNotes = [...notes]
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .slice(0, 3);

  // Filters notes using search, folder, label, and quick-filter selections.
  const filteredNotes = notes.filter((note) => {
    const normalizedQuery = query.trim().toLowerCase();

    const matchesQuery =
      normalizedQuery.length === 0 ||
      note.title.toLowerCase().includes(normalizedQuery) ||
      note.content.toLowerCase().includes(normalizedQuery) ||
      note.checklist.some((item) =>
        item.text.toLowerCase().includes(normalizedQuery),
      );

    const matchesLabel = activeLabel === "All" || note.labels.includes(activeLabel);
    const matchesFolder = activeFolder === "All" || note.folder === activeFolder;

    const matchesQuickFilter =
      quickFilter === "all" ||
      (quickFilter === "pinned" && note.pinned) ||
      (quickFilter === "locked" && note.locked) ||
      (quickFilter === "checklist" && note.noteType === "checklist");

    return matchesQuery && matchesLabel && matchesFolder && matchesQuickFilter;
  });

  // Applies the active sort order after filtering the notes collection.
  const sortedNotes = sortNotes(filteredNotes, sortOption);

  // Counts pinned notes for the summary header.
  const pinnedCount = notes.filter((note) => note.pinned).length;

  function handleCreateNote() {
    // Opens the note detail editor in create mode without pre-creating a blank note in Redux.
    router.push("/note-details");
  }

  function handleOpenNote(noteId: string) {
    // Opens the detail screen for the selected note id.
    router.push(`/note-details?noteId=${noteId}`);
  }

  function handleDuplicateNote(noteId: string) {
    // Creates a copy of the selected note directly from the list card.
    dispatch(duplicateNote(noteId));
  }

  function handleDeleteNote(noteId: string) {
    // Deletes the selected note directly from the list card.
    dispatch(deleteNote(noteId));
  }

  function handleTogglePinNote(noteId: string) {
    // Pins or unpins the selected note so important notes stay at the top.
    dispatch(togglePinNote(noteId));
  }

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={landingStyles.safeArea}>
        <View style={landingStyles.phoneShell}>
          {/* Splits the notes screen into scrollable content and a fixed bottom navigation bar. */}
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={landingStyles.content}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* Reuses the shared landing header so the notes screen feels like part of the same app. */}
              <HeaderProfile
                name={t("profileName")}
                profileImage={profileImage}
                resumeRoute="/notes"
              />

              {/* Introduces the note workspace under the shared app header. */}
              <View style={[noteStyles.screenIntro, rtl && noteStyles.screenIntroRtl]}>
                <Text
                  style={[
                    noteStyles.screenEyebrow,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  {t("notes:introEyebrow")}
                </Text>
                <Text
                  style={[
                    noteStyles.screenDescription,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  {t("notes:introDescription")}
                </Text>
              </View>

              {/* Wraps the main notes experience in the same white panel style used elsewhere. */}
              <View style={landingStyles.previewPanel}>
                <NoteHeader
                  noteCount={notes.length}
                  pinnedCount={pinnedCount}
                  recentCount={recentNotes.length}
                />

                <AddNote
                  query={query}
                  onChangeQuery={setQuery}
                  onCreateNote={handleCreateNote}
                  onClearSearch={() => setQuery("")}
                  inputRef={searchInputRef}
                />

                {/* Groups sort, quick filters, labels, and folders above the list. */}
                <View style={noteStyles.controlsCard}>
                  <View style={noteStyles.controlsGroup}>
                    <Text
                      style={[
                        noteStyles.controlsLabel,
                        rtl ? noteStyles.textRtl : noteStyles.textLtr,
                      ]}
                    >
                      {t("notes:quickFilters")}
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={noteStyles.chipsScrollContent}
                    >
                      {(["all", "pinned", "locked", "checklist"] as QuickFilter[]).map(
                        (filterOption) => (
                          <Pressable
                            key={filterOption}
                            onPress={() => setQuickFilter(filterOption)}
                            style={[
                              noteStyles.chip,
                              quickFilter === filterOption && noteStyles.chipActive,
                            ]}
                          >
                            <Text
                              style={[
                                noteStyles.chipText,
                                quickFilter === filterOption &&
                                  noteStyles.chipTextActive,
                              ]}
                            >
                              {t(`notes:${getQuickFilterLabelKey(filterOption)}`)}
                            </Text>
                          </Pressable>
                        ),
                      )}
                    </ScrollView>
                  </View>

                  <View style={noteStyles.controlsGroup}>
                    <Text
                      style={[
                        noteStyles.controlsLabel,
                        rtl ? noteStyles.textRtl : noteStyles.textLtr,
                      ]}
                    >
                      {t("notes:sortNotes")}
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={noteStyles.chipsScrollContent}
                    >
                      {NOTE_SORT_OPTIONS.map((option) => (
                        <Pressable
                          key={option}
                          onPress={() => setSortOption(option)}
                          style={[
                            noteStyles.chip,
                            sortOption === option && noteStyles.chipActive,
                          ]}
                        >
                          <Text
                            style={[
                              noteStyles.chipText,
                              sortOption === option && noteStyles.chipTextActive,
                            ]}
                          >
                            {t(`notes:${getSortLabelKey(option)}`)}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>

                  <View style={noteStyles.controlsGroup}>
                    <Text
                      style={[
                        noteStyles.controlsLabel,
                        rtl ? noteStyles.textRtl : noteStyles.textLtr,
                      ]}
                    >
                      {t("notes:labelsTitle")}
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={noteStyles.chipsScrollContent}
                    >
                      {(["All", ...NOTE_LABELS] as const).map((labelOption) => (
                        <Pressable
                          key={labelOption}
                          onPress={() => setActiveLabel(labelOption)}
                          style={[
                            noteStyles.chip,
                            activeLabel === labelOption && noteStyles.chipActive,
                          ]}
                        >
                          <Text
                            style={[
                              noteStyles.chipText,
                              activeLabel === labelOption && noteStyles.chipTextActive,
                            ]}
                          >
                            {t(`notes:${getLabelKey(labelOption)}`)}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>

                  <View
                    style={[
                      noteStyles.controlsGroup,
                      noteStyles.controlsGroupLast,
                    ]}
                  >
                    <Text
                      style={[
                        noteStyles.controlsLabel,
                        rtl ? noteStyles.textRtl : noteStyles.textLtr,
                      ]}
                    >
                      {t("notes:foldersTitle")}
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={noteStyles.chipsScrollContent}
                    >
                      {(["All", ...NOTE_FOLDERS] as const).map((folderOption) => (
                        <Pressable
                          key={folderOption}
                          onPress={() => setActiveFolder(folderOption)}
                          style={[
                            noteStyles.chip,
                            activeFolder === folderOption && noteStyles.chipActive,
                          ]}
                        >
                          <Text
                            style={[
                              noteStyles.chipText,
                              activeFolder === folderOption && noteStyles.chipTextActive,
                            ]}
                          >
                            {t(`notes:${getFolderLabelKey(folderOption)}`)}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>
                </View>

                <NoteList
                  recentNotes={recentNotes}
                  notes={sortedNotes}
                  onOpenNote={handleOpenNote}
                  onDuplicateNote={handleDuplicateNote}
                  onDeleteNote={handleDeleteNote}
                  onTogglePinNote={handleTogglePinNote}
                />
              </View>
            </ScrollView>
            <BottomNav />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
