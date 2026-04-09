import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import landingStyles from "../Landing/style";
import noteStyles from "../Notes/Components/style";
import {
  createEntityId,
  createNoteDraft,
  NOTE_COVER_STYLES,
  NOTE_FOLDERS,
  NOTE_LABELS,
  NOTE_TEXT_STYLES,
  NOTE_TYPES,
  NoteChecklistItem,
  NoteCoverStyle,
  NoteFolder,
  NoteLabel,
  NoteTextStyle,
  NoteType,
} from "../features/notes/model/noteModel";
import { isRTL } from "../i18n";
import {
  addNote,
  deleteNote,
  duplicateNote,
  updateNote,
} from "../features/notes/state/notesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
const coverOptions = {
  sunrise: { backgroundColor: "#fef3c7", emoji: "Ã°Å¸Å’Â¤" },
  ocean: { backgroundColor: "#dbeafe", emoji: "Ã°Å¸Å’Å " },
  forest: { backgroundColor: "#dcfce7", emoji: "Ã°Å¸Å’Â¿" },
} as const;

export function NoteDetailsScreen() {
  const params = useLocalSearchParams<{ noteId?: string }>();
  const noteId = typeof params.noteId === "string" ? params.noteId : undefined;
  const { i18n } = useTranslation();
  const rtl = isRTL(i18n.resolvedLanguage);
  const existingNote = useAppSelector((state) =>
    state.notes.items.find((item) => item.id === noteId),
  );
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(existingNote?.title ?? "");
  const [content, setContent] = useState(existingNote?.content ?? "");
  const [folder, setFolder] = useState<NoteFolder>(existingNote?.folder ?? "Inbox");
  const [labels, setLabels] = useState<NoteLabel[]>(existingNote?.labels ?? ["Personal"]);
  const [pinned, setPinned] = useState(existingNote?.pinned ?? false);
  const [locked, setLocked] = useState(existingNote?.locked ?? false);
  const [noteType, setNoteType] = useState<NoteType>(existingNote?.noteType ?? "text");
  const [textStyle, setTextStyle] = useState<NoteTextStyle>(
    existingNote?.textStyle ?? "plain",
  );
  const [coverStyle, setCoverStyle] = useState<NoteCoverStyle>(
    existingNote?.coverStyle ?? "sunrise",
  );
  const [checklist, setChecklist] = useState<NoteChecklistItem[]>(
    existingNote?.checklist ?? [],
  );
  const [checklistInput, setChecklistInput] = useState("");

  useEffect(() => {
    if (!existingNote) {
      return;
    }

    setTitle(existingNote.title);
    setContent(existingNote.content);
    setFolder(existingNote.folder);
    setLabels(existingNote.labels);
    setPinned(existingNote.pinned);
    setLocked(existingNote.locked);
    setNoteType(existingNote.noteType);
    setTextStyle(existingNote.textStyle);
    setCoverStyle(existingNote.coverStyle);
    setChecklist(existingNote.checklist);
  }, [existingNote]);

  function handleToggleLabel(label: NoteLabel) {
    setLabels((currentLabels) => {
      if (currentLabels.includes(label)) {
        const nextLabels = currentLabels.filter((currentLabel) => currentLabel !== label);
        return nextLabels.length > 0 ? nextLabels : currentLabels;
      }

      return [...currentLabels, label];
    });
  }

  function handleAddChecklistItem() {
    const trimmedChecklistInput = checklistInput.trim();
    if (!trimmedChecklistInput) {
      return;
    }
    setChecklist((currentChecklist) => [
      ...currentChecklist,
      { id: createEntityId("check"), text: trimmedChecklistInput, done: false },
    ]);
    setChecklistInput("");
  }

  function handleToggleChecklistItem(itemId: string) {
    setChecklist((currentChecklist) =>
      currentChecklist.map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item,
      ),
    );
  }

  function handleDeleteChecklistItem(itemId: string) {
    setChecklist((currentChecklist) =>
      currentChecklist.filter((item) => item.id !== itemId),
    );
  }

  function handleSaveNote() {
    const notePayload = createNoteDraft({
      id: existingNote?.id,
      title: title.trim() || "Untitled note",
      content: content.trim(),
      folder,
      labels,
      pinned,
      locked,
      noteType,
      textStyle,
      coverStyle,
      checklist,
      createdAt: existingNote?.createdAt,
      updatedAt: existingNote?.updatedAt,
    });
    if (existingNote) {
      dispatch(
        updateNote({
          ...notePayload,
          id: existingNote.id,
          createdAt: existingNote.createdAt,
        }),
      );
    } else {
      dispatch(addNote(notePayload));
    }
    router.replace("/notes");
  }

  function handleDuplicateNote() {
    if (!existingNote) {
      return;
    }

    dispatch(duplicateNote(existingNote.id));
    router.replace("/notes");
  }

  function handleDeleteNote() {
    if (!existingNote) {
      router.replace("/notes");
      return;
    }

    dispatch(deleteNote(existingNote.id));
    router.replace("/notes");
  }

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={landingStyles.safeArea}>
        <View style={landingStyles.phoneShell}>
          <ScrollView
            contentContainerStyle={landingStyles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={[noteStyles.editorTopBar, rtl && noteStyles.editorTopBarRtl]}>
              <Pressable onPress={() => router.back()} style={noteStyles.secondaryButton}>
                <Text
                  style={[
                    noteStyles.secondaryButtonText,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  Back
                </Text>
              </Pressable>
              <Pressable onPress={handleSaveNote} style={noteStyles.editorActionButton}>
                <Text
                  style={[
                    noteStyles.editorActionText,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  Save note
                </Text>
              </Pressable>
            </View>
            <Text style={[noteStyles.editorTitle, rtl ? noteStyles.textRtl : noteStyles.textLtr]}>
              {existingNote ? "Edit note" : "Create note"}
            </Text>
            <View style={noteStyles.editorContent}>
              <View style={noteStyles.editorCard}>
                <Text
                  style={[
                    noteStyles.editorSectionTitle,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  Cover preview
                </Text>
                <Text
                  style={[
                    noteStyles.editorSectionHint,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  Choose a visual cover so your note is easier to recognize in the list.
                </Text>
                <View style={noteStyles.coverOptionsRow}>
                  {NOTE_COVER_STYLES.map((coverOption) => (
                    <Pressable
                      key={coverOption}
                      onPress={() => setCoverStyle(coverOption)}
                      style={[
                        noteStyles.coverOption,
                        {
                          backgroundColor: coverOptions[coverOption].backgroundColor,
                        },
                        coverStyle === coverOption && noteStyles.coverOptionActive,
                      ]}
                    >
                      <Text style={noteStyles.coverEmoji}>
                        {coverOptions[coverOption].emoji}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View style={noteStyles.editorCard}>
                <Text
                  style={[
                    noteStyles.editorSectionTitle,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  Basics
                </Text>
                <TextInput
                  placeholder="Note title"
                  placeholderTextColor="#8c8c8c"
                  style={[noteStyles.editorInput, rtl ? noteStyles.textRtl : noteStyles.textLtr]}
                  value={title}
                  onChangeText={setTitle}
                />
                <TextInput
                  multiline
                  placeholder="Write your note here"
                  placeholderTextColor="#8c8c8c"
                  style={[
                    noteStyles.editorInput,
                    noteStyles.editorBodyInput,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                  value={content}
                  onChangeText={setContent}
                />
              </View>

              <View style={noteStyles.editorCard}>
                <Text
                  style={[
                    noteStyles.editorSectionTitle,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  Organization
                </Text>
                <Text
                  style={[
                    noteStyles.editorSectionHint,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  Use folders, labels, pinning, and locking to keep note collections clean.
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={noteStyles.chipsScrollContent}>
                    {NOTE_FOLDERS.map((folderOption) => (
                      <Pressable
                        key={folderOption}
                        onPress={() => setFolder(folderOption)}
                        style={[
                          noteStyles.chip,
                          folder === folderOption && noteStyles.chipActive,
                        ]}
                      >
                        <Text
                          style={[
                            noteStyles.chipText,
                            folder === folderOption && noteStyles.chipTextActive,
                          ]}
                        >
                          {folderOption}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </ScrollView>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={noteStyles.chipsScrollContent}>
                    {NOTE_LABELS.map((label) => {
                      const isSelected = labels.includes(label);

                      return (
                        <Pressable
                          key={label}
                          onPress={() => handleToggleLabel(label)}
                          style={[
                            noteStyles.chip,
                            isSelected && noteStyles.chipActive,
                          ]}
                        >
                          <Text
                            style={[
                              noteStyles.chipText,
                              isSelected && noteStyles.chipTextActive,
                            ]}
                          >
                            {label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </ScrollView>
                <View style={noteStyles.actionRow}>
                  <Pressable
                    onPress={() => setPinned((currentPinned) => !currentPinned)}
                    style={[noteStyles.chip, pinned && noteStyles.chipActive]}
                  >
                    <Text
                      style={[noteStyles.chipText, pinned && noteStyles.chipTextActive]}
                    >
                      Pinned
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setLocked((currentLocked) => !currentLocked)}
                    style={[noteStyles.chip, locked && noteStyles.chipActive]}
                  >
                    <Text
                      style={[noteStyles.chipText, locked && noteStyles.chipTextActive]}
                    >
                      Locked
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View style={noteStyles.editorCard}>
                <Text
                  style={[
                    noteStyles.editorSectionTitle,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  Content tools
                </Text>
                <Text
                  style={[
                    noteStyles.editorSectionHint,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  Switch between plain-text and checklist notes, then choose a formatting style.
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={noteStyles.chipsScrollContent}>
                    {NOTE_TYPES.map((typeOption) => (
                      <Pressable
                        key={typeOption}
                        onPress={() => setNoteType(typeOption)}
                        style={[
                          noteStyles.chip,
                          noteType === typeOption && noteStyles.chipActive,
                        ]}
                      >
                        <Text
                          style={[
                            noteStyles.chipText,
                            noteType === typeOption && noteStyles.chipTextActive,
                          ]}
                        >
                          {typeOption}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </ScrollView>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={noteStyles.chipsScrollContent}>
                    {NOTE_TEXT_STYLES.map((styleOption) => (
                      <Pressable
                        key={styleOption}
                        onPress={() => setTextStyle(styleOption)}
                        style={[
                          noteStyles.chip,
                          textStyle === styleOption && noteStyles.chipActive,
                        ]}
                      >
                        <Text
                          style={[
                            noteStyles.chipText,
                            textStyle === styleOption && noteStyles.chipTextActive,
                          ]}
                        >
                          {styleOption}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </ScrollView>
              </View>

              {noteType === "checklist" ? (
                <View style={noteStyles.editorCard}>
                  <Text
                    style={[
                      noteStyles.editorSectionTitle,
                      rtl ? noteStyles.textRtl : noteStyles.textLtr,
                    ]}
                  >
                    Checklist
                  </Text>
                  {checklist.map((item) => (
                    <View
                      key={item.id}
                      style={[noteStyles.checklistRow, rtl && noteStyles.checklistRowRtl]}
                    >
                      <Pressable onPress={() => handleToggleChecklistItem(item.id)}>
                        <Feather
                          name={item.done ? "check-square" : "square"}
                          size={18}
                          color="#111111"
                        />
                      </Pressable>
                      <Text
                        style={[
                          noteStyles.checklistText,
                          item.done && noteStyles.checklistTextDone,
                          rtl ? noteStyles.textRtl : noteStyles.textLtr,
                        ]}
                      >
                        {item.text}
                      </Text>
                      <Pressable onPress={() => handleDeleteChecklistItem(item.id)}>
                        <Feather name="trash-2" size={16} color="#b91c1c" />
                      </Pressable>
                    </View>
                  ))}
                  <TextInput
                    placeholder="Add checklist item"
                    placeholderTextColor="#8c8c8c"
                    style={[noteStyles.editorInput, rtl ? noteStyles.textRtl : noteStyles.textLtr]}
                    value={checklistInput}
                    onChangeText={setChecklistInput}
                    onSubmitEditing={handleAddChecklistItem}
                  />
                  <Pressable onPress={handleAddChecklistItem} style={noteStyles.primaryButton}>
                    <Text
                      style={[
                        noteStyles.primaryButtonText,
                        rtl ? noteStyles.textRtl : noteStyles.textLtr,
                      ]}
                    >
                      Add checklist item
                    </Text>
                  </Pressable>
                </View>
              ) : null}

              <View style={noteStyles.editorCard}>
                <Text
                  style={[
                    noteStyles.editorSectionTitle,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  Actions
                </Text>
                <View style={noteStyles.actionRow}>
                  <Pressable
                    onPress={handleDuplicateNote}
                    style={noteStyles.secondaryButton}
                  >
                    <Text
                      style={[
                        noteStyles.secondaryButtonText,
                        rtl ? noteStyles.textRtl : noteStyles.textLtr,
                      ]}
                    >
                      Duplicate note
                    </Text>
                  </Pressable>
                  <Pressable onPress={handleDeleteNote} style={noteStyles.dangerButton}>
                    <Text
                      style={[
                        noteStyles.dangerButtonText,
                        rtl ? noteStyles.textRtl : noteStyles.textLtr,
                      ]}
                    >
                      Delete note
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
