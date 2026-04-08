import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../i18n";
import styles from "./style";

type TaskHeaderProps = {
  taskCount: number;
  completedCount: number;
};

export function TaskHeader({ taskCount, completedCount }: TaskHeaderProps) {
  const { i18n } = useTranslation();
  const rtl = isRTL(i18n.resolvedLanguage);
  // Adjust the label so the summary reads naturally for one or many tasks.
  const taskLabel = taskCount === 1 ? "task" : "tasks";

  return (
    <View style={[styles.taskHeader, rtl && styles.taskHeaderRtl]}>
      {/* Gives the screen a lightweight section label above the main heading. */}
      <Text style={[styles.sectionEyebrow, rtl ? styles.textRtl : styles.textLtr]}>
        Today
      </Text>
      {/* Main title for the tasks destination. */}
      <Text style={[styles.screenTitle, rtl ? styles.textRtl : styles.textLtr]}>
        Task Board
      </Text>
      {/* Displays the current number of tasks. */}
      <Text style={[styles.taskMeta, rtl ? styles.textRtl : styles.textLtr]}>
        {taskCount} {taskLabel}
      </Text>
      {/* Shows a quick progress summary based on completed tasks. */}
      <Text style={[styles.taskHint, rtl ? styles.textRtl : styles.textLtr]}>
        {completedCount} completed, {taskCount - completedCount} still on deck
      </Text>
    </View>
  );
}
