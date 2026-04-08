/**
 * Student Guide:
 * This is the route file for the tasks section.
 * Expo Router maps this file to the `/tasks` path.
 * Route files should stay simple, so this one only renders the tasks screen.
 * Keeping them small makes navigation easier to reason about later.
 */
import { TasksScreen } from "./src/Screens/tasksScreen";

export default function TasksRoute() {
  return <TasksScreen />;
}
