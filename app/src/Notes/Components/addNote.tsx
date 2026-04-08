/**
 * Student Guide:
 * This file renders the toolbar at the top of the notes screen.
 * It combines note search and "create new note" actions in one reusable card.
 * The component does not own note data itself; it only receives the current query and callbacks.
 * This separation makes the screen easier to test and the component easier to reuse.
 */
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
  // Lets the screen focus the search input from notes empty states.
  inputRef?: RefObject<TextInput | null>;
};

export function AddNote({
  query,
  onChangeQuery,
  onCreateNote,
  onClearSearch,
  inputRef,
}: AddNoteProps) {
  // Reads the active language so alignment switches correctly in RTL layouts.
  const { t, i18n } = useTranslation("notes");
  const rtl = isRTL(i18n.resolvedLanguage);

  return (
    <View style={[styles.addNoteCard, rtl && styles.addNoteCardRtl]}>
      {/* Explains that this card handles both search and note creation. */}
      <Text style={[styles.addNoteTitle, rtl ? styles.textRtl : styles.textLtr]}>
        {t("searchTitle")}
      </Text>
      {/* Gives the user a quick hint about how this toolbar works. */}
      <Text style={[styles.addNoteSubtitle, rtl ? styles.textRtl : styles.textLtr]}>
        {t("searchSubtitle")}
      </Text>
      {/* Wraps the search icon and input inside one rounded surface. */}
      <View style={[styles.searchInputRow, rtl && styles.searchInputRowRtl]}>
        <Feather name="search" size={18} color="#8c8c8c" />
        <TextInput
          ref={inputRef}
          // Lets the search field filter notes by title and content.
          placeholder={t("searchPlaceholder")}
          placeholderTextColor="#8c8c8c"
          style={[styles.searchInput, rtl ? styles.textRtl : styles.textLtr]}
          value={query}
          onChangeText={onChangeQuery}
        />
      </View>
      {/* Groups the create and clear actions together. */}
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
