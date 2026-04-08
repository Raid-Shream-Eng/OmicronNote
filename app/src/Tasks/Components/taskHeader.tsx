import { Text, View } from "react-native";
import styles from "./style";

type TaskHeaderProps = {
  taskCount: number;
  completedCount: number;
};

export function TaskHeader({ taskCount, completedCount }: TaskHeaderProps) {
  // Adjust the label so the summary reads naturally for one or many tasks.
  const taskLabel = taskCount === 1 ? "task" : "tasks";

  return (
    <View style={styles.taskHeader}>
      {/* Gives the screen a lightweight section label above the main heading. */}
      <Text style={styles.sectionEyebrow}>Today</Text>
      {/* Main title for the tasks destination. */}
      <Text style={styles.screenTitle}>Task Board</Text>
      {/* Displays the current number of tasks. */}
      <Text style={styles.taskMeta}>
        {taskCount} {taskLabel}
      </Text>
      {/* Shows a quick progress summary based on completed tasks. */}
      <Text style={styles.taskHint}>
        {completedCount} completed, {taskCount - completedCount} still on deck
      </Text>
    </View>
  );
}
