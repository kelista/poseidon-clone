import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  useMemo,
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
  Platform, AsyncStorage, Animated
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
import { ThreePicGameRules } from "../../../../components/ThreePicGameRules";
import { CardWindow } from "../../../../components/CardPhase";
import ThreePic from "../../../../styles/ThreePicStyle";
import { CustomheaderLogo } from "../../../../components/HeaderLogo";
import { WSContext } from "../../../../../routes/wsContext";
import { images } from "../../../../services/imageServices";
import { BSContext } from "../../../../../routes/bsContext";
import { SSContext } from "../../../../../routes/simpleStoreContext";
import { useTimer } from "../../../../services/timer";
import { useKeepAwake } from 'expo-keep-awake';
import { EmojiWindow } from "../../../../components/Emoji";
import { Backsound } from "../../../../services/soundServices";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { BackCardAnimation } from "../../../../components/BackCardAnimation";

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
  disp: string;
  result?: number;
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
const emojiEvent = "messaging/emoji"
const liveScoreEvent = "game/livescore";
const unsignEvent = "game/unsign";

export const PoseidonThreePicGame: NavigationScreenComponent<any, any> = (
  props
) => {
  useKeepAwake();
  const { navigate } = props.navigation;

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
  const [modalRules, setModalRules] = useState(false);
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
  const [arrayResult, setArrayResult] = useState<any[]>([]);
  const [arrayResult1, setArrayResult1] = useState<any[]>([]);
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

  const [player1C, setPlayer1C] = useState<any[]>([]);
  const [player2C, setPlayer2C] = useState<any[]>([]);
  const [player3C, setPlayer3C] = useState<any[]>([]);
  const [player4C, setPlayer4C] = useState<any[]>([]);
  const [player5C, setPlayer5C] = useState<any[]>([]);
  const [player6C, setPlayer6C] = useState<any[]>([]);
  const [player7C, setPlayer7C] = useState<any[]>([]);
  const [player8C, setPlayer8C] = useState<any[]>([]);

  const [emoji, setEmoji] = useState("");
  const [emojiData, setEmojiData] = useState(null);
  const [statOpenEmoji, setStatOpenEmoji] = useState(true);
  const [emojiModal, setEmojiModal] = useState(false);

  const [emojiPlayer1, setEmojiPlayer1] = useState("");
  const [emojiPlayer2, setEmojiPlayer2] = useState("");
  const [emojiPlayer3, setEmojiPlayer3] = useState("");
  const [emojiPlayer4, setEmojiPlayer4] = useState("");
  const [emojiPlayer5, setEmojiPlayer5] = useState("");
  const [emojiPlayer6, setEmojiPlayer6] = useState("");
  const [emojiPlayer7, setEmojiPlayer7] = useState("");
  const [emojiPlayer8, setEmojiPlayer8] = useState("");

  const [result, setResult] = useState(null);
  const [info, setInfo] = useState(null);
  const [phase, setPhase] = useState<string>("fresh");
  
  const [standUpStat, setStandUpStat] = useState(false);
  const [seatNumberZero, setSeatNumberZero] = useState(0);
  const [playerInGame, setPlayerInGame] = useState(false);
  const [dataPrepare, setDataPrepare] = useState<any[]>([]);

  const [arrayStylePin, setArrayStylePin] = useState<any[]>([]);
  const [arrayStyleEmoji, setArrayStyleEmoji] = useState<any[]>([]);
  const [arrayStyleCard, setArrayStyleCard] = useState<any[]>([]);
  const [arrayStyleResult, setArrayStyleResult] = useState<any[]>([]);

  const [jarakKursi, setJarakKursi] = useState(0)
  const [swapAnimation, setSwapAnimation] = useState(false)

  const [player1Username, setPlayer1Username] = useState("")
  const [player2Username, setPlayer2Username] = useState("")
  const [player3Username, setPlayer3Username] = useState("")
  const [player4Username, setPlayer4Username] = useState("")
  const [player5Username, setPlayer5Username] = useState("")
  const [player6Username, setPlayer6Username] = useState("")
  const [player7Username, setPlayer7Username] = useState("")
  const [player8Username, setPlayer8Username] = useState("")

  const [playerPos, setPlayerPos] = useState([
    {x: 166, y: -20},
    {x: 255, y: 68},
    {x: 255, y: 217},
    {x: 255, y: 387},
    {x: 166, y: 485},
    {x: 0, y: 387},
    {x: 0, y: 217},
    {x: 0, y: 68}
  ])

  const [player1Pos, setPlayer1Pos] = useState(new Animated.ValueXY({x: playerPos[0].x, y: playerPos[0].y}));
  const [player2Pos, setPlayer2Pos] = useState(new Animated.ValueXY({x: playerPos[1].x, y: playerPos[1].y}));
  const [player3Pos, setPlayer3Pos] = useState(new Animated.ValueXY({x: playerPos[2].x, y: playerPos[2].y}));
  const [player4Pos, setPlayer4Pos] = useState(new Animated.ValueXY({x: playerPos[3].x, y: playerPos[3].y}));
  const [player5Pos, setPlayer5Pos] = useState(new Animated.ValueXY({x: playerPos[4].x, y: playerPos[4].y}));
  const [player6Pos, setPlayer6Pos] = useState(new Animated.ValueXY({x: playerPos[5].x, y: playerPos[5].y}));
  const [player7Pos, setPlayer7Pos] = useState(new Animated.ValueXY({x: playerPos[6].x, y: playerPos[6].y}));
  const [player8Pos, setPlayer8Pos] = useState(new Animated.ValueXY({x: playerPos[7].x, y: playerPos[7].y}));

  const movePosition = useCallback((position: any, seatNumber: number) => {
    let index = seatNumber - 1
    if((index + jarakKursi) >= 8) {
      index = index + jarakKursi - 8
    } else {
      index = index + jarakKursi
    }

    Animated.spring(position, {
      toValue: {x: playerPos[index].x, y: playerPos[index].y}
    }).start();
  },[jarakKursi]);

  // Animated
  const card1 = new Animated.Value(0)
  const card2 = new Animated.Value(0)
  const card3 = new Animated.Value(0)
  const card4 = new Animated.Value(0)
  const card5 = new Animated.Value(0)
  const card6 = new Animated.Value(0)
  const card7 = new Animated.Value(0)
  const card8 = new Animated.Value(0)


  const swapSeat = new Animated.Value(0)

  const onLoadCard = useCallback((data: any) => {
    Animated.timing(data, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [])

  const onLoadSwap = useCallback((data: any) => {
    Animated.timing(data, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [])


  // const onSwapSeatShrink = useCallback(() => {
  //   Animated.timing(swapProfile, {
  //     toValue: 0,
  //     duration: 250,
  //     useNativeDriver: true,
  //   }).start();
  // }, [])

  const animationCard = useCallback((card: any) => {
    playCardSound()
    onLoadCard(card)
  }, [])

  const playCardSound = useCallback(() => {
    Backsound.Factory(
      "fadeInCard",
      require("../../../../assets/music/card_result.mp3"),
      false
    ).then((newBacksound:any) => {
      newBacksound.start()
    });
  }, [])

  // const [time, isCounting, startTimer] = useTimer();

  const windowWidth = Dimensions.get("window").width;

  const resetCards = () => {
    setPlayer1C([])
    setPlayer2C([])
    setPlayer3C([])
    setPlayer4C([])
    setPlayer5C([])
    setPlayer6C([])
    setPlayer7C([])
    setPlayer8C([])
  }

  const autoBetAction = () => {
    if(buyInStat) {
      if(autoBet) {
        setAutoBet(false)
      } else {
        setAutoBet(true)
      }
    }
  }

  const standUp = useCallback(() => {
    if(phase === 'result') {
      setStandUpStat(true)
      setSwapAnimation(false)
      wsClient?.sendMessage(unsignEvent, {});
      setJarakKursi(0)
    }
  }, [phase])

  useEffect(() => {
    if(standUpStat && seatNumberZero == 0) {
      setStandUpStat(false)
      setBuyInStat(false)
      setLastBet(0)
      setUserBet(0)
      setBalancePlayerGame(0)
      setAutoBet(false)
    }
  }, [seatNumberZero, standUpStat])

  const openEmoji = useCallback(() => {
    if(statOpenEmoji && buyInStat) {
      setEmojiModal(true)
    }
  }, [statOpenEmoji, buyInStat])

  const closeEmoji = useCallback(() => {
    setEmojiModal(false)
  }, [])

  const emojiAction = useCallback(async function (data: any) {
    setEmojiData(data)
  }, [])

  const setEmojiPerPlayer = useCallback((player: any, data:any) => {
    player(data)
    closeEmoji()
    setTimeout(() => {
      player("")
      setEmojiData(null)
    }, 3000);
  }, [])

  // Emoji - check data sended from websocket
  useEffect(() => {
    if(emojiData) {
      if(emojiData?.sender == player1?.username) {
        setEmojiPerPlayer(setEmojiPlayer1, emojiData?.emoji)
      } else if(emojiData?.sender == player2?.username) {
        setEmojiPerPlayer(setEmojiPlayer2, emojiData?.emoji)
      } else if(emojiData?.sender == player3?.username) {
        setEmojiPerPlayer(setEmojiPlayer3, emojiData?.emoji)
      } else if(emojiData?.sender == player4?.username) {
        setEmojiPerPlayer(setEmojiPlayer4, emojiData?.emoji)
      } else if(emojiData?.sender == player5?.username) {
        setEmojiPerPlayer(setEmojiPlayer5, emojiData?.emoji)
      } else if(emojiData?.sender == player6?.username) {
        setEmojiPerPlayer(setEmojiPlayer6, emojiData?.emoji)
      } else if(emojiData?.sender == player7?.username) {
        setEmojiPerPlayer(setEmojiPlayer7, emojiData?.emoji)
      } else if(emojiData?.sender == player8?.username) {
        setEmojiPerPlayer(setEmojiPlayer8, emojiData?.emoji)
      }
    }
  }, [player1, player2, player3, player4, player5, player6, player7, player8, emojiData])

  useEffect(() => {
    if(emoji != "") {
      wsClient?.sendMessage(emojiEvent, {emoji});
      setStatOpenEmoji(false)
      setTimeout(() => {
        setStatOpenEmoji(true)
      }, 3000);
    }
  }, [emoji])

  useEffect(() => {
    if(dataPrepare) {
      const result = dataPrepare?.find((d: any) => d.username == username);
      if(result) {
        if(result.seatNumber == 0) {
          setPlayerInGame(false)
        } else {
          setPlayerInGame(true)
        }
      }
    }
  }, [dataPrepare, username])

  const gameInfoAction = useCallback(async function (data: any) {
    setInfo(data.players);
    let banker = data.banker;

    if (data.phase === "prepare") {
      setDataPrepare(data.players)
    }

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
      const playerStandUp = data.players.find((d: any) => d.seatNumber === 0);
      if (playerStandUp) {
        setSeatNumberZero(playerStandUp.seatNumber)
      }
      
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
  }, [username]);

  const metaAction = useCallback(async function (data: any) {
    setMinBet(data.min);
    setMidBet(data.mid);
    setMaxBet(data.max);
    const multiplier = 2
    const bankerLimit = data.max * 8 * multiplier  
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
    
    if (data.phase === "fresh") {
      // setBankerPool(0);
      setModalBetting(false);
      resetCards()
      setArrayResult([])
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
      
      const arraySeat: any[] = []
      playerStates.forEach((p, index) => {
        p((player) => {
          if (player) {
            const np = { ...player };
            const username = player.username;
            const result = data.data.find((d: any) => d.username === username);
            if (result) {
              np.cards = [BackCard, BackCard, BackCard];
              setTimeout(() => {
                np.result = result.win;
                np.cards = result.cards;
                np.disp = result.disp;
                if(np.seatNumber == 1 && np.cards) {
                  arraySeat.push({seatNumber: np.seatNumber, cards: np.cards, username: np.username, result: np.result, disp: np.disp})
                } else if(np.seatNumber == 2 && np.cards) {
                  arraySeat.push({seatNumber: np.seatNumber, cards: np.cards, username: np.username, result: np.result, disp: np.disp})
                } else if(np.seatNumber == 3 && np.cards) {
                  arraySeat.push({seatNumber: np.seatNumber, cards: np.cards, username: np.username, result: np.result, disp: np.disp})
                } else if(np.seatNumber == 4 && np.cards) {
                  arraySeat.push({seatNumber: np.seatNumber, cards: np.cards, username: np.username, result: np.result, disp: np.disp})
                } else if(np.seatNumber == 5 && np.cards) {
                  arraySeat.push({seatNumber: np.seatNumber, cards: np.cards, username: np.username, result: np.result, disp: np.disp})
                } else if(np.seatNumber == 6 && np.cards) {
                  arraySeat.push({seatNumber: np.seatNumber, cards: np.cards, username: np.username, result: np.result, disp: np.disp})
                } else if(np.seatNumber == 7 && np.cards) {
                  arraySeat.push({seatNumber: np.seatNumber, cards: np.cards, username: np.username, result: np.result, disp: np.disp})
                } else if(np.seatNumber == 8 && np.cards) {
                  arraySeat.push({seatNumber: np.seatNumber, cards: np.cards, username: np.username, result: np.result, disp: np.disp})
                }
              }, 1000);
            }
            return np;
          }
          return player;
        });
      });
      setTimeout(() => {
        setArrayResult(arraySeat)
      }, 1000);
    }
    if (data.phase === "waiting") {
      setModalWaiting(true);
    } else {
      setModalWaiting(false);
    }
  }, []);

  // Result - open card from right of the banker
  useEffect(() => {
    var bankerSeat = 0
    if(arrayResult) {
      arrayResult.forEach((d:any, index:number) => {
        if(d.username == banker) {
          bankerSeat = index
        }
      })
      var indexNow = 0
      var array = []
      for(var i = bankerSeat+1; i < arrayResult.length+1 + bankerSeat; i++) {
        indexNow = i
        if(indexNow > arrayResult.length-1) {
          indexNow = i - arrayResult.length
        }
        array.push(arrayResult[indexNow])
      }
      setArrayResult1(array)
    }
  }, [arrayResult, banker])

  useEffect(() => {
    var pengali = 0
    var arrayLength = 0
    var pengaliResult = 0
    var settimeout = 500
    if(arrayResult1) {
      arrayLength = arrayResult1.length
      arrayResult1.forEach((d:any, index: number) => {
        pengali = index * settimeout
        setTimeout(() => {
          if(d.seatNumber == 1) {
            setPlayer1C({cards: d.cards, disp: d.disp})
          } else if(d.seatNumber == 2) {
            setPlayer2C({cards: d.cards, disp: d.disp})
          } else if(d.seatNumber == 3) {
            setPlayer3C({cards: d.cards, disp: d.disp})
          } else if(d.seatNumber == 4) {
            setPlayer4C({cards: d.cards, disp: d.disp})
          } else if(d.seatNumber == 5) {
            setPlayer5C({cards: d.cards, disp: d.disp})
          } else if(d.seatNumber == 6) {
            setPlayer6C({cards: d.cards, disp: d.disp})
          } else if(d.seatNumber == 7) {
            setPlayer7C({cards: d.cards, disp: d.disp})
          } else if(d.seatNumber == 8) {
            setPlayer8C({cards: d.cards, disp: d.disp})
          }
        }, pengali)
  
        pengaliResult = settimeout * arrayLength 
  
        setTimeout(() => {
          if(d.seatNumber == 1) {
            setPlayer1C({cards: d.cards, disp: d.disp, result: d.result})
          } else if(d.seatNumber == 2) {
            setPlayer2C({cards: d.cards, disp: d.disp, result: d.result})
          } else if(d.seatNumber == 3) {
            setPlayer3C({cards: d.cards, disp: d.disp, result: d.result})
          } else if(d.seatNumber == 4) {
            setPlayer4C({cards: d.cards, disp: d.disp, result: d.result})
          } else if(d.seatNumber == 5) {
            setPlayer5C({cards: d.cards, disp: d.disp, result: d.result})
          } else if(d.seatNumber == 6) {
            setPlayer6C({cards: d.cards, disp: d.disp, result: d.result})
          } else if(d.seatNumber == 7) {
            setPlayer7C({cards: d.cards, disp: d.disp, result: d.result})
          } else if(d.seatNumber == 8) {
            setPlayer8C({cards: d.cards, disp: d.disp, result: d.result})
          }
        }, pengaliResult);
      })
    }
  }, [arrayResult1])

  // Bet - phase bet + auto action
  useEffect(() => {
    if(
      phase === "bet" &&
      banker === username &&
      balancePlayerGame != 0 &&
      buyInStat) {
      setModalBetting(false);
    } else if (
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
            if(phase === 'bet' && !statLastBet && playerInGame) {
              setModalBetting(true);
            }
          }
        })
      } else if(!statLastBet && playerInGame) {
        setModalBetting(true);
      }
    }
  }, [phase, banker, username, autoBet, buyInStat, statLastBet, time, playerInGame]);

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

      const emojiListener = wsClient.addListener(
        emojiEvent,
        emojiAction
      );
      listeners.push(emojiListener);

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
        // setSwapAnimation(true)
        // setTimeout(() => {
        //   setSwapAnimation(false)
        // }, 5000)
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

  const outsideClick = () => {
    setModalRound(false)
    setModalLive(false)
    setEmojiModal(false)
  }

  const closeOpenCheckIn = () => {
    setModalCheckIn(!modalCheckIn);
  };

  const closeOpenRules = () => {
    setModalRules(!modalRules);
  };

  const closeOpenBetting = () => {
    setModalBetting(!modalBetting)
    setStatLastBet(true)
  };

  const closeOpenRoundDetail = () => {
    setModalRound(!modalRound);
    setModalLive(false);
    setEmojiModal(false)
    setModalRules(false);
  };

  const closeOpenLiveScore = () => {
    setModalLive(!modalLive);
    setModalRound(false);
    setEmojiModal(false)
    setModalRules(false);
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
      right: phase == 'result' ? 30 + 34 + 10 : 30,
      width: 34,
      height: 34,
      alignItems: 'center',
      justifyContent: 'center'
    };
  }, [insets, phase]);

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

  const ThreePicCardGroup5: any = useMemo(() => {
    let style = {
      width: '100%',
      alignItems: "center",
      position: 'absolute',
      left: -5,
      zIndex: 5,
      height: 25.05,
      top: -45.5
    }
    return style;
  }, []);

  const ThreePicCardGroup5Banker: any = useMemo(() => {
    let style = {
      width: '100%',
      alignItems: "center",
      position: 'absolute',
      left: -5,
      zIndex: 5,
      height: 25.05,
      top: -78.5
    }
    return style;
  }, []);

  const EmojiPlayer5: any = useMemo(() => {
    let style = {
      width: 120, 
      height: 120, 
      position: 'absolute', 
      left: '50%', 
      zIndex: 6,
      transform: [{
        translateX: -60
      }],
      top: -100
    }
    return style;
  }, []);

  const EmojiPlayer5Banker: any = useMemo(() => {
    let style = {
      width: 120, 
      height: 120, 
      position: 'absolute', 
      left: '50%', 
      zIndex: 6,
      transform: [{
        translateX: -60
      }],
      top: -130
    }
    return style;
  }, []);
  
  // POV style
  useEffect(() => {
    setArrayStylePin([
      player1Username != "" ? [ThreePic.ThreePicGamePin1, ThreePic.SitTable] : ThreePic.ThreePicGamePin1, 
      player2Username != "" ? [ThreePic.ThreePicGamePin2, ThreePic.SitTable] : ThreePic.ThreePicGamePin2, 
      player3Username != "" ? [ThreePic.ThreePicGamePin3, ThreePic.SitTable] : ThreePic.ThreePicGamePin3, 
      player4Username != "" ? [ThreePic.ThreePicGamePin4, ThreePic.SitTable] : ThreePic.ThreePicGamePin4, 
      player5Username != "" ? [ThreePic.ThreePicGamePin5, ThreePic.SitTableBtm] : ThreePic.ThreePicGamePin5, 
      player6Username != "" ? [ThreePic.ThreePicGamePin6, ThreePic.SitTable] : ThreePic.ThreePicGamePin6, 
      player7Username != "" ? [ThreePic.ThreePicGamePin7, ThreePic.SitTable] : ThreePic.ThreePicGamePin7, 
      player8Username != "" ? [ThreePic.ThreePicGamePin8, ThreePic.SitTable] : ThreePic.ThreePicGamePin8, 
    ])
  }, [player1Username, player2Username, player3Username, player4Username, player5Username, player6Username, player7Username, player8Username])

  useEffect(() => {
    setArrayStyleCard([
      ThreePic.ThreePicCardGroup1, 
      ThreePic.ThreePicCardGroup2, 
      ThreePic.ThreePicCardGroup3,
      ThreePic.ThreePicCardGroup4,
      banker == username ? ThreePicCardGroup5Banker : ThreePicCardGroup5,
      ThreePic.ThreePicCardGroup6,
      ThreePic.ThreePicCardGroup7,
      ThreePic.ThreePicCardGroup8
    ])

    setArrayStyleEmoji([
      ThreePic.EmojiPlayer1, 
      ThreePic.EmojiPlayer2, 
      ThreePic.EmojiPlayer3, 
      ThreePic.EmojiPlayer4, 
      banker == username ? EmojiPlayer5Banker : EmojiPlayer5, 
      ThreePic.EmojiPlayer6, 
      ThreePic.EmojiPlayer7, 
      ThreePic.EmojiPlayer8, 
    ])
  }, [banker, username])

  useEffect(() => {
    setArrayStyleResult([
      [ThreePic.amountResultPlayer1, banker == player1Username ? ThreePic.amountResultPlayer1Banker: {}], 
      [ThreePic.amountResult, banker == player2Username ? ThreePic.amountResultBanker: {}], 
      [ThreePic.amountResult, banker == player3Username ? ThreePic.amountResultBanker: {}], 
      [ThreePic.amountResult, banker == player4Username ? ThreePic.amountResultBanker: {}], 
      [ThreePic.amountResultPlayer5, banker == player5Username ? ThreePic.amountResultPlayer5Banker: {}], 
      [ThreePic.amountResult, banker == player6Username ? ThreePic.amountResultBanker: {}], 
      [ThreePic.amountResult, banker == player7Username ? ThreePic.amountResultBanker: {}], 
      [ThreePic.amountResult, banker == player8Username ? ThreePic.amountResultBanker: {}], 

      // [ThreePic.amountResultPlayer1], 
      // [ThreePic.amountResult], 
      // [ThreePic.amountResult], 
      // [ThreePic.amountResult], 
      // [ThreePic.amountResultPlayer5], 
      // [ThreePic.amountResult], 
      // [ThreePic.amountResult], 
      // [ThreePic.amountResult], 
    ])
  }, [player1Username, player2Username, player3Username, player4Username, player5Username, player6Username, player7Username, player8Username, banker, username])

  const jarakKursiChecker = useCallback((seatNumber:any) => {
    setTimeout(() => {
      if(seatNumber <= 5) {
        setJarakKursi(5 - seatNumber)
      } else {
        setJarakKursi(5 - seatNumber + 8)
      }
      movePosition(player1Pos, 1)
      movePosition(player2Pos, 2)
      movePosition(player3Pos, 3)
      movePosition(player4Pos, 4)
      movePosition(player5Pos, 5)
      movePosition(player6Pos, 6)
      movePosition(player7Pos, 7)
      movePosition(player8Pos, 8)
    }, 500);
  }, [])

  const resetPlayerUsername = useCallback(() => {
    setPlayer1Username("")
    setPlayer2Username("")
    setPlayer3Username("")
    setPlayer4Username("")
    setPlayer5Username("")
    setPlayer6Username("")
    setPlayer7Username("")
    setPlayer8Username("")
  }, [])

  useEffect(() => {
    resetPlayerUsername()
    if(player1) {
      let checker = 0
      if((1+jarakKursi) < 8) {
        checker = 1 + jarakKursi
      } else {
        checker = (1 + jarakKursi) - 8
      }
      if(checker == 1) {
        setPlayer1Username(player1.username)
      } else if(checker == 2) {
        setPlayer2Username(player1.username)
      } else if(checker == 3) {
        setPlayer3Username(player1.username)
      } else if(checker == 4) {
        setPlayer4Username(player1.username)
      } else if(checker == 5) {
        setPlayer5Username(player1.username)
      } else if(checker == 6) {
        setPlayer6Username(player1.username)
      } else if(checker == 7) {
        setPlayer7Username(player1.username)
      } else if(checker == 8) {
        setPlayer8Username(player1.username)
      }
    }  
    if(player2) {
      let checker = 0
      if((2+jarakKursi) < 8) {
        checker = 2 + jarakKursi
      } else {
        checker = (2 + jarakKursi) - 8
      }
      if(checker == 1) {
        setPlayer1Username(player2.username)
      } else if(checker == 2) {
        setPlayer2Username(player2.username)
      } else if(checker == 3) {
        setPlayer3Username(player2.username)
      } else if(checker == 4) {
        setPlayer4Username(player2.username)
      } else if(checker == 5) {
        setPlayer5Username(player2.username)
      } else if(checker == 6) {
        setPlayer6Username(player2.username)
      } else if(checker == 7) {
        setPlayer7Username(player2.username)
      } else if(checker == 8) {
        setPlayer8Username(player2.username)
      }
    }  
    if(player3) {
      let checker = 0
      if((3+jarakKursi) < 8) {
        checker = 3 + jarakKursi
      } else {
        checker = (3 + jarakKursi) - 8
      }
      if(checker == 1) {
        setPlayer1Username(player3.username)
      } else if(checker == 2) {
        setPlayer2Username(player3.username)
      } else if(checker == 3) {
        setPlayer3Username(player3.username)
      } else if(checker == 4) {
        setPlayer4Username(player3.username)
      } else if(checker == 5) {
        setPlayer5Username(player3.username)
      } else if(checker == 6) {
        setPlayer6Username(player3.username)
      } else if(checker == 7) {
        setPlayer7Username(player3.username)
      } else if(checker == 8) {
        setPlayer8Username(player3.username)
      }
    }  
    if(player4) {
      let checker = 0
      if((4+jarakKursi) < 8) {
        checker = 4 + jarakKursi
      } else {
        checker = (4 + jarakKursi) - 8
      }
      if(checker == 1) {
        setPlayer1Username(player4.username)
      } else if(checker == 2) {
        setPlayer2Username(player4.username)
      } else if(checker == 3) {
        setPlayer3Username(player4.username)
      } else if(checker == 4) {
        setPlayer4Username(player4.username)
      } else if(checker == 5) {
        setPlayer5Username(player4.username)
      } else if(checker == 6) {
        setPlayer6Username(player4.username)
      } else if(checker == 7) {
        setPlayer7Username(player4.username)
      } else if(checker == 8) {
        setPlayer8Username(player4.username)
      }
    }  
    if(player5) {
      let checker = 0
      if((5+jarakKursi) < 8) {
        checker = 5 + jarakKursi
      } else {
        checker = (5 + jarakKursi) - 8
      }
      if(checker == 1) {
        setPlayer1Username(player5.username)
      } else if(checker == 2) {
        setPlayer2Username(player5.username)
      } else if(checker == 3) {
        setPlayer3Username(player5.username)
      } else if(checker == 4) {
        setPlayer4Username(player5.username)
      } else if(checker == 5) {
        setPlayer5Username(player5.username)
      } else if(checker == 6) {
        setPlayer6Username(player5.username)
      } else if(checker == 7) {
        setPlayer7Username(player5.username)
      } else if(checker == 8) {
        setPlayer8Username(player5.username)
      }
    } 
    if(player6) {
      let checker = 0
      if((6+jarakKursi) < 8) {
        checker = 6 + jarakKursi
      } else {
        checker = (6 + jarakKursi) - 8
      }
      if(checker == 1) {
        setPlayer1Username(player6.username)
      } else if(checker == 2) {
        setPlayer2Username(player6.username)
      } else if(checker == 3) {
        setPlayer3Username(player6.username)
      } else if(checker == 4) {
        setPlayer4Username(player6.username)
      } else if(checker == 5) {
        setPlayer5Username(player6.username)
      } else if(checker == 6) {
        setPlayer6Username(player6.username)
      } else if(checker == 7) {
        setPlayer7Username(player6.username)
      } else if(checker == 8) {
        setPlayer8Username(player6.username)
      }
    } 
    if(player7) {
      let checker = 0
      if((7+jarakKursi) < 8) {
        checker = 7 + jarakKursi
      } else {
        checker = (7 + jarakKursi) - 8
      }
      if(checker == 1) {
        setPlayer1Username(player7.username)
      } else if(checker == 2) {
        setPlayer2Username(player7.username)
      } else if(checker == 3) {
        setPlayer3Username(player7.username)
      } else if(checker == 4) {
        setPlayer4Username(player7.username)
      } else if(checker == 5) {
        setPlayer5Username(player7.username)
      } else if(checker == 6) {
        setPlayer6Username(player7.username)
      } else if(checker == 7) {
        setPlayer7Username(player7.username)
      } else if(checker == 8) {
        setPlayer8Username(player7.username)
      }
    } 
    if(player8) {
      let checker = 0
      if((8+jarakKursi) < 8) {
        checker = 8 + jarakKursi
      } else {
        checker = (8 + jarakKursi) - 8
      }
      if(checker == 1) {
        setPlayer1Username(player8.username)
      } else if(checker == 2) {
        setPlayer2Username(player8.username)
      } else if(checker == 3) {
        setPlayer3Username(player8.username)
      } else if(checker == 4) {
        setPlayer4Username(player8.username)
      } else if(checker == 5) {
        setPlayer5Username(player8.username)
      } else if(checker == 6) {
        setPlayer6Username(player8.username)
      } else if(checker == 7) {
        setPlayer7Username(player8.username)
      } else if(checker == 8) {
        setPlayer8Username(player8.username)
      }
    }
  }, [player1, player2, player3, player4, player5, player6, player7, player8, jarakKursi])

  const rotateSeat = useCallback(() => {
    setTimeout(() => {
      setSwapAnimation(true)
      setTimeout(() => {
        setSwapAnimation(false)
      }, 400)
    }, 500)
    jarakKursiChecker(seatNumberNow)
  }, [seatNumberNow])

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
                <TouchableOpacity style={{}} onPress={() => closeOpenRules()}>
                  <Image
                    source={require("../../../../assets/images/others/alert-btn.png")}
                    style={ThreePic.alertButton}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {
              modalLive || modalRound || emojiModal ? 
              <View style={ThreePic.ThreePicTransparentModal}>
                <TouchableOpacity style={ThreePic.ThreePicTransparentModalButton} onPress={() => outsideClick()}>
                </TouchableOpacity>
              </View>
              : 
              <></>
            }
            <StatusBar hidden />
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
                game={'threepic'}
                // bankerPool={bankerPool}
                bankerPool={bankerLimit}
                rotateSeat={rotateSeat}
              />
            ) : (
              <></>
            )}
            {
              modalRules ?
              <ThreePicGameRules close={() => closeOpenRules()}></ThreePicGameRules>
              :
              <></>
            }
            {
              emojiModal ?
              <EmojiWindow setEmoji={setEmoji}></EmojiWindow>
              :
              <></>
            }
            {modalBetting ? (
              <BettingWindow
                close={() => closeOpenBetting()}
                balanceGame={balancePlayerGame}
                sendBet={sendBet}
                game={"threepic"}
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
                      // <View style={arrayStylePin[(0 + jarakKursi) < 8 ? 0 + jarakKursi : ((0 + jarakKursi) - 8)]}>
                      <Animated.View style={[arrayStylePin[0], player1Pos.getLayout()]}>
                        <TouchableOpacity onPress={() => sitHandler(1)}>                          
                          <Image
                            source={require("../../../../assets/images/others/button-sit.png")}
                          />
                        </TouchableOpacity>
                      </Animated.View>
                      // </View>
                    ) : (
                      // <View style={arrayStylePin[(0 + jarakKursi) < 8 ? 0 + jarakKursi : ((0 + jarakKursi) - 8)]}>
                      <Animated.View style={[arrayStylePin[0], player1Pos.getLayout()]}>
                        {
                          emojiPlayer1 != ""?
                          <Image source={images[emojiPlayer1]} style={arrayStyleEmoji[(0 + jarakKursi) < 8 ? 0 + jarakKursi : ((0 + jarakKursi) - 8)]}/>
                          :
                          <></>
                        }
                        <View style={{...ThreePic.relative}}>
                          {banker == player1?.username ? (
                            swapAnimation ?
                            <Animated.Image
                              onLoad={() => onLoadSwap(swapSeat)}
                              source={require("../../../../assets/images/others/banker.png")}
                              style={[
                                {
                                  opacity: swapSeat,
                                },
                                ThreePic.banker
                              ]}
                            />
                            :
                            <Image
                              source={require("../../../../assets/images/others/banker.png")}
                              style={ThreePic.banker}
                            />
                            // <Image source={require("../../../../assets/images/others/banker.png")} style={ThreePic.banker}/>
                          ) : (
                            <></>
                          )}
                          <View style={arrayStyleCard[(0 + jarakKursi) < 8 ? 0 + jarakKursi : ((0 + jarakKursi) - 8)]}>
                            <View style={{ flexDirection: "row" }}>
                              <View style={{ width: 17, height: 21, marginTop: 4.2, transform: [{ rotate: "-15deg" }]}}>
                                {/* <Image source={require('../../../../assets/images/card/small/card_jack.png')}/> */}
                                {player1C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => animationCard(card1)}
                                    source={images[player1C?.cards[0]]}
                                    style={[
                                      {
                                        opacity: card1,
                                        transform: [
                                          {
                                            scale: card1.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image source={images[player1C?.cards[0]]} style={ThreePic.cardImage}/>
                                  :
                                  <></>
                                }
                              </View>
                              <View style={{ width: 17, height: 21, marginLeft: 6, }}>
                                {/* <Image source={require('../../../../assets/images/card/small/card_queen.png')}/> */}
                                {player1C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => onLoadCard(card1)}
                                    source={images[player1C?.cards[1]]}
                                    style={[
                                      {
                                        opacity: card1,
                                        transform: [
                                          {
                                            scale: card1.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image source={images[player1C?.cards[1]]} style={ThreePic.cardImage}/>
                                  :
                                  <></>
                                }
                              </View>
                              <View style={{ width: 17, height: 21, marginLeft: 6, marginTop: 2.2, transform: [{ rotate: "15deg" }] }}>
                                {/* <Image source={require('../../../../assets/images/card/small/card_king.png')}/> */}
                                {player1C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => onLoadCard(card1)}
                                    source={images[player1C?.cards[2]]}
                                    style={[
                                      {
                                        opacity: card1,
                                        transform: [
                                          {
                                            scale: card1.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player1C?.cards[2]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                            </View>
                            <View style={[ThreePic.ThreePicCardPointDiv, {transform: [{ translateX: 3}]}]}>
                              {
                                player1C?.disp? 
                                <Text style={ThreePic.ThreePicCardPoint}>{player1C?.disp}</Text>
                                :
                                <></>
                              }
                            </View>
                          </View>
                          {player1C?.result? (
                            <View style={arrayStyleResult[(0 + jarakKursi) < 8 ? 0 + jarakKursi : ((0 + jarakKursi) - 8)]}>
                              <View style={ThreePic.amountDiv}>
                                <Image source={require("../../../../assets/images/others/coin.png")} style={ThreePic.coin}/>
                                <Text style={[ ThreePic.amountText, player1C?.result > 0 ? ThreePic.positiveAmount : ThreePic.negativeAmount]}>
                                  {player1C?.result}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                          {
                            swapAnimation ?
                            <Animated.Image
                              onLoad={() => onLoadSwap(swapSeat)}
                              source={require("../../../../assets/images/others/player1.png")}
                              style={[
                                {
                                  opacity: swapSeat,
                                },
                                ThreePic.player1
                              ]}
                            />
                            :
                            <Image
                              source={require("../../../../assets/images/others/player1.png")}
                              style={ThreePic.player1}
                            />
                          }
                          {/* <Image
                            source={require("../../../../assets/images/others/player1.png")}
                            style={ThreePic.player1}
                          /> */}
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
                      </Animated.View>
                      // </View>
                    )}
                    {!player2 ? (
                      // <View style={arrayStylePin[(1 + jarakKursi) < 8 ? 1 + jarakKursi : ((1 + jarakKursi) - 8)]}>
                      <Animated.View style={[arrayStylePin[1], player2Pos.getLayout()]}>
                        <TouchableOpacity onPress={() => sitHandler(2)}>
                          <Image
                            source={require("../../../../assets/images/others/button-sit.png")}
                          />
                        </TouchableOpacity>
                      </Animated.View>
                      // </View>
                    ) : (
                      <Animated.View style={arrayStylePin[(1 + jarakKursi) < 8 ? 1 + jarakKursi : ((1 + jarakKursi) - 8)]}>
                        {
                          emojiPlayer2 != ""?
                          <Image source={images[emojiPlayer2]} style={arrayStyleEmoji[(1 + jarakKursi) < 8 ? 1 + jarakKursi : ((1 + jarakKursi) - 8)]}/>
                          :
                          <></>
                        }
                        <View style={ThreePic.relative}>
                          {banker == player2?.username ? (
                            swapAnimation ?
                            <Animated.Image
                              onLoad={() => onLoadSwap(swapSeat)}
                              source={require("../../../../assets/images/others/banker.png")}
                              style={[
                                {
                                  opacity: swapSeat,
                                },
                                ThreePic.banker
                              ]}
                            />
                            :
                            <Image
                              source={require("../../../../assets/images/others/banker.png")}
                              style={ThreePic.banker}
                            />
                            // <Image source={require("../../../../assets/images/others/banker.png")} style={ThreePic.banker}/>
                          ) : (
                            <></>
                          )}
                          <View style={arrayStyleCard[(1 + jarakKursi) < 8 ? 1 + jarakKursi : ((1 + jarakKursi) - 8)]}>
                            <View style={{ flexDirection: "row" }}>
                              <View style={{width: 17,height: 21,marginTop: 4.2,transform: [{ rotate: "-15deg" }]}}>
                                {player2C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => animationCard(card2)}
                                    source={images[player2C?.cards[0]]}
                                    style={[
                                      {
                                        opacity: card2,
                                        transform: [
                                          {
                                            scale: card2.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image source={images[player2C?.cards[0]]}style={ThreePic.cardImage}/>
                                  :
                                  <></>
                                }
                              </View>
                              <View style={{width: 17,height: 21,marginLeft: 6,}}>
                                {player2C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => onLoadCard(card2)}
                                    source={images[player2C?.cards[1]]}
                                    style={[
                                      {
                                        opacity: card2,
                                        transform: [
                                          {
                                            scale: card2.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image source={images[player2C?.cards[1]]} style={ThreePic.cardImage}/>
                                  :
                                  <></>
                                }
                              </View>
                              <View style={{ width: 17,height: 21, marginLeft: 6, marginTop: 2.2,transform: [{ rotate: "15deg" }],}}>
                                {player2C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => onLoadCard(card2)}
                                    source={images[player2C?.cards[2]]}
                                    style={[
                                      {
                                        opacity: card2,
                                        transform: [
                                          {
                                            scale: card2.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image  source={images[player2C?.cards[2]]} style={ThreePic.cardImage}/>
                                  :
                                  <></>
                                }
                              </View>
                            </View>
                            <View style={[ThreePic.ThreePicCardPointDiv, {transform: [{ translateX: 6}]}]}>
                              { 
                                player2C?.disp? 
                                <Text style={ThreePic.ThreePicCardPoint}>{player2C?.disp}</Text>
                                :
                                <></>
                              }
                            </View>
                          </View>
                          {player2C?.result ? (
                            <View
                              style={arrayStyleResult[(1 + jarakKursi) < 8 ? 1 + jarakKursi : ((1 + jarakKursi) - 8)]}
                            >
                              <View style={ThreePic.amountDiv}>
                                <Image
                                  source={require("../../../../assets/images/others/coin.png")}
                                  style={ThreePic.coin}
                                />
                                <Text
                                  style={[
                                    ThreePic.amountText,
                                    player2C?.result > 0
                                      ? ThreePic.positiveAmount
                                      : ThreePic.negativeAmount,
                                  ]}
                                >
                                  {player2C?.result}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                          {
                            swapAnimation ?
                            <Animated.Image
                              onLoad={() => onLoadSwap(swapSeat)}
                              source={require("../../../../assets/images/others/player1.png")}
                              style={[
                                {
                                  opacity: swapSeat,
                                },
                                ThreePic.player1
                              ]}
                            />
                            :
                            <Image
                              source={require("../../../../assets/images/others/player1.png")}
                              style={ThreePic.player1}
                            />
                          }
                          {/* <Image
                            source={require("../../../../assets/images/others/player1.png")}
                            style={ThreePic.player1}
                          /> */}
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
                      </Animated.View>
                    )}
                    {!player3 ? (
                      // <View style={arrayStylePin(2 + jarakKursi) < 8 ? 2 + jarakKursi : ((2 + jarakKursi) - 8)}>
                      <Animated.View style={[arrayStylePin[2], player3Pos.getLayout()]}>
                        <TouchableOpacity onPress={() => sitHandler(3)}>
                          <Image
                            source={require("../../../../assets/images/others/button-sit.png")}
                          />
                        </TouchableOpacity>
                      </Animated.View>
                      // </View>
                    ) : (
                      <View
                        style={arrayStylePin[(2 + jarakKursi) < 8 ? 2 + jarakKursi : ((2 + jarakKursi) - 8)]}
                      >
                        {
                          emojiPlayer3 != ""?
                          <Image source={images[emojiPlayer3]} style={arrayStyleEmoji[(2 + jarakKursi) < 8 ? 2 + jarakKursi : ((2 + jarakKursi) - 8)]}/>
                          :
                          <></>
                        }
                        <View style={ThreePic.relative}>
                          {banker == player3?.username ? (
                            swapAnimation ?
                            <Animated.Image
                              onLoad={() => onLoadSwap(swapSeat)}
                              source={require("../../../../assets/images/others/banker.png")}
                              style={[
                                {
                                  opacity: swapSeat,
                                },
                                ThreePic.banker
                              ]}
                            />
                            :
                            <Image
                              source={require("../../../../assets/images/others/banker.png")}
                              style={ThreePic.banker}
                            />
                            // <Image source={require("../../../../assets/images/others/banker.png")} style={ThreePic.banker}/>
                          ) : (
                            <></>
                          )}
                          <View
                            style={arrayStyleCard[(2 + jarakKursi) < 8 ? 2 + jarakKursi : ((2 + jarakKursi) - 8)]}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginTop: 4.2,
                                  transform: [{ rotate: "-15deg" }],
                                }}
                              >
                                {player3C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => animationCard(card3)}
                                    source={images[player3C?.cards[0]]}
                                    style={[
                                      {
                                        opacity: card3,
                                        transform: [
                                          {
                                            scale: card3.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player3C?.cards[0]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: 6,
                                }}
                              >
                                {player3C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => onLoadCard(card3)}
                                    source={images[player3C?.cards[1]]}
                                    style={[
                                      {
                                        opacity: card3,
                                        transform: [
                                          {
                                            scale: card3.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player3C?.cards[1]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: 6,
                                  marginTop: 2.2,
                                  transform: [{ rotate: "15deg" }],
                                }}
                              >
                                {player3C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => onLoadCard(card3)}
                                    source={images[player3C?.cards[2]]}
                                    style={[
                                      {
                                        opacity: card3,
                                        transform: [
                                          {
                                            scale: card3.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player3C?.cards[2]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                            </View>
                            <View style={[ThreePic.ThreePicCardPointDiv, {transform: [{ translateX: 6}]}]}>
                              { 
                                player3C?.disp? 
                                <Text style={ThreePic.ThreePicCardPoint}>{player3C?.disp}</Text>
                                :
                                <></>
                              }
                            </View>
                          </View>
                          {player3C?.result ? (
                            <View
                              style={arrayStyleResult[(2 + jarakKursi) < 8 ? 2 + jarakKursi : ((2 + jarakKursi) - 8)]}
                            >
                              <View style={ThreePic.amountDiv}>
                                <Image
                                  source={require("../../../../assets/images/others/coin.png")}
                                  style={ThreePic.coin}
                                />
                                <Text
                                  style={[
                                    ThreePic.amountText,
                                    player3C?.result > 0
                                      ? ThreePic.positiveAmount
                                      : ThreePic.negativeAmount,
                                  ]}
                                >
                                  {player3C?.result}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                          {
                            swapAnimation ?
                            <Animated.Image
                              onLoad={() => onLoadSwap(swapSeat)}
                              source={require("../../../../assets/images/others/player1.png")}
                              style={[
                                {
                                  opacity: swapSeat,
                                },
                                ThreePic.player1
                              ]}
                            />
                            :
                            <Image
                              source={require("../../../../assets/images/others/player1.png")}
                              style={ThreePic.player1}
                            />
                          }
                          {/* <Image
                            source={require("../../../../assets/images/others/player1.png")}
                            style={ThreePic.player1}
                          /> */}
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
                      // <View style={arrayStylePin[(3 + jarakKursi) < 8 ? 3 + jarakKursi : ((3 + jarakKursi) - 8)]}>
                      <Animated.View style={[arrayStylePin[3], player4Pos.getLayout()]}>
                        {/* <TouchableOpacity onPress={() => closeOpenCheckIn()}> */}
                        <TouchableOpacity onPress={() => sitHandler(4)}>
                          <Image
                            source={require("../../../../assets/images/others/button-sit.png")}
                          />
                        </TouchableOpacity>
                      </Animated.View>
                      // </View>
                    ) : (
                      <View
                        style={arrayStylePin[(3 + jarakKursi) < 8 ? 3 + jarakKursi : ((3 + jarakKursi) - 8)]}
                      >
                        {
                          emojiPlayer4 != ""?
                          <Image source={images[emojiPlayer4]} style={arrayStyleEmoji[(3 + jarakKursi) < 8 ? 3 + jarakKursi : ((3 + jarakKursi) - 8)]}/>
                          :
                          <></>
                        }
                        <View style={ThreePic.relative}>
                          {banker == player4?.username ? (
                            swapAnimation ?
                            <Animated.Image
                              onLoad={() => onLoadSwap(swapSeat)}
                              source={require("../../../../assets/images/others/banker.png")}
                              style={[
                                {
                                  opacity: swapSeat,
                                },
                                ThreePic.banker
                              ]}
                            />
                            :
                            <Image
                              source={require("../../../../assets/images/others/banker.png")}
                              style={ThreePic.banker}
                            />
                            // <Image source={require("../../../../assets/images/others/banker.png")} style={ThreePic.banker}/>
                          ) : (
                            <></>
                          )}
                          <View
                            style={arrayStyleCard[(3 + jarakKursi) < 8 ? 3 + jarakKursi : ((3 + jarakKursi) - 8)]}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginTop: 4.2,
                                  transform: [{ rotate: "-15deg" }],
                                }}
                              >
                                {player4C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => animationCard(card4)}
                                    source={images[player4C?.cards[0]]}
                                    style={[
                                      {
                                        opacity: card4,
                                        transform: [
                                          {
                                            scale: card4.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player4C?.cards[0]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: 6,
                                }}
                              >
                                {player4C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => onLoadCard(card4)}
                                    source={images[player4C?.cards[1]]}
                                    style={[
                                      {
                                        opacity: card4,
                                        transform: [
                                          {
                                            scale: card4.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player4C?.cards[1]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: 6,
                                  marginTop: 2.2,
                                  transform: [{ rotate: "15deg" }],
                                }}
                              >
                                {player4C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => onLoadCard(card4)}
                                    source={images[player4C?.cards[2]]}
                                    style={[
                                      {
                                        opacity: card4,
                                        transform: [
                                          {
                                            scale: card4.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player4C?.cards[2]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                            </View>
                            <View style={[ThreePic.ThreePicCardPointDiv, {transform: [{ translateX: 2}]}]}>
                              {  
                                player4C?.disp? 
                                <Text style={ThreePic.ThreePicCardPoint}>{player4C?.disp}</Text>
                                :
                                <></>
                              }
                            </View>
                          </View>
                          {player4C?.result ? (
                            <View
                              style={arrayStyleResult[(3 + jarakKursi) < 8 ? 3 + jarakKursi : ((3 + jarakKursi) - 8)]}
                            >
                              <View style={ThreePic.amountDiv}>
                                <Image
                                  source={require("../../../../assets/images/others/coin.png")}
                                  style={ThreePic.coin}
                                />
                                <Text
                                  style={[
                                    ThreePic.amountText,
                                    player4C?.result > 0
                                      ? ThreePic.positiveAmount
                                      : ThreePic.negativeAmount,
                                  ]}
                                >
                                  {player4C?.result}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                          {
                            swapAnimation ?
                            <Animated.Image
                              onLoad={() => onLoadSwap(swapSeat)}
                              source={require("../../../../assets/images/others/player1.png")}
                              style={[
                                {
                                  opacity: swapSeat,
                                },
                                ThreePic.player1
                              ]}
                            />
                            :
                            <Image
                              source={require("../../../../assets/images/others/player1.png")}
                              style={ThreePic.player1}
                            />
                          }
                          {/* <Image
                            source={require("../../../../assets/images/others/player1.png")}
                            style={ThreePic.player1}
                          /> */}
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
                      // <View style={arrayStylePin[(4 + jarakKursi) < 8 ? 4 + jarakKursi : ((4 + jarakKursi) - 8)}>
                      <Animated.View style={[arrayStylePin[4], player5Pos.getLayout()]}>
                        {/* <TouchableOpacity onPress={() => closeOpenBetting()}> */}
                        <TouchableOpacity onPress={() => sitHandler(5)}>
                          <Image
                            source={require("../../../../assets/images/others/button-sit.png")}
                          />
                        </TouchableOpacity>
                      </Animated.View>
                      // </View>
                    ) : (
                      <View
                        style={arrayStylePin[(4 + jarakKursi) < 8 ? 4 + jarakKursi : ((4 + jarakKursi) - 8)]}
                      >
                        {
                          emojiPlayer5 != ""?
                          <Image source={images[emojiPlayer5]} style={arrayStyleEmoji[(4 + jarakKursi) < 8 ? 4 + jarakKursi : ((4 + jarakKursi) - 8)]}/>
                          :
                          <></>
                        }
                        <View style={ThreePic.relative}>
                          {banker == player5?.username ? (
                            swapAnimation ?
                            <Animated.Image
                              onLoad={() => onLoadSwap(swapSeat)}
                              source={require("../../../../assets/images/others/banker.png")}
                              style={[
                                {
                                  opacity: swapSeat,
                                },
                                ThreePic.banker
                              ]}
                            />
                            :
                            <Image
                              source={require("../../../../assets/images/others/banker.png")}
                              style={ThreePic.banker}
                            />
                            // <Image source={require("../../../../assets/images/others/banker.png")} style={ThreePic.banker}/>
                          ) : (
                            <></>
                          )}
                          <View
                            style={arrayStyleCard[(4 + jarakKursi) < 8 ? 4 + jarakKursi : ((4 + jarakKursi) - 8)]}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginTop: 4.2,
                                  transform: [{ rotate: "-15deg" }],
                                }}
                              >
                                {player5C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => animationCard(card5)}
                                    source={images[player5C?.cards[0]]}
                                    style={[
                                      {
                                        opacity: card5,
                                        transform: [
                                          {
                                            scale: card5.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player5C?.cards[0]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: 6,
                                }}
                              >
                                {player5C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => onLoadCard(card5)}
                                    source={images[player5C?.cards[1]]}
                                    style={[
                                      {
                                        opacity: card5,
                                        transform: [
                                          {
                                            scale: card5.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player5C?.cards[1]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: 6,
                                  marginTop: 2.2,
                                  transform: [{ rotate: "15deg" }],
                                }}
                              >
                                {player5C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => onLoadCard(card5)}
                                    source={images[player5C?.cards[2]]}
                                    style={[
                                      {
                                        opacity: card5,
                                        transform: [
                                          {
                                            scale: card5.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player5C?.cards[2]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                            </View>
                            <View style={[ThreePic.ThreePicCardPointDiv, {transform: [{ translateX: 2}]}]}>
                              { 
                                player5C?.disp? 
                                <Text style={ThreePic.ThreePicCardPoint}>{player5C?.disp}</Text>
                                :
                                <></>
                              }
                            </View>
                          </View>
                          {player5C?.result ? (
                            <View
                              style={arrayStyleResult[(4 + jarakKursi) < 8 ? 4 + jarakKursi : ((4 + jarakKursi) - 8)]}
                            >
                              <View style={ThreePic.amountDiv}>
                                <Image
                                  source={require("../../../../assets/images/others/coin.png")}
                                  style={ThreePic.coin}
                                />
                                <Text
                                  style={[
                                    ThreePic.amountText,
                                    player5C?.result > 0
                                      ? ThreePic.positiveAmount
                                      : ThreePic.negativeAmount,
                                  ]}
                                >
                                  {player5C?.result}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                          {
                            swapAnimation ?
                            <Animated.Image
                              onLoad={() => onLoadSwap(swapSeat)}
                              source={require("../../../../assets/images/others/player1.png")}
                              style={[
                                {
                                  opacity: swapSeat,
                                },
                                ThreePic.player1
                              ]}
                            />
                            :
                            <Image
                              source={require("../../../../assets/images/others/player1.png")}
                              style={ThreePic.player1}
                            />
                          }
                          {/* <Image
                            source={require("../../../../assets/images/others/player1.png")}
                            style={ThreePic.player1}
                          /> */}
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
                      // <View style={arrayStylePin[(5 + jarakKursi) < 8 ? 5 + jarakKursi : ((5 + jarakKursi) - 8)]}>
                      <Animated.View style={[arrayStylePin[5], player6Pos.getLayout()]}>
                        <TouchableOpacity onPress={() => sitHandler(6)}>
                          <Image
                            source={require("../../../../assets/images/others/button-sit.png")}
                          />
                        </TouchableOpacity>
                      </Animated.View>
                      // </View>
                    ) : (
                      <View
                        style={arrayStylePin[(5 + jarakKursi) < 8 ? 5 + jarakKursi : ((5 + jarakKursi) - 8)]}
                      >
                        {
                          emojiPlayer6 != ""?
                          <Image source={images[emojiPlayer6]} style={arrayStyleEmoji[(5 + jarakKursi) < 8 ? 5 + jarakKursi : ((5 + jarakKursi) - 8)]}/>
                          :
                          <></>
                        }
                        <View style={ThreePic.relative}>
                          {banker == player6?.username ? (
                            swapAnimation ?
                            <Animated.Image
                              onLoad={() => onLoadSwap(swapSeat)}
                              source={require("../../../../assets/images/others/banker.png")}
                              style={[
                                {
                                  opacity: swapSeat,
                                },
                                ThreePic.banker
                              ]}
                            />
                            :
                            <Image
                              source={require("../../../../assets/images/others/banker.png")}
                              style={ThreePic.banker}
                            />
                            // <Image source={require("../../../../assets/images/others/banker.png")} style={ThreePic.banker}/>
                          ) : (
                            <></>
                          )}
                          <View
                            style={arrayStyleCard[(5 + jarakKursi) < 8 ? 5 + jarakKursi : ((5 + jarakKursi) - 8)]}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginTop: 4.2,
                                  transform: [{ rotate: "-15deg" }],
                                }}
                              >
                                {player6C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => animationCard(card6)}
                                    source={images[player6C?.cards[0]]}
                                    style={[
                                      {
                                        opacity: card6,
                                        transform: [
                                          {
                                            scale: card6.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player6C?.cards[0]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: 6,
                                }}
                              >
                                {player6C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => onLoadCard(card6)}
                                    source={images[player6C?.cards[1]]}
                                    style={[
                                      {
                                        opacity: card6,
                                        transform: [
                                          {
                                            scale: card6.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  :
                                  <></>
                                }
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: 6,
                                  marginTop: 2.2,
                                  transform: [{ rotate: "15deg" }],
                                }}
                              >
                                {player6C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => onLoadCard(card6)}
                                    source={images[player6C?.cards[2]]}
                                    style={[
                                      {
                                        opacity: card6,
                                        transform: [
                                          {
                                            scale: card6.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player6C?.cards[2]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                            </View>
                            <View style={[ThreePic.ThreePicCardPointDiv, {transform: [{ translateX: 2}]}]}>
                              { 
                                player6C?.disp? 
                                <Text style={ThreePic.ThreePicCardPoint}>{player6C?.disp}</Text>
                                :
                                <></>
                              }
                            </View>
                          </View>
                          {player6C?.result ? (
                            <View
                              style={arrayStyleResult[(5 + jarakKursi) < 8 ? 5 + jarakKursi : ((5 + jarakKursi) - 8)]}
                            >
                              <View style={ThreePic.amountDiv}>
                                <Image
                                  source={require("../../../../assets/images/others/coin.png")}
                                  style={ThreePic.coin}
                                />
                                <Text
                                  style={[
                                    ThreePic.amountText,
                                    player6C?.result > 0
                                      ? ThreePic.positiveAmount
                                      : ThreePic.negativeAmount,
                                  ]}
                                >
                                  {player6C?.result}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                          {
                            swapAnimation ?
                            <Animated.Image
                              onLoad={() => onLoadSwap(swapSeat)}
                              source={require("../../../../assets/images/others/player1.png")}
                              style={[
                                {
                                  opacity: swapSeat,
                                },
                                ThreePic.player1
                              ]}
                            />
                            :
                            <Image
                              source={require("../../../../assets/images/others/player1.png")}
                              style={ThreePic.player1}
                            />
                          }
                          {/* <Image
                            source={require("../../../../assets/images/others/player1.png")}
                            style={ThreePic.player1}
                          /> */}
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
                      // <View style={arrayStylePin[(6 + jarakKursi) < 8 ? 6 + jarakKursi : ((6 + jarakKursi) - 8)]}>
                      <Animated.View style={[arrayStylePin[6], player7Pos.getLayout()]}>
                        <TouchableOpacity onPress={() => sitHandler(7)}>
                          <Image
                            source={require("../../../../assets/images/others/button-sit.png")}
                          />
                        </TouchableOpacity>
                      </Animated.View>
                      // </View>
                    ) : (
                      <View
                        style={arrayStylePin[(6 + jarakKursi) < 8 ? 6 + jarakKursi : ((6 + jarakKursi) - 8)]}
                      >
                        {
                          emojiPlayer7 != ""?
                          <Image source={images[emojiPlayer7]} style={arrayStyleEmoji[(6 + jarakKursi) < 8 ? 6 + jarakKursi : ((6 + jarakKursi) - 8)]}/>
                          :
                          <></>
                        }
                        <View style={ThreePic.relative}>
                          {banker == player7?.username ? (
                            swapAnimation ?
                            <Animated.Image
                              onLoad={() => onLoadSwap(swapSeat)}
                              source={require("../../../../assets/images/others/banker.png")}
                              style={[
                                {
                                  opacity: swapSeat,
                                },
                                ThreePic.banker
                              ]}
                            />
                            :
                            <Image
                              source={require("../../../../assets/images/others/banker.png")}
                              style={ThreePic.banker}
                            />
                            // <Image source={require("../../../../assets/images/others/banker.png")} style={ThreePic.banker}/>
                          ) : (
                            <></>
                          )}
                          <View
                            style={arrayStyleCard[(6 + jarakKursi) < 8 ? 6 + jarakKursi : ((6 + jarakKursi) - 8)]}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginTop: 4.2,
                                  transform: [{ rotate: "-15deg" }],
                                }}
                              >
                                {player7C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => animationCard(card7)}
                                    source={images[player7C?.cards[0]]}
                                    style={[
                                      {
                                        opacity: card7,
                                        transform: [
                                          {
                                            scale: card7.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player7C?.cards[0]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: 6,
                                }}
                              >
                                {player7C?.cards ? 
                                <Animated.Image
                                    onLoad={() => onLoadCard(card7)}
                                    source={images[player7C?.cards[1]]}
                                    style={[
                                      {
                                        opacity: card7,
                                        transform: [
                                          {
                                            scale: card7.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player7C?.cards[1]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: 6,
                                  marginTop: 2.2,
                                  transform: [{ rotate: "15deg" }],
                                }}
                              >
                                {player7C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => onLoadCard(card7)}
                                    source={images[player7C?.cards[2]]}
                                    style={[
                                      {
                                        opacity: card7,
                                        transform: [
                                          {
                                            scale: card7.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player7C?.cards[2]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                            </View>
                            <View style={[ThreePic.ThreePicCardPointDiv, {transform: [{ translateX: 2}]}]}>
                              { 
                                player7C?.disp? 
                                <Text style={ThreePic.ThreePicCardPoint}>{player7C?.disp}</Text>
                                :
                                <></>
                              }
                            </View>
                          </View>
                          {player7C?.result ? (
                            <View
                              style={arrayStyleResult[(6 + jarakKursi) < 8 ? 6 + jarakKursi : ((6 + jarakKursi) - 8)]}
                            >
                              <View style={ThreePic.amountDiv}>
                                <Image
                                  source={require("../../../../assets/images/others/coin.png")}
                                  style={ThreePic.coin}
                                />
                                <Text
                                  style={[
                                    ThreePic.amountText,
                                    player7C?.result > 0
                                      ? ThreePic.positiveAmount
                                      : ThreePic.negativeAmount,
                                  ]}
                                >
                                  {player7C?.result}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                          {
                            swapAnimation ?
                            <Animated.Image
                              onLoad={() => onLoadSwap(swapSeat)}
                              source={require("../../../../assets/images/others/player1.png")}
                              style={[
                                {
                                  opacity: swapSeat,
                                },
                                ThreePic.player1
                              ]}
                            />
                            :
                            <Image
                              source={require("../../../../assets/images/others/player1.png")}
                              style={ThreePic.player1}
                            />
                          }
                          {/* <Image
                            source={require("../../../../assets/images/others/player1.png")}
                            style={ThreePic.player1}
                          /> */}
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
                      // <View style={arrayStylePin[(7 + jarakKursi) < 8 ? 7 + jarakKursi : ((7 + jarakKursi) - 8)]}>
                      <Animated.View style={[arrayStylePin[7], player8Pos.getLayout()]}>
                        <TouchableOpacity onPress={() => sitHandler(8)}>
                          <Image
                            source={require("../../../../assets/images/others/button-sit.png")}
                          />
                        </TouchableOpacity>
                      </Animated.View>
                      // </View>
                    ) : (
                      <View
                        style={arrayStylePin[(7 + jarakKursi) < 8 ? 7 + jarakKursi : ((7 + jarakKursi) - 8)]}
                      >
                        {
                          emojiPlayer8 != ""?
                          <Image source={images[emojiPlayer8]} style={arrayStyleEmoji[(7 + jarakKursi) < 8 ? 7 + jarakKursi : ((7 + jarakKursi) - 8)]}/>
                          :
                          <></>
                        }
                        <View style={ThreePic.relative}>
                          {banker == player8?.username ? (
                            swapAnimation ?
                            <Animated.Image
                              onLoad={() => onLoadSwap(swapSeat)}
                              source={require("../../../../assets/images/others/banker.png")}
                              style={[
                                {
                                  opacity: swapSeat,
                                },
                                ThreePic.banker
                              ]}
                            />
                            :
                            <Image
                              source={require("../../../../assets/images/others/banker.png")}
                              style={ThreePic.banker}
                            />
                            // <Image source={require("../../../../assets/images/others/banker.png")} style={ThreePic.banker}/>
                          ) : (
                            <></>
                          )}
                          <View
                            style={arrayStyleCard[(7 + jarakKursi) < 8 ? 7 + jarakKursi : ((7 + jarakKursi) - 8)]}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginTop: 4.2,
                                  transform: [{ rotate: "-15deg" }],
                                }}
                              >
                                {player8C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => animationCard(card8)}
                                    source={images[player8C?.cards[0]]}
                                    style={[
                                      {
                                        opacity: card8,
                                        transform: [
                                          {
                                            scale: card8.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player8C?.cards[0]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: 6,
                                }}
                              >
                                {player8C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => onLoadCard(card8)}
                                    source={images[player8C?.cards[1]]}
                                    style={[
                                      {
                                        opacity: card8,
                                        transform: [
                                          {
                                            scale: card8.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player8C?.cards[1]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                              <View
                                style={{
                                  width: 17,
                                  height: 21,
                                  marginLeft: 6,
                                  marginTop: 2.2,
                                  transform: [{ rotate: "15deg" }],
                                }}
                              >
                                {player8C?.cards ? 
                                  <Animated.Image
                                    onLoad={() => onLoadCard(card8)}
                                    source={images[player8C?.cards[2]]}
                                    style={[
                                      {
                                        opacity: card8,
                                        transform: [
                                          {
                                            scale: card8.interpolate({
                                              inputRange: [0, 1],
                                              outputRange: [0.4, 1],
                                            })
                                          },
                                        ],
                                      },
                                      ThreePic.cardImage
                                      // this.props.style,
                                    ]}
                                  />
                                  // <Image
                                  //   source={images[player8C?.cards[2]]}
                                  //   style={ThreePic.cardImage}
                                  // />
                                  :
                                  <></>
                                }
                              </View>
                            </View>
                            <View style={[ThreePic.ThreePicCardPointDiv, {transform: [{ translateX: 2}]}]}>
                              { 
                                player8C?.disp? 
                                <Text style={ThreePic.ThreePicCardPoint}>{player8C?.disp}</Text>
                                :
                                <></>
                              }
                            </View>
                          </View>
                          {player8C?.result ? (
                            <View
                              style={arrayStyleResult[(7 + jarakKursi) < 8 ? 7 + jarakKursi : ((7 + jarakKursi) - 8)]}
                            >
                              <View style={ThreePic.amountDiv}>
                                <Image
                                  source={require("../../../../assets/images/others/coin.png")}
                                  style={ThreePic.coin}
                                />
                                <Text
                                  style={[
                                    ThreePic.amountText,
                                    player8C?.result > 0
                                      ? ThreePic.positiveAmount
                                      : ThreePic.negativeAmount,
                                  ]}
                                >
                                  {player8C?.result}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
                          {
                            swapAnimation ?
                            <Animated.Image
                              onLoad={() => onLoadSwap(swapSeat)}
                              source={require("../../../../assets/images/others/player1.png")}
                              style={[
                                {
                                  opacity: swapSeat,
                                },
                                ThreePic.player1
                              ]}
                            />
                            :
                            <Image
                              source={require("../../../../assets/images/others/player1.png")}
                              style={ThreePic.player1}
                            />
                          }
                          {/* <Image
                            source={require("../../../../assets/images/others/player1.png")}
                            style={ThreePic.player1}
                          /> */}
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
                <View style={{flexDirection: 'row'}}>
                  {
                    phase == 'result' ?
                    <TouchableOpacity style={{}} onPress={() => standUp()}>
                      <Image
                        source={require("../../../../assets/images/others/standup.png")}
                        style={[ThreePic.alertButton, {marginRight: 10}]}
                      />
                    </TouchableOpacity>
                    :
                    <></>
                  }
                  <TouchableOpacity style={{}} onPress={() => openEmoji()}>
                    <Image
                      source={require("../../../../assets/images/others/emoticon-btn.png")}
                      style={ThreePic.alertButton}
                    />
                  </TouchableOpacity>
                </View>
                {/* <TouchableOpacity style={[ThreePic.absCenter, ThreePic.alertBtn]}> */}
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
