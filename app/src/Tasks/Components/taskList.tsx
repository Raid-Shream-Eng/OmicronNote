import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Tasks } from "./types";
import TaskItem from "./taskItem";

type TaskListProps = {
    taskListItems: Tasks[];
};


export function TaskList({taskListItems}: TaskListProps) {
  return (
    <FlatList
      data={taskListItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TaskItem task={item} />}
      showsVerticalScrollIndicator={false}
        contentContainerStyle={[]}
        ListEmptyComponent={
            <View>
                <Text>No tasks available</Text>
                <TouchableOpacity 
                onPress={() => console.log("Add Task Pressed")}
                >
                <Text>Add your first task to get started!</Text>
                </TouchableOpacity>

            </View>}
    >

    </FlatList>
  );
}
