/**
 * Student Guide:
 * This file is the settings screen.
 * Right now it focuses mainly on preferred language and a simple storage summary,
 * but it is also the place designed to grow with future app preferences.
 * It reuses the same visual shell as the rest of the app and keeps language changes route-aware.
 */
import { StatusBar } from "expo-status-bar";
import { ScrollView, Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomNav } from "../Navigation/bottomNav";
import { HeaderProfile } from "../Landing/header";
import landingStyles from "../Landing/style";
import noteStyles from "../Notes/Components/style";
import { isRTL, setAppLanguage } from "../i18n";
import { useAppSelector } from "../store/hooks";

const profileImage = require("../../../assets/images/icon.png");

export function SettingsScreen() {
  // Reads the current language so the settings layout mirrors correctly in RTL.
  const { t, i18n } = useTranslation(["landing", "settings"]);
  const rtl = isRTL(i18n.resolvedLanguage);

  // Reads note state so the settings screen can summarize current stored content.
  const noteCount = useAppSelector((state) => state.notes.items.length);

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={landingStyles.safeArea}>
        <View style={landingStyles.phoneShell}>
          {/* Splits the settings screen into scrollable content and the fixed bottom navigation. */}
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={landingStyles.content}
              showsVerticalScrollIndicator={false}
            >
              {/* Reuses the shared profile header while preserving the settings route on language reloads. */}
              <HeaderProfile
                name={t("profileName")}
                profileImage={profileImage}
                resumeRoute="/settings"
              />

              {/* Introduces the settings section beneath the shared app header. */}
              <View style={[noteStyles.screenIntro, rtl && noteStyles.screenIntroRtl]}>
                <Text
                  style={[
                    noteStyles.screenEyebrow,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  {t("settings:introEyebrow")}
                </Text>
                <Text
                  style={[
                    noteStyles.screenDescription,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  {t("settings:introDescription")}
                </Text>
              </View>

              {/* Reuses the existing white panel pattern to hold settings cards. */}
              <View style={landingStyles.previewPanel}>
                <View style={noteStyles.editorCard}>
                  <Text
                    style={[
                      noteStyles.editorSectionTitle,
                      rtl ? noteStyles.textRtl : noteStyles.textLtr,
                    ]}
                  >
                    {t("settings:languageTitle")}
                  </Text>
                  <Text
                    style={[
                      noteStyles.editorSectionHint,
                      rtl ? noteStyles.textRtl : noteStyles.textLtr,
                    ]}
                  >
                    {t("settings:languageHint")}
                  </Text>
                  <View style={noteStyles.actionRow}>
                    <Pressable
                      // Saves English as the preferred app language and keeps the user on settings.
                      onPress={() => {
                        void setAppLanguage("en", "/settings");
                      }}
                      style={noteStyles.primaryButton}
                    >
                      <Text
                        style={[
                          noteStyles.primaryButtonText,
                          rtl ? noteStyles.textRtl : noteStyles.textLtr,
                        ]}
                      >
                        {t("settings:languageEnglish")}
                      </Text>
                    </Pressable>
                    <Pressable
                      // Saves Arabic as the preferred app language and keeps the user on settings.
                      onPress={() => {
                        void setAppLanguage("ar", "/settings");
                      }}
                      style={noteStyles.primaryButton}
                    >
                      <Text
                        style={[
                          noteStyles.primaryButtonText,
                          rtl ? noteStyles.textRtl : noteStyles.textLtr,
                        ]}
                      >
                        {t("settings:languageArabic")}
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View style={noteStyles.editorCard}>
                  <Text
                    style={[
                      noteStyles.editorSectionTitle,
                      rtl ? noteStyles.textRtl : noteStyles.textLtr,
                    ]}
                  >
                    {t("settings:storageTitle")}
                  </Text>
                  <Text
                    style={[
                      noteStyles.editorSectionHint,
                      rtl ? noteStyles.textRtl : noteStyles.textLtr,
                    ]}
                  >
                    {t("settings:storageHint")}
                  </Text>
                  <Text
                    style={[
                      noteStyles.headerHint,
                      rtl ? noteStyles.textRtl : noteStyles.textLtr,
                    ]}
                  >
                    {t("settings:storageCount", { count: noteCount })}
                  </Text>
                </View>
              </View>
            </ScrollView>
            <BottomNav />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
