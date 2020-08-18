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

export const ThreePicGame2: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const wsClient = useContext(WSContext)

  const lobbyHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonLobby);
  };

  const accountHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonAccount);
  };

  const gameHandler = () => {
    // navigate(ROUTES.RootGame1);
    wsClient?.sendMessage("thanks", { message: "terimakasih udah kasih lobby/rooms" });
  };

  return (
    <View style={{flex: 1}}>
      {/* <CustomHeader title="Poseidon Club" status="lobby"></CustomHeader> */}
      <CustomheaderLogo name="threepic" lobby={() => lobbyHandler()}></CustomheaderLogo>
      <ScrollView>
        <StatusBar hidden />
        <View style={ThreePic.container}>
          <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: 'blue', width: '100%', height: '100%' }}>
            <View style={styles.containerBack}>
              <Image source={require('../../../../assets/images/others/table.png')} style={{}}/>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  containerBack: {
    height: windowHeight-53,
    width: "100%",
    maxWidth: 375,
    backgroundColor: "yellow",
    justifyContent: "center", 
    alignItems: "center"
  }
})
