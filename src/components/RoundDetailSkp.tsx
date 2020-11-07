import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import { images } from "../services/imageServices";
import ThreePic from "../styles/ThreePicStyle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WSContext } from "../../routes/wsContext";

const windowWidth = Dimensions.get("window").width;
const scale = windowWidth / 375;

export const RoundDetail = (props: any) => {
  const { pageHistory, setPageHistory } = props
  const wsClient = useContext(WSContext);

  const balance = 1000;
  const [sliderValue, setsliderValue] = useState(0);
  const setSliderMethod = (sliderValue: number) => {
    setPageHistory(sliderValue);
  };

  const [history, setHistory] = useState<any>();

  const historyEvent = "game/history";

  useEffect(
    function cb() {
      if (!wsClient) return;
      const listeners: string[] = [];

      const historyAction = async function (data: any) {
        console.log(data)
        setHistory(data);
      };

      const historyListener = wsClient.addListener(historyEvent, historyAction);
      listeners.push(historyListener);

      return () => {
        listeners.map((lst) => {
          wsClient?.removeListener(lst);
        });
      };
    },
    [wsClient ? true : false]
  );

  useEffect(
    function gameInit() {
      wsClient?.sendMessage(historyEvent, { page: pageHistory });
    },
    [pageHistory]
  );

  const backBtn = () => {
    if (pageHistory > 1) {
      setPageHistory(pageHistory - 1);
    }
  };

  const backLastBtn = () => {
    setPageHistory(1);
  };

  const forwardBtn = () => {
    if (pageHistory < history.totalRound) {
      setPageHistory(pageHistory + 1);
    }
  };

  const forwardLastBtn = () => {
    if (history.totalRound > 0) {
      setPageHistory(history.totalRound);
    }
  };

  const insets = useSafeAreaInsets();

  const pagingArea: any = useMemo(() => {
    const windowHeight = Dimensions.get("window").height;
    return {
      width: "100%",
      position: "absolute",
      bottom: 85 + insets.bottom + insets.top,
    };
  }, [insets]);

  const styleResult: any = useMemo(() => {
    const windowHeight = Dimensions.get("window").height;
    return {  
      flex: 1,
      // height: windowHeight - (insets.bottom + insets.top) - 106 - 53,
    };
  }, [insets]);

  const styleResultContainer: any = useMemo(() => {
    const windowHeight = Dimensions.get("window").height;
    return {  
      height: windowHeight - (insets.bottom + insets.top) - 106 - 133 - 29 - 25,
    };
  }, [insets]);

  return (
    <View style={styles.RoundDetailContainer}>
      <View style={styles.RoundBodyWrapper}>
        <View style={styles.RoundDetailTitle}>
          <Text style={styles.RoundDetailTitleText}>Round Detail</Text>
        </View>
        <LinearGradient
          colors={["#6E0000", "#400000"]}
          style={styles.RoundDetailHeader}
        >
          <Text style={styles.RoundDetailHeaderText}>
            Round: #
            {history
              ? history.roundId.length > 27
                ? history.roundId.substring(0, 27) + "..."
                : history.roundId
              : ""}
          </Text>
        </LinearGradient>
        <View>
          <View style={{...styleResultContainer}}>
            <ScrollView>
              <View style={{...styleResult}}>
                {history ? (
                  history.reports.map((d: any, index: number) => {
                    return (
                      <View style={styles.RoundDetailList} key={index}>
                        <View style={styles.RoundDetailListRowOne}>
                          <View style={styles.RoundDetailListRowOneWrapper}>
                            <Image
                              source={require("../assets/images/others/player1.png")}
                              style={styles.RoundDetailUserIcon}
                            />
                            <View style={{ alignItems: "center", width: '100%' }}>
                              <Text style={styles.RoundDetailListRowOneText}>
                                {d.username}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.RoundDetailListRowTwo}>
                          <View style={{ flexDirection: "row" }}>
                            <View style={{ flexDirection: 'column' }}>
                              <View style={{ width: 17,height: 21,marginTop: 2.2,transform: [{ rotate: "-15deg" }]}}>
                                <Image
                                  source={images[d.cards[0]]}
                                  style={ThreePic.cardImage}
                                />
                              </View>
                              <View style={{width: 17,height: 21,marginLeft: -1, transform: [{ rotate: "-15deg" }]}}>
                                <Image
                                  source={images[d.cards[2]]}
                                  style={ThreePic.cardImage}
                                />
                              </View>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                              <View style={{width: 17,height: 21,marginLeft: -1, marginTop: 2.2,transform: [{ rotate: "15deg" }]}}>
                                <Image
                                  source={images[d.cards[1]]}
                                  style={ThreePic.cardImage}
                                />
                              </View>
                              <View style={{width: 17,height: 21,marginLeft: -1, marginTop: 2.2,transform: [{ rotate: "15deg" }]}}>
                                <Image
                                  source={images[d.cards[3]]}
                                  style={ThreePic.cardImage}
                                />
                              </View>
                            </View>
                          </View>
                          <View style={{ paddingTop: 9 }}>
                            <View style={{flexDirection: 'column'}}>
                              <Text style={{ fontSize: 8, lineHeight: 9, color: "#FFFFFF" }}>
                                {d.point[0]}
                              </Text>
                              <Text style={{ fontSize: 8, lineHeight: 9, color: "#FFFFFF" }}>
                                {d.point[1]}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.RoundDetailListRowThree}>
                          <View style={styles.RoundDetailListRowThreeWrapper}>
                            <Text
                              style={
                                d.amount < 0
                                  ? styles.RoundDetailListRowThreeTextRed
                                  : styles.RoundDetailListRowThreeText
                              }
                            >
                              {d.amount > 0 ? "+" + d.amount : d.amount}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <></>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={{ ...pagingArea }}>
          <View style={{ width: "100%", paddingLeft: 10, paddingRight: 10 }}>
            <Slider
              style={styles.RoundDetailSlider}
              step={1}
              minimumValue={1}
              maximumValue={history ? history.totalRound : 1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#8E8E8E"
              value={pageHistory}
              onValueChange={(pageHistory) => setSliderMethod(pageHistory)}
              thumbTintColor="#E30000"
              // thumbImage={require("../assets/images/others/slider-button-new.png")}
            />
          </View>
          <View style={styles.RoundDetailPaging}>
            <View style={{ position: "relative", width: "100%" }}>
              <TouchableOpacity
                style={styles.RoundDetailPagingButtonBackward}
                onPress={backLastBtn}
              >
                <Image
                  source={require("../assets/images/others/button-backward.png")}
                  style={styles.RoundDetailPagingButtonBackwardImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={backBtn}
                style={styles.RoundDetailPagingButtonBack}
              >
                <Image
                  source={require("../assets/images/others/button-back.png")}
                  style={styles.RoundDetailPagingButtonBackwardImage}
                />
              </TouchableOpacity>

              <View style={{ width: "100%", alignItems: "center" }}>
                <Text style={styles.RoundDetailPagingText}>
                  {pageHistory} /{" "}
                  {history
                    ? history.totalRound != 0
                      ? history.totalRound
                      : 1
                    : 1}
                </Text>
              </View>
              <TouchableOpacity
                onPress={forwardLastBtn}
                style={styles.RoundDetailPagingButtonBackwardReverse}
              >
                <Image
                  source={require("../assets/images/others/button-backward.png")}
                  style={styles.RoundDetailPagingButtonBackwardImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={forwardBtn}
                style={styles.RoundDetailPagingButtonBackReverse}
              >
                <Image
                  source={require("../assets/images/others/button-back.png")}
                  style={styles.RoundDetailPagingButtonBackwardImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  RoundDetailContainer: {
    position: "absolute",
    left: 0,
    width: 259,
    height: "100%",
    zIndex: 999,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  RoundBodyWrapper: {
    position: "relative",
    height: "100%",
    //   backgroundColor: 'red'
    // transform: [{ scaleX: scale }, { scaleY: scale }]
  },
  RoundDetailTitle: {
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  RoundDetailTitleText: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 17,
    color: "#FAE88C",
  },
  RoundDetailHeader: {
    height: 26,
    justifyContent: "center",
  },
  RoundDetailHeaderText: {
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 17,
    color: "#FAE88C",
    paddingLeft: 29,
  },
  RoundDetailUserIcon: {
    width: 29,
    height: 29,
    marginTop: -3
  },
  RoundDetailSlider: {
    width: "100%",
    height: 18,
    marginTop: 24,
    transform: [{ scaleX: scale }, { scaleY: scale }],
    // backgroundColor: 'green'
  },
  RoundDetailList: {
    height: 70,
    marginTop: scale < 0.9 ? 8 : 12,
    paddingLeft: 20,
    paddingRight: 24,
    display: "flex",
    flexDirection: "row",
  },
  RoundDetailListRowOne: {
    flex: 0.4,
    alignItems: "flex-start",
    transform: [{ scaleX: scale }, { scaleY: scale }],
  },
  RoundDetailListRowTwo: {
    flex: 0.268,
    alignItems: "center",
    transform: [{ scaleX: scale }, { scaleY: scale }],
  },
  RoundDetailListRowThree: {
    flex: 0.421,
    alignItems: "center",
    transform: [{ scaleX: scale }, { scaleY: scale }],
  },
  RoundDetailListRowOneWrapper: {
    width: 60,
    height: "100%",
    alignItems: "center",
  },
  RoundDetailListRowOneText: {
    fontSize: 8,
    lineHeight: 9,
    color: "#FAE88C",
    paddingTop: 3
  },
  RoundDetailListRowThreeWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  RoundDetailListRowThreeText: {
    fontSize: 12,
    lineHeight: 14,
    color: "#00F930",
  },
  RoundDetailListRowThreeTextRed: {
    fontSize: 12,
    lineHeight: 14,
    color: "#F03939",
  },
  RoundDetailPaging: {
    position: "relative",
    height: 18,
    width: "100%",
    marginTop: 18,
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  RoundDetailPagingText: {
    fontSize: 11,
    fontWeight: "bold",
    lineHeight: 12,
    color: "#FAE88C",
  },
  RoundDetailPagingButtonBackward: {
    position: "absolute",
    left: 0,
    width: 18,
    height: 18,
    zIndex: 5,
    borderRadius: 18,
    transform: [{ translateY: -4.5 }],
  },
  RoundDetailPagingButtonBackwardImage: {
    width: 18,
    height: 18,
  },
  RoundDetailPagingButtonBack: {
    position: "absolute",
    left: 25,
    width: 18,
    height: 18,
    zIndex: 5,
    borderRadius: 18,
    transform: [{ translateY: -4.5 }],
  },
  RoundDetailPagingButtonBackwardReverse: {
    position: "absolute",
    right: 0,
    width: 18,
    height: 18,
    backgroundColor: "#FAE88C",
    borderRadius: 18,
    transform: [{ translateY: -4.5 }, { rotate: "-180deg" }],
  },
  RoundDetailPagingButtonBackReverse: {
    position: "absolute",
    right: 25,
    width: 18,
    height: 18,
    backgroundColor: "#FAE88C",
    borderRadius: 18,
    transform: [{ translateY: -4.5 }, { rotate: "-180deg" }],
  },
  RoundDetailCardImage: {
    width: 17,
    height: 21,
  }
});
