import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  useMemo, useRef
} from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Image,
  ImageBackground,
  Dimensions,
  BackHandler,
  Platform, AsyncStorage
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { NavigationScreenComponent } from "react-navigation";
import { ROUTES } from "../../../../../routes";
import { WebSocketClient } from "../../../../services/websocket";
import { CustomHeader } from "../../../../components/Header";
import { BottomNavigation } from "../../../../components/BottomNavigation";
import { CheckInWindow } from "../../../../components/CheckIn";
import { BettingWindow } from "../../../../components/Betting";
import { RoundDetail } from "../../../../components/RoundDetail";
import { WaitingInfo } from "../../../../components/Waiting";
import { LiveScore } from "../../../../components/LiveScore";
import { CardWindow } from "../../../../components/CardPhase";
import ThreePic from "../../../../styles/ThreePicStyle";
import { CustomheaderLogo } from "../../../../components/HeaderLogo";
import { WSContext } from "../../../../../routes/wsContext";
import { images } from "../../../../services/imageServices";
import { BSContext } from "../../../../../routes/bsContext";
import { SSContext } from "../../../../../routes/simpleStoreContext";
import { useTimer } from "../../../../services/timer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { BackCardAnimation } from "../../../../components/BackCardAnimation";
import CardFlip from 'react-native-card-flip';

interface EventDataPhase {
  phase: string;
  time: number;
}

interface Player {
  username: string;
  seatNumber: number;
  bot: boolean;
  balance: number;
  bet: number;
  cards: string[];
  result?: number;
}

interface PlayerCard {
  username: string;
  cards: string[];
}

const multiplier = 2;

const infoEvent = "info";
const moveEvent = "move";
const metaEvent = "game/meta";
// const poolEvent = "game/pool";
const historyEvent = "game/history";
const buyInEvent = "game/sign";
const gameInfoEvent = "game/info";
const gamePhaseEvent = "game/phase";
const gameBetEvent = "game/bet";
const liveScoreEvent = "game/livescore";

