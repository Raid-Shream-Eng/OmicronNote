/**
 * Student Guide:
 * This file renders the reusable button shown on the landing screen.
 * It is a small presentation component that depends on translations and shared landing styles.
 * Use this file as an example of a "dumb UI component" that receives data from its parent.
 * These kinds of components are easier to reuse and easier for students to understand.
 */
import { Image, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { isRTL } from "../i18n";
import styles from "./style";

type AddButtonProps = {
  label: string;
};

export function AddButton({ label }: AddButtonProps) {
  const { i18n } = useTranslation();
  const rtl = isRTL(i18n.resolvedLanguage);

  return (
    <View style={[styles.addButton, rtl && styles.addButtonRtl]}>
      <Image
        source={require("../../assets/icons8-plus-48.png")}
        style={[styles.addButtonImage, rtl && styles.addButtonImageRtl]}
      />
      <Text style={[styles.addButtonText, rtl && styles.addButtonTextRtl]}>
        {label}
      </Text>
    </View>
  );
}
