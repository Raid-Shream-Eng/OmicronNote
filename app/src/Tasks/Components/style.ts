import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
  },
  taskCard: {
    backgroundColor: "#3f1f1f",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 10,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  taskHeader: {
    gap: 10,
  },
  textInput: {
    backgroundColor: "#3f1f1f",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#2f2f2f",
  },
  addButton: {
    backgroundColor: "#b4233c",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  addButtonDisabled: {
    backgroundColor: "#7b1c2d",
  },
  addButtonText: {
    color: "#000000",
    fontWeight: "bold",
  },
});
