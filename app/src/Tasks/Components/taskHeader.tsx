import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../i18n";
import styles from "./style";

type TaskHeaderProps = {
  taskCount: number;
  completedCount: number;
};

export function TaskHeader({ taskCount, completedCount }: TaskHeaderProps) {
  // Reads task translations so the summary text changes with the active language.
  const { t, i18n } = useTranslation("tasks");
  const rtl = isRTL(i18n.resolvedLanguage);
  // Adjust the label so the summary reads naturally for one or many tasks.
  const taskLabel = t("taskLabel", { count: taskCount });
  // Calculates the remaining task count for the translated summary line.
  const remainingCount = taskCount - completedCount;

  return (
    <View style={[styles.taskHeader, rtl && styles.taskHeaderRtl]}>
      {/* Gives the screen a lightweight section label above the main heading. */}
      <Text style={[styles.sectionEyebrow, rtl ? styles.textRtl : styles.textLtr]}>
        {t("today")}
      </Text>
      {/* Main title for the tasks destination. */}
      <Text style={[styles.screenTitle, rtl ? styles.textRtl : styles.textLtr]}>
        {t("taskBoard")}
      </Text>
      {/* Displays the current number of tasks. */}
      <Text style={[styles.taskMeta, rtl ? styles.textRtl : styles.textLtr]}>
        {taskCount} {taskLabel}
      </Text>
      {/* Shows a quick progress summary based on completed tasks. */}
      <Text style={[styles.taskHint, rtl ? styles.textRtl : styles.textLtr]}>
        {t("taskSummary", {
          completed: completedCount,
          remaining: remainingCount,
        })}
      </Text>
    </View>
  );
}
