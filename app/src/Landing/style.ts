import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Header styles
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Arial",
  },
  // Selection bar styles
  selectionContainar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  selectionCard: {
    backgroundColor: "#c9c8c8",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    padding: 15,
  },
  // Item card styles
  cardContainer: {
    backgroundColor: "#c2c2c2",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    padding: 15,
    borderRadius: 15,
    width: 150,
    height: 150,
  },
  cardImage: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "light",
    textAlign: "center",
  },
  cardTitelFocused: {
    textDecorationLine: "underline",
    textDecorationColor: "#129380",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
