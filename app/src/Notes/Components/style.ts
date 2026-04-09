import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screenIntro: {
    marginTop: 18,
    marginBottom: 14,
    gap: 6,
  },
  screenIntroRtl: {
    alignItems: "flex-end",
  },
  screenEyebrow: {
    color: "#8c8c8c",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  screenDescription: {
    color: "#111111",
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "500",
  },
  addNoteCard: {
    backgroundColor: "#fcfcfc",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 16,
    gap: 12,
    marginBottom: 18,
  },
  addNoteCardRtl: {
    alignItems: "flex-end",
  },
  addNoteTitle: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "600",
  },
  addNoteSubtitle: {
    color: "#8c8c8c",
    fontSize: 14,
    lineHeight: 20,
  },
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
  searchInputRowRtl: {
    flexDirection: "row-reverse",
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111111",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actionRowRtl: {
    flexDirection: "row-reverse",
  },
  primaryButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111111",
    borderRadius: 16,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#f4f4f5",
  },
  secondaryButtonText: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "600",
  },
  headerCard: {
    backgroundColor: "#fcfcfc",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 16,
    gap: 6,
    marginBottom: 18,
  },
  headerCardRtl: {
    alignItems: "flex-end",
  },
  headerEyebrow: {
    color: "#8c8c8c",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  headerTitle: {
    color: "#111111",
    fontSize: 28,
    fontWeight: "600",
  },
  headerCount: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "600",
  },
  headerHint: {
    color: "#8c8c8c",
    fontSize: 14,
    lineHeight: 20,
  },
  controlsCard: {
    backgroundColor: "#fcfcfc",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    paddingVertical: 14,
    marginBottom: 18,
  },
  controlsGroup: {
    gap: 10,
    marginBottom: 14,
  },
  controlsGroupLast: {
    marginBottom: 0,
  },
  controlsLabel: {
    color: "#8c8c8c",
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  chipsScrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#f4f4f5",
  },
  chipActive: {
    backgroundColor: "#111111",
  },
  chipText: {
    color: "#111111",
    fontSize: 13,
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#ffffff",
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionHeaderRtl: {
    flexDirection: "row-reverse",
  },
  sectionTitle: {
    color: "#111111",
    fontSize: 20,
    fontWeight: "700",
  },
  sectionMeta: {
    color: "#8c8c8c",
    fontSize: 13,
    fontWeight: "600",
  },
  recentScrollContent: {
    paddingRight: 6,
  },
  recentCard: {
    width: 250,
    marginRight: 12,
  },
  noteCard: {
    backgroundColor: "#fcfcfc",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  noteCardPinned: {
    borderColor: "#d4d4d8",
  },
  noteTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  noteTopRowRtl: {
    flexDirection: "row-reverse",
  },
  coverCard: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  coverEmoji: {
    fontSize: 26,
  },
  noteMain: {
    flex: 1,
    gap: 4,
  },
  noteMainRtl: {
    alignItems: "flex-end",
  },
  noteTitle: {
    color: "#111111",
    fontSize: 17,
    fontWeight: "700",
  },
  noteTitleHighlight: {
    color: "#9a6700",
  },
  noteTitleFocus: {
    letterSpacing: 0.2,
  },
  notePreview: {
    color: "#8c8c8c",
    fontSize: 14,
    lineHeight: 20,
  },
  noteMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  noteMetaRowRtl: {
    flexDirection: "row-reverse",
  },
  metaBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#f4f4f5",
  },
  metaBadgeText: {
    color: "#111111",
    fontSize: 12,
    fontWeight: "600",
  },
  labelRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  labelRowRtl: {
    flexDirection: "row-reverse",
  },
  labelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#eef2ff",
  },
  labelBadgeText: {
    color: "#4338ca",
    fontSize: 12,
    fontWeight: "700",
  },
  noteActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  noteActionsVertical: {
    flexDirection: "column",
    alignItems: "center",
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f5",
  },
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
  emptyStateRtl: {
    alignItems: "flex-end",
  },
  emptyTitle: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "700",
  },
  emptySubtitle: {
    color: "#8c8c8c",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  editorContent: {
    paddingBottom: 24,
  },
  editorTopBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  editorTopBarRtl: {
    flexDirection: "row-reverse",
  },
  editorActionButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "#111111",
  },
  editorActionText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
  editorTitle: {
    color: "#111111",
    fontSize: 28,
    fontWeight: "700",
  },
  editorCard: {
    backgroundColor: "#fcfcfc",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 16,
    gap: 12,
    marginBottom: 16,
  },
  editorSectionTitle: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "700",
  },
  editorSectionHint: {
    color: "#8c8c8c",
    fontSize: 14,
    lineHeight: 20,
  },
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
  editorBodyInput: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  textRtl: {
    textAlign: "right",
    writingDirection: "rtl",
  },
  textLtr: {
    textAlign: "left",
    writingDirection: "ltr",
  },
  checklistRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  checklistRowRtl: {
    flexDirection: "row-reverse",
  },
  checklistText: {
    flex: 1,
    color: "#111111",
    fontSize: 14,
  },
  checklistTextDone: {
    color: "#8c8c8c",
    textDecorationLine: "line-through",
  },
  coverOptionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  coverOption: {
    flex: 1,
    minHeight: 88,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  coverOptionActive: {
    borderColor: "#111111",
  },
  dangerButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fee2e2",
    borderRadius: 16,
    paddingVertical: 14,
  },
  dangerButtonText: {
    color: "#b91c1c",
    fontSize: 14,
    fontWeight: "700",
  },
});
