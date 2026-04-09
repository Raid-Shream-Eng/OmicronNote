import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { isRTL } from "../i18n";
import { HeaderProfile } from "../Landing/header";
import landingStyles from "../Landing/style";
import { BottomNav } from "../Navigation/bottomNav";
import { AddTask } from "../Tasks/Components/AddTask";
import styles from "../Tasks/Components/style";
import { TaskHeader } from "../Tasks/Components/taskHeader";
import { TaskList } from "../Tasks/Components/taskList";
import { Tasks } from "../Tasks/Components/types";

const profileImage = require("../../../assets/images/icon.png");

function createTask(title: string): Tasks {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    completed: false,
  };
}

export function TasksScreen() {
  const { t, i18n } = useTranslation(["landing", "tasks"]);
  const rtl = isRTL(i18n.resolvedLanguage);
  const [taskTitle, setTaskTitle] = useState("");
  const inputRef = useRef<TextInput>(null);
  const [tasks, setTasks] = useState<Tasks[]>([
    createTask(t("tasks:sampleTaskReview")),
    createTask(t("tasks:sampleTaskPlan")),
  ]);
  const completedCount = tasks.filter((task) => task.completed).length;

  function handleAddTask() {
    const trimmedTaskTitle = taskTitle.trim();
    if (!trimmedTaskTitle) {
      return;
    }
    setTasks((currentTasks) => [createTask(trimmedTaskTitle), ...currentTasks]);
    setTaskTitle("");
  }

  function handleToggleTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleDeleteTask(id: string) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  function handleFocusComposer() {
    inputRef.current?.focus();
  }

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={landingStyles.safeArea}>
        <View style={landingStyles.phoneShell}>
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={landingStyles.content}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <HeaderProfile
                name={t("profileName")}
                profileImage={profileImage}
                resumeRoute="/tasks"
              />
              <View style={[styles.screenIntro, rtl && styles.screenIntroRtl]}>
                <Text
                  style={[
                    styles.screenEyebrow,
                    rtl ? landingStyles.textRtl : landingStyles.textLtr,
                  ]}
                >
                  {t("tasks:introEyebrow")}
                </Text>
                <Text
                  style={[
                    styles.screenDescription,
                    rtl ? landingStyles.textRtl : landingStyles.textLtr,
                  ]}
                >
                  {t("tasks:introDescription")}
                </Text>
              </View>
              <View style={landingStyles.previewPanel}>
                <TaskHeader
                  taskCount={tasks.length}
                  completedCount={completedCount}
                />
                <AddTask
                  value={taskTitle}
                  onChangeText={setTaskTitle}
                  onAddTask={handleAddTask}
                  inputRef={inputRef}
                />
                <TaskList
                  taskListItems={tasks}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                  onFocusComposer={handleFocusComposer}
                />
              </View>
            </ScrollView>
            <BottomNav />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
