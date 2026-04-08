/**
 * Student Guide:
 * This file contains the style system for the notes feature.
 * It supports the notes list screen, note cards, note editor, filters, empty states, and settings cards.
 * Because so many notes components reuse these styles, it acts like a mini design system for this feature.
 * Studying this file helps explain why the notes UI feels consistent even though it spans many components.
 */
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Spaces the notes screen content under the shared header.
  screenIntro: {
    marginTop: 18,
    marginBottom: 14,
    gap: 6,
  },
  // Aligns the intro block to the right for RTL languages.
  screenIntroRtl: {
    alignItems: "flex-end",
  },
  // Styles the lightweight eyebrow above the notes heading.
  screenEyebrow: {
    color: "#8c8c8c",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  // Styles the main notes screen description.
  screenDescription: {
    color: "#111111",
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "500",
  },
  // Wraps the search and create-note actions.
  addNoteCard: {
    backgroundColor: "#fcfcfc",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 16,
    gap: 12,
    marginBottom: 18,
  },
  // Aligns the search/create card content for RTL layouts.
  addNoteCardRtl: {
    alignItems: "flex-end",
  },
  // Styles the card title above the search input.
  addNoteTitle: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "600",
  },
  // Styles the helper text below the card title.
  addNoteSubtitle: {
    color: "#8c8c8c",
    fontSize: 14,
    lineHeight: 20,
  },
  // Wraps the search icon and input inside one rounded surface.
  searchInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ececec",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  // Flips the search row for RTL layouts.
  searchInputRowRtl: {
    flexDirection: "row-reverse",
  },
  // Lets the search input take the remaining row width.
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111111",
  },
  // Styles the action row containing create and clear controls.
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  // Flips the action row for RTL layouts.
  actionRowRtl: {
    flexDirection: "row-reverse",
  },
  // Styles the primary create-note button.
  primaryButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111111",
    borderRadius: 16,
    paddingVertical: 14,
  },
  // Styles the text inside the primary action button.
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  // Styles the secondary clear button.
  secondaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#f4f4f5",
  },
  // Styles the text inside the secondary button.
  secondaryButtonText: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "600",
  },
  // Wraps the summary metrics shown above the notes list.
  headerCard: {
    backgroundColor: "#fcfcfc",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 16,
    gap: 6,
    marginBottom: 18,
  },
  // Aligns the summary block to the right for RTL layouts.
  headerCardRtl: {
    alignItems: "flex-end",
  },
  // Styles the small summary eyebrow in the notes header.
  headerEyebrow: {
    color: "#8c8c8c",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  // Styles the main notes screen title.
  headerTitle: {
    color: "#111111",
    fontSize: 28,
    fontWeight: "600",
  },
  // Styles the note count line under the title.
  headerCount: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "600",
  },
  // Styles the supporting summary text.
  headerHint: {
    color: "#8c8c8c",
    fontSize: 14,
    lineHeight: 20,
  },
  // Wraps the filter and sort controls section.
  controlsCard: {
    backgroundColor: "#fcfcfc",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    paddingVertical: 14,
    marginBottom: 18,
  },
  // Spaces each control group vertically inside the controls card.
  controlsGroup: {
    gap: 10,
    marginBottom: 14,
  },
  // Avoids extra bottom spacing after the last controls group.
  controlsGroupLast: {
    marginBottom: 0,
  },
  // Styles the small control-group title.
  controlsLabel: {
    color: "#8c8c8c",
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  // Adds horizontal padding around control chip rows.
  chipsScrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  // Styles inactive control chips.
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#f4f4f5",
  },
  // Styles the active control chip.
  chipActive: {
    backgroundColor: "#111111",
  },
  // Styles inactive control chip text.
  chipText: {
    color: "#111111",
    fontSize: 13,
    fontWeight: "600",
  },
  // Styles active control chip text.
  chipTextActive: {
    color: "#ffffff",
  },
  // Styles section wrappers inside the notes list area.
  section: {
    marginBottom: 20,
  },
  // Styles the section title row.
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  // Flips the section title row for RTL layouts.
  sectionHeaderRtl: {
    flexDirection: "row-reverse",
  },
  // Styles the main section heading text.
  sectionTitle: {
    color: "#111111",
    fontSize: 20,
    fontWeight: "700",
  },
  // Styles the lightweight section subtitle/count.
  sectionMeta: {
    color: "#8c8c8c",
    fontSize: 13,
    fontWeight: "600",
  },
  // Gives recent notes a little extra right padding for horizontal scrolling.
  recentScrollContent: {
    paddingRight: 6,
  },
  // Styles a recent-note card with a fixed width.
  recentCard: {
    width: 250,
    marginRight: 12,
  },
  // Styles the general note card surface.
  noteCard: {
    backgroundColor: "#fcfcfc",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  // Highlights pinned notes with a slightly darker border.
  noteCardPinned: {
    borderColor: "#d4d4d8",
  },
  // Wraps the cover preview and top actions together.
  noteTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  // Flips the note top row for RTL layouts.
  noteTopRowRtl: {
    flexDirection: "row-reverse",
  },
  // Creates the note cover thumbnail block.
  coverCard: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  // Styles the icon inside the cover thumbnail.
  coverEmoji: {
    fontSize: 26,
  },
  // Lets the title/preview column take the remaining width.
  noteMain: {
    flex: 1,
    gap: 4,
  },
  // Aligns the title/preview column to the right for RTL layouts.
  noteMainRtl: {
    alignItems: "flex-end",
  },
  // Styles the note title on list cards.
  noteTitle: {
    color: "#111111",
    fontSize: 17,
    fontWeight: "700",
  },
  // Styles highlighted notes with a stronger title color.
  noteTitleHighlight: {
    color: "#9a6700",
  },
  // Styles focus notes with slightly bolder emphasis.
  noteTitleFocus: {
    letterSpacing: 0.2,
  },
  // Styles the content preview beneath the note title.
  notePreview: {
    color: "#8c8c8c",
    fontSize: 14,
    lineHeight: 20,
  },
  // Styles the compact note metadata row.
  noteMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  // Flips the note metadata row for RTL layouts.
  noteMetaRowRtl: {
    flexDirection: "row-reverse",
  },
  // Styles small metadata pills such as folder, type, or locked state.
  metaBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#f4f4f5",
  },
  // Styles the text inside metadata pills.
  metaBadgeText: {
    color: "#111111",
    fontSize: 12,
    fontWeight: "600",
  },
  // Styles the list of label chips at the bottom of the note card.
  labelRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  // Flips the label row for RTL layouts.
  labelRowRtl: {
    flexDirection: "row-reverse",
  },
  // Styles the label chips shown on note cards.
  labelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#eef2ff",
  },
  // Styles the text inside label chips.
  labelBadgeText: {
    color: "#4338ca",
    fontSize: 12,
    fontWeight: "700",
  },
  // Aligns the icon actions to the card edge.
  noteActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  // Stacks note action buttons vertically for list cards.
  noteActionsVertical: {
    flexDirection: "column",
    alignItems: "center",
  },
  // Styles each circular note action button.
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f5",
  },
  // Styles the empty state when no notes match the current filters.
  emptyState: {
    backgroundColor: "#fcfcfc",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  // Aligns the empty state content to the right in RTL.
  emptyStateRtl: {
    alignItems: "flex-end",
  },
  // Styles the empty state title text.
  emptyTitle: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "700",
  },
  // Styles the empty state supporting copy.
  emptySubtitle: {
    color: "#8c8c8c",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  // Wraps the note detail content areas.
  editorContent: {
    paddingBottom: 24,
  },
  // Styles the custom top row used on detail and settings screens.
  editorTopBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  // Flips the custom top row for RTL layouts.
  editorTopBarRtl: {
    flexDirection: "row-reverse",
  },
  // Styles compact editor action buttons.
  editorActionButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "#111111",
  },
  // Styles the text inside editor action buttons.
  editorActionText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
  // Styles the editor title beneath the top bar.
  editorTitle: {
    color: "#111111",
    fontSize: 28,
    fontWeight: "700",
  },
  // Styles editor cards used for cover, labels, content, and settings.
  editorCard: {
    backgroundColor: "#fcfcfc",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 16,
    gap: 12,
    marginBottom: 16,
  },
  // Styles editor section headings.
  editorSectionTitle: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "700",
  },
  // Styles supporting text inside editor cards.
  editorSectionHint: {
    color: "#8c8c8c",
    fontSize: 14,
    lineHeight: 20,
  },
  // Styles text inputs used in the editor.
  editorInput: {
    backgroundColor: "#f8f8f8",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ececec",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111111",
  },
  // Adds more height for the body content field.
  editorBodyInput: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  // Flips text alignment for RTL inputs and labels.
  textRtl: {
    textAlign: "right",
    writingDirection: "rtl",
  },
  // Keeps text aligned left for LTR content.
  textLtr: {
    textAlign: "left",
    writingDirection: "ltr",
  },
  // Styles the checklist item row inside the note editor.
  checklistRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  // Flips checklist rows for RTL layouts.
  checklistRowRtl: {
    flexDirection: "row-reverse",
  },
  // Styles checklist item text.
  checklistText: {
    flex: 1,
    color: "#111111",
    fontSize: 14,
  },
  // Styles completed checklist rows.
  checklistTextDone: {
    color: "#8c8c8c",
    textDecorationLine: "line-through",
  },
  // Styles the cover option row inside the detail editor.
  coverOptionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  // Styles each selectable cover preset.
  coverOption: {
    flex: 1,
    minHeight: 88,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  // Highlights the selected cover preset.
  coverOptionActive: {
    borderColor: "#111111",
  },
  // Styles the destructive delete button in the note editor.
  dangerButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fee2e2",
    borderRadius: 16,
    paddingVertical: 14,
  },
  // Styles the text inside destructive buttons.
  dangerButtonText: {
    color: "#b91c1c",
    fontSize: 14,
    fontWeight: "700",
  },
});
