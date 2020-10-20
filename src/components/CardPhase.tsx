import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import Slider from "@react-native-community/slider";
import { images } from "../services/imageServices";
import { WSContext } from "../../routes/wsContext";
import { useTimer } from "../services/timer";
import ThreePic from "../styles/ThreePicStyle";

import base from "../styles/base";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const scale = windowWidth / 414;

const gamePhaseEvent = "game/phase";
const setupEvent = "game/setup";

export const CardWindow = (props:any, { close }: { close: Function }) => {
  const { username, closeOpenCardPhase, autoBet } = props
  const wsClient = useContext(WSContext);
  
  const [time, isCounting, startTimer] = useTimer();
  const timeImageString2 = useMemo(() => time + "-timer2", [time]);

  const [balance, setBalance] = useState(0);
  const [betValue, setBetValue] = useState(0);
  const [deckCard, setDeckCard] = useState<any[]>([]);
  const [tempDeckCard, setTempDeckCard] = useState<any[]>([]);
  const [baseDeckCard, setbaseDeckCard] = useState<any[]>([]);
  const [recomendationCard, setRecomendationCard] = useState<any[]>([]);
  const [resultCard, setResultCard] = useState<any[]>([]);
  const [lastCard, setLastCard] = useState("");
  const [checked, setChecked] = useState(false); 
  const [resultCheck, setResultCheck] = useState(false); 
  const [statAuto, setStatAuto] = useState(false); 
  const [phase, setPhase] = useState<string>("fresh");
  const [statLastSend, setStatLastSend] = useState(false);
	
	useEffect(() => {
    setResultCard([0, 0, 0, 0]);
    setStatLastSend(false)
    setResultCheck(false)
    setStatAuto(false)
    // setDeckCard(["KC", "QS", "JD", "9H"]);
    // setbaseDeckCard(["KC", "QS", "JD", "9H"])
  }, []);

  useEffect(() => {
    if(autoBet) {
      closeOpenCardPhase(true)
    } else {
      closeOpenCardPhase(false)
    }
  }, [autoBet])

  useEffect(() => {
    setTempDeckCard(deckCard)
  }, [deckCard])

  useEffect(() => {
    if(resultCard[0] != 0 && resultCard[1] != 0 && resultCard[2] != 0 && resultCard[3] != 0) {
      setResultCheck(true)
    } else {
      setResultCheck(false)
    }
  }, [resultCard])

  const gamePhaseAction = useCallback(async (data: any) => {
    setPhase(data.phase)
    if (data.phase === "setup") {
      var dataSetup = data.data

      dataSetup.map((d:any) => {
        if (username === d.username) {
          setDeckCard(d.cards)
          setbaseDeckCard(d.cards)
          setRecomendationCard(d.recommendation)
        }
      })
    }
  }, []);

  const sendCards = useCallback((cardsParam: any[]) => {
    // ws send here
    if(!statLastSend) {
      if(cardsParam.length > 0) {
        wsClient?.sendMessage(setupEvent, {cards: cardsParam});
        setStatAuto(true)
        setTimeout(() => {
          closeOpenCardPhase(false)
        }, 1000);
        setStatLastSend(true)
      } else {
        if(resultCheck) {
          wsClient?.sendMessage(setupEvent, {cards: resultCard});
          setStatAuto(true)
          setTimeout(() => {
            closeOpenCardPhase(false)
          }, 1000);
          setStatLastSend(true)
        }
      }
    }
  }, [statLastSend, resultCheck]);

  const tipsCards = useCallback(() => {
    setResultCard(recomendationCard)
    setDeckCard([])
  }, [recomendationCard])

  const timerAction = useCallback(
    async function (data: any) {
      startTimer(data.timer);
    },
    [isCounting]
  );

  useEffect(
    function cb() {
      if (!wsClient) return;
      const listeners: string[] = [];

      const timerListener = wsClient.addListener(
        gamePhaseEvent,
        async (data: any) => timerAction(data)
      );
      listeners.push(timerListener);

      const gamePhaseListener = wsClient.addListener(
        gamePhaseEvent,
        gamePhaseAction
      );
      listeners.push(gamePhaseListener);

      return () => {
        listeners.map((lst) => {
          wsClient?.removeListener(lst);
        });
      };
    },
    [wsClient ? true : false]
  );


	const functionAdd = (d:any, index:number) => {
    // setLastCard(d)
    var arrayResult = [...resultCard]
    var found = false
    resultCard.map((drs, index) => {
      if(drs == 0 && !found) {
        arrayResult[index] = d
        setResultCard(arrayResult)
        found = true
      }
    })
    var array = [...deckCard]
    array.splice(index, 1)
		setDeckCard(array)
  }
  
  const functionRemove = (index:any) => {
    var array = [...deckCard]
    baseDeckCard.map((data, idx) => {
      if(resultCard[index] == data) {
        array.splice(baseDeckCard.length + (baseDeckCard.length - 1), 0, resultCard[index])
        resultCard[index] = 0
        setDeckCard(array)
      }

      if(resultCard[0] == 0 && resultCard[1] == 0 && resultCard[2] == 0 && resultCard[3] == 0) {
        array = [0,0,0,0]
        setResultCard(array)
      }
    })
  }

  useEffect(() => {
		if(phase === "setup" && time == 1) {
      if(autoBet && !statAuto) {
        setResultCard(recomendationCard)
        setDeckCard([])
        wsClient?.sendMessage(setupEvent, {cards: resultCard});
        setStatAuto(true)
      } else {
        const array: any[] = []
        resultCard.map((d:any) => {
          if(d != 0) {
            array.push(d)
          }
        })
        deckCard.map((d:any) => {
          array.push(d)
        })
        if(!statLastSend) {
          sendCards(array)
        }
      }
    }
  }, [phase, time, resultCard, autoBet, statAuto, deckCard, statLastSend, recomendationCard ]);

  useEffect(() => {
		if(lastCard != "") {
			setResultCard([...resultCard, lastCard])
		}
  }, [lastCard]);

  return (
    <View style={{...styles.cardContainer}}>
      <View style={styles.cardContent}>
        <View style={styles.cardBodyScalling}>
          <View style={styles.cardCountdown}>
            <View style={ThreePic.ThreePicTimerDiv}>
              <View style={ThreePic.relative}>
                <Image
                  source={images["circle"]}
                  style={ThreePic.ThreePicCircle}
                ></Image>
                {time < 10 ? (
                  <Image
                    source={images[timeImageString2]}
                    style={ThreePic.ThreePicTimer1}
                  />
                ) : time == 11 ? (
                  <Image
                    source={images[timeImageString2]}
                    style={ThreePic.ThreePicTimer3}
                  />
                ) : (
                  <Image
                    source={images[timeImageString2]}
                    style={ThreePic.ThreePicTimer2}
                  />
                )}
              </View>
            </View>
            {/* <Image source={require('../assets/images/others/countdown-dummy.png')}/> */}
          </View>
          <View style={styles.cardBodyContainer}>
            <View style={styles.cardBodyWrapper}>
              <View style={[styles.cardBody, styles.separatorLeft]}>
                <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={() => functionRemove(0)}>
                  <Image source={images[resultCard[0]]} style={styles.cardImageChosen} />
                </TouchableOpacity>
              </View>
              <View style={[styles.cardBody, styles.separatorRight]}>
                <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={() => functionRemove(1)}>
                  <Image source={images[resultCard[1]]} style={styles.cardImageChosen} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cardBodyWrapper}>
              <View style={[styles.cardBody, styles.separatorLeft]}>
              <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={() => functionRemove(2)}>
                  <Image source={images[resultCard[2]]} style={styles.cardImageChosen} />
                </TouchableOpacity>
              </View>
              <View style={[styles.cardBody, styles.separatorRight]}>
                <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={() => functionRemove(3)}>
                  <Image source={images[resultCard[3]]} style={styles.cardImageChosen} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.cardChooseContainer}>
            {deckCard ? (
              deckCard.map((d: any, index:number) => {
                return (
                  <TouchableOpacity key={index} onPress={() => functionAdd(d, index)}>
                    <Image source={images[d]} style={styles.cardImage} />
                  </TouchableOpacity>
                );
              })
            ) : (
              <></>
            )}
          </View>
          <View style={styles.cardButtonContainer}>
            <View style={{flexDirection : 'row'}}>
            <LinearGradient colors={["#168BDD", "#064474"]} style={[styles.cardButtonWrapper, {marginRight: 3}]}>
                <TouchableOpacity style={styles.cardButton} onPress={() => tipsCards()}>
                  <Text style={styles.cardButtonText}>HINT</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient colors={["#E60000", "#730000"]} style={[styles.cardButtonWrapper, {marginLeft: 3}]}>
                <TouchableOpacity style={styles.cardButton} onPress={() => sendCards([])}>
                  <Text style={styles.cardButtonText}>CONFIRM</Text>
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
  cardContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: 75,
    height: 95,
    marginLeft: 6,
  },
  cardImageChosen: {
    width: 97,
    height: 125
  },
  cardContent: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1000,
    borderRadius: 7,
    // paddingLeft: 28,
    // paddingRight: 28,
  },
  cardBodyScalling: {
    transform: [{ scaleX: scale }, { scaleY: scale }],
  },
  cardCountdown: {
    paddingTop: 47,
    alignItems: "center",
    height: 130
  },
  cardBodyContainer: {
    paddingTop: 12,
    alignItems: "center",
    flexDirection: "column",
  },
  cardBodyWrapper: {
    paddingTop: 10,
    flexDirection: "row",
  },
  cardBody: {
    width: 97,
    height: 125,
    backgroundColor: "#3A3C3A",
    borderRadius: 6,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopColor: "#636363",
    borderRightColor: "#636363",
    borderBottomColor: "#636363",
    borderLeftColor: "#636363",
  },
  separatorRight: {
    marginLeft: 3,
  },
  separatorLeft: {
    marginRight: 3,
  },
  cardChooseContainer: {
    flexDirection: "row",
    paddingTop: 19,
    alignItems: "center",
		justifyContent: "center",
		height: 100
  },
  cardButtonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  cardButtonWrapper: {
    alignItems: "center",
    width: 120,
    height: 40,
  },
  cardButton: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardButtonText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
