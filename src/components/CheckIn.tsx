import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import Slider from "@react-native-community/slider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CheckInWindow = (props: any) => {
	const {
		setModalCheckIn,
		close,
		balance,
    setBalancePlayerGame,
    bankerPool,
    minBet,
    maxBet,
    game,
    rotateSeat
	} = props; 
	const [sliderValue, setsliderValue] = useState(0);
	
	const setSliderMethod = (sliderValue: number) => {
		setsliderValue(sliderValue)
	}

	const buyIn = () => {
		setBalancePlayerGame(sliderValue);
    setModalCheckIn(false)
    if(sliderValue > 0) {
      rotateSeat()
    }
	}
	
	const separatorBalance = (chip: number) => {
    return chip.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const insets = useSafeAreaInsets();

  const checkInContainer: any = useMemo(() => {
    const windowHeight = Dimensions.get("window").height;
    return {  
      position: "absolute",
      height: windowHeight - (insets.bottom + insets.top) - 106,
      width: "100%",
      zIndex: 1000,
      justifyContent: "center",
      alignItems: "center",
    };
  }, [insets]);

  const relative: any = useMemo(() => {
    return {  
      position: 'relative',
      width: '100%',
      height: '100%'
    };
  }, [insets]);

  return (
    <View style={checkInContainer}>
      <View style={relative}>
        <View style={styles.checkInContent}>
          <View style={relative}>
            <View style={styles.checkInTitle}>
              <TouchableOpacity style={styles.checkInClose} onPress={() => close()}>
                <Svg width={13.426} height={13.423} viewBox="0 0 13.426 13.423">
                  <Path
                    data-name="Icon ionic-ios-close"
                    d="M8.304 6.711l4.8-4.8A1.124 1.124 0 0011.515.327l-4.8 4.8-4.8-4.8A1.124 1.124 0 10.331 1.911l4.8 4.8-4.8 4.8a1.124 1.124 0 001.584 1.584l4.8-4.8 4.8 4.8a1.124 1.124 0 101.584-1.584z"
                    fill="#fae087"
                  />
                </Svg>
              </TouchableOpacity>
              <Text style={styles.checkInTitleText}>Poseidon Club</Text>
            </View>
            <View style={styles.checkInBody}>
              {
                game == 'threepic' ?
                <Image
                  source={require("../assets/images/others/threepic-checkin.png")}
                  style={styles.checkInImage3Pic}
                /> 
                :
                game == 'skp' ?
                <Image
                  source={require("../assets/images/others/skp-gamelogo.png")}
                  style={styles.checkInImage}
                />
                :
                <></>
              }
              <View style={styles.checkInBodyWrapper}>
                <Text style={styles.checkInBodyText}>Banker: {bankerPool}</Text>
                <Text style={styles.checkInBodyText}>Min: {minBet}</Text>
                <Text style={styles.checkInBodyText}>Max: {maxBet}</Text>
              </View>
              <View style={styles.checkInBoxContainer}>
                <View style={styles.checkInBoxWrapper}>
                  <LinearGradient
                    colors={["#6E0000", "#400000"]}
                    style={[styles.checkInBoxContent, styles.separatorLeft]}
                  >
                    <Text style={styles.checkInBoxContentTitleText}>Balance</Text>
                  </LinearGradient>
                  <LinearGradient
                    colors={["#6E0000", "#400000"]}
                    style={[styles.checkInBoxContent, styles.separatorRight]}
                  >
                    <Text style={styles.checkInBoxContentTitleText}>Amount</Text>
                  </LinearGradient>
                </View>
                <View style={styles.checkInBoxWrapper}>
                  <View
                    style={[styles.checkInBoxContentBalance, styles.separatorLeft]}
                  >
                    <Text style={styles.checkInBoxContentBalanceText}>
                      {separatorBalance(balance)}
                    </Text>
                  </View>
                  <View
                    style={[styles.checkInBoxContentBalance, styles.separatorRight]}
                  >
                    <Text style={styles.checkInBoxContentBalanceText}>
                      {separatorBalance(sliderValue)}
                    </Text>
                  </View>
                </View>
              </View>
              <Slider
                style={styles.checkInSlider}
                step={1}
                minimumValue={0}
                maximumValue={balance}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#8E8E8E"
                value={sliderValue}
                onValueChange={(sliderValue) => setSliderMethod(sliderValue)}
                thumbTintColor="#E30000"
                // thumbImage={require("../assets/images/others/slider-button-new.png")}
              />
              <LinearGradient
                colors={["#E60000", "#730000"]}
                style={[styles.checkInButtonGradient]}
              >
                <TouchableOpacity
                  style={styles.checkInButton}
                  onPress={buyIn}
                >
                  <Text style={styles.checkInButtonText}>Buy In</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkInContent: {
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: [
      {translateX: -175},
      {translateY: -192.5}
    ],
    width: 350,
    height: 385,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1000,
    borderRadius: 7,
    paddingLeft: 28,
    paddingRight: 28,
  },
  checkInTitle: {
    width: "100%",
    height: 44.5,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#707070",
  },
  checkInClose: {
    position: "absolute",
    right: -27.5,
    height: "100%",
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  checkInTitleText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "700",
    color: "#FAE087",
  },
  checkInBody: {
    alignItems: "center",
    paddingLeft: 1,
    paddingRight: 1,
  },
  checkInImage: {
    marginTop: 12.5,
    width: 118,
    height: 80,
  },
  checkInImage3Pic: {
    marginTop: 12.5,
    width: 140,
    height: 80,
  },
  checkInBodyWrapper: {
    alignItems: "center",
  },
  checkInBodyText: {
    paddingTop: 5,
    fontSize: 11,
    lineHeight: 12,
    color: "#FFFFFF",
  },
  checkInBoxContainer: {
    flexDirection: "column",
    width: "100%",
    height: 64,
    paddingTop: 12,
  },
  checkInBoxWrapper: {
    flexDirection: "row",
    width: "100%",
  },
  checkInBoxContent: {
    flex: 0.5,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
  checkInBoxContentBalance: {
    flex: 0.5,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E1E1E",
  },
  checkInBoxContentTitleText: {
    fontSize: 10,
    lineHeight: 11,
    fontWeight: "700",
    color: "#FAE087",
  },
  checkInBoxContentBalanceText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  separatorRight: {
    marginLeft: 0.5,
  },
  separatorLeft: {
    marginRight: 0.5,
  },
  checkInSlider: {
    width: "100%",
    height: 18,
    marginTop: 24,
    // backgroundColor: 'green'
  },
  checkInButtonGradient: {
    width: "100%",
    height: 44,
    marginTop: 24,
  },
  checkInButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  checkInButtonText: {
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 23,
    color: "#FFFFFF",
  },
});
