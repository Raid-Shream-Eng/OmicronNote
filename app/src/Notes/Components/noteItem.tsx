/**
 * Student Guide:
 * This file renders one note preview card in either the recent-notes row or the full note list.
 * It displays the cover preview, title, preview text, metadata, labels, and quick actions.
 * This component is a good place to study how one domain object gets transformed into UI.
 * It also demonstrates how translated labels and persisted values are mapped together.
 */
import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../i18n";
// Imports the shared note domain model from the feature layer instead of a components-local file.
import { getNotePreview, Note } from "../../features/notes/model/noteModel";
import styles from "./style";

type NoteItemProps = {
  note: Note;
  onOpenNote: (id: string) => void;
  onDuplicateNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onTogglePinNote: (id: string) => void;
  variant?: "recent" | "default";
};

// Maps persisted folder values to translation keys so note cards can localize labels cleanly.
const folderTranslationKey = {
  Inbox: "folderInbox",
  Homework: "folderHomework",
  Workout: "folderWorkout",
  Projects: "folderProjects",
} as const;

// Maps persisted label values to translation keys so label chips localize correctly.
const labelTranslationKey = {
  Personal: "labelPersonal",
  Work: "labelWork",
  Study: "labelStudy",
  Ideas: "labelIdeas",
} as const;

// Maps persisted note types to translation keys so type badges localize correctly.
const typeTranslationKey = {
  text: "typeText",
  checklist: "typeChecklist",
} as const;

// Maps each cover preset to a color and emoji so notes get a visible thumbnail.
const coverStyles = {
  sunrise: { backgroundColor: "#fef3c7", emoji: "🌤" },
  ocean: { backgroundColor: "#dbeafe", emoji: "🌊" },
  forest: { backgroundColor: "#dcfce7", emoji: "🌿" },
} as const;

export function NoteItem({
  note,
  onOpenNote,
  onDuplicateNote,
  onDeleteNote,
  onTogglePinNote,
  variant = "default",
}: NoteItemProps) {
  // Reads the active language so note cards mirror correctly in RTL layouts.
  const { t, i18n } = useTranslation("notes");
  const rtl = isRTL(i18n.resolvedLanguage);

  // Resolves the cover preview appearance from the note cover preset.
  const coverStyle = coverStyles[note.coverStyle];

  // Builds a readable updated-date string for note cards.
  const updatedLabel = new Date(note.updatedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <Pressable
      // Opening a note moves the user to the full note detail editor.
      onPress={() => onOpenNote(note.id)}
      style={[
        styles.noteCard,
        note.pinned && styles.noteCardPinned,
        variant === "recent" && styles.recentCard,
      ]}
    >
      {/* Groups the cover thumbnail, preview content, and quick actions in one row. */}
      <View style={[styles.noteTopRow, rtl && styles.noteTopRowRtl]}>
        <View style={[styles.coverCard, { backgroundColor: coverStyle.backgroundColor }]}>
          <Text style={styles.coverEmoji}>{coverStyle.emoji}</Text>
        </View>
        <View style={[styles.noteMain, rtl && styles.noteMainRtl]}>
          <Text
            numberOfLines={1}
            style={[
              styles.noteTitle,
              note.textStyle === "highlight" && styles.noteTitleHighlight,
              note.textStyle === "focus" && styles.noteTitleFocus,
              rtl ? styles.textRtl : styles.textLtr,
            ]}
          >
            {note.title || t("untitledNote")}
          </Text>
          <Text
            numberOfLines={3}
            style={[styles.notePreview, rtl ? styles.textRtl : styles.textLtr]}
          >
            {getNotePreview(note, t("previewFallback"))}
          </Text>
        </View>
        <View style={[styles.noteActions, styles.noteActionsVertical]}>
          <Pressable
            // Lets users pin and unpin notes directly from the list card.
            onPress={() => onTogglePinNote(note.id)}
            style={styles.iconButton}
          >
            <Feather
              name={note.pinned ? "bookmark" : "bookmark"}
              size={16}
              color={note.pinned ? "#111111" : "#8c8c8c"}
            />
          </Pressable>
          <Pressable
            // Creates a quick copy of the current note card.
            onPress={() => onDuplicateNote(note.id)}
            style={styles.iconButton}
          >
            <Feather name="copy" size={16} color="#8c8c8c" />
          </Pressable>
          <Pressable
            // Removes the note directly from the list card.
            onPress={() => onDeleteNote(note.id)}
            style={styles.iconButton}
          >
            <Feather name="trash-2" size={16} color="#b91c1c" />
          </Pressable>
        </View>
      </View>
      {/* Shows the folder, note type, lock status, and update date at a glance. */}
      <View style={[styles.noteMetaRow, rtl && styles.noteMetaRowRtl]}>
        <View style={styles.metaBadge}>
          <Text style={styles.metaBadgeText}>{t(folderTranslationKey[note.folder])}</Text>
        </View>
        <View style={styles.metaBadge}>
          <Text style={styles.metaBadgeText}>{t(typeTranslationKey[note.noteType])}</Text>
        </View>
        {note.locked ? (
          <View style={styles.metaBadge}>
            <Text style={styles.metaBadgeText}>{t("lockedBadge")}</Text>
          </View>
        ) : null}
        <View style={styles.metaBadge}>
          <Text style={styles.metaBadgeText}>{t("updatedOn", { date: updatedLabel })}</Text>
        </View>
      </View>
      {/* Shows the labels attached to the note for quick scanning and filtering context. */}
      <View style={[styles.labelRow, rtl && styles.labelRowRtl]}>
        {note.labels.map((label) => (
          <View key={label} style={styles.labelBadge}>
            <Text style={styles.labelBadgeText}>{t(labelTranslationKey[label])}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}
