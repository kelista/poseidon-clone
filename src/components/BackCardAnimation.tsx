import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  AsyncStorage, Animated
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import Slider from "@react-native-community/slider";

const windowWidth = Dimensions.get("window").width;

export const BackCardAnimation = (props: any) => {
  const backCard = useRef(new Animated.ValueXY({x: 0, y: 0}))

  const moveBackCard = () => {
    Animated.timing(backCard.current, {
      toValue: {x: 2, y: 2},
      duration: 500,
      useNativeDriver: true
    }).start()
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{width: 20, height: 20, backgroundColor: 'green'}} onPress={() => moveBackCard()}>
        <Animated.View style={[styles.ball, backCard.current.getTranslateTransform()]}>
          <Image source={require('../assets/images/card/BackCard.png')} style={{width: 17, height: 21}}/>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 1200,
    height: 200,
  },
  ball: {
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'yellow'
  },
  text: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 32
  }
});
