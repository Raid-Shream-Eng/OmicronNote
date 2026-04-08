import React from "react";
import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../i18n";
import { Tasks } from "./types";
import TaskItem from "./taskItem";
import styles from "./style";

type TaskListProps = {
  taskListItems: Tasks[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onFocusComposer: () => void;
};

export function TaskList({
  taskListItems,
  onToggleTask,
  onDeleteTask,
  onFocusComposer,
}: TaskListProps) {
  const { i18n } = useTranslation();
  const rtl = isRTL(i18n.resolvedLanguage);
  // Prebuild the task cards so the main return stays easy to read.
  const taskItems = taskListItems.map(function renderTask(item) {
    return (
      <TaskItem
        key={item.id}
        task={item}
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
      />
    );
  });

  // Empty state gives the screen a friendly starting point before tasks exist.
  if (taskListItems.length === 0) {
    return (
      <View style={[styles.emptyState, rtl && styles.emptyStateRtl]}>
        <View style={styles.emptyIcon}>
          <Feather name="clipboard" size={24} color="#fff461" />
        </View>
        <Text style={[styles.emptyTitle, rtl ? styles.textRtl : styles.textLtr]}>
          No tasks yet
        </Text>
        <Text style={[styles.emptySubtitle, rtl ? styles.textRtl : styles.textLtr]}>
          {"Add your first task and start shaping today's plan."}
        </Text>
        <Pressable onPress={onFocusComposer} style={styles.emptyButton}>
          <Text style={[styles.emptyButtonText, rtl ? styles.textRtl : styles.textLtr]}>
            Write my first task
          </Text>
        </Pressable>
      </View>
    );
  }

  // Once tasks exist, render them as a simple vertical stack of cards.
  return (
    <View style={styles.listContent}>{taskItems}</View>
  );
}
