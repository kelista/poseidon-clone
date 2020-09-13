import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Image, ImageBackground, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import { ROUTES } from "../../../../../routes";
import { WebSocketClient } from "../../../../services/websocket"
import { CustomHeader } from "../../../../components/Header"
import { BottomNavigation } from "../../../../components/BottomNavigation"
import { CheckInWindow } from "../../../../components/CheckIn"
import { BettingWindow } from "../../../../components/Betting"
import { CardWindow } from "../../../../components/CardPhase"
import ThreePic from "../../../../styles/ThreePicStyle"
import { CustomheaderLogo } from "../../../../components/HeaderLogo"
import { WSContext } from '../../../../../routes/wsContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../../../services/cardServices'
import { BSContext } from '../../../../../routes/bsContext';
import { SSContext } from '../../../../../routes/simpleStoreContext';
import { useTimer } from  "../../../../services/timer"

interface PlayerInfo {
  username: string;
  name: string;
  balance: number;
  credit: number;
}

interface EventDataPhase {
  phase: string;
  time: number;
}

interface Player {
  username: string;
  seatNumber: number;
}

const ListenTimerComponent = () => {
  const wsClient = useContext(WSContext);
  const [time, isCounting, startTimer] = useTimer();

  useEffect(() => {
    if (!wsClient) return;
    const listeners: string[] = [];
    const timerListener = wsClient.addListener("game/phase",async (data: EventDataPhase) => {
      if(data.time){
        startTimer(data.time);
      }
    });
    listeners.push(timerListener);
  }, [wsClient ? true : false]);

  return (
    <View>
      <Text style={ThreePic.ThreePicGameTableText}>{time}</Text>
      <View style={ThreePic.ThreePicGamePin1}>
        <TouchableOpacity onPress={() => startTimer(15)}>
          <Image source={require('../../../../assets/images/others/button-sit.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const PoseidonThreePicGame: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  
  const wsClient = useContext(WSContext)
  const bs = useContext(BSContext);
  const ss = useContext(SSContext);

  const [modalCheckIn, setModalCheckIn] = useState(props.modalCheckIn);
  const [banker, setBanker] = useState("");
  const [sitStatus, setSitStatus] = useState("");
  const [amount, setAmount] = useState(0);
  const [modalBetting, setModalBetting] = useState(false);
  const [modalCard, setModalCard] = useState(true);
  const infoEvent = "info";
  const moveEvent = "move";
  const buyInEvent = "game/sign";
  const gameInfoEvent = "game/info";
  const [connecting, setConnecting] = useState(true);
  const [balancePlayer, setBalancePlayer] = useState(0)
  const [balancePlayerGame, setBalancePlayerGame] = useState(props.balancePlayerGame)
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>();
  const [player1, setPlayer1] = useState<Player>();
  const [player2, setPlayer2] = useState<Player>();
  const [player3, setPlayer3] = useState<Player>();
  const [player4, setPlayer4] = useState<Player>();
  const [player5, setPlayer5] = useState<Player>();
  const [player6, setPlayer6] = useState<Player>();
  const [player7, setPlayer7] = useState<Player>();
  const [player8, setPlayer8] = useState<Player>();

  // const [time, isCounting, startTimer] = useTimer();

  const windowWidth = Dimensions.get('window').width;

   // listen connect
  useEffect(function cb() {
    if (!wsClient) return;
    const listeners: string[] = [];

    const connectCB = async function (data: any) {
      setPlayerInfo(data)
      setBalancePlayer(data.balance)
    }

    const moveAction = async function (data: any) {
      if(data === "L") {
        navigate(ROUTES.PoseidonThreePicRoom);
      }
    }

    const gameInfoAction = async function (data: any) {
      data.players.forEach((d: any) => {
        if(d.seatNumber == 1) {
          setPlayer1(d)
        } else if(d.seatNumber == 2){
          setPlayer2(d)
        } else if(d.seatNumber == 3){
          setPlayer3(d)
        } else if(d.seatNumber == 4){
          setPlayer4(d)
        } else if(d.seatNumber == 5){
          setPlayer5(d)
        } else if(d.seatNumber == 6){
          setPlayer6(d)
        } else if(d.seatNumber == 7){
          setPlayer7(d)
        } else if(d.seatNumber == 8){
          setPlayer8(d)
        }
      })
    }

    const infoListener = wsClient.addListener(infoEvent, connectCB);
    listeners.push(infoListener);

    const moveListener = wsClient.addListener(moveEvent, moveAction);
    listeners.push(moveListener);

    const gameInfoListener = wsClient.addListener(gameInfoEvent, gameInfoAction);
    listeners.push(gameInfoListener);

    // const timerListener = wsClient.addListener("game/phase", async (data: EventDataPhase) => {
    //   if(data.time){
    //     startTimer(data.time);
    //   }
    // });
    // listeners.push(timerListener);

    return () => {
      listeners.map(lst => {
        wsClient?.removeListener(lst);
      })
    }
  }, [wsClient ? true : false]);

  const lobbyHandler = () => {
    wsClient?.sendMessage("lobby", {});
  };

  const sitHandler = (seatNumber:number) => {
    if(balancePlayerGame == 0) {
      setModalCheckIn(true)
    } else {
      wsClient?.sendMessage(buyInEvent, { amount: balancePlayerGame, seatNumber: seatNumber });
    }
  }

  const accountHandler = () => {
    navigate(ROUTES.PoseidonAccount);
  };

  const closeOpenCheckIn = () => {
    setModalCheckIn(!modalCheckIn)
  }

  const closeOpenBetting = () => {
    setModalBetting(!modalBetting)
  }

  const buyIn = () => {
    closeOpenCheckIn()
    // closeOpenBetting()
  }

  const closeOpenCard = () => {
    setModalCard(!modalCard)
  }

  useEffect(function gameInit() {
    // setBanker("player2")
    setModalCheckIn(true)
    setBalancePlayerGame(0)
    wsClient?.sendMessage(infoEvent, { event: infoEvent });
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{flex: 1}}>
        {/* <CustomHeader title="Poseidon Club" status="lobby"></CustomHeader> */}
        <CustomheaderLogo name="threepic" lobby={() => lobbyHandler()}></CustomheaderLogo>
        <ScrollView scrollEnabled={false}>
          <View style={ThreePic.relative}>
            <View style={ThreePic.infoButton}>
              <View style={ThreePic.relative}>
                {/* <TouchableOpacity style={[ThreePic.absCenter, ThreePic.alertBtn]}> */}
                <TouchableOpacity style={{}}>
                  <Image source={require('../../../../assets/images/others/alert-btn.png')} style={ThreePic.alertButton}/>
                </TouchableOpacity>
              </View> 
            </View>
            <StatusBar hidden />
            {
              modalCheckIn ?
              <CheckInWindow 
                close={() => closeOpenCheckIn()} 
                setModalCheckIn={setModalCheckIn} 
                balance={balancePlayer}
                setBalancePlayerGame={setBalancePlayerGame}
              />
              :
              <></>
            }
            {
              modalBetting ?
              <BettingWindow close={() => closeOpenBetting()} submit={() => closeOpenBetting() }/>
              :
              <></>
            }
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
              <ImageBackground source={require('../../../../assets/images/others/backgroundskp-game.png.png')} style={ThreePic.ThreePicGameBackground}/>
              <View style={ThreePic.ThreePicGameContainer}>
                  <View style={ThreePic.ThreePicGameTableImageWrapper}>
                      <Image source={require('../../../../assets/images/others/threepic-gamelogo.png')} style={ThreePic.ThreePicGameTableLogo}/>
                      <View style={ThreePic.ThreePicGameTableTextWrapper}>
                        <Text style={ThreePic.ThreePicGameTableText}>Banker: 3000</Text>
                        <Text style={ThreePic.ThreePicGameTableText}>Min: 10</Text>
                        <Text style={ThreePic.ThreePicGameTableText}>Max: 100</Text>
                        <ListenTimerComponent></ListenTimerComponent>
                      </View>
                      <Image source={require('../../../../assets/images/others/table-new.png')} style={ThreePic.ThreePicGameTableImage}/>
                      <View style={ThreePic.ThreePicGamePinWrapper}>
                        {
                          !player1 ? 
                          <View style={ThreePic.ThreePicGamePin1}>
                            <TouchableOpacity onPress={() => sitHandler(1)}>
                              <Image source={require('../../../../assets/images/others/button-sit.png')}/>
                            </TouchableOpacity>
                          </View>
                          :
                          <View style={[ThreePic.ThreePicGamePin1, ThreePic.SitTable]}>
                            <View style={ThreePic.relative}>
                              {
                                banker == "player1" ? 
                                <Image source={require('../../../../assets/images/others/banker.png')} style={ThreePic.banker}/>
                                :
                                <></>
                              }
                              {
                                false ?
                                <View style={{alignItems: 'center', zIndex: 5, marginTop: 95, height: 25.05}}>
                                  <View style={{flexDirection: 'row'}}>
                                    <View style={{width: 17, height: 21,  marginTop: 2.2, transform: [{ rotate: '-15deg'}]}}>
                                      {/* <Image source={require('../../../../assets/images/card/small/card_jack.png')}/> */}
                                      <Image source={images['11-heart']} style={ThreePic.cardImage}/>
                                    </View>
                                    <View style={{width: 17, height: 21, marginLeft: -1}}>
                                      {/* <Image source={require('../../../../assets/images/card/small/card_queen.png')}/> */}
                                      <Image source={images['12-club']} style={ThreePic.cardImage}></Image>
                                    </View>
                                    <View style={{width: 17, height: 21, marginLeft: -1, marginTop: 2.2, transform: [{ rotate: '15deg'}]}}>
                                      {/* <Image source={require('../../../../assets/images/card/small/card_king.png')}/> */}
                                      <Image source={images['13-diamond']} style={ThreePic.cardImage}></Image>
                                    </View>
                                  </View>
                                </View>
                                : 
                                <></>
                              }
                              {
                                false ?
                                <View style={[ThreePic.amountResultPlayer1, banker == "player1" ? ThreePic.amountResultPlayer1Banker : {}]}>
                                  <View style={ThreePic.amountDiv}>
                                    <Image source={require('../../../../assets/images/others/coin.png')} style={ThreePic.coin}/>
                                    <Text style={[ThreePic.amountText, ThreePic.negativeAmount]}>
                                      -2
                                    </Text>
                                  </View>
                                </View>
                                :
                                <></>
                              }
                              <Image source={require('../../../../assets/images/others/player1.png')} style={ThreePic.player1}/>
                              <View style={ThreePic.ProfileTable}>
                                <View style={ThreePic.row}>
                                  <Text style={ThreePic.username}>{player1.username}</Text>
                                </View>
                                <View style={ThreePic.row}>
                                  <Text style={ThreePic.balance}>{playerInfo?.credit}</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        }         
                        {
                          !player2 ? 
                            <View style={ThreePic.ThreePicGamePin2}>
                              <TouchableOpacity onPress={() => sitHandler(2)}>
                                <Image source={require('../../../../assets/images/others/button-sit.png')}/>
                              </TouchableOpacity>
                            </View>
                          :
                          <View style={[ThreePic.ThreePicGamePin2, ThreePic.SitTable]}>
                            <View style={ThreePic.relative}>
                              {
                                banker == "player2" ? 
                                <Image source={require('../../../../assets/images/others/banker.png')} style={ThreePic.banker}/>
                                :
                                <></>
                              }
                              { 
                                false ? 
                                <View style={{alignItems: 'flex-start', zIndex: 5, height: 25.05, marginTop: 42, transform: [{ translateX: -50.1-14 }]}}>
                                  <View style={{flexDirection: 'row'}}>
                                    <View style={{width: 17, height: 21,  marginTop: 2.2, transform: [{ rotate: '-15deg'}]}}>
                                      <Image source={images['11-heart']} style={ThreePic.cardImage}/>
                                    </View>
                                    <View style={{width: 17, height: 21, marginLeft: -1}}>
                                      <Image source={images['12-club']} style={ThreePic.cardImage}></Image>
                                    </View>
                                    <View style={{width: 17, height: 21, marginLeft: -1, marginTop: 2.2, transform: [{ rotate: '15deg'}]}}>
                                      <Image source={images['13-diamond']} style={ThreePic.cardImage}></Image>
                                    </View>
                                  </View>
                                </View> 
                                :
                                <></>
                              }
                              {
                                false ? 
                                <View style={[ThreePic.amountResult, banker == "player2" ? ThreePic.amountResultBanker : {}]}>
                                  <View style={ThreePic.amountDiv}>
                                    <Image source={require('../../../../assets/images/others/coin.png')} style={ThreePic.coin}/>
                                    <Text style={[ThreePic.amountText, ThreePic.positiveAmount]}>
                                      2
                                    </Text>
                                  </View>
                                </View>
                                :
                                <></>
                              }
                              <Image source={require('../../../../assets/images/others/player1.png')} style={ThreePic.player1}/>
                              <View style={ThreePic.ProfileTable}>
                                <View style={ThreePic.row}>
                                  <Text style={ThreePic.username}>{player2?.username}</Text>
                                </View>
                                <View style={ThreePic.row}>
                                  <Text style={ThreePic.balance}>999,999,999</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        }   
                        {
                          !player3 ? 
                            <View style={ThreePic.ThreePicGamePin3}>
                              <TouchableOpacity onPress={() => sitHandler(3)}>
                                <Image source={require('../../../../assets/images/others/button-sit.png')}/>
                              </TouchableOpacity>
                            </View>
                          :
                          <View style={[ThreePic.ThreePicGamePin3, ThreePic.SitTable]}>
                            <View style={ThreePic.relative}>
                              {
                                banker == "player3" ? 
                                <Image source={require('../../../../assets/images/others/banker.png')} style={ThreePic.banker}/>
                                :
                                <></>
                              }
                              {
                                false ?
                                <View style={{alignItems: 'flex-start', zIndex: 5, height: 25.05, marginTop: 9, transform: [{ translateX: -50.1-14 }]}}>
                                  <View style={{flexDirection: 'row'}}>
                                    <View style={{width: 17, height: 21,  marginTop: 2.2, transform: [{ rotate: '-15deg'}]}}>
                                      <Image source={images['11-heart']} style={ThreePic.cardImage}/>
                                    </View>
                                    <View style={{width: 17, height: 21, marginLeft: -1}}>
                                      <Image source={images['12-club']} style={ThreePic.cardImage}></Image>
                                    </View>
                                    <View style={{width: 17, height: 21, marginLeft: -1, marginTop: 2.2, transform: [{ rotate: '15deg'}]}}>
                                      <Image source={images['13-diamond']} style={ThreePic.cardImage}></Image>
                                    </View>
                                  </View>
                                </View>
                                : 
                                <></>
                              }
                              {
                                false ?
                                <View style={[ThreePic.amountResult, banker == "player3" ? ThreePic.amountResultBanker : {}]}>
                                  <View style={ThreePic.amountDiv}>
                                    <Image source={require('../../../../assets/images/others/coin.png')} style={ThreePic.coin}/>
                                    <Text style={[ThreePic.amountText, ThreePic.positiveAmount]}>
                                      2
                                    </Text>
                                  </View>
                                </View>
                                :
                                <></>
                              }
                              <Image source={require('../../../../assets/images/others/player1.png')} style={ThreePic.player1}/>
                              <View style={ThreePic.ProfileTable}>
                                <View style={ThreePic.row}>
                                  <Text style={ThreePic.username}>{player3?.username}</Text>
                                </View>
                                <View style={ThreePic.row}>
                                  <Text style={ThreePic.balance}>999,999,999</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        }     
                        {  
                          !player4 ? 
                            <View style={ThreePic.ThreePicGamePin4}>
                              {/* <TouchableOpacity onPress={() => closeOpenCheckIn()}> */}
                              <TouchableOpacity onPress={() => sitHandler(4)}>
                                <Image source={require('../../../../assets/images/others/button-sit.png')}/>
                              </TouchableOpacity>
                            </View>
                          :
                          <View style={[ThreePic.ThreePicGamePin4, ThreePic.SitTable]}>
                            <View style={ThreePic.relative}>
                              {
                                banker == "player4" ? 
                                <Image source={require('../../../../assets/images/others/banker.png')} style={ThreePic.banker}/>
                                :
                                <></>
                              }
                              {
                                false ?
                                <View style={{alignItems: 'flex-end', zIndex: 5, height: 25.05, marginTop: -8, transform: [{ translateX: -50.1-14 }]}}>
                                  <View style={{flexDirection: 'row'}}>
                                    <View style={{width: 17, height: 21,  marginTop: 2.2, transform: [{ rotate: '-15deg'}]}}>
                                      <Image source={images['11-heart']} style={ThreePic.cardImage}/>
                                    </View>
                                    <View style={{width: 17, height: 21, marginLeft: -1}}>
                                      <Image source={images['12-club']} style={ThreePic.cardImage}></Image>
                                    </View>
                                    <View style={{width: 17, height: 21, marginLeft: -1, marginTop: 2.2, transform: [{ rotate: '15deg'}]}}>
                                      <Image source={images['13-diamond']} style={ThreePic.cardImage}></Image>
                                    </View>
                                  </View>
                                </View>
                                :
                                <></>
                              }
                              {
                                false ?
                                <View style={[ThreePic.amountResult, banker == "player4" ? ThreePic.amountResultBanker : {}]}>
                                  <View style={ThreePic.amountDiv}>
                                    <Image source={require('../../../../assets/images/others/coin.png')} style={ThreePic.coin}/>
                                    <Text style={[ThreePic.amountText, ThreePic.positiveAmount]}>
                                      2
                                    </Text>
                                  </View>
                                </View>
                                :
                                <></>
                              }
                              <Image source={require('../../../../assets/images/others/player1.png')} style={ThreePic.player1}/>
                              <View style={ThreePic.ProfileTable}>
                                <View style={ThreePic.row}>
                                  <Text style={ThreePic.username}>{player4?.username}</Text>
                                </View>
                                <View style={ThreePic.row}>
                                  <Text style={ThreePic.balance}>999,999,999</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        }     
                        {  
                          !player5 ? 
                            <View style={ThreePic.ThreePicGamePin5}>
                              {/* <TouchableOpacity onPress={() => closeOpenBetting()}> */}
                              <TouchableOpacity onPress={() => sitHandler(5)}>
                                <Image source={require('../../../../assets/images/others/button-sit.png')}/>
                              </TouchableOpacity>
                            </View>
                          :
                          <View style={[ThreePic.ThreePicGamePin5, ThreePic.SitTableBtm]}>
                            <View style={ThreePic.relative}>
                              {
                                banker == "player5" ? 
                                <Image source={require('../../../../assets/images/others/banker.png')} style={ThreePic.banker}/>
                                :
                                <></>
                              }
                              {
                                false ? 
                                <View style={{alignItems: 'flex-end', zIndex: 5, height: 25.05, marginTop: -60.5, transform: [{ translateX: -14 }]}}>
                                  <View style={{flexDirection: 'row'}}>
                                    <View style={{width: 17, height: 21,  marginTop: 2.2, transform: [{ rotate: '-15deg'}]}}>
                                      <Image source={images['11-heart']} style={ThreePic.cardImage}/>
                                    </View>
                                    <View style={{width: 17, height: 21, marginLeft: -1}}>
                                      <Image source={images['12-club']} style={ThreePic.cardImage}></Image>
                                    </View>
                                    <View style={{width: 17, height: 21, marginLeft: -1, marginTop: 2.2, transform: [{ rotate: '15deg'}]}}>
                                      <Image source={images['13-diamond']} style={ThreePic.cardImage}></Image>
                                    </View>
                                  </View>
                                </View>
                                :
                                <></>
                              }
                              {
                                false ?
                                <View style={[ThreePic.amountResultPlayer5, banker == "player5" ? ThreePic.amountResultPlayer8Banker : {}]}>
                                  <View style={ThreePic.amountDiv}>
                                    <Image source={require('../../../../assets/images/others/coin.png')} style={ThreePic.coin}/>
                                    <Text style={[ThreePic.amountText, ThreePic.negativeAmount]}>
                                      -2
                                    </Text>
                                  </View>
                                </View>
                                :
                                <></>
                              }
                              <Image source={require('../../../../assets/images/others/player1.png')} style={ThreePic.player1}/>
                              <View style={ThreePic.ProfileTable}>
                                <View style={ThreePic.row}>
                                  <Text style={ThreePic.username}>{player5?.username}</Text>
                                </View>
                                <View style={ThreePic.row}>
                                  <Text style={ThreePic.balance}>999,999,999</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        }   
                        {
                          !player6 ? 
                            <View style={ThreePic.ThreePicGamePin6}>
                              <TouchableOpacity onPress={() => sitHandler(6)}>
                                <Image source={require('../../../../assets/images/others/button-sit.png')}/>
                              </TouchableOpacity>
                            </View>
                          :
                          <View style={[ThreePic.ThreePicGamePin6, ThreePic.SitTable]}>
                            <View style={ThreePic.relative}>
                              {
                                banker == "player6" ? 
                                <Image source={require('../../../../assets/images/others/banker.png')} style={ThreePic.banker}/>
                                :
                                <></>
                              }
                              {
                                false ? 
                                <View style={{alignItems: 'flex-end', zIndex: 5, height: 25.05, marginTop: -8, transform: [{ translateX: +50.1+14 }]}}>
                                  <View style={{flexDirection: 'row'}}>
                                    <View style={{width: 17, height: 21,  marginTop: 2.2, transform: [{ rotate: '-15deg'}]}}>
                                      <Image source={images['11-heart']} style={ThreePic.cardImage}/>
                                    </View>
                                    <View style={{width: 17, height: 21, marginLeft: -1}}>
                                      <Image source={images['12-club']} style={ThreePic.cardImage}></Image>
                                    </View>
                                    <View style={{width: 17, height: 21, marginLeft: -1, marginTop: 2.2, transform: [{ rotate: '15deg'}]}}>
                                      <Image source={images['13-diamond']} style={ThreePic.cardImage}></Image>
                                    </View>
                                  </View>
                                </View>
                                :
                                <></>
                              }
                              {
                                false ?
                                <View style={[ThreePic.amountResult, banker == "player6" ? ThreePic.amountResultBanker : {}]}>
                                  <View style={ThreePic.amountDiv}>
                                    <Image source={require('../../../../assets/images/others/coin.png')} style={ThreePic.coin}/>
                                    <Text style={[ThreePic.amountText, ThreePic.positiveAmount]}>
                                      2
                                    </Text>
                                  </View>
                                </View>
                                :
                                <></>
                              }
                              <Image source={require('../../../../assets/images/others/player1.png')} style={ThreePic.player1}/>
                              <View style={ThreePic.ProfileTable}>
                                <View style={ThreePic.row}>
                                  <Text style={ThreePic.username}>{player6?.username}</Text>
                                </View>
                                <View style={ThreePic.row}>
                                  <Text style={ThreePic.balance}>999,999,999</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        } 
                        {
                          !player7 ? 
                            <View style={ThreePic.ThreePicGamePin7}>
                              <TouchableOpacity onPress={() => sitHandler(7)}>
                                <Image source={require('../../../../assets/images/others/button-sit.png')}/>
                              </TouchableOpacity>
                            </View>
                          :
                          <View style={[ThreePic.ThreePicGamePin7, ThreePic.SitTable]}>
                            <View style={ThreePic.relative}>
                              {
                                banker == "player7" ? 
                                <Image source={require('../../../../assets/images/others/banker.png')} style={ThreePic.banker}/>
                                :
                                <></>
                              }
                              {
                                false ? 
                                <View style={{alignItems: 'flex-end', zIndex: 5, height: 25.05, marginTop: 9, transform: [{ translateX: 50.1+14 }]}}>
                                  <View style={{flexDirection: 'row'}}>
                                    <View style={{width: 17, height: 21,  marginTop: 2.2, transform: [{ rotate: '-15deg'}]}}>
                                      <Image source={images['11-heart']} style={ThreePic.cardImage}/>
                                    </View>
                                    <View style={{width: 17, height: 21, marginLeft: -1}}>
                                      <Image source={images['12-club']} style={ThreePic.cardImage}></Image>
                                    </View>
                                    <View style={{width: 17, height: 21, marginLeft: -1, marginTop: 2.2, transform: [{ rotate: '15deg'}]}}>
                                      <Image source={images['13-diamond']} style={ThreePic.cardImage}></Image>
                                    </View>
                                  </View>
                                </View>
                                :
                                <></>
                              }
                              {
                                false ? 
                                <View style={[ThreePic.amountResult, banker == "player7" ? ThreePic.amountResultBanker : {}]}>
                                  <View style={ThreePic.amountDiv}>
                                    <Image source={require('../../../../assets/images/others/coin.png')} style={ThreePic.coin}/>
                                    <Text style={[ThreePic.amountText, ThreePic.positiveAmount]}>
                                      2
                                    </Text>
                                  </View>
                                </View>
                                :
                                <></>
                              }
                              <Image source={require('../../../../assets/images/others/player1.png')} style={ThreePic.player1}/>
                              <View style={ThreePic.ProfileTable}>
                                <View style={ThreePic.row}>
                                  <Text style={ThreePic.username}>{player7?.username}</Text>
                                </View>
                                <View style={ThreePic.row}>
                                  <Text style={ThreePic.balance}>999,999,999</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        }    
                        {
                          !player8 ? 
                            <View style={ThreePic.ThreePicGamePin8}>
                              <TouchableOpacity onPress={() => sitHandler(8)}>
                                <Image source={require('../../../../assets/images/others/button-sit.png')}/>
                              </TouchableOpacity>
                            </View>
                          :
                          <View style={[ThreePic.ThreePicGamePin8, ThreePic.SitTable]}>
                            <View style={ThreePic.relative}>
                              {
                                banker == "player8" ? 
                                <Image source={require('../../../../assets/images/others/banker.png')} style={ThreePic.banker}/>
                                :
                                <></>
                              }
                              {
                                false ?
                                <View style={{alignItems: 'flex-end', zIndex: 5, height: 25.05, marginTop: 42, transform: [{ translateX: 50.1+14 }]}}>
                                  <View style={{flexDirection: 'row'}}>
                                    <View style={{width: 17, height: 21,  marginTop: 2.2, transform: [{ rotate: '-15deg'}]}}>
                                      <Image source={images['11-heart']} style={ThreePic.cardImage}/>
                                    </View>
                                    <View style={{width: 17, height: 21, marginLeft: -1}}>
                                      <Image source={images['12-club']} style={ThreePic.cardImage}></Image>
                                    </View>
                                    <View style={{width: 17, height: 21, marginLeft: -1, marginTop: 2.2, transform: [{ rotate: '15deg'}]}}>
                                      <Image source={images['13-diamond']} style={ThreePic.cardImage}></Image>
                                    </View>
                                  </View>
                                </View>
                                :
                                <></>
                              }
                              {
                                false ?
                                <View style={[ThreePic.amountResult, banker == "player8" ? ThreePic.amountResultBanker : {}]}>
                                  <View style={ThreePic.amountDiv}>
                                    <Image source={require('../../../../assets/images/others/coin.png')} style={ThreePic.coin}/>
                                    <Text style={[ThreePic.amountText, ThreePic.positiveAmount]}>
                                      2
                                    </Text>
                                  </View>
                                </View>
                                :
                                <></>
                              }
                              <Image source={require('../../../../assets/images/others/player1.png')} style={ThreePic.player1}/>
                              <View style={ThreePic.ProfileTable}>
                                <View style={ThreePic.row}>
                                  <Text style={ThreePic.username}>{player8?.username}</Text>
                                </View>
                                <View style={ThreePic.row}>
                                  <Text style={ThreePic.balance}>999,999,999</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        }   
                      </View>
                  </View>
              </View>
            </View>
            <View style={ThreePic.emojiButton}>
              <View style={ThreePic.relative}>
                {/* <TouchableOpacity style={[ThreePic.absCenter, ThreePic.alertBtn]}> */}
                <TouchableOpacity style={{}}>
                  <Image source={require('../../../../assets/images/others/emoticon-btn.png')} style={ThreePic.alertButton}/>
                </TouchableOpacity>
              </View> 
            </View>
          </View>
        </ScrollView>
        <BottomNavigation home={() => navigate(ROUTES.PoseidonLobby)} setting={() => navigate(ROUTES.PoseidonAccount)} status={'game'} balance={balancePlayerGame}>
        </BottomNavigation>
      </View>
    </SafeAreaView>
  );
};
