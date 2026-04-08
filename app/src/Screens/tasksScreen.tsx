import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { isRTL } from "../i18n";
import { HeaderProfile } from "../Landing/header";
import landingStyles from "../Landing/style";
import { AddTask } from "../Tasks/Components/AddTask";
import styles from "../Tasks/Components/style";
import { TaskHeader } from "../Tasks/Components/taskHeader";
import { TaskList } from "../Tasks/Components/taskList";
import { Tasks } from "../Tasks/Components/types";

const profileImage = require("../../../assets/images/icon.png");

function createTask(title: string): Tasks {
  // Generates a unique id for each task so list keys stay stable.
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    completed: false,
  };
}

export function TasksScreen() {
  const { t, i18n } = useTranslation("landing");
  const rtl = isRTL(i18n.resolvedLanguage);

  // Holds the text currently being typed into the task composer.
  const [taskTitle, setTaskTitle] = useState("");
  // Allows the empty state button to focus the text input.
  const inputRef = useRef<TextInput>(null);
  // Starts the screen with a couple of sample tasks for immediate feedback.
  const [tasks, setTasks] = useState<Tasks[]>([
    createTask("Review meeting notes"),
    createTask("Plan the next design pass"),
  ]);

  // Calculates completed tasks for the header summary.
  const completedCount = tasks.filter((task) => task.completed).length;

  function handleAddTask() {
    const trimmedTaskTitle = taskTitle.trim();

    // Ignore empty submissions so only meaningful tasks are added.
    if (!trimmedTaskTitle) {
      return;
    }

    // Appends the new task and clears the input for the next one.
    setTasks((currentTasks) => [createTask(trimmedTaskTitle), ...currentTasks]);
    setTaskTitle("");
  }

  function handleToggleTask(id: string) {
    // Flips the completed state for the tapped task.
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleDeleteTask(id: string) {
    // Removes a task completely from the list.
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  function handleFocusComposer() {
    // Moves the cursor into the input when the empty state CTA is pressed.
    inputRef.current?.focus();
  }

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={landingStyles.safeArea}>
        <View style={landingStyles.phoneShell}>
          <ScrollView
            contentContainerStyle={landingStyles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Reuses the same profile header pattern from the landing screen. */}
            <HeaderProfile
              name={t("profileName")}
              profileImage={profileImage}
              // Tells the shared language toggle to restore the task screen after an RTL/LTR reload.
              resumeRoute="/tasks"
            />

            {/* Mirrors the landing screen with a lightweight section intro. */}
            <View style={[styles.screenIntro, rtl && styles.screenIntroRtl]}>
              <Text
                style={[
                  styles.screenEyebrow,
                  rtl ? landingStyles.textRtl : landingStyles.textLtr,
                ]}
              >
                Daily planner
              </Text>
              <Text
                style={[
                  styles.screenDescription,
                  rtl ? landingStyles.textRtl : landingStyles.textLtr,
                ]}
              >
                Capture, review, and complete your tasks in one clean space.
              </Text>
            </View>

            {/* Uses the landing-style preview panel as the main content surface. */}
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
        </View>
      </SafeAreaView>
    </>
  );
}