export const PoseidonThreePicGame: NavigationScreenComponent<any, any> = (
  props
) => {
  const { navigate } = props.navigation;

  const card11 = useRef<any>(null)
  const card12 = useRef<any>(null)
  const card13 = useRef<any>(null)

  const card21 = useRef<any>(null)
  const card22 = useRef<any>(null)
  const card23 = useRef<any>(null)

  const card31 = useRef<any>(null)
  const card32 = useRef<any>(null)
  const card33 = useRef<any>(null)

  const cardRefs = useMemo(() => [
    [card11, card12, card13],
    [card21, card22, card23] 
    [card31, card32, card33]  
  ], [
    card11.current,
    card12.current,
    card13.current,
    card21.current,
    card22.current,
    card23.current,
    card31.current,
    card32.current,
    card33.current
  ])

  const [time, isCounting, startTimer] = useTimer();
  const timeImageString = useMemo(() => time + "-timer", [time]);
  const timeImageString2 = useMemo(() => time + "-timer2", [time]);
  const BackCard = "back";

  const wsClient = useContext(WSContext);
  const bs = useContext(BSContext);
  const ss = useContext(SSContext);

  const [modalCheckIn, setModalCheckIn] = useState(props.modalCheckIn);
  const [banker, setBanker] = useState("");
  const [sitStatus, setSitStatus] = useState("");
  const [amount, setAmount] = useState(0);
  const [modalBetting, setModalBetting] = useState(false);
  const [autoBet, setAutoBet] = useState(false);
  const [modalRound, setModalRound] = useState(false);
  const [modalLive, setModalLive] = useState(false);
  const [modalCard, setModalCard] = useState(true);
  const [modalWaiting, setModalWaiting] = useState(true);
  const [statLastBet, setStatLastBet] = useState(false);
  const [lastBet, setLastBet] = useState(0);
  const [pageHistory, setPageHistory] = useState(1);
  const [bankerLimit, setBankerLimit] = useState(0);
  const [seatNumberNow, setSeatNumberNow] = useState(0);
  const [roundDetailPage, setRoundDetailPage] = useState(1);
  const [roundDetailCount, setRoundDetailCount] = useState(0);

  const [connecting, setConnecting] = useState(true);
  const [buyInStat, setBuyInStat] = useState(false);
  const [balancePlayer, setBalancePlayer] = useState(0);
  const [balancePlayerGame, setBalancePlayerGame] = useState(0);
  const [userBet, setUserBet] = useState(0);
  const [username, setUsername] = useState("");
  const [minBet, setMinBet] = useState(0);
  const [midBet, setMidBet] = useState(0);
  const [maxBet, setMaxBet] = useState(0);
  // const [bankerPool, setBankerPool] = useState(0);
  const [player1, setPlayer1] = useState<Player>();
  const [player2, setPlayer2] = useState<Player>();
  const [player3, setPlayer3] = useState<Player>();
  const [player4, setPlayer4] = useState<Player>();
  const [player5, setPlayer5] = useState<Player>();
  const [player6, setPlayer6] = useState<Player>();
  const [player7, setPlayer7] = useState<Player>();
  const [player8, setPlayer8] = useState<Player>();

  const [playerCards, setPlayerCards] = useState<PlayerCard[]>([
    {username: "", cards: []}, // player 1
    {username: "", cards: []}, // player 2
    {username: "", cards: []}, // player 3
    {username: "", cards: []}, // player 4
    {username: "", cards: []}, // player 5
    {username: "", cards: []}, // player 6
    {username: "", cards: []}, // player 7
    {username: "", cards: []}, // player 8
  ]);

  /** phase fresh */
  const resetPlayerCards = useCallback(() => {
    setPlayerCards(pc => pc.map(p => ({username: p.username, cards:[]})));
    // setPlayerCards([
    //  {username: "", cards: []}, // player 1
    // {username: "", cards: []}, // player 2
    // {username: "", cards: []}, // player 3
    // {username: "", cards: []}, // player 4
    // {username: "", cards: []}, // player 5
    // {username: "", cards: []}, // player 6
    // {username: "", cards: []}, // player 7
    // {username: "", cards: []}, // player 8
    // ])
  }, []);

  const [lastResult, setLastResult] = useState<any[]>([]);
  const [startFlip, setStartFlip] = useState(false);
  const [startReverseFlip, setStartReverseFlip] = useState(false);

  useEffect(() => {
    if(startFlip) {
      setStartFlip(false);
      for(let i = 0; i < 8; i++) {
        const playerCardRefs = cardRefs[i];
        setTimeout(() => {
          if(playerCardRefs) {
            playerCardRefs.forEach(ref => {
              console.log(ref?.current?.flip)
              ref?.current?.flip();
            })
          }
        }, 1000);
      }
    }
  }, [startFlip]);

  useEffect(() => {
    if(startReverseFlip) {
      setStartReverseFlip(false);
      for(let i = 0; i < 8; i++) {
        const playerCardRefs = cardRefs[i];
        if(playerCardRefs) {
            playerCardRefs.forEach(ref => {
              console.log(ref?.current?.flip)
              ref?.current?.flip();
            })
          }
      }
    }
  }, [startReverseFlip]);

  /** phase fresh */
  const clearLastResult = useCallback(() => {
    setLastResult([]);
    setStartReverseFlip(true);
  }, []);

  useEffect(() => {
    const playerStates = [player1, player2,player3,player4,player5,player6,player7,player8];
    setPlayerCards(pc => pc.map((d, i) => {
      return {
        username: playerStates[i]?.username || "",
        cards: d.cards,
      }
    }));
  }, [!!player1, !!player2, !!player3, !!player4, !!player5, !!player6, !!player7, !!player8]);

  useEffect(() => {
    if(lastResult.length > 0) {
      // masukin kartu
      setPlayerCards((plcs) => plcs.map(plc => {
        const thisPlayerResult = lastResult.find(lr => lr.username === plc.username);
        if(!thisPlayerResult) {
          return plc;
        }else{
          return {
            username: plc.username,
            cards: thisPlayerResult.cards
          }
        }
      }))
      setStartFlip(true);
    }
  }, [lastResult.length]);


  const [result, setResult] = useState(null);
  const [info, setInfo] = useState(null);
  const [phase, setPhase] = useState<string>("fresh");

  // const [time, isCounting, startTimer] = useTimer();

  const windowWidth = Dimensions.get("window").width;

  const autoBetAction = () => {
    if(buyInStat) {
      if(autoBet) {
        setAutoBet(false)
      } else {
        setAutoBet(true)
      }
    }
  }

  const flipCard1 = () => {
    card11.current?.flip()
    card12.current?.flip()
    card13.current?.flip()
  }

  const gameInfoAction = useCallback(async function (data: any) {
    setInfo(data.players);
    let banker = data.banker;

    setBanker(banker);
    const playerStates = [
      setPlayer1,
      setPlayer2,
      setPlayer3,
      setPlayer4,
      setPlayer5,
      setPlayer6,
      setPlayer7,
      setPlayer8,
    ];

    playerStates.forEach((p, index) => {
      const player = data.players.find((d: any) => d.seatNumber === index + 1);
      if (player) {
        player.cards = [];
        p(player);
        setUsername((u) => {
          if (player.username === u) {
            const totalBet = player.username === banker ? 0 : player.bet;
            setUserBet(totalBet / multiplier);
            setBalancePlayerGame(player.balance);
          }
          return u;
        });
      } else {
        p(undefined);
      }
    });
  }, []);

  const metaAction = useCallback(async function (data: any) {
    setMinBet(data.min);
    setMidBet(data.mid);
    setMaxBet(data.max);
    const multiplier = 2
    const bankerLimit = data.max * data.cap * multiplier  
    setBankerLimit(bankerLimit)
  }, []);

  const timerAction = useCallback(
    async function (data: any) {
      startTimer(data.timer);
    },
    [isCounting]
  );

  // const poolAction = useCallback(async function (data: any) {
  //   setBankerPool(data.pool);
  // }, []);

  const liveScoreAction = useCallback(async function (data: any) {
    setResult(data);
  }, []);

  // method
  const gamePhaseAction = useCallback(async (data: any) => {
    setPhase(data.phase);

    wsClient?.sendMessage(infoEvent, {});

    if(data.phase === "fresh") {
      resetPlayerCards()
      clearLastResult()
       // setBankerPool(0);
       setModalBetting(false);
    }
    
    if (data.phase === "result") {
      setStatLastBet(false)
      setModalBetting(false);
      wsClient?.sendMessage(historyEvent, { page: pageHistory });
      const playerStates = [
        setPlayer1,
        setPlayer2,
        setPlayer3,
        setPlayer4,
        setPlayer5,
        setPlayer6,
        setPlayer7,
        setPlayer8,
      ];

      setLastResult(data.data);

      // playerStates.forEach((p, index) => {
      //   p((player) => {
      //     if (player) {
      //       const np = { ...player };
      //       const username = player.username;
      //       const result = data.data.find((d: any) => d.username === username);
      //       if (result) {
      //         np.cards = [BackCard, BackCard, BackCard];
      //         setTimeout(() => {
      //           np.result = result.win;
      //           np.cards = result.cards;
      //           array.push(np.cards)
      //           if(np.cards && np.seatNumber == 1) {
      //             setPlayer1C(np.cards)
      //             flipCard1()
      //           }
      //         }, 1000);
      //       }
      //       return np;
      //     }
      //     return player;
      //   });
      // });
    }

    if (data.phase === "waiting") {
      setModalWaiting(true);
    } else {
      setModalWaiting(false);
    }
  }, []);

  useEffect(() => {
    if (
      phase === "bet" &&
      banker !== username &&
      balancePlayerGame != 0 &&
      buyInStat
    ) {
      if(autoBet) {
        AsyncStorage.getItem("last-bet").then(d => {
          if(Number(d) > 0) {
            setModalBetting(false);
            if(phase === 'bet' && !statLastBet && time == 1) {
              sendBet(Number(d))
            }
          } else {
            if(phase === 'bet' && !statLastBet) {
              setModalBetting(true);
              setModalLive(false);
            }
          }
        })
      } else if(!statLastBet) {
        setModalBetting(true);
        setModalLive(false);
      }
    }
  }, [phase, banker, username, autoBet, buyInStat, statLastBet, time]);

  useEffect(() => {
    console.log("last bet :", lastBet)
  }, [lastBet])

  // listen connect
  useEffect(
    function cb() {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        lobbyHandler
      );
      if (!wsClient) return;
      const listeners: string[] = [];

      const connectCB = async function (data: any) {
        setUsername(data.username);
        setBalancePlayer(data.balance);
      };

      const moveAction = async function (data: any) {
        Promise.all([
          AsyncStorage.setItem("last-bet", String(0))
        ]);
        if (data === "L") {
          navigate(ROUTES.PoseidonThreePicRoom);
        }
      };

      const infoListener = wsClient.addListener(infoEvent, connectCB);
      listeners.push(infoListener);

      const moveListener = wsClient.addListener(moveEvent, moveAction);
      listeners.push(moveListener);

      const metaListener = wsClient.addListener(metaEvent, metaAction);
      listeners.push(metaListener);

      // const poolListener = wsClient.addListener(poolEvent, poolAction);
      // listeners.push(poolListener);

      const gameInfoListener = wsClient.addListener(
        gameInfoEvent,
        gameInfoAction
      );
      listeners.push(gameInfoListener);

      const gamePhaseListener = wsClient.addListener(
        gamePhaseEvent,
        gamePhaseAction
      );
      listeners.push(gamePhaseListener);

      const liveScoreListener = wsClient.addListener(
        liveScoreEvent,
        liveScoreAction
      );
      listeners.push(liveScoreListener);

      const timerListener = wsClient.addListener(
        gamePhaseEvent,
        async (data: any) => timerAction(data)
      );
      listeners.push(timerListener);

      // const timerListener = wsClient.addListener("game/phase", async (data: EventDataPhase) => {
      //   if(data.time){
      //     startTimer(data.time);
      //   }
      // });
      // listeners.push(timerListener);

      return () => {
        backHandler.remove();
        listeners.map((lst) => {
          wsClient?.removeListener(lst);
        });
      };
    },
    [wsClient ? true : false]
  );

  const lobbyHandler = () => {
    wsClient?.sendMessage("lobby", {});
    return true;
  };

  const sitHandler = (seatNumber: number) => {
    if (!buyInStat) {
      if (balancePlayerGame == 0) {
        setSeatNumberNow(seatNumber);
        setModalCheckIn(true);
      } else {
        sendBuyIn(seatNumber);
      }
    }
  };

  const sendBuyIn = (seatNumber: number) => {
    setBuyInStat(true);
    wsClient?.sendMessage(buyInEvent, {
      amount: balancePlayerGame,
      seatNumber: seatNumber,
    });
  };

  const accountHandler = () => {
    navigate(ROUTES.PoseidonAccount);
  };

  const closeOpenCheckIn = () => {
    setModalCheckIn(!modalCheckIn);
  };

  const closeOpenBetting = () => {
    setModalBetting(!modalBetting)
    setStatLastBet(true)
  };

  const closeOpenRoundDetail = () => {
    setModalRound(!modalRound);
    setModalLive(false);
  };

  const closeOpenLiveScore = () => {
    setModalLive(!modalLive);
    setModalRound(false);
  };

  const closeOpenWaiting = () => {
    setModalWaiting(!modalWaiting);
  };

  const buyIn = () => {
    closeOpenCheckIn();
    // closeOpenBetting()
  };

  const closeOpenCard = () => {
    setModalCard(!modalCard);
  };

  const sendBet = (amount: number) => {
    console.log("amount :", amount)
    if(amount > 0) {
      wsClient?.sendMessage(gameBetEvent, { amount });
      setStatLastBet(true)
      setLastBet(amount)
    }
  };

  useEffect(function gameInit() {
    setModalCheckIn(false);
    setModalLive(false);
    setModalRound(false);
    setBalancePlayerGame(0);
    wsClient?.sendMessage(infoEvent, {});
    wsClient?.sendMessage(metaEvent, {});
    wsClient?.sendMessage(gameInfoEvent, {});
  }, []);

  useEffect(() => {
    if (balancePlayerGame != 0 && !buyInStat && seatNumberNow != 0) {
      sendBuyIn(seatNumberNow);
    }
  }, [balancePlayerGame, buyInStat, seatNumberNow]);

  const insets = useSafeAreaInsets();

  const styleSafeArea: any = useMemo(() => {
    const windowHeight = Dimensions.get("window").height;
    return {  
      width: "100%",
      height: windowHeight - (insets.bottom + insets.top) - 106,
      position: "relative",
      alignItems: "center",
    };
  }, [insets]);

  const constEmojiButton: any = useMemo(() => {
    return {
      position: 'absolute',
      zIndex: 1,
      bottom: 65 + insets.top + insets.bottom,
      right: 30,
      width: 34,
      height: 34,
      alignItems: 'center',
      justifyContent: 'center'
    };
  }, [insets]);

  const constAutoBet: any = useMemo(() => {
    return {
      position: 'absolute',
      zIndex: 1,
      bottom: 65 + insets.top + insets.bottom,
      left: 15,
      width: 53,
      height: 25,
      alignItems: 'center',
      justifyContent: 'center'
    };
  }, [insets]);

  const ThreePicGameTableImage: any = useMemo(() => {
    const windowHeight = Dimensions.get("window").height;
    const windowWidth = Dimensions.get("window").width;
    const sc = Math.min(
      windowWidth / 361,
      (windowHeight - (insets.bottom + insets.top) - 56) / 584
    );
    const sc2 = Math.min(
      windowWidth / 400,
      (windowHeight - (insets.bottom + insets.top) - 56) / 644
    );
    const style = {
      position: "absolute",
      transform: [
        { scaleX: windowHeight <= 736 ? sc2 : sc },
        { scaleY: windowHeight <= 736 ? sc2 : sc },
      ],
    };
    return style;
  }, [insets]);

  const ThreePicGamePinWrapper: any = useMemo(() => {
    const windowHeight = Dimensions.get("window").height;
    const windowWidth = Dimensions.get("window").width;
    const sc = Math.min(
      windowWidth / 361,
      (windowHeight - (insets.bottom + insets.top) - 56) / 584
    );
    const sc2 = Math.min(
      windowWidth / 400,
      (windowHeight - (insets.bottom + insets.top) - 56) / 644
    );
    const style = {
      position: "relative",
      height: 584,
      zIndex: 5,
      width: 331,
      transform: [
        { scaleX: windowHeight <= 736 ? sc2 : sc },
        { scaleY: windowHeight <= 736 ? sc2 : sc },
      ],
    };
    return style;
  }, [insets]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        {/* <CustomHeader title="Poseidon Club" status="lobby"></CustomHeader> */}
        <CustomheaderLogo
          name="threepic"
          lobby={() => lobbyHandler()}
        ></CustomheaderLogo>
        <ScrollView scrollEnabled={false}>
          <View style={ThreePic.relative}>
            <View style={ThreePic.infoButton}>
              <View style={ThreePic.relative}>
                {/* <TouchableOpacity style={[ThreePic.absCenter, ThreePic.alertBtn]}> */}
                <TouchableOpacity style={{}}>
                  <Image
                    source={require("../../../../assets/images/others/alert-btn.png")}
                    style={ThreePic.alertButton}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <StatusBar hidden />
            {/* disini bill */}
            {/* oke kalem ya */}
            {modalRound ? <RoundDetail pageHistory={pageHistory} setPageHistory={setPageHistory}></RoundDetail> : <></>}
            {modalLive ? (
              <LiveScore result={result} info={info}></LiveScore>
            ) : (
              <></>
            )}
            {modalCheckIn ? (
              <CheckInWindow
                close={() => closeOpenCheckIn()}
                setModalCheckIn={setModalCheckIn}
                balance={balancePlayer}
                setBalancePlayerGame={setBalancePlayerGame}
                minBet={minBet}
                maxBet={maxBet}
                // bankerPool={bankerPool}
                bankerPool={bankerLimit}
              />
            ) : (
              <></>
            )}
            {modalBetting ? (
              <BettingWindow
                close={() => closeOpenBetting()}
                balanceGame={balancePlayerGame}
                sendBet={sendBet}
                setModalBetting={setModalBetting}
                maxBet={maxBet}
                midBet={midBet}
                minBet={minBet}
              />
            ) : (
              <></>
            )}
            <View style={ThreePic.container}>
              {/* <View style={ThreePic.ThreePicGameProfile}>
              <View style={ThreePic.ThreePicGameProfileWrapper}>
                <Image source={require('../../../../assets/images/others/small-profile.png')} style={ThreePic.ThreePicGameProfileImage}/>
                <Text style={ThreePic.ThreePicGameProfileUsername}>Rockies07</Text>
              </View>
            </View>
            <StatusBar hidden />
            {modalRound ? <RoundDetail></RoundDetail> : <></>}
            {modalCheckIn ? (
              <CheckInWindow
                close={() => closeOpenCheckIn()}
                setModalCheckIn={setModalCheckIn}
                balance={balancePlayer}
                setBalancePlayerGame={setBalancePlayerGame}
                minBet={minBet}
                maxBet={maxBet}
                bankerPool={bankerPool}
              />
            ) : (
              <></>
            )}
            {modalBetting ? (
              <BettingWindow
                close={() => closeOpenBetting()}
                balanceGame={balancePlayerGame}
                sendBet={sendBet}
                setModalBetting={setModalBetting}
                maxBet={maxBet}
                midBet={midBet}
                minBet={minBet}
              />
            ) : (
              <></>
            )}
            <View style={ThreePic.container}>
              {/* <View style={ThreePic.ThreePicGameProfile}>
                <View style={ThreePic.ThreePicGameProfileWrapper}>
                  <Image source={require('../../../../assets/images/others/small-profile.png')} style={ThreePic.ThreePicGameProfileImage}/>
                  <Text style={ThreePic.ThreePicGameProfileUsername}>Rockies07</Text>
                </View>
              </View>
              <View style={ThreePic.ThreePicGameBalance}>
                <View style={ThreePic.ThreePicGameProfileWrapper}>
                  <Image source={require('../../../../assets/images/others/big-coin.png')} style={ThreePic.ThreePicGameBalanceImage}/>
                  <Image source={require('../../../../assets/images/others/big-cointext.png')} style={ThreePic.ThreePicGameBalanceImageSquare}/>
                  <Text style={ThreePic.ThreePicGameBalanceText}>999,999,999</Text>
                </View>
              </View> */}
              <ImageBackground
                source={require("../../../../assets/images/others/backgroundskp-game.png.png")}
                style={ThreePic.ThreePicGameBackground}
              />
              <View style={{ ...styleSafeArea }}>
                <View style={ThreePic.ThreePicGameTableImageWrapper}>
                  <Image
                    source={require("../../../../assets/images/others/threepic-gamelogo.png")}
                    style={ThreePic.ThreePicGameTableLogo}
                  />
                  {/* Check timer if > 9 (1 digit) */}
                  {/* {
                    time < 10 ?
                    <View style={ThreePic.ThreePicTimerDiv}>
                      <View style={ThreePic.relative}>
                        <Image
                          source={require("../../../../assets/images/others/5.png")}
                          style={ThreePic.ThreePicTimer1}
                        />
                      </View>
                    </View>
                    :
                    <View style={ThreePic.ThreePicTimerDiv}>
                      <View style={ThreePic.ThreePicTimer2Div}>
                        <View style={ThreePic.ThreePic1Digit}>
                          <Image
                            source={require("../../../../assets/images/others/1.png")}
                            style={ThreePic.ThreePicTimer2}
                          />
                        </View>
                        <View style={ThreePic.ThreePic1Digit}>
                          <Image
                            source={require("../../../../assets/images/others/5.png")}
                            style={ThreePic.ThreePicTimer2}
                          />
                        </View>
                      </View>
                    </View>
                  } */}

                  {/* Render image */}
                  {!modalWaiting ? (
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
                  ) : (
                    <></>
                  )}

                  {modalWaiting ? <WaitingInfo></WaitingInfo> : <></>}
                  {/* <BackCardAnimation></BackCardAnimation> */}
                  <View style={ThreePic.ThreePicGameTableTextWrapper}>
                    <Text style={ThreePic.ThreePicGameTableText}>
                      Banker: {bankerLimit}
                    </Text>
                    <Text style={ThreePic.ThreePicGameTableText}>
                      Min: {minBet}
                    </Text>
                    <Text style={ThreePic.ThreePicGameTableText}>
                      Max: {maxBet}
                    </Text>
                  </View>
                  <Image
                    source={require("../../../../assets/images/others/table-new.png")}
                    style={{ ...ThreePicGameTableImage }}
                  />
                  <View style={{ ...ThreePicGamePinWrapper }}>
                    {!player1 ? (
                      <View style={ThreePic.ThreePicGamePin1}>
                        <TouchableOpacity onPress={() => sitHandler(1)}>
                          <Image
                            source={require("../../../../assets/images/others/button-sit.png")}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={[ThreePic.ThreePicGamePin1, ThreePic.SitTable]}
                      >
                        <View style={ThreePic.relative}>
                          {banker == player1?.username ? (
                            <Image
                              source={require("../../../../assets/images/others/banker.png")}
                              style={ThreePic.banker}
                            />
                          ) : (
                            <></>
                          )}
                          <View
                            style={{
                              alignItems: "center",
                              zIndex: 5,
                              marginTop: 95,
                              height: 25.05,
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginTop: 2.2,
                                  transform: [{ rotate: "-15deg" }],
                                }}
                              >
                                {/* <Image source={require('../../../../assets/images/card/small/card_jack.png')}/> */}
                                <CardFlip style={ThreePic.cardImage} ref={card11}>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[playerCards[0].cards[0] || BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                </CardFlip>
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: -1,
                                }}
                              >
                                {/* <Image source={require('../../../../assets/images/card/small/card_queen.png')}/> */}
                                <CardFlip style={ThreePic.cardImage} ref={card12}>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[playerCards[0].cards[1] || BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                </CardFlip>
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: -1,
                                  marginTop: 2.2,
                                  transform: [{ rotate: "15deg" }],
                                }}
                              >
                                {/* <Image source={require('../../../../assets/images/card/small/card_king.png')}/> */}
                                <CardFlip style={ThreePic.cardImage} ref={card13}>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[playerCards[0].cards[2] || BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                </CardFlip>
                              </View>
                            </View>
                          </View>
                          {player1?.result ? (
                            <View
                              style={[
                                ThreePic.amountResultPlayer1,
                                banker == player1?.username
                                  ? ThreePic.amountResultPlayer1Banker
                                  : {},
                              ]}
                            >
                              <View style={ThreePic.amountDiv}>
                                <Image
                                  source={require("../../../../assets/images/others/coin.png")}
                                  style={ThreePic.coin}
                                />
                                <Text
                                  style={[
                                    ThreePic.amountText,
                                    player1?.result > 0
                                      ? ThreePic.positiveAmount
                                      : ThreePic.negativeAmount,
                                  ]}
                                >
                                  {player1?.result}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                          <Image
                            source={require("../../../../assets/images/others/player1.png")}
                            style={ThreePic.player1}
                          />
                          <View style={ThreePic.ProfileTable}>
                            <View style={ThreePic.row}>
                              <Text style={ThreePic.username}>
                                {player1?.username}
                              </Text>
                            </View>
                            <View style={ThreePic.row}>
                              <Text style={ThreePic.balance}>
                                {player1?.balance}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                    {!player2 ? (
                      <View style={ThreePic.ThreePicGamePin2}>
                        <TouchableOpacity onPress={() => sitHandler(2)}>
                          <Image
                            source={require("../../../../assets/images/others/button-sit.png")}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={[ThreePic.ThreePicGamePin2, ThreePic.SitTable]}
                      >
                        <View style={ThreePic.relative}>
                          {banker == player2?.username ? (
                            <Image
                              source={require("../../../../assets/images/others/banker.png")}
                              style={ThreePic.banker}
                            />
                          ) : (
                            <></>
                          )}
                          <View
                            style={{
                              alignItems: "flex-start",
                              zIndex: 5,
                              height: 25.05,
                              marginTop: 42,
                              transform: [{ translateX: -50.1 - 14 }],
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginTop: 2.2,
                                  transform: [{ rotate: "-15deg" }],
                                }}
                              >
                                <CardFlip style={ThreePic.cardImage} ref={card21}>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[playerCards[1].cards[0] || BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                </CardFlip>
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: -1,
                                }}
                              >
                                <CardFlip style={ThreePic.cardImage} ref={card22}>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[playerCards[1].cards[1] || BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                </CardFlip>
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: -1,
                                  marginTop: 2.2,
                                  transform: [{ rotate: "15deg" }],
                                }}
                              >
                                <CardFlip style={ThreePic.cardImage} ref={card23}>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[playerCards[1].cards[2] || BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                </CardFlip>
                              </View>
                            </View>
                          </View>
                          {player2?.result ? (
                            <View
                              style={[
                                ThreePic.amountResult,
                                banker == player2?.username
                                  ? ThreePic.amountResultBanker
                                  : {},
                              ]}
                            >
                              <View style={ThreePic.amountDiv}>
                                <Image
                                  source={require("../../../../assets/images/others/coin.png")}
                                  style={ThreePic.coin}
                                />
                                <Text
                                  style={[
                                    ThreePic.amountText,
                                    player2?.result > 0
                                      ? ThreePic.positiveAmount
                                      : ThreePic.negativeAmount,
                                  ]}
                                >
                                  {player2?.result}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                          <Image
                            source={require("../../../../assets/images/others/player1.png")}
                            style={ThreePic.player1}
                          />
                          <View style={ThreePic.ProfileTable}>
                            <View style={ThreePic.row}>
                              <Text style={ThreePic.username}>
                                {player2?.username}
                              </Text>
                            </View>
                            <View style={ThreePic.row}>
                              <Text style={ThreePic.balance}>
                                {player2?.balance}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                    {!player3 ? (
                      <View style={ThreePic.ThreePicGamePin3}>
                        <TouchableOpacity onPress={() => sitHandler(3)}>
                          <Image
                            source={require("../../../../assets/images/others/button-sit.png")}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={[ThreePic.ThreePicGamePin3, ThreePic.SitTable]}
                      >
                        <View style={ThreePic.relative}>
                          {banker == player3?.username ? (
                            <Image
                              source={require("../../../../assets/images/others/banker.png")}
                              style={ThreePic.banker}
                            />
                          ) : (
                            <></>
                          )}
                          <View
                            style={{
                              alignItems: "flex-start",
                              zIndex: 5,
                              height: 25.05,
                              marginTop: 9,
                              transform: [{ translateX: -50.1 - 14 }],
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginTop: 2.2,
                                  transform: [{ rotate: "-15deg" }],
                                }}
                              >
                                <CardFlip style={ThreePic.cardImage} ref={card31}>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[playerCards[2].cards[0] || BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                </CardFlip>
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: -1,
                                }}
                              >
                                <CardFlip style={ThreePic.cardImage} ref={card32}>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[playerCards[2].cards[1] || BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                </CardFlip>
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: -1,
                                  marginTop: 2.2,
                                  transform: [{ rotate: "15deg" }],
                                }}
                              >
                                <CardFlip style={ThreePic.cardImage} ref={card33}>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity activeOpacity={1} style={ThreePic.cardImage}> 
                                    <Image
                                      source={images[playerCards[2].cards[2] || BackCard]}
                                      style={ThreePic.cardImage}
                                    />
                                  </TouchableOpacity>
                                </CardFlip>
                              </View>
                            </View>
                          </View>
                          {player3?.result ? (
                            <View
                              style={[
                                ThreePic.amountResult,
                                banker == player3?.username
                                  ? ThreePic.amountResultBanker
                                  : {},
                              ]}
                            >
                              <View style={ThreePic.amountDiv}>
                                <Image
                                  source={require("../../../../assets/images/others/coin.png")}
                                  style={ThreePic.coin}
                                />
                                <Text
                                  style={[
                                    ThreePic.amountText,
                                    player3?.result > 0
                                      ? ThreePic.positiveAmount
                                      : ThreePic.negativeAmount,
                                  ]}
                                >
                                  {player3?.result}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                          <Image
                            source={require("../../../../assets/images/others/player1.png")}
                            style={ThreePic.player1}
                          />
                          <View style={ThreePic.ProfileTable}>
                            <View style={ThreePic.row}>
                              <Text style={ThreePic.username}>
                                {player3?.username}
                              </Text>
                            </View>
                            <View style={ThreePic.row}>
                              <Text style={ThreePic.balance}>
                                {player3?.balance}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                    {!player4 ? (
                      <View style={ThreePic.ThreePicGamePin4}>
                        {/* <TouchableOpacity onPress={() => closeOpenCheckIn()}> */}
                        <TouchableOpacity onPress={() => sitHandler(4)}>
                          <Image
                            source={require("../../../../assets/images/others/button-sit.png")}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={[ThreePic.ThreePicGamePin4, ThreePic.SitTable]}
                      >
                        <View style={ThreePic.relative}>
                          {banker == player4?.username ? (
                            <Image
                              source={require("../../../../assets/images/others/banker.png")}
                              style={ThreePic.banker}
                            />
                          ) : (
                            <></>
                          )}
                          {player4?.cards ? (
                            <View
                              style={{
                                alignItems: "flex-end",
                                zIndex: 5,
                                height: 25.05,
                                marginTop: -8,
                                transform: [{ translateX: -50.1 - 14 }],
                              }}
                            >
                              <View style={{ flexDirection: "row" }}>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "-15deg" }],
                                  }}
                                >
                                  <Image
                                    source={images[player4?.cards[0]]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                  }}
                                >
                                  <Image
                                    source={images[player4?.cards[1]]}
                                    style={ThreePic.cardImage}
                                  ></Image>
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "15deg" }],
                                  }}
                                >
                                  <Image
                                    source={images[player4?.cards[2]]}
                                    style={ThreePic.cardImage}
                                  ></Image>
                                </View>
                              </View>
                            </View>
                          ) : (
                            <View
                              style={{
                                alignItems: "center",
                                zIndex: 5,
                                marginTop: 95,
                                height: 25.05,
                              }}
                            >
                              <View style={{ flexDirection: "row" }}>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "-15deg" }],
                                  }}
                                >
                                  {/* <Image source={require('../../../../assets/images/card/small/card_jack.png')}/> */}
                                  <Image
                                    source={images[BackCard]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                  }}
                                >
                                  {/* <Image source={require('../../../../assets/images/card/small/card_queen.png')}/> */}
                                  <Image
                                    source={images[BackCard]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "15deg" }],
                                  }}
                                >
                                  {/* <Image source={require('../../../../assets/images/card/small/card_king.png')}/> */}
                                  <Image
                                    source={images[BackCard]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                              </View>
                            </View>
                          )}
                          {player4?.result ? (
                            <View
                              style={[
                                ThreePic.amountResult,
                                banker == player4?.username
                                  ? ThreePic.amountResultBanker
                                  : {},
                              ]}
                            >
                              <View style={ThreePic.amountDiv}>
                                <Image
                                  source={require("../../../../assets/images/others/coin.png")}
                                  style={ThreePic.coin}
                                />
                                <Text
                                  style={[
                                    ThreePic.amountText,
                                    player4?.result > 0
                                      ? ThreePic.positiveAmount
                                      : ThreePic.negativeAmount,
                                  ]}
                                >
                                  {player4?.result}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                          <Image
                            source={require("../../../../assets/images/others/player1.png")}
                            style={ThreePic.player1}
                          />
                          <View style={ThreePic.ProfileTable}>
                            <View style={ThreePic.row}>
                              <Text style={ThreePic.username}>
                                {player4?.username}
                              </Text>
                            </View>
                            <View style={ThreePic.row}>
                              <Text style={ThreePic.balance}>
                                {player4?.balance}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                    {!player5 ? (
                      <View style={ThreePic.ThreePicGamePin5}>
                        {/* <TouchableOpacity onPress={() => closeOpenBetting()}> */}
                        <TouchableOpacity onPress={() => sitHandler(5)}>
                          <Image
                            source={require("../../../../assets/images/others/button-sit.png")}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={[
                          ThreePic.ThreePicGamePin5,
                          ThreePic.SitTableBtm,
                        ]}
                      >
                        <View style={ThreePic.relative}>
                          {banker == player5?.username ? (
                            <Image
                              source={require("../../../../assets/images/others/banker.png")}
                              style={ThreePic.banker}
                            />
                          ) : (
                            <></>
                          )}
                          {player5?.cards ? (
                            <View
                              style={{
                                alignItems: "flex-end",
                                zIndex: 5,
                                height: 25.05,
                                marginTop: -60.5,
                                transform: [{ translateX: -14 }],
                              }}
                            >
                              <View style={{ flexDirection: "row" }}>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "-15deg" }],
                                  }}
                                >
                                  <Image
                                    source={images[player5?.cards[0]]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                  }}
                                >
                                  <Image
                                    source={images[player5?.cards[1]]}
                                    style={ThreePic.cardImage}
                                  ></Image>
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "15deg" }],
                                  }}
                                >
                                  <Image
                                    source={images[player5?.cards[2]]}
                                    style={ThreePic.cardImage}
                                  ></Image>
                                </View>
                              </View>
                            </View>
                          ) : (
                            <View
                              style={{
                                alignItems: "center",
                                zIndex: 5,
                                marginTop: 95,
                                height: 25.05,
                              }}
                            >
                              <View style={{ flexDirection: "row" }}>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "-15deg" }],
                                  }}
                                >
                                  {/* <Image source={require('../../../../assets/images/card/small/card_jack.png')}/> */}
                                  <Image
                                    source={images[BackCard]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                  }}
                                >
                                  {/* <Image source={require('../../../../assets/images/card/small/card_queen.png')}/> */}
                                  <Image
                                    source={images[BackCard]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "15deg" }],
                                  }}
                                >
                                  {/* <Image source={require('../../../../assets/images/card/small/card_king.png')}/> */}
                                  <Image
                                    source={images[BackCard]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                              </View>
                            </View>
                          )}
                          {player5?.result ? (
                            <View
                              style={[
                                ThreePic.amountResultPlayer5,
                                banker == player5?.username
                                  ? ThreePic.amountResultPlayer8Banker
                                  : {},
                              ]}
                            >
                              <View style={ThreePic.amountDiv}>
                                <Image
                                  source={require("../../../../assets/images/others/coin.png")}
                                  style={ThreePic.coin}
                                />
                                <Text
                                  style={[
                                    ThreePic.amountText,
                                    player5?.result > 0
                                      ? ThreePic.positiveAmount
                                      : ThreePic.negativeAmount,
                                  ]}
                                >
                                  {player5?.result}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                          <Image
                            source={require("../../../../assets/images/others/player1.png")}
                            style={ThreePic.player1}
                          />
                          <View style={ThreePic.ProfileTable}>
                            <View style={ThreePic.row}>
                              <Text style={ThreePic.username}>
                                {player5?.username}
                              </Text>
                            </View>
                            <View style={ThreePic.row}>
                              <Text style={ThreePic.balance}>
                                {player5?.balance}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                    {!player6 ? (
                      <View style={ThreePic.ThreePicGamePin6}>
                        <TouchableOpacity onPress={() => sitHandler(6)}>
                          <Image
                            source={require("../../../../assets/images/others/button-sit.png")}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={[ThreePic.ThreePicGamePin6, ThreePic.SitTable]}
                      >
                        <View style={ThreePic.relative}>
                          {banker == player6?.username ? (
                            <Image
                              source={require("../../../../assets/images/others/banker.png")}
                              style={ThreePic.banker}
                            />
                          ) : (
                            <></>
                          )}
                          {player6?.cards ? (
                            <View
                              style={{
                                alignItems: "flex-end",
                                zIndex: 5,
                                height: 25.05,
                                marginTop: -8,
                                transform: [{ translateX: +50.1 + 14 }],
                              }}
                            >
                              <View style={{ flexDirection: "row" }}>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "-15deg" }],
                                  }}
                                >
                                  <Image
                                    source={images[player6?.cards[1]]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                  }}
                                >
                                  <Image
                                    source={images[player6?.cards[1]]}
                                    style={ThreePic.cardImage}
                                  ></Image>
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "15deg" }],
                                  }}
                                >
                                  <Image
                                    source={images[player6?.cards[2]]}
                                    style={ThreePic.cardImage}
                                  ></Image>
                                </View>
                              </View>
                            </View>
                          ) : (
                            <View
                              style={{
                                alignItems: "center",
                                zIndex: 5,
                                marginTop: 95,
                                height: 25.05,
                              }}
                            >
                              <View style={{ flexDirection: "row" }}>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "-15deg" }],
                                  }}
                                >
                                  {/* <Image source={require('../../../../assets/images/card/small/card_jack.png')}/> */}
                                  <Image
                                    source={images[BackCard]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                  }}
                                >
                                  {/* <Image source={require('../../../../assets/images/card/small/card_queen.png')}/> */}
                                  <Image
                                    source={images[BackCard]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "15deg" }],
                                  }}
                                >
                                  {/* <Image source={require('../../../../assets/images/card/small/card_king.png')}/> */}
                                  <Image
                                    source={images[BackCard]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                              </View>
                            </View>
                          )}
                          {player6?.result ? (
                            <View
                              style={[
                                ThreePic.amountResult,
                                banker == player6?.username
                                  ? ThreePic.amountResultBanker
                                  : {},
                              ]}
                            >
                              <View style={ThreePic.amountDiv}>
                                <Image
                                  source={require("../../../../assets/images/others/coin.png")}
                                  style={ThreePic.coin}
                                />
                                <Text
                                  style={[
                                    ThreePic.amountText,
                                    player6?.result > 0
                                      ? ThreePic.positiveAmount
                                      : ThreePic.negativeAmount,
                                  ]}
                                >
                                  {player6?.result}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                          <Image
                            source={require("../../../../assets/images/others/player1.png")}
                            style={ThreePic.player1}
                          />
                          <View style={ThreePic.ProfileTable}>
                            <View style={ThreePic.row}>
                              <Text style={ThreePic.username}>
                                {player6?.username}
                              </Text>
                            </View>
                            <View style={ThreePic.row}>
                              <Text style={ThreePic.balance}>
                                {player6?.balance}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                    {!player7 ? (
                      <View style={ThreePic.ThreePicGamePin7}>
                        <TouchableOpacity onPress={() => sitHandler(7)}>
                          <Image
                            source={require("../../../../assets/images/others/button-sit.png")}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={[ThreePic.ThreePicGamePin7, ThreePic.SitTable]}
                      >
                        <View style={ThreePic.relative}>
                          {banker == player7?.username ? (
                            <Image
                              source={require("../../../../assets/images/others/banker.png")}
                              style={ThreePic.banker}
                            />
                          ) : (
                            <></>
                          )}
                          {player7?.cards ? (
                            <View
                              style={{
                                alignItems: "flex-end",
                                zIndex: 5,
                                height: 25.05,
                                marginTop: 9,
                                transform: [{ translateX: 50.1 + 14 }],
                              }}
                            >
                              <View style={{ flexDirection: "row" }}>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "-15deg" }],
                                  }}
                                >
                                  <Image
                                    source={images[player7?.cards[0]]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                  }}
                                >
                                  <Image
                                    source={images[player7?.cards[1]]}
                                    style={ThreePic.cardImage}
                                  ></Image>
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "15deg" }],
                                  }}
                                >
                                  <Image
                                    source={images[player7?.cards[2]]}
                                    style={ThreePic.cardImage}
                                  ></Image>
                                </View>
                              </View>
                            </View>
                          ) : (
                            <View
                              style={{
                                alignItems: "center",
                                zIndex: 5,
                                marginTop: 95,
                                height: 25.05,
                              }}
                            >
                              <View style={{ flexDirection: "row" }}>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "-15deg" }],
                                  }}
                                >
                                  {/* <Image source={require('../../../../assets/images/card/small/card_jack.png')}/> */}
                                  <Image
                                    source={images[BackCard]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                  }}
                                >
                                  {/* <Image source={require('../../../../assets/images/card/small/card_queen.png')}/> */}
                                  <Image
                                    source={images[BackCard]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "15deg" }],
                                  }}
                                >
                                  {/* <Image source={require('../../../../assets/images/card/small/card_king.png')}/> */}
                                  <Image
                                    source={images[BackCard]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                              </View>
                            </View>
                          )}
                          {player7?.result ? (
                            <View
                              style={[
                                ThreePic.amountResult,
                                banker == player7?.username
                                  ? ThreePic.amountResultBanker
                                  : {},
                              ]}
                            >
                              <View style={ThreePic.amountDiv}>
                                <Image
                                  source={require("../../../../assets/images/others/coin.png")}
                                  style={ThreePic.coin}
                                />
                                <Text
                                  style={[
                                    ThreePic.amountText,
                                    player7?.result > 0
                                      ? ThreePic.positiveAmount
                                      : ThreePic.negativeAmount,
                                  ]}
                                >
                                  {player7?.result}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                          <Image
                            source={require("../../../../assets/images/others/player1.png")}
                            style={ThreePic.player1}
                          />
                          <View style={ThreePic.ProfileTable}>
                            <View style={ThreePic.row}>
                              <Text style={ThreePic.username}>
                                {player7?.username}
                              </Text>
                            </View>
                            <View style={ThreePic.row}>
                              <Text style={ThreePic.balance}>
                                {player7?.balance}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                    {!player8 ? (
                      <View style={ThreePic.ThreePicGamePin8}>
                        <TouchableOpacity onPress={() => sitHandler(8)}>
                          <Image
                            source={require("../../../../assets/images/others/button-sit.png")}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={[ThreePic.ThreePicGamePin8, ThreePic.SitTable]}
                      >
                        <View style={ThreePic.relative}>
                          {banker == player8?.username ? (
                            <Image
                              source={require("../../../../assets/images/others/banker.png")}
                              style={ThreePic.banker}
                            />
                          ) : (
                            <></>
                          )}
                          {player8?.cards ? (
                            <View
                              style={{
                                alignItems: "flex-end",
                                zIndex: 5,
                                height: 25.05,
                                marginTop: 42,
                                transform: [{ translateX: 50.1 + 14 }],
                              }}
                            >
                              <View style={{ flexDirection: "row" }}>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "-15deg" }],
                                  }}
                                >
                                  <Image
                                    source={images[player8?.cards[0]]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                  }}
                                >
                                  <Image
                                    source={images[player8?.cards[1]]}
                                    style={ThreePic.cardImage}
                                  ></Image>
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "15deg" }],
                                  }}
                                >
                                  <Image
                                    source={images[player8?.cards[2]]}
                                    style={ThreePic.cardImage}
                                  ></Image>
                                </View>
                              </View>
                            </View>
                          ) : (
                            <View
                              style={{
                                alignItems: "center",
                                zIndex: 5,
                                marginTop: 95,
                                height: 25.05,
                              }}
                            >
                              <View style={{ flexDirection: "row" }}>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "-15deg" }],
                                  }}
                                >
                                  {/* <Image source={require('../../../../assets/images/card/small/card_jack.png')}/> */}
                                  <Image
                                    source={images[BackCard]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                  }}
                                >
                                  {/* <Image source={require('../../../../assets/images/card/small/card_queen.png')}/> */}
                                  <Image
                                    source={images[BackCard]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                                <View
                                  style={{
                                    width: 17,
                                    height: 21,
                                    marginLeft: -1,
                                    marginTop: 2.2,
                                    transform: [{ rotate: "15deg" }],
                                  }}
                                >
                                  {/* <Image source={require('../../../../assets/images/card/small/card_king.png')}/> */}
                                  <Image
                                    source={images[BackCard]}
                                    style={ThreePic.cardImage}
                                  />
                                </View>
                              </View>
                            </View>
                          )}
                          {player8?.result ? (
                            <View
                              style={[
                                ThreePic.amountResult,
                                banker == player8?.username
                                  ? ThreePic.amountResultBanker
                                  : {},
                              ]}
                            >
                              <View style={ThreePic.amountDiv}>
                                <Image
                                  source={require("../../../../assets/images/others/coin.png")}
                                  style={ThreePic.coin}
                                />
                                <Text
                                  style={[
                                    ThreePic.amountText,
                                    player8?.result > 0
                                      ? ThreePic.positiveAmount
                                      : ThreePic.negativeAmount,
                                  ]}
                                >
                                  {player8?.result}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                          <Image
                            source={require("../../../../assets/images/others/player1.png")}
                            style={ThreePic.player1}
                          />
                          <View style={ThreePic.ProfileTable}>
                            <View style={ThreePic.row}>
                              <Text style={ThreePic.username}>
                                {player8?.username}
                              </Text>
                            </View>
                            <View style={ThreePic.row}>
                              <Text style={ThreePic.balance}>
                                {player8?.balance}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View style={{...constEmojiButton}}>
              <View style={ThreePic.relative}>
                {/* <TouchableOpacity style={[ThreePic.absCenter, ThreePic.alertBtn]}> */}
                <TouchableOpacity style={{}}>
                  <Image
                    source={require("../../../../assets/images/others/emoticon-btn.png")}
                    style={ThreePic.alertButton}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {
              buyInStat && lastBet > 0?
              <View style={{...constAutoBet}}>
                <View style={ThreePic.relative}>
                  {/* <TouchableOpacity style={[ThreePic.absCenter, ThreePic.alertBtn]}> */}
                  <TouchableOpacity style={{}} onPress={autoBetAction}>
                    {
                      autoBet ? 
                      <Image
                        source={require("../../../../assets/images/others/auto-enabled.png")}
                        style={ThreePic.autoBet}
                      />
                      :
                      <Image
                        source={require("../../../../assets/images/others/auto-disabled.png")}
                        style={ThreePic.autoBet}
                      />
                    }
                  </TouchableOpacity>
                </View>
              </View>
              :
              <></>
            }
          </View>
        </ScrollView>
        <BottomNavigation
          roundDetail={() => closeOpenRoundDetail()}
          liveScore={() => closeOpenLiveScore()}
          setting={() => navigate(ROUTES.PoseidonAccount)}
          status={"game"}
          balance={userBet}
        ></BottomNavigation>
      </View>
    </SafeAreaView>
  );
};
