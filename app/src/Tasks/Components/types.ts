/**
 * Student Guide:
 * This file defines the TypeScript shape for one task item.
 * Even though it is small, strong types like this help screens and components agree on the same data contract.
 * This is one of the simplest files in the project and a good starting point for TypeScript beginners.
 */
export type Tasks = {
  id: string;
  title: string;
  // Tracks whether the task has been finished so the UI can reflect progress.
  completed: boolean;
};
