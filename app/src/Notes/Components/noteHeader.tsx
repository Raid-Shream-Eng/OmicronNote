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
  const { t, i18n } = useTranslation("notes");
  const rtl = isRTL(i18n.resolvedLanguage);
  const noteLabel = t("noteLabel", { count: noteCount });

  return (
    <View style={[styles.headerCard, rtl && styles.headerCardRtl]}>
      <Text style={[styles.headerEyebrow, rtl ? styles.textRtl : styles.textLtr]}>
        {t("headerEyebrow")}
      </Text>
      <Text style={[styles.headerTitle, rtl ? styles.textRtl : styles.textLtr]}>
        {t("headerTitle")}
      </Text>
      <Text style={[styles.headerCount, rtl ? styles.textRtl : styles.textLtr]}>
        {noteCount} {noteLabel}
      </Text>
      <Text style={[styles.headerHint, rtl ? styles.textRtl : styles.textLtr]}>
        {t("headerHint", { pinned: pinnedCount, recent: recentCount })}
      </Text>
    </View>
  );
}
