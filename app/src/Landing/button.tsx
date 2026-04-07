import { Image, Text, View } from "react-native";
import styles from "./style";

export function AddButton() {
  return (
    <View style={styles.addButton}>
      <Image
        source={require("../../assets/icons8-plus-48.png")}
        style={styles.addButtonImage}
      />
      <Text style={styles.addButtonText}>Add new Note</Text>
    </View>
  );
}
