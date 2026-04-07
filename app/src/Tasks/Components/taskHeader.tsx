import { Text, View } from "react-native";
import styles from "./style";
type TaskHeaderProps = {
  taskCount: number;
};

export function TaskHeader({ taskCount }: TaskHeaderProps) {
  const taskLabel = taskCount === 1 ? "task" : "tasks";
  return (
    <View style={styles.taskHeader}>
      <Text style={styles.taskTitle}>
        {taskCount} {taskLabel}
      </Text>
    </View>
  );
}
