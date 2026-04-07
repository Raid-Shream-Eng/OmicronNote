import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Header styles
  headerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Arial",
  },
  headerProfileImage: {
    width: "10%",
    borderRadius: 90,
  },
  headerSearchImage: {
    alignItems: "center",
    justifyContent: "center",
  },
  // Selection bar styles
  selectionContainar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    marginHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#c5c5c5",
    borderRadius: 10,
  },
  selectionCard: {
    backgroundColor: "#c8c8c8",
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

  // Add button styles
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 7.5,
    marginTop: 10,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  AddButtonTextFocused: {
    color: "#129380",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  addButtonImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
