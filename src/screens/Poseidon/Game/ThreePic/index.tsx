import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Image, ImageBackground, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import { ROUTES } from "../../../../../routes";
import { WebSocketClient } from "../../../../services/websocket"
import { playBacksound, stopBacksound } from '../../../../services/sound_manager'
import { CustomHeader } from "../../../../components/Header"
import { BottomNavigation } from "../../../../components/BottomNavigation"
import { CheckInWindow } from "../../../../components/CheckIn"
import { BettingWindow } from "../../../../components/Betting"
import ThreePic from "../../../../styles/ThreePicStyle"
import { CustomheaderLogo } from "../../../../components/HeaderLogo"
import { WSContext } from '../../../../../routes/wsContext';

export const PoseidonThreePicGame: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const [modalCheckIn, setModalCheckIn] = useState(true);
  const [banker, setBanker] = useState("");
  const [sitStatus, setSitStatus] = useState("");
  const [amount, setAmount] = useState(0);
  const [modalBetting, setModalBetting] = useState(false);
  const wsClient = useContext(WSContext)

  const windowWidth = Dimensions.get('window').width;

  const lobbyHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonLobby);
  };

  const accountHandler = () => {
    // stopBacksound()
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
  

  const gameHandler = () => {
    // navigate(ROUTES.RootGame1);
    wsClient?.sendMessage("thanks", { message: "terimakasih udah kasih lobby/rooms" });
  };

  useEffect(function gameInit() {
    setBanker("player1")
  }, [])

  return (
    <View style={{flex: 1}}>
      {/* <CustomHeader title="Poseidon Club" status="lobby"></CustomHeader> */}
      <CustomheaderLogo name="threepic" lobby={() => lobbyHandler()}></CustomheaderLogo>
      <ScrollView>
        <View style={ThreePic.relative}>
          <View style={ThreePic.infoButton}>
            <View style={ThreePic.relative}>
              <TouchableOpacity style={[ThreePic.absCenter, ThreePic.alertBtn]}>
                <Image source={require('../../../../assets/images/others/alert-btn.png')} style={ThreePic.alertButton}/>
              </TouchableOpacity>
            </View> 
          </View>
          <StatusBar hidden />
          {
            modalCheckIn ?
            <CheckInWindow close={() => closeOpenCheckIn()} buyIn={() => buyIn() }/>
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
                    </View>
                    <Image source={require('../../../../assets/images/others/table.png')} style={ThreePic.ThreePicGameTableImage}/>
                    <View style={ThreePic.ThreePicGamePinWrapper}>
                      {
                        sitStatus != "player1" ? 
                          <View style={ThreePic.ThreePicGamePin1}>
                            <TouchableOpacity onPress={() => setSitStatus("player1")}>
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
                            <View style={[ThreePic.amountResultPlayer1, banker == "player1" ? ThreePic.amountResultPlayer1Banker : {}]}>
                              <View style={ThreePic.amountDiv}>
                                <Image source={require('../../../../assets/images/others/coin.png')} style={ThreePic.coin}/>
                                <Text style={[ThreePic.amountText, ThreePic.negativeAmount]}>
                                  -2
                                </Text>
                              </View>
                            </View>
                            <Image source={require('../../../../assets/images/others/player1.png')} style={ThreePic.player1}/>
                            <View style={ThreePic.ProfileTable}>
                              <View style={ThreePic.row}>
                                <Text style={ThreePic.username}>Wyvern</Text>
                              </View>
                              <View style={ThreePic.row}>
                                <Text style={ThreePic.balance}>999,999,999</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      }     
                      {
                        sitStatus != "player2" ? 
                          <View style={ThreePic.ThreePicGamePin2}>
                            <TouchableOpacity onPress={() => setSitStatus("player2")}>
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
                            <View style={[ThreePic.amountResult, banker == "player2" ? ThreePic.amountResultBanker : {}]}>
                              <View style={ThreePic.amountDiv}>
                                <Image source={require('../../../../assets/images/others/coin.png')} style={ThreePic.coin}/>
                                <Text style={[ThreePic.amountText, ThreePic.positiveAmount]}>
                                  2
                                </Text>
                              </View>
                            </View>
                            <Image source={require('../../../../assets/images/others/player1.png')} style={ThreePic.player1}/>
                            <View style={ThreePic.ProfileTable}>
                              <View style={ThreePic.row}>
                                <Text style={ThreePic.username}>Wyvern</Text>
                              </View>
                              <View style={ThreePic.row}>
                                <Text style={ThreePic.balance}>999,999,999</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      }     
                      {
                        sitStatus != "player3" ? 
                          <View style={ThreePic.ThreePicGamePin3}>
                            <TouchableOpacity onPress={() => setSitStatus("player3")}>
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
                            <View style={[ThreePic.amountResult, banker == "player3" ? ThreePic.amountResultBanker : {}]}>
                              <View style={ThreePic.amountDiv}>
                                <Image source={require('../../../../assets/images/others/coin.png')} style={ThreePic.coin}/>
                                <Text style={[ThreePic.amountText, ThreePic.positiveAmount]}>
                                  2
                                </Text>
                              </View>
                            </View>
                            <Image source={require('../../../../assets/images/others/player1.png')} style={ThreePic.player1}/>
                            <View style={ThreePic.ProfileTable}>
                              <View style={ThreePic.row}>
                                <Text style={ThreePic.username}>Wyvern</Text>
                              </View>
                              <View style={ThreePic.row}>
                                <Text style={ThreePic.balance}>999,999,999</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      }     
                      {
                        sitStatus != "player4" ? 
                          <View style={ThreePic.ThreePicGamePin4}>
                            <TouchableOpacity onPress={() => setSitStatus("player4")}>
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
                            <View style={[ThreePic.amountResult, banker == "player4" ? ThreePic.amountResultBanker : {}]}>
                              <View style={ThreePic.amountDiv}>
                                <Image source={require('../../../../assets/images/others/coin.png')} style={ThreePic.coin}/>
                                <Text style={[ThreePic.amountText, ThreePic.positiveAmount]}>
                                  2
                                </Text>
                              </View>
                            </View>
                            <Image source={require('../../../../assets/images/others/player1.png')} style={ThreePic.player1}/>
                            <View style={ThreePic.ProfileTable}>
                              <View style={ThreePic.row}>
                                <Text style={ThreePic.username}>Wyvern</Text>
                              </View>
                              <View style={ThreePic.row}>
                                <Text style={ThreePic.balance}>999,999,999</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      }     
                      {
                        sitStatus != "player5" ? 
                          <View style={ThreePic.ThreePicGamePin5}>
                            <TouchableOpacity onPress={() => setSitStatus("player5")}>
                              <Image source={require('../../../../assets/images/others/button-sit.png')}/>
                            </TouchableOpacity>
                          </View>
                        :
                        <View style={[ThreePic.ThreePicGamePin5, ThreePic.SitTable]}>
                          <View style={ThreePic.relative}>
                            {
                              banker == "player5" ? 
                              <Image source={require('../../../../assets/images/others/banker.png')} style={ThreePic.banker}/>
                              :
                              <></>
                            }
                            <View style={[ThreePic.amountResult, banker == "player5" ? ThreePic.amountResultBanker : {}]}>
                              <View style={ThreePic.amountDiv}>
                                <Image source={require('../../../../assets/images/others/coin.png')} style={ThreePic.coin}/>
                                <Text style={[ThreePic.amountText, ThreePic.positiveAmount]}>
                                  2
                                </Text>
                              </View>
                            </View>
                            <Image source={require('../../../../assets/images/others/player1.png')} style={ThreePic.player1}/>
                            <View style={ThreePic.ProfileTable}>
                              <View style={ThreePic.row}>
                                <Text style={ThreePic.username}>Wyvern</Text>
                              </View>
                              <View style={ThreePic.row}>
                                <Text style={ThreePic.balance}>999,999,999</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      }     
                      {
                        sitStatus != "player6" ? 
                          <View style={ThreePic.ThreePicGamePin6}>
                            <TouchableOpacity onPress={() => setSitStatus("player6")}>
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
                            <View style={[ThreePic.amountResult, banker == "player6" ? ThreePic.amountResultBanker : {}]}>
                              <View style={ThreePic.amountDiv}>
                                <Image source={require('../../../../assets/images/others/coin.png')} style={ThreePic.coin}/>
                                <Text style={[ThreePic.amountText, ThreePic.positiveAmount]}>
                                  2
                                </Text>
                              </View>
                            </View>
                            <Image source={require('../../../../assets/images/others/player1.png')} style={ThreePic.player1}/>
                            <View style={ThreePic.ProfileTable}>
                              <View style={ThreePic.row}>
                                <Text style={ThreePic.username}>Wyvern</Text>
                              </View>
                              <View style={ThreePic.row}>
                                <Text style={ThreePic.balance}>999,999,999</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      }   
                      {  
                        sitStatus != "player7" ? 
                          <View style={ThreePic.ThreePicGamePin7}>
                            <TouchableOpacity onPress={() => setSitStatus("player7")}>
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
                            <View style={[ThreePic.amountResult, banker == "player7" ? ThreePic.amountResultBanker : {}]}>
                              <View style={ThreePic.amountDiv}>
                                <Image source={require('../../../../assets/images/others/coin.png')} style={ThreePic.coin}/>
                                <Text style={[ThreePic.amountText, ThreePic.positiveAmount]}>
                                  2
                                </Text>
                              </View>
                            </View>
                            <Image source={require('../../../../assets/images/others/player1.png')} style={ThreePic.player1}/>
                            <View style={ThreePic.ProfileTable}>
                              <View style={ThreePic.row}>
                                <Text style={ThreePic.username}>Wyvern</Text>
                              </View>
                              <View style={ThreePic.row}>
                                <Text style={ThreePic.balance}>999,999,999</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      }     
                      {  
                        sitStatus != "player8" ? 
                          <View style={ThreePic.ThreePicGamePin8}>
                            <TouchableOpacity onPress={() => setSitStatus("player8")}>
                              <Image source={require('../../../../assets/images/others/button-sit.png')}/>
                            </TouchableOpacity>
                          </View>
                        :
                        <View style={[ThreePic.ThreePicGamePin8, ThreePic.SitTableBtm]}>
                          <View style={ThreePic.relative}>
                            {
                              banker == "player8" ? 
                              <Image source={require('../../../../assets/images/others/banker.png')} style={ThreePic.banker}/>
                              :
                              <></>
                            }
                            <View style={[ThreePic.amountResultPlayer8, banker == "player8" ? ThreePic.amountResultPlayer8Banker : {}]}>
                              <View style={ThreePic.amountDiv}>
                                <Image source={require('../../../../assets/images/others/coin.png')} style={ThreePic.coin}/>
                                <Text style={[ThreePic.amountText, ThreePic.negativeAmount]}>
                                  -2
                                </Text>
                              </View>
                            </View>
                            <Image source={require('../../../../assets/images/others/player1.png')} style={ThreePic.player1}/>
                            <View style={ThreePic.ProfileTable}>
                              <View style={ThreePic.row}>
                                <Text style={ThreePic.username}>Bla</Text>
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
              <TouchableOpacity style={[ThreePic.absCenter, ThreePic.alertBtn]}>
                <Image source={require('../../../../assets/images/others/emoticon-btn.png')} style={ThreePic.alertButton}/>
              </TouchableOpacity>
            </View> 
          </View>
        </View>
      </ScrollView>
      <BottomNavigation home={() => navigate(ROUTES.PoseidonLobby)} setting={() => navigate(ROUTES.PoseidonAccount)} status={'game'}>
      </BottomNavigation>
    </View>
  );
};
