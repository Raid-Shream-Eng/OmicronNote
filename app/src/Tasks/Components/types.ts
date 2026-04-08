export type Tasks = {
  id: string;
  title: string;
  // Tracks whether the task has been finished so the UI can reflect progress.
  completed: boolean;
};
