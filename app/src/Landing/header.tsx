import { Feather } from "@expo/vector-icons";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { isRTL, toggleAppLanguage } from "../i18n";
import style from "./style";

type HeaderProfileProps = {
  name: string;
  profileImage: ImageSourcePropType;
};

export function HeaderProfile({ name, profileImage }: HeaderProfileProps) {
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
        <Pressable
          onPress={() => {
            void toggleAppLanguage();
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
