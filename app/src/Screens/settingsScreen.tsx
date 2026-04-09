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
  const { t, i18n } = useTranslation(["landing", "settings"]);
  const rtl = isRTL(i18n.resolvedLanguage);
  const noteCount = useAppSelector((state) => state.notes.items.length);

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={landingStyles.safeArea}>
        <View style={landingStyles.phoneShell}>
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={landingStyles.content}
              showsVerticalScrollIndicator={false}
            >
              <HeaderProfile
                name={t("profileName")}
                profileImage={profileImage}
                resumeRoute="/settings"
              />
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
