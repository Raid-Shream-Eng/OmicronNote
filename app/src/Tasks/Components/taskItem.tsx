import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import styles from "./style";
import type { Tasks } from "./types";

type TaskItemProps = {
  task: Tasks;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
};

export default function TaskItem({
  task,
  onToggleTask,
  onDeleteTask,
}: TaskItemProps) {
  return (
    <View style={styles.taskCard}>
      {/* Tapping the checkbox toggles the task between pending and completed. */}
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.completed }}
        onPress={() => onToggleTask(task.id)}
        style={[
          styles.checkbox,
          task.completed && styles.checkboxCompleted,
        ]}
      >
        {task.completed ? <Feather name="check" size={16} color="#101010" /> : null}
      </Pressable>

      {/* The middle section shows the task title and its current state. */}
      <View style={styles.taskBody}>
        <Text
          style={[
            styles.taskTitle,
            task.completed && styles.taskTitleCompleted,
          ]}
        >
          {task.title}
        </Text>
        <Text style={styles.taskStatus}>
          {task.completed ? "Completed" : "Pending"}
        </Text>
      </View>

      {/* Separate delete action keeps removal explicit and easy to reach. */}
      <Pressable
        accessibilityLabel={`Delete ${task.title}`}
        onPress={() => onDeleteTask(task.id)}
        style={styles.deleteButton}
      >
        <Feather name="trash-2" size={18} color="#f5f5f5" />
      </Pressable>
    </View>
  );
}
