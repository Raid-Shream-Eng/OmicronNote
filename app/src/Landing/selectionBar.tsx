/**
 * Student Guide:
 * This file renders the two-tab selection bar used on the landing screen.
 * It is a presentational component that only cares about which tab is active.
 * It reads translated labels and applies RTL-aware styles.
 * This is a good example of simple derived UI from a small prop.
 */
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { isRTL } from "../i18n";
import styles from "./style";

type SelectionBarProps = {
  activeTab: "allNotes" | "folders";
};

export function SelectionBar({ activeTab }: SelectionBarProps) {
  const { t, i18n } = useTranslation("landing");
  const rtl = isRTL(i18n.resolvedLanguage);

  const tabs = [
    { key: "allNotes", label: t("allNotes") },
    { key: "folders", label: t("folders") },
  ] as const;

  return (
    <View style={[styles.tabRow, rtl && styles.tabRowRtl]}>
      {tabs.map((tab) =>
        tab.key === activeTab ? (
          <View key={tab.key} style={styles.activeTabGroup}>
            <Text
              style={[styles.tabActive, rtl ? styles.textRtl : styles.textLtr]}
            >
              {tab.label}
            </Text>
            <View style={styles.tabIndicator} />
          </View>
        ) : (
          <Text
            key={tab.key}
            style={[
              styles.tabInactive,
              rtl ? styles.textRtl : styles.textLtr,
            ]}
          >
            {tab.label}
          </Text>
        )
      )}
    </View>
  );
}
