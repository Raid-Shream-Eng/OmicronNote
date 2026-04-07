import { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddTask } from "../Tasks/Components/AddTask";
import styles from "../Tasks/Components/style";
import { TaskHeader } from "../Tasks/Components/taskHeader";
import { TaskList } from "../Tasks/Components/taskList";
import { Tasks } from "../Tasks/Components/types";

function createTask(title: string): Tasks {
  let idCounter = 0;
  return {
    id: (idCounter++).toString(),
    title,
  };
}

export function TasksScreen() {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<Tasks[]>([]);

  function handleAddTask() {
    const trimmedTaskTitle = taskTitle.trim();

    if (!trimmedTaskTitle) {
      return;
    }

    setTasks((currentTasks) => [...currentTasks, createTask(trimmedTaskTitle)]);
    setTaskTitle("");
  }

  return (
    <>
      <StatusBar />
      <SafeAreaView
        edges={["left", "right", "bottom"]}
        style={styles.container}
      >
        <TaskHeader taskCount={tasks.length} />
        <AddTask
          value={taskTitle}
          onChangeText={setTaskTitle}
          onAddTask={handleAddTask}
        />
        <TaskList taskListItems={tasks} />
      </SafeAreaView>
    </>
  );
}
