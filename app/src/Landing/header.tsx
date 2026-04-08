/**
 * Student Guide:
 * This file renders the reusable top header shown on multiple screens.
 * It displays the profile area, the language toggle, and a few icon actions.
 * Because it is shared across sections, changes here affect landing, notes, tasks, and settings.
 * It is also important because it forwards the route used during language-change reload recovery.
 */
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";
import { isRTL, toggleAppLanguage } from "../i18n";
import type { AppResumeRoute } from "../i18n";
import style from "./style";

type HeaderProfileProps = {
  name: string;
  profileImage: ImageSourcePropType;
  // Optional route to reopen after the app reloads during an RTL/LTR language change.
  resumeRoute?: AppResumeRoute;
};

export function HeaderProfile({
  name,
  profileImage,
  resumeRoute,
}: HeaderProfileProps) {
  const { t, i18n } = useTranslation("common");
  const rtl = isRTL(i18n.resolvedLanguage);

  return (
    <View style={[style.headerRow, rtl && style.headerRowRtl]}>
      <View style={[style.profileRow, rtl && style.profileRowRtl]}>
        <Image source={profileImage} style={style.avatar} />
        <Text style={[style.profileName, rtl ? style.textRtl : style.textLtr]}>
          {name}
        </Text>
      </View>

      <View style={[style.headerActions, rtl && style.headerActionsRtl]}>
        {/* Pass the current route into the language toggle so the user stays on the same screen after reload. */}
        <Pressable
          onPress={() => {
            void toggleAppLanguage(resumeRoute);
          }}
          style={[style.languageToggle, rtl && style.languageToggleRtl]}
        >
          <Feather name="globe" size={16} color="#111111" />
          <Text
            style={[
              style.languageToggleText,
              rtl ? style.textRtl : style.textLtr,
            ]}
          >
            {t("languageToggle")}
          </Text>
        </Pressable>

        <Pressable style={style.iconButton}>
          <Feather name="search" size={20} color="#111111" />
        </Pressable>

        <Pressable style={style.iconButton}>
          <Feather name="more-horizontal" size={20} color="#111111" />
        </Pressable>
      </View>
    </View>
  );
}
