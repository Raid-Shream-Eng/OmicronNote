import { RefObject } from "react";
import { Feather } from "@expo/vector-icons";
import { Pressable, Text, TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../i18n";
import styles from "./style";

type AddNoteProps = {
  query: string;
  onChangeQuery: (text: string) => void;
  onCreateNote: () => void;
  onClearSearch: () => void;
  inputRef?: RefObject<TextInput | null>;
};

export function AddNote({
  query,
  onChangeQuery,
  onCreateNote,
  onClearSearch,
  inputRef,
}: AddNoteProps) {
  const { t, i18n } = useTranslation("notes");
  const rtl = isRTL(i18n.resolvedLanguage);

  return (
    <View style={[styles.addNoteCard, rtl && styles.addNoteCardRtl]}>
      <Text style={[styles.addNoteTitle, rtl ? styles.textRtl : styles.textLtr]}>
        {t("searchTitle")}
      </Text>
      <Text style={[styles.addNoteSubtitle, rtl ? styles.textRtl : styles.textLtr]}>
        {t("searchSubtitle")}
      </Text>
      <View style={[styles.searchInputRow, rtl && styles.searchInputRowRtl]}>
        <Feather name="search" size={18} color="#8c8c8c" />
        <TextInput
          ref={inputRef}
          placeholder={t("searchPlaceholder")}
          placeholderTextColor="#8c8c8c"
          style={[styles.searchInput, rtl ? styles.textRtl : styles.textLtr]}
          value={query}
          onChangeText={onChangeQuery}
        />
      </View>
      <View style={[styles.actionRow, rtl && styles.actionRowRtl]}>
        <Pressable onPress={onCreateNote} style={styles.primaryButton}>
          <Text
            style={[styles.primaryButtonText, rtl ? styles.textRtl : styles.textLtr]}
          >
            {t("newNote")}
          </Text>
        </Pressable>
        <Pressable onPress={onClearSearch} style={styles.secondaryButton}>
          <Text
            style={[
              styles.secondaryButtonText,
              rtl ? styles.textRtl : styles.textLtr,
            ]}
          >
            {t("clearSearch")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
