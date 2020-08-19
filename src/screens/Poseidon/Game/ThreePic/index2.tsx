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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ThreePicGame2: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const wsClient = useContext(WSContext);

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
          <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: 'black', width: '100%', height: '100%' }}>
            <View style={styles.containerBack}>
              { windowWidth >= 375 ? 
                <View style={styles.containerPin}>
                  <View style={styles.rel}>
                    <Image source={require('../../../../assets/images/others/table_big.png')} style={styles.table}/>
                    <Image source={require('../../../../assets/images/others/button_pin.png')} style={styles.pinPlayer1}/>

                    <Image source={require('../../../../assets/images/others/button_pin.png')} style={styles.pinPlayer2}/>
                    <Image source={require('../../../../assets/images/others/button_pin.png')} style={styles.pinPlayer3}/>
                    <Image source={require('../../../../assets/images/others/button_pin.png')} style={styles.pinPlayer4}/>

                    <Image source={require('../../../../assets/images/others/button_pin.png')} style={styles.pinPlayer5}/>

                    <Image source={require('../../../../assets/images/others/button_pin.png')} style={styles.pinPlayer6}/>
                    <Image source={require('../../../../assets/images/others/button_pin.png')} style={styles.pinPlayer7}/>
                    <Image source={require('../../../../assets/images/others/button_pin.png')} style={styles.pinPlayer8}/>
                  </View>
                </View>
                :
                <View style={styles.containerPinSmall}>
                  <View style={styles.rel}>
                    <Image source={require('../../../../assets/images/others/table.png')} style={styles.tableSmall}/>
                    <Image source={require('../../../../assets/images/others/button_pin_small.png')} style={styles.pinPlayer1Small}/>

                    <Image source={require('../../../../assets/images/others/button_pin_small.png')} style={styles.pinPlayer2Small}/>
                    <Image source={require('../../../../assets/images/others/button_pin_small.png')} style={styles.pinPlayer3Small}/>
                    <Image source={require('../../../../assets/images/others/button_pin_small.png')} style={styles.pinPlayer4Small}/>

                    <Image source={require('../../../../assets/images/others/button_pin_small.png')} style={styles.pinPlayer5Small}/>

                    <Image source={require('../../../../assets/images/others/button_pin_small.png')} style={styles.pinPlayer6Small}/>
                    <Image source={require('../../../../assets/images/others/button_pin_small.png')} style={styles.pinPlayer7Small}/>
                    <Image source={require('../../../../assets/images/others/button_pin_small.png')} style={styles.pinPlayer8Small}/>
                  </View>
                </View>
              }
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBack: {
    height: windowHeight-53,
    width: "100%",
    maxWidth: 375,
    backgroundColor: "black",
    position: 'relative'
  },
  rel: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'red'
  },
  containerPin: {
    height: 584,
    width: 361,
    backgroundColor: "black",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -180.5 },
      { translateY: -292 }
    ]
  },
  containerPinSmall: {
    height: 537,
    width: 331,
    backgroundColor: "black",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -165.5 },
      { translateY: -266.5 }
    ]
  },
  table: {
    position: 'absolute',
    zIndex: 2,
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -180.5 },
      { translateY: -292 }
    ]
  },
  tableSmall: {
    position: 'absolute',
    zIndex: 2,
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -165.5 },
      { translateY: -266.5 }
    ]
  },
  pinPlayer1: {
    position: 'absolute',
    left: '50%',
    top: -5,
    zIndex: 3,
    transform: [
      { translateX: -33.5 }
    ]
  },
  pinPlayer2: {
    position: 'absolute',
    right: 16,
    top: '21%',
    zIndex: 3,
    transform: [
      { translateY: -32.5 }
    ]
  },
  pinPlayer3: {
    position: 'absolute',
    right: 16,
    top: '45%',
    zIndex: 3,
    transform: [
      { translateY: -32.5 }
    ]
  },
  pinPlayer4: {
    position: 'absolute',
    right: 16,
    top: '73%',
    zIndex: 3,
    transform: [
      { translateY: -32.5 }
    ]
  },
  pinPlayer5: {
    position: 'absolute',
    left: '50%',
    bottom: -10,
    zIndex: 3,
    transform: [
      { translateX: -33.5 }
    ]
  },
  pinPlayer6: {
    position: 'absolute',
    left: 16,
    top: '21%',
    zIndex: 3,
    transform: [
      { translateY: -32.5 }
    ]
  },
  pinPlayer7: {
    position: 'absolute',
    left: 16,
    top: '45%',
    zIndex: 3,
    transform: [
      { translateY: -32.5 }
    ]
  },
  pinPlayer8: {
    position: 'absolute',
    left: 16,
    top: '73%',
    zIndex: 3,
    transform: [
      { translateY: -32.5 }
    ]
  },
  pinPlayer1Small: {
    position: 'absolute',
    left: '50%',
    top: -3,
    zIndex: 3,
    transform: [
      { translateX: -31.5 }
    ]
  },
  pinPlayer2Small: {
    position: 'absolute',
    right: 14,
    top: '21%',
    zIndex: 3,
    transform: [
      { translateY: -30 }
    ]
  },
  pinPlayer3Small: {
    position: 'absolute',
    right: 14,
    top: '45%',
    zIndex: 3,
    transform: [
      { translateY: -30 }
    ]
  },
  pinPlayer4Small: {
    position: 'absolute',
    right: 14,
    top: '74%',
    zIndex: 3,
    transform: [
      { translateY: -30 }
    ]
  },
  pinPlayer5Small: {
    position: 'absolute',
    left: '50%',
    bottom: -8,
    zIndex: 3,
    transform: [
      { translateX: -31.5 }
    ]
  },
  pinPlayer6Small: {
    position: 'absolute',
    left: 14,
    top: '21%',
    zIndex: 3,
    transform: [
      { translateY: -30 }
    ]
  },
  pinPlayer7Small: {
    position: 'absolute',
    left: 14,
    top: '45%',
    zIndex: 3,
    transform: [
      { translateY: -30 }
    ]
  },
  pinPlayer8Small: {
    position: 'absolute',
    left: 14,
    top: '74%',
    zIndex: 3,
    transform: [
      { translateY: -30 }
    ]
  }
})
