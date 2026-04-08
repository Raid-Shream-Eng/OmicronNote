/**
 * Student Guide:
 * This file renders the shared bottom navigation bar used by the main app sections.
 * It reads the current route, decides which tab is active, and lets the user switch sections.
 * It also uses translations so the labels change with the selected language.
 * Think of it as the shared section-level navigation component for the app.
 */
import { Feather } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import type { AppResumeRoute } from "../i18n";

// Defines the primary app sections available from the shared bottom navigation bar.
const bottomNavItems: {
  key: AppResumeRoute;
  icon: keyof typeof Feather.glyphMap;
}[] = [
  { key: "/", icon: "home" },
  { key: "/notes", icon: "file-text" },
  { key: "/tasks", icon: "check-square" },
  { key: "/settings", icon: "settings" },
];

// Maps detail routes back to their owning section so the correct tab stays highlighted.
function getActiveTab(pathname: string): AppResumeRoute {
  if (pathname.startsWith("/note-details")) {
    return "/notes";
  }

  if (pathname === "/notes" || pathname === "/tasks" || pathname === "/settings") {
    return pathname;
  }

  return "/";
}

// Renders a shared bottom tab bar for moving between the main app sections.
export function BottomNav() {
  // Reads common translations so tab labels match the active language across the app.
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const activeTab = getActiveTab(pathname);

  return (
    <View style={styles.container}>
      {bottomNavItems.map((item) => {
        const isActive = item.key === activeTab;

        return (
          <Pressable
            key={item.key}
            // Switches sections without stacking duplicate screens in the navigation history.
            onPress={() => router.replace(item.key)}
            style={[styles.tabButton, isActive && styles.tabButtonActive]}
          >
            <Feather
              name={item.icon}
              size={18}
              color={isActive ? "#111111" : "#8c8c8c"}
            />
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {
                item.key === "/"
                  ? t("navHome")
                  : item.key === "/notes"
                    ? t("navNotes")
                    : item.key === "/tasks"
                      ? t("navTasks")
                      : t("navSettings")
              }
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  // Anchors the shared navigation bar to the bottom of each main section screen.
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#ececec",
    backgroundColor: "#fbfbfb",
  },
  // Styles each tab as a compact vertical icon-plus-label button.
  tabButton: {
    minWidth: 72,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 6,
    borderRadius: 18,
  },
  // Highlights the active section so it is easy to orient within the app.
  tabButtonActive: {
    backgroundColor: "#f4f4f5",
  },
  // Styles the inactive tab label.
  tabLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#8c8c8c",
  },
  // Styles the active tab label.
  tabLabelActive: {
    color: "#111111",
    fontWeight: "700",
  },
});
