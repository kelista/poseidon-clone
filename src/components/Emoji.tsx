import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  AsyncStorage
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import Slider from "@react-native-community/slider";
import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;

export const EmojiWindow = (props: any) => {
  const insets = useSafeAreaInsets();
  const emojiContainer: any = useMemo(() => {
    return {  
      position: "absolute",
      height: 157,
      width: 215,
      zIndex: 999,
      bottom: insets.bottom + insets.top + 73,
      right: 30,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'black',
      borderRadius: 6,
      padding: 10
    };
  }, [insets]);
  const { setEmoji } = props
  return (
    <View style={emojiContainer}>
      <View style={styles.rowEmoji}>
        <TouchableOpacity style={styles.rowContent} onPress={() => setEmoji("gif-emoji1-1")}>
          <Image source={require("../assets/images/emoticon/Image1/emoji1-1.png")}/>
          {/* <Image source={require("../assets/images/emoticon/Image1/emoji1-moneySatan.gif")}/> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowContent} onPress={() => setEmoji("gif-emoji1-2")}>
          <Image source={require("../assets/images/emoticon/Image1/emoji1-2.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowContent} onPress={() => setEmoji("gif-emoji1-3")}>
          <Image source={require("../assets/images/emoticon/Image1/emoji1-3.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowContent} onPress={() => setEmoji("gif-emoji1-4")}>
          <Image source={require("../assets/images/emoticon/Image1/emoji1-4.png")}/>
        </TouchableOpacity>
      </View>
      <View style={styles.rowEmoji}>
        <TouchableOpacity style={styles.rowContent} onPress={() => setEmoji("gif-emoji1-5")}>
          <Image source={require("../assets/images/emoticon/Image1/emoji1-5.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowContent} onPress={() => setEmoji("gif-emoji1-6")}>
          <Image source={require("../assets/images/emoticon/Image1/emoji1-6.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowContent} onPress={() => setEmoji("gif-emoji1-7")}>
          <Image source={require("../assets/images/emoticon/Image1/emoji1-7.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowContent} onPress={() => setEmoji("gif-emoji1-8")}>
          <Image source={require("../assets/images/emoticon/Image1/emoji1-8.png")}/>
        </TouchableOpacity>
      </View>
      <View style={styles.rowEmoji}>
        <TouchableOpacity style={{...styles.rowContent, paddingLeft: 7}} onPress={() => setEmoji("gif-emoji1-9")}>
          <Image source={require("../assets/images/emoticon/Image1/emoji1-9.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowContent} onPress={() => setEmoji("gif-emoji1-10")}>
          <Image source={require("../assets/images/emoticon/Image1/emoji1-10.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowContent} onPress={() => setEmoji("gif-emoji1-11")}>
          <Image source={require("../assets/images/emoticon/Image1/emoji1-11.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowContent} onPress={() => setEmoji("gif-emoji1-12")}>
          <Image source={require("../assets/images/emoticon/Image1/emoji1-12.png")}/>
        </TouchableOpacity>
      </View>
    </View>

    // <View style={emojiContainer}>
    //   <View style={styles.rowEmoji}>
    //     <TouchableOpacity style={styles.rowContentTest} onPress={() => setEmoji("gif-emoji1-1")}>
    //       <Image source={require("../assets/images/emoticon/Image1/emoji1-1.png")}/>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.rowContentTest} onPress={() => setEmoji("gif-emoji1-4")}>
    //       <Image source={require("../assets/images/emoticon/Image1/emoji1-4.png")}/>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.rowContentTest} onPress={() => setEmoji("gif-emoji1-10")}>
    //       <Image source={require("../assets/images/emoticon/Image1/emoji1-10.png")}/>
    //     </TouchableOpacity>
    //   </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  rowEmoji: {
    flex: 1,
    flexDirection: 'row'
  },
  rowContent: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
  },
  rowContentTest: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  }
});
