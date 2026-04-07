import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ececec",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  phoneShell: {
    flex: 1,
    backgroundColor: "#fbfbfb",
    borderRadius: 34,
    overflow: "hidden",
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 28,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  headerRowRtl: {
    flexDirection: "row-reverse",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileRowRtl: {
    flexDirection: "row-reverse",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#d8d8d8",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111111",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  headerActionsRtl: {
    flexDirection: "row-reverse",
  },
  iconButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  languageToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "#f3f4f6",
  },
  languageToggleRtl: {
    flexDirection: "row-reverse",
  },
  languageToggleText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111111",
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingTop: 16,
    marginBottom: 10,
  },
  tabRowRtl: {
    flexDirection: "row-reverse",
  },
  tabInactive: {
    fontSize: 16,
    color: "#a3a3a3",
    paddingBottom: 10,
  },
  activeTabGroup: {
    alignItems: "center",
    gap: 8,
  },
  tabActive: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111111",
  },
  tabIndicator: {
    width: 74,
    height: 2,
    borderRadius: 999,
    backgroundColor: "#111111",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginHorizontal: -6,
  },
  actionsRowRtl: {
    flexDirection: "row-reverse",
  },
  cardWrapper: {
    position: "relative",
  },
  cardContainer: {
    backgroundColor: "#efefef",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    padding: 15,
    borderRadius: 18,
    width: 150,
    height: 150,
  },
  cardImage: {
    width: 48,
    height: 48,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  cardOverlay: {
    position: "absolute",
    top: 15,
    right: 15,
    bottom: 15,
    left: 15,
    borderRadius: 18,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  actionIcon: {
    width: 34,
    height: 34,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111111",
    textAlign: "center",
  },
  previewPanel: {
    marginTop: 8,
    backgroundColor: "#ffffff",
    borderRadius: 26,
    padding: 14,
    minHeight: 260,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  previewGrid: {
    flexDirection: "row",
    gap: 12,
  },
  previewGridRtl: {
    flexDirection: "row-reverse",
  },
  previewCard: {
    flex: 1,
    minHeight: 230,
    borderRadius: 22,
    backgroundColor: "#fcfcfc",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 18,
    justifyContent: "space-between",
  },
  previewCardRtl: {
    alignItems: "flex-end",
  },
  previewIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f4f4f5",
    alignItems: "center",
    justifyContent: "center",
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111111",
  },
  previewCount: {
    fontSize: 14,
    color: "#8c8c8c",
  },
  buttonRow: {
    alignItems: "center",
    marginTop: 18,
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 7.5,
    marginTop: 10,
  },
  addButtonRtl: {
    flexDirection: "row-reverse",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  addButtonTextRtl: {
    writingDirection: "rtl",
    textAlign: "right",
  },
  addButtonImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  addButtonImageRtl: {
    marginLeft: 5,
    marginRight: 0,
  },
  textLtr: {
    textAlign: "left",
    writingDirection: "ltr",
  },
  textRtl: {
    textAlign: "right",
    writingDirection: "rtl",
  },
  centeredTextRtl: {
    textAlign: "center",
    writingDirection: "rtl",
  },
});
