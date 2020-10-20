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
  const { username, closeOpenCardPhase } = props
  const wsClient = useContext(WSContext);
  
  const [time, isCounting, startTimer] = useTimer();
  const timeImageString2 = useMemo(() => time + "-timer2", [time]);

  const [deckCard, setDeckCard] = useState<any[]>([]);
  const [baseDeckCard, setbaseDeckCard] = useState<any[]>([]);
  const [recomendationCard, setRecomendationCard] = useState<any[]>([]);
  const [activeCard, setActiveCard] = useState("");
  const [activeCard1, setActiveCard1] = useState("");
  const [activeCard2, setActiveCard2] = useState("");
  const [activeCard3, setActiveCard3] = useState("");
  const [activeCard4, setActiveCard4] = useState("");

  const [deckCard1, setDeckCard1] = useState("");
  const [deckCard2, setDeckCard2] = useState("");
  const [deckCard3, setDeckCard3] = useState("");
  const [deckCard4, setDeckCard4] = useState("");
  const [resultCheck, setResultCheck] = useState(false); 
  const [phase, setPhase] = useState<string>("fresh");
  const [statLastSend, setStatLastSend] = useState(false);
	
	useEffect(() => {
    setStatLastSend(false)
    setResultCheck(false)
    // setDeckCard(["KC", "QS", "JD", "9H"]);
    setbaseDeckCard(["KC", "QS", "JD", "9H"])
    setDeckCard1("KC")
    setDeckCard2("QS")
    setDeckCard3("JD")
    setDeckCard4("9H")
  }, [])

  useEffect(() => {
    if(activeCard1 != "" && activeCard2 != "" && activeCard3 != "" && activeCard4 != "") {
      setResultCheck(true)
    } else {
      setResultCheck(false)
    }
  }, [activeCard1, activeCard2, activeCard3, activeCard4])

  const gamePhaseAction = useCallback(async (data: any) => {
    setPhase(data.phase)
    if (data.phase === "setup") {
      var dataSetup = data.data

      dataSetup.map((d:any) => {
        if (username === d.username) {
          // setDeckCard(d.cards)
          setDeckCard1(d.cards[0])
          setDeckCard2(d.cards[1])
          setDeckCard3(d.cards[2])
          setDeckCard4(d.cards[3])
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
        setStatLastSend(true)
        setTimeout(() => {
          closeOpenCardPhase(false)
        }, 300);
      } else {
        if(resultCheck) {
          wsClient?.sendMessage(setupEvent, {cards: [activeCard1, activeCard2, activeCard3, activeCard4]});
          setStatLastSend(true)
          setTimeout(() => {
            closeOpenCardPhase(false)
          }, 300);
        }
      }
    }
  }, [statLastSend, resultCheck]);

  const tipsCards = useCallback(() => {
    setActiveCard1(recomendationCard[0])
    setActiveCard2(recomendationCard[1])
    setActiveCard3(recomendationCard[2])
    setActiveCard4(recomendationCard[3])
    setDeckCard1("")
    setDeckCard2("")
    setDeckCard3("")
    setDeckCard4("")
    setActiveCard("")
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

  useEffect(() => {
		if(phase === "setup" && time == 1) {
        const array: any[] = []

        if(activeCard1 !== "") {
          array[0] = activeCard1
        } else {
          array[0] = ""
        }
        if(activeCard2 !== "") {
          array[1] = activeCard2
        } else {
          array[1] = ""
        }
        if(activeCard3 !== "") {
          array[2] = activeCard3
        } else {
          array[2] = ""
        }
        if(activeCard4 !== "") {
          array[3] = activeCard4
        } else {
          array[3] = ""
        }
        var status1 = false
        var status2 = false
        var status3 = false
        var status4 = false
        array.map((d:any, index:number) => {
          if(d == "") {
            if(deckCard1 != "" && !status1) {
              array[index] = deckCard1
              status1 = true
            } else if(deckCard2 != "" && !status2) {
              array[index] = deckCard2
              status2 = true
            } else if(deckCard3 != "" && !status3) {
              array[index] = deckCard3
              status3 = true
            } else if(deckCard4 != "" && !status4) {
              array[index] = deckCard4
              status4 = true
            }
          }
        })
      
        if(!statLastSend) {
          sendCards(array)
        }
    }
  }, [phase, time, statLastSend, activeCard1, activeCard2, activeCard3, activeCard4, deckCard1, deckCard2, deckCard3, deckCard4 ]);

  const setCard1 = useCallback(() => {
    if(activeCard1 !== "" && activeCard !== "") {
      console.log("if 1")
      baseDeckCard.map((d:any, index:number) => {
        if(d == activeCard1) {
          if(index == 0) {
            setDeckCard1(activeCard1)
          } else if(index == 1) {
            setDeckCard2(activeCard1)
          } else if(index == 2) {
            setDeckCard3(activeCard1)
          } else if(index == 3) {
            setDeckCard4(activeCard1)
          } 
        }
      })
      if(deckCard1 == activeCard) {
        setDeckCard1("")
      } else if(deckCard2 == activeCard) {
        setDeckCard2("")
      } else if(deckCard3 == activeCard) {
        setDeckCard3("")
      } else if(deckCard4 == activeCard) {
        setDeckCard4("")
      }
      setActiveCard1(activeCard)
      setActiveCard("")
    } else if(activeCard1 !== "") {
      console.log("if 2")
      baseDeckCard.map((d:any, index:number) => {
        if(d == activeCard1) {
          if(index == 0) {
            setDeckCard1(activeCard1)
          } else if(index == 1) {
            setDeckCard2(activeCard1)
          } else if(index == 2) {
            setDeckCard3(activeCard1)
          } else if(index == 3) {
            setDeckCard4(activeCard1)
          } 
        }
      })
      setActiveCard1("")
    } else if(activeCard !== "") {
      console.log("if 3")
      if(deckCard1 == activeCard) {
        setDeckCard1("")
      } else if(deckCard2 == activeCard) {
        setDeckCard2("")
      } else if(deckCard3 == activeCard) {
        setDeckCard3("")
      } else if(deckCard4 == activeCard) {
        setDeckCard4("")
      }
      setActiveCard1(activeCard)
      setActiveCard("")
    }
  }, [activeCard, activeCard1])

  const setCard2 = useCallback(() => {
    if(activeCard2 !== "" && activeCard !== "") {
      baseDeckCard.map((d:any, index:number) => {
        if(d == activeCard2) {
          if(index == 0) {
            setDeckCard1(activeCard2)
          } else if(index == 1) {
            setDeckCard2(activeCard2)
          } else if(index == 2) {
            setDeckCard3(activeCard2)
          } else if(index == 3) {
            setDeckCard4(activeCard2)
          } 
        }
      })
      if(deckCard1 == activeCard) {
        setDeckCard1("")
      } else if(deckCard2 == activeCard) {
        setDeckCard2("")
      } else if(deckCard3 == activeCard) {
        setDeckCard3("")
      } else if(deckCard4 == activeCard) {
        setDeckCard4("")
      }
      setActiveCard2(activeCard)
      setActiveCard("")
    } else if(activeCard2 !== "") {
      baseDeckCard.map((d:any, index:number) => {
        if(d == activeCard2) {
          if(index == 0) {
            setDeckCard1(activeCard2)
          } else if(index == 1) {
            setDeckCard2(activeCard2)
          } else if(index == 2) {
            setDeckCard3(activeCard2)
          } else if(index == 3) {
            setDeckCard4(activeCard2)
          } 
        }
      })
      setActiveCard2("")
    } else if(activeCard !== "") {
      if(deckCard1 == activeCard) {
        setDeckCard1("")
      } else if(deckCard2 == activeCard) {
        setDeckCard2("")
      } else if(deckCard3 == activeCard) {
        setDeckCard3("")
      } else if(deckCard4 == activeCard) {
        setDeckCard4("")
      }
      setActiveCard2(activeCard)
      setActiveCard("")
    }
  }, [activeCard, activeCard2])

  const setCard3 = useCallback(() => {
    if(activeCard3 !== "" && activeCard !== "") {
      baseDeckCard.map((d:any, index:number) => {
        if(d == activeCard3) {
          if(index == 0) {
            setDeckCard1(activeCard3)
          } else if(index == 1) {
            setDeckCard2(activeCard3)
          } else if(index == 2) {
            setDeckCard3(activeCard3)
          } else if(index == 3) {
            setDeckCard4(activeCard3)
          } 
        }
      })
      if(deckCard1 == activeCard) {
        setDeckCard1("")
      } else if(deckCard2 == activeCard) {
        setDeckCard2("")
      } else if(deckCard3 == activeCard) {
        setDeckCard3("")
      } else if(deckCard4 == activeCard) {
        setDeckCard4("")
      }
      setActiveCard3(activeCard)
      setActiveCard("")
    } else if(activeCard3 !== "") {
      baseDeckCard.map((d:any, index:number) => {
        if(d == activeCard3) {
          if(index == 0) {
            setDeckCard1(activeCard3)
          } else if(index == 1) {
            setDeckCard2(activeCard3)
          } else if(index == 2) {
            setDeckCard3(activeCard3)
          } else if(index == 3) {
            setDeckCard4(activeCard3)
          } 
        }
      })
      setActiveCard3("")
    } else if(activeCard !== "") {
      if(deckCard1 == activeCard) {
        setDeckCard1("")
      } else if(deckCard2 == activeCard) {
        setDeckCard2("")
      } else if(deckCard3 == activeCard) {
        setDeckCard3("")
      } else if(deckCard4 == activeCard) {
        setDeckCard4("")
      }
      setActiveCard3(activeCard)
      setActiveCard("")
    }
  }, [activeCard, activeCard3])

  const setCard4 = useCallback(() => {
    if(activeCard4 !== "" && activeCard !== "") {
      baseDeckCard.map((d:any, index:number) => {
        if(d == activeCard4) {
          if(index == 0) {
            setDeckCard1(activeCard4)
          } else if(index == 1) {
            setDeckCard2(activeCard4)
          } else if(index == 2) {
            setDeckCard3(activeCard4)
          } else if(index == 3) {
            setDeckCard4(activeCard4)
          } 
        }
      })
      if(deckCard1 == activeCard) {
        setDeckCard1("")
      } else if(deckCard2 == activeCard) {
        setDeckCard2("")
      } else if(deckCard3 == activeCard) {
        setDeckCard3("")
      } else if(deckCard4 == activeCard) {
        setDeckCard4("")
      }
      setActiveCard4(activeCard)
      setActiveCard("")
    } else if(activeCard4 !== "") {
      baseDeckCard.map((d:any, index:number) => {
        if(d == activeCard4) {
          if(index == 0) {
            setDeckCard1(activeCard4)
          } else if(index == 1) {
            setDeckCard2(activeCard4)
          } else if(index == 2) {
            setDeckCard3(activeCard4)
          } else if(index == 3) {
            setDeckCard4(activeCard4)
          } 
        }
      })
      setActiveCard4("")
    } else if(activeCard !== "") {
      if(deckCard1 == activeCard) {
        setDeckCard1("")
      } else if(deckCard2 == activeCard) {
        setDeckCard2("")
      } else if(deckCard3 == activeCard) {
        setDeckCard3("")
      } else if(deckCard4 == activeCard) {
        setDeckCard4("")
      }
      setActiveCard4(activeCard)
      setActiveCard("")
    }
  }, [activeCard, activeCard4])

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
          </View>
          <View style={styles.cardBodyContainer}>
            <View style={styles.cardBodyWrapper}>
              <View style={[styles.cardBody, styles.separatorLeft]}>
                <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={() => setCard1()}>
                  <Image source={images[activeCard1]} style={styles.cardImageChosen} />
                </TouchableOpacity>
              </View>
              <View style={[styles.cardBody, styles.separatorRight]}>
                <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={() => setCard2()}>
                  <Image source={images[activeCard2]} style={styles.cardImageChosen} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cardBodyWrapper}>
              <View style={[styles.cardBody, styles.separatorLeft]}>
                <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={() => setCard3()}>
                  <Image source={images[activeCard3]} style={styles.cardImageChosen} />
                </TouchableOpacity>
              </View>
              <View style={[styles.cardBody, styles.separatorRight]}>
                <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={() => setCard4()}>
                  <Image source={images[activeCard4]} style={styles.cardImageChosen} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.cardChooseContainer}>
            <TouchableOpacity onPress={() => setActiveCard(deckCard1)}>
              <Image source={images[deckCard1]} style={{...styles.cardImage, borderWidth: deckCard1 == "" ? 0 : activeCard == deckCard1 ? 5 : 0, borderColor: '#FFC72E', borderRadius: 3}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveCard(deckCard2)}>
              <Image source={images[deckCard2]} style={{...styles.cardImage, borderWidth: deckCard2 == "" ? 0 : activeCard == deckCard2 ? 5 : 0, borderColor: '#FFC72E', borderRadius: 3}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveCard(deckCard3)}>
              <Image source={images[deckCard3]} style={{...styles.cardImage, borderWidth: deckCard3 == "" ? 0 : activeCard == deckCard3 ? 5 : 0, borderColor: '#FFC72E', borderRadius: 3}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveCard(deckCard4)}>
              <Image source={images[deckCard4]} style={{...styles.cardImage, borderWidth: deckCard4 == "" ? 0 : activeCard == deckCard4 ? 5 : 0, borderColor: '#FFC72E', borderRadius: 3}} />
            </TouchableOpacity>
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
