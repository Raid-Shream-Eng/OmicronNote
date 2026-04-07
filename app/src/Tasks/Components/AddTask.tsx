import { colors } from "@/app/src/Theme/color";
import  styles  from "./style";
import { Pressable, Text, TextInput, View } from "react-native";

type AddTaskProps = {
    value : string;
    onChangeText : (text: string) => void;
    onAddTask : () => void;
};

export function AddTask({
  value,
  onChangeText,
  onAddTask,
}: AddTaskProps) {
const isDisabled = value.trim().length === 0;

  return (
    <View>
        <TextInput
        multiline
        numberOfLines={3}
        
        placeholder="Write a new task"
        placeholderTextColor={colors.atractive}
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAddTask}
        />
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
