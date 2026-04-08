/**
 * Student Guide:
 * This file renders the summary header inside the notes screen content panel.
 * It shows note counts, pinned counts, and recent activity in a friendly card.
 * The component reads the notes translation namespace and mirrors layout for RTL.
 * It is a focused summary component rather than a full screen.
 */
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../i18n";
import styles from "./style";

type NoteHeaderProps = {
  noteCount: number;
  pinnedCount: number;
  recentCount: number;
};

export function NoteHeader({
  noteCount,
  pinnedCount,
  recentCount,
}: NoteHeaderProps) {
  // Reads the active language so the summary card aligns correctly in RTL.
  const { t, i18n } = useTranslation("notes");
  const rtl = isRTL(i18n.resolvedLanguage);

  // Adjusts the label so the summary line reads naturally with one or many notes.
  const noteLabel = t("noteLabel", { count: noteCount });

  return (
    <View style={[styles.headerCard, rtl && styles.headerCardRtl]}>
      {/* Gives the notes screen a lightweight section label above the main heading. */}
      <Text style={[styles.headerEyebrow, rtl ? styles.textRtl : styles.textLtr]}>
        {t("headerEyebrow")}
      </Text>
      {/* Main title for the notes destination. */}
      <Text style={[styles.headerTitle, rtl ? styles.textRtl : styles.textLtr]}>
        {t("headerTitle")}
      </Text>
      {/* Displays the current number of notes. */}
      <Text style={[styles.headerCount, rtl ? styles.textRtl : styles.textLtr]}>
        {noteCount} {noteLabel}
      </Text>
      {/* Summarizes the pinned and recent-note counts at a glance. */}
      <Text style={[styles.headerHint, rtl ? styles.textRtl : styles.textLtr]}>
        {t("headerHint", { pinned: pinnedCount, recent: recentCount })}
      </Text>
    </View>
  );
}
