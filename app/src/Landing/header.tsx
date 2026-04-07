import { Image, Pressable, Text, View } from "react-native";
import style from "./style";

export function HeaderProfile(ProfileImage: string, Name: string) {
  return (
    <View style={style.headerContainer}>
      <Image style={style.headerProfileImage}></Image>
      <Text style={style.headerTitle}></Text>
      <Pressable>
        <Image style={style.headerSearchImage}></Image>
      </Pressable>
    </View>
  );
}
