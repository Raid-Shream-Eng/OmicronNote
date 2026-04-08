import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { isRTL } from "../../i18n";
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
  // Reads task translations so status labels and accessibility text localize too.
  const { t, i18n } = useTranslation("tasks");
  const rtl = isRTL(i18n.resolvedLanguage);

  return (
    <View style={[styles.taskCard, rtl && styles.taskCardRtl]}>
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
      <View style={[styles.taskBody, rtl && styles.taskBodyRtl]}>
        <Text
          style={[
            styles.taskTitle,
            task.completed && styles.taskTitleCompleted,
            rtl ? styles.textRtl : styles.textLtr,
          ]}
        >
          {task.title}
        </Text>
        <Text style={[styles.taskStatus, rtl ? styles.textRtl : styles.textLtr]}>
          {task.completed ? t("statusCompleted") : t("statusPending")}
        </Text>
      </View>

      {/* Separate delete action keeps removal explicit and easy to reach. */}
      <Pressable
        // Makes the delete accessibility label match the current language.
        accessibilityLabel={t("deleteTask", { title: task.title })}
        onPress={() => onDeleteTask(task.id)}
        style={styles.deleteButton}
      >
        <Feather name="trash-2" size={18} color="#f5f5f5" />
      </Pressable>
    </View>
  );
}
