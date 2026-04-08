import { colors } from "@/app/src/Theme/color";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Outer safe-area background around the tasks screen shell.
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  // Main dark card that contains the full task experience.
  phoneShell: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 32,
    overflow: "hidden",
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  // Extra room at the bottom so content does not feel cramped when scrolled.
  screenScrollContent: {
    paddingBottom: 28,
  },
  // Top navigation row for back navigation and screen context.
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  // Shared circular icon button style used in the top bar.
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  // Secondary label centered between the top bar actions.
  topBarLabel: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "600",
  },
  // Intro block placed under the shared landing header.
  screenIntro: {
    marginTop: 18,
    marginBottom: 12,
    gap: 6,
  },
  // Mirrors the intro block alignment for RTL languages.
  screenIntroRtl: {
    alignItems: "flex-end",
  },
  // Small label introducing the task section.
  screenEyebrow: {
    color: "#8c8c8c",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  // Short description beneath the intro label.
  screenDescription: {
    color: "#111111",
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "500",
  },
  // Card styling for each individual task row.
  taskCard: {
    backgroundColor: "#fcfcfc",
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  // Flips the task row so actions read naturally in RTL layouts.
  taskCardRtl: {
    flexDirection: "row-reverse",
  },
  // Base task title styling before completion state overrides.
  taskTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111111",
  },
  // Spacing for the heading block at the top of the screen.
  taskHeader: {
    gap: 4,
    marginBottom: 18,
  },
  // Aligns the summary block to the right for RTL languages.
  taskHeaderRtl: {
    alignItems: "flex-end",
  },
  // Small accent label above the main screen title.
  sectionEyebrow: {
    color: "#8c8c8c",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  // Main title style for the tasks screen.
  screenTitle: {
    color: "#111111",
    fontSize: 28,
    fontWeight: "600",
  },
  // Summary line that shows how many tasks are present.
  taskMeta: {
    color: "#111111",
    fontSize: 17,
    fontWeight: "500",
  },
  // Supporting text for progress information under the summary.
  taskHint: {
    color: "#8c8c8c",
    fontSize: 14,
    lineHeight: 20,
  },
  // Container for the add-task input and action button.
  composerCard: {
    backgroundColor: "#fcfcfc",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 20,
  },
  // Aligns the composer section to the right in RTL.
  composerCardRtl: {
    alignItems: "flex-end",
  },
  // Title text inside the composer card.
  composerTitle: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  // Helper text under the composer heading.
  composerSubtitle: {
    color: "#8c8c8c",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  // Multi-line input styling for new task text.
  textInput: {
    backgroundColor: "#f8f8f8",
    color: "#111111",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ececec",
    minHeight: 92,
    textAlignVertical: "top",
    fontSize: 16,
  },
  // Makes the multi-line task input start from the right in RTL.
  textInputRtl: {
    textAlign: "right",
    writingDirection: "rtl",
  },
  // Primary button styling for adding a task.
  addButton: {
    backgroundColor: "#111111",
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 12,
  },
  // Disabled button state when the input is empty.
  addButtonDisabled: {
    backgroundColor: "#b8b8b8",
  },
  // Text styling inside the add button.
  addButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
  // Wrapper for the rendered list of task cards.
  listContent: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  // Aligns the empty state content to the right in RTL.
  emptyStateRtl: {
    alignItems: "flex-end",
  },
  // Centered empty state card shown before any tasks are added.
  emptyState: {
    backgroundColor: "#fcfcfc",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    paddingHorizontal: 18,
    paddingVertical: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  // Decorative icon container used in the empty state.
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#f4f4f5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  // Empty state headline.
  emptyTitle: {
    color: "#111111",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  // Supporting copy for the empty state.
  emptySubtitle: {
    color: "#8c8c8c",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 18,
  },
  // Call-to-action button inside the empty state.
  emptyButton: {
    backgroundColor: "#111111",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },
  // Text inside the empty state call-to-action.
  emptyButtonText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  // Circular checkbox shown at the start of each task row.
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },
  // Visual treatment for completed tasks.
  checkboxCompleted: {
    backgroundColor: "#111111",
    borderColor: "#111111",
  },
  // Holds the task title and status text between the actions.
  taskBody: {
    flex: 1,
    gap: 4,
  },
  // Keeps the task text block anchored to the right in RTL layouts.
  taskBodyRtl: {
    alignItems: "flex-end",
  },
  // Strikethrough styling applied after a task is completed.
  taskTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#8c8c8c",
  },
  // Small label showing whether a task is pending or completed.
  taskStatus: {
    color: "#8c8c8c",
    fontSize: 13,
    fontWeight: "500",
  },
  // Dedicated delete action at the end of each task row.
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },
  // Shared left-to-right text helper for task content.
  textLtr: {
    textAlign: "left",
    writingDirection: "ltr",
  },
  // Shared right-to-left text helper for task content.
  textRtl: {
    textAlign: "right",
    writingDirection: "rtl",
  },
});
