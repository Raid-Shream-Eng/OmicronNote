import { Image, ScrollView, Text, View } from "react-native";
import styles from "./style";

export function SelectionBar() {
  return (
    <View style={styles.selectionContainar}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.selectionCard}>
          <Image
            source={require("../../assets/selection2.png")}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Home</Text>
        </View>

        <View style={styles.selectionCard}>
          <Image
            source={require("../../assets/icons8-notepad-50.png")}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>All Notes</Text>
        </View>

        <View style={styles.selectionCard}>
          <Image
            source={require("../../assets/icons8-calendar-50.png")}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Calendar</Text>
        </View>
      </ScrollView>
    </View>
  );
}
