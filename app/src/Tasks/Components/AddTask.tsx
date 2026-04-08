import { colors } from "@/app/src/Theme/color";
import styles from "./style";
import { RefObject } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

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
  // Prevents adding empty or whitespace-only tasks.
  const isDisabled = value.trim().length === 0;

  return (
    <View style={styles.composerCard}>
      {/* Introduces the task composer section. */}
      <Text style={styles.composerTitle}>Add a new task</Text>
      {/* Brief guidance to keep task titles easy to scan. */}
      <Text style={styles.composerSubtitle}>
        Keep it short and clear so it is easy to scan later.
      </Text>
      {/* Multi-line input for entering a new task title. */}
      <TextInput
        ref={inputRef}
        multiline
        numberOfLines={3}
        placeholder="Write a new task"
        placeholderTextColor={colors.atractive}
        style={styles.textInput}
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
        <Text style={styles.addButtonText}>Add task</Text>
      </Pressable>
    </View>
  );
}
