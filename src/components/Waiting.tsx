import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const WaitingInfo = () => {
  return (
    <View style={styles.waitingContainer}>
      <View style={styles.waitingBox}>
        <View style={styles.waitingBoxImage}>
          <Image source={require("../assets/images/others/information.png")}/>
        </View>
        <View style={styles.waitingBoxText}>
          <Text style={styles.waitingBoxTextStyle}>Waiting for </Text>
          <Text style={[styles.waitingBoxTextStyle, styles.paddingText]}>Other Player</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  waitingContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1000,
    alignItems: "center",
    top: '33%',
  },
  waitingBox: {
    width: 135,
    height: 130,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  waitingBoxImage: {
    alignItems: 'center',
    paddingTop: 15
  },
  waitingBoxText: {
    paddingTop: 13,
    alignItems: 'center'
  },
  waitingBoxTextStyle: {
    fontSize: 15,
    lineHeight: 17,
    fontWeight: 'bold',
    color: '#E6E6E6'
  },
  paddingText: {
    paddingTop: 3
  }
});

