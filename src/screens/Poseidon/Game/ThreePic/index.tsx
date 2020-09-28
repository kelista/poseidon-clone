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
import { CardWindow } from "../../../../components/CardPhase";
import ThreePic from "../../../../styles/ThreePicStyle";
import { CustomheaderLogo } from "../../../../components/HeaderLogo";
import { WSContext } from "../../../../../routes/wsContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../../services/imageServices";
import { BSContext } from "../../../../../routes/bsContext";
import { SSContext } from "../../../../../routes/simpleStoreContext";
import { useTimer } from "../../../../services/timer";

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

export const PoseidonThreePicGame: NavigationScreenComponent<any, any> = (
  props
) => {
  const { navigate } = props.navigation;

  const [time, isCounting, startTimer] = useTimer();
  const timeImageString = useMemo(() => time + "-timer", [time]);
  const timeImageString2 = useMemo(() => time + "-timer2", [time]);

  const wsClient = useContext(WSContext);
  const bs = useContext(BSContext);
  const ss = useContext(SSContext);

  const [modalCheckIn, setModalCheckIn] = useState(props.modalCheckIn);
  const [banker, setBanker] = useState("");
  const [sitStatus, setSitStatus] = useState("");
  const [amount, setAmount] = useState(0);
  const [modalBetting, setModalBetting] = useState(false);
  const [modalRound, setModalRound] = useState(false);
  const [modalCard, setModalCard] = useState(true);
  const infoEvent = "info";
  const moveEvent = "move";
  const metaEvent = "game/meta";
  const poolEvent = "game/pool";
  const buyInEvent = "game/sign";
  const gameInfoEvent = "game/info";
  const gamePhaseEvent = "game/phase";
  const gameBetEvent = "game/bet";
  const [connecting, setConnecting] = useState(true);
  const [balancePlayer, setBalancePlayer] = useState(0);
  const [balancePlayerGame, setBalancePlayerGame] = useState(
    props.balancePlayerGame
  );
  const [username, setUsername] = useState("");
  const [minBet, setMinBet] = useState(0);
  const [midBet, setMidBet] = useState(0);
  const [maxBet, setMaxBet] = useState(0);
  const [bankerPool, setBankerPool] = useState(0);
  const [player1, setPlayer1] = useState<Player>();
  const [player2, setPlayer2] = useState<Player>();
  const [player3, setPlayer3] = useState<Player>();
  const [player4, setPlayer4] = useState<Player>();
  const [player5, setPlayer5] = useState<Player>();
  const [player6, setPlayer6] = useState<Player>();
  const [player7, setPlayer7] = useState<Player>();
  const [player8, setPlayer8] = useState<Player>();
  const [phase, setPhase] = useState<string>("fresh");

  // const [time, isCounting, startTimer] = useTimer();

  const windowWidth = Dimensions.get("window").width;

  const gameInfoAction = useCallback(async function (data: any) {
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
      const player = data.players.find((d: any) => d.seatNumber === index+1);
      if (player) {
        player.cards = [];
        p(player);
      } else {
        p(undefined);
      }
    });
  }, []);

  const metaAction = useCallback(async function (data: any) {
    setMinBet(data.min);
    setMidBet(data.mid);
    setMaxBet(data.max);
  }, []);

  const timerAction = useCallback(
    async function (data: any) {
      startTimer(data.timer);
    },
    [isCounting]
  );

  const poolAction = useCallback(async function (data: any) {
    setBankerPool(data.pool);
  }, []);

  // method
  const gamePhaseAction = useCallback(async (data: any) => {
    setPhase(data.phase);

    wsClient?.sendMessage(infoEvent, {});

    if (data.phase === "result") {
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
        p((player) => {
          if (player) {
            const np = { ...player };
            const username = player.username;
            const result = data.data.find((d: any) => d.username === username);
            if (result) {
              np.result = result.win;
              np.cards = result.cards;
            }
            return np;
          }
          return player;
        });
      });
    }
  }, []);

  useEffect(() => {
    if (phase === "bet" && banker !== username && balancePlayerGame != 0) {
      setModalBetting(true);
    } else if (phase === "fresh") {
      setBankerPool(0);
    } else {
      setModalBetting(false);
    }
  }, [phase, banker, username]);

  useEffect(() => {
    if(player1?.username == username) {
      setBalancePlayerGame(player1?.balance)
    } else if(player2?.username == username) {
      setBalancePlayerGame(player2?.balance)
    } else if(player3?.username == username) {
      setBalancePlayerGame(player3?.balance)
    } else if(player4?.username == username) {
      setBalancePlayerGame(player4?.balance)
    } else if(player5?.username == username) {
      setBalancePlayerGame(player5?.balance)
    } else if(player6?.username == username) {
      setBalancePlayerGame(player6?.balance)
    } else if(player7?.username == username) {
      setBalancePlayerGame(player7?.balance)
    } else if(player8?.username == username) {
      setBalancePlayerGame(player8?.balance)
    }
  }, [player1, player2, username]);

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

      const poolListener = wsClient.addListener(poolEvent, poolAction);
      listeners.push(poolListener);

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
    if (balancePlayerGame == 0) {
      setModalCheckIn(true);
    } else {
      wsClient?.sendMessage(buyInEvent, {
        amount: balancePlayerGame,
        seatNumber: seatNumber,
      });
    }
  };

  const accountHandler = () => {
    navigate(ROUTES.PoseidonAccount);
  };

  const closeOpenCheckIn = () => {
    setModalCheckIn(!modalCheckIn);
  };

  const closeOpenBetting = () => {
    // setModalBetting(!modalBetting)
  };

  const closeOpenRoundDetail = () => {
    setModalRound(!modalRound)
  }

  const buyIn = () => {
    closeOpenCheckIn();
    // closeOpenBetting()
  };

  const closeOpenCard = () => {
    setModalCard(!modalCard);
  };

  const sendBet = (amount: number) => {
    wsClient?.sendMessage(gameBetEvent, { amount });
  };

  useEffect(function gameInit() {
    setModalCheckIn(true);
    setBalancePlayerGame(0);
    wsClient?.sendMessage(infoEvent, {});
    wsClient?.sendMessage(metaEvent, {});
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
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
            {
            modalRound ?
              <RoundDetail></RoundDetail>
              :
              <></>
            }
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
              <View style={ThreePic.ThreePicGameContainer}>
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
                    <View style={ThreePic.ThreePicTimerDiv}>
                      <View style={ThreePic.relative}>
                        <Image
                          source={images['circle']}
                          style={ThreePic.ThreePicCircle}
                        ></Image>
                        {
                          time < 10 ? 
                            <Image
                              source={images[timeImageString2]}
                              style={ThreePic.ThreePicTimer1}
                            /> 
                          :
                            time == 11 ?
                              <Image
                                source={images[timeImageString2]}
                                style={ThreePic.ThreePicTimer3}
                              />
                              :
                              <Image
                                source={images[timeImageString2]}
                                style={ThreePic.ThreePicTimer2}
                              />
                        }
                        
                      </View>
                    </View> 

                  <View style={ThreePic.ThreePicGameTableTextWrapper}>
                    <Text style={ThreePic.ThreePicGameTableText}>
                      Banker: {bankerPool}
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
                    style={ThreePic.ThreePicGameTableImage}
                  />
                  <View style={ThreePic.ThreePicGamePinWrapper}>
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
                          {player1?.cards ? (
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
                                    source={images[player1?.cards[0]]}
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
                                    source={images[player1?.cards[1]]}
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
                                  {/* <Image source={require('../../../../assets/images/card/small/card_king.png')}/> */}
                                  <Image
                                    source={images[player1?.cards[2]]}
                                    style={ThreePic.cardImage}
                                  ></Image>
                                </View>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
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
                                {player1?.bet}
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
                          {player2?.cards ? (
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
                                  <Image
                                    source={images[player2?.cards[0]]}
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
                                    source={images[player2?.cards[1]]}
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
                                    source={images[player2?.cards[2]]}
                                    style={ThreePic.cardImage}
                                  ></Image>
                                </View>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
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
                                {player2?.bet}
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
                          {player3?.cards ? (
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
                                  <Image
                                    source={images[player3?.cards[0]]}
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
                                    source={images[player3?.cards[1]]}
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
                                    source={images[player3?.cards[2]]}
                                    style={ThreePic.cardImage}
                                  ></Image>
                                </View>
                              </View>
                            </View>
                          ) : (
                            <></>
                          )}
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
                                {player3?.bet}
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
                            <></>
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
                                {player4?.bet}
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
                            <></>
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
                                {player5?.bet}
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
                            <></>
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
                                {player6?.bet}
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
                            <></>
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
                                {player7?.bet}
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
                            <></>
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
                                {player8?.bet}
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
            <View style={ThreePic.emojiButton}>
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
          </View>
        </ScrollView>
        <BottomNavigation
          roundDetail={() => closeOpenRoundDetail()}
          setting={() => navigate(ROUTES.PoseidonAccount)}
          status={"game"}
          balance={balancePlayerGame}
        ></BottomNavigation>
      </View>
    </SafeAreaView>
  );
};
