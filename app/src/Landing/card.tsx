import { Image, Text, View } from "react-native";
import styles from "./style";
type CardProps = {
  title: string;
  imageSource: any;
};

export function Card({ title, imageSource }: CardProps) {
  return (
    <View style={styles.cardContainer}>
      <Image source={imageSource} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
}
