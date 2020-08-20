import React, { useEffect, useContext } from 'react';
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
import ThreePic from "../../../../styles/ThreePicStyle"
import { CustomheaderLogo } from "../../../../components/HeaderLogo"
import { WSContext } from '../../../../../routes/wsContext';

export const PoseidonThreePicGame: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const wsClient = useContext(WSContext)
  const lobbyGamesEvent = "lobby/games"
  const messageStr = JSON.stringify({ event: lobbyGamesEvent })

  const windowWidth = Dimensions.get('window').width;

  const lobbyHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonLobby);
  };

  const accountHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonAccount);
  };

  useEffect(function gameInit() {

  }, [])

  return (
    <View style={{flex: 1}}>
      {/* <CustomHeader title="Poseidon Club" status="lobby"></CustomHeader> */}
      <CustomheaderLogo name="threepic" lobby={() => lobbyHandler()}></CustomheaderLogo>
      <ScrollView>
        <StatusBar hidden />
        <View style={ThreePic.container}>
          <View style={ThreePic.ThreePicGameProfile}>
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
          </View>
          <View style={ThreePic.ThreePicGameCasinoChip}>
            <View style={ThreePic.ThreePicGameProfileWrapper}>
              <Image source={require('../../../../assets/images/others/casino-chip.png')} style={ThreePic.ThreePicGameCasinoChipImage}/>
              <Image source={require('../../../../assets/images/others/big-cointext.png')} style={ThreePic.ThreePicGameBalanceImageSquare}/>
              <Text style={ThreePic.ThreePicGameBalanceText}>999,999,999</Text>
            </View>
          </View>
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
                    <View style={ThreePic.ThreePicGamePin1}>
                      <TouchableOpacity>
                        <Image source={require('../../../../assets/images/others/button_pin.png')}/>
                      </TouchableOpacity>
                    </View>
                    <View style={ThreePic.ThreePicGamePin2}>
                      <TouchableOpacity>
                        <Image source={require('../../../../assets/images/others/button_pin.png')}/>
                      </TouchableOpacity>
                    </View>
                    <View style={ThreePic.ThreePicGamePin3}>
                      <TouchableOpacity>
                        <Image source={require('../../../../assets/images/others/button_pin.png')}/>
                      </TouchableOpacity>
                    </View>
                    <View style={ThreePic.ThreePicGamePin4}>
                      <TouchableOpacity>
                        <Image source={require('../../../../assets/images/others/button_pin.png')}/>
                      </TouchableOpacity>
                    </View>
                    <View style={ThreePic.ThreePicGamePin5}>
                      <TouchableOpacity>
                        <Image source={require('../../../../assets/images/others/button_pin.png')}/>
                      </TouchableOpacity>
                    </View>
                    <View style={ThreePic.ThreePicGamePin6}>
                      <TouchableOpacity>
                        <Image source={require('../../../../assets/images/others/button_pin.png')}/>
                      </TouchableOpacity>
                    </View>
                    <View style={ThreePic.ThreePicGamePin7}>
                      <TouchableOpacity>
                        <Image source={require('../../../../assets/images/others/button_pin.png')}/>
                      </TouchableOpacity>
                    </View>
                    <View style={ThreePic.ThreePicGamePin8}>
                      <TouchableOpacity>
                        <Image source={require('../../../../assets/images/others/button_pin.png')}/>
                      </TouchableOpacity>
                    </View>
                  </View>
              </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
