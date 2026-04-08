import { isRTL } from "../..//i18n";
import { colors } from "@/app/src/Theme/color";
import styles from "./style";
import { RefObject } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";

type AddTaskProps = {
  value: string;
  onChangeText: (text: string) => void;
  onAddTask: () => void;
  // Lets the screen focus the input from the empty state button.
  inputRef?: RefObject<TextInput | null>;
};

export function AddTask({
  value,
  onChangeText,
  onAddTask,
  inputRef,
}: AddTaskProps) {
  // Reads task translations so the composer labels and placeholder localize correctly.
  const { t, i18n } = useTranslation("tasks");
  const rtl = isRTL(i18n.resolvedLanguage);
  // Prevents adding empty or whitespace-only tasks.
  const isDisabled = value.trim().length === 0;

  return (
    <View style={[styles.composerCard, rtl && styles.composerCardRtl]}>
      {/* Introduces the task composer section. */}
      <Text style={[styles.composerTitle, rtl ? styles.textRtl : styles.textLtr]}>
        {t("composerTitle")}
      </Text>
      {/* Brief guidance to keep task titles easy to scan. */}
      <Text style={[styles.composerSubtitle, rtl ? styles.textRtl : styles.textLtr]}>
        {t("composerSubtitle")}
      </Text>
      {/* Multi-line input for entering a new task title. */}
      <TextInput
        ref={inputRef}
        multiline
        numberOfLines={3}
        // Uses the localized placeholder for the current language.
        placeholder={t("composerPlaceholder")}
        placeholderTextColor={colors.atractive}
        style={[styles.textInput, rtl && styles.textInputRtl]}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAddTask}
      />
      {/* Primary action for adding the typed task to the list. */}
      <Pressable
        accessibilityRole="button"
        disabled={isDisabled}
        onPress={onAddTask}
        style={[styles.addButton, isDisabled && styles.addButtonDisabled]}
      >
        <Text style={[styles.addButtonText, rtl ? styles.textRtl : styles.textLtr]}>
          {t("addTask")}
        </Text>
      </Pressable>
    </View>
  );
}
