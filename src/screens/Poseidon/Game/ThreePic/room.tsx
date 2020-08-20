import React, { useEffect, useContext } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Image, ImageBackground } from 'react-native';
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

interface Room {
  _id: string;
  no: number;
  name: string;
  min: number;
  mid: number;
  max: number;
  cap: number;
}

// interface RoomGroup {
//   _id: string;
//   codename: string;
//   rooms: IRoom[];
// }

interface RoomsRequest {
  codename: string;
}

export const PoseidonThreePicRoom: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const wsClient = useContext(WSContext)
  const eventName = "lobby/rooms"
  const payload: RoomsRequest = { codename: "<game-codename>"}
  const messageStr = JSON.stringify({ event: eventName, data: payload });

  const lobbyHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonLobby);
  };

  const gameHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonThreePicGame);
  };

  useEffect(function ws() {
    wsClient?.addListener(eventName, async (data) => {
      console.log(data)
    })
    wsClient?.sendMessage(eventName, { message: messageStr })
  }, [])

  return (
    <View style={{flex: 1}}>
      {/* <CustomHeader title="Poseidon Club" status="lobby"></CustomHeader> */}
      <CustomheaderLogo name="threepic" lobby={() => lobbyHandler()}></CustomheaderLogo>
      <ScrollView>
        <StatusBar hidden />
        <View style={ThreePic.container}>
          <Image source={require('../../../../assets/images/others/home.png')}/>
          <CustomHeader title="Rockies07" status="userLobby"></CustomHeader>
          <View style={ThreePic.ThreePicImageContainer}>
            <View style={ThreePic.ThreePicImageWrapper}>
              <ImageBackground source={require('../../../../assets/images/others/skp-roombg.png')} style={ThreePic.ThreePicImageBackground}></ImageBackground>
              <View style={ThreePic.ThreePicRoomContainer}>
                <View style={ThreePic.ThreePicRoomWrapper}>
                    <TouchableOpacity style={ThreePic.ThreePicRoomRightPadding} onPress={() => gameHandler()}>
                        <Image source={require('../../../../assets/images/others/room1-image.png')} style={{}}/>
                        <Text style={ThreePic.ThreePicRoomBetText}>Min/Max: 10/2000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate(ROUTES.ThreePicGame2)}>
                        <Image source={require('../../../../assets/images/others/room2-image.png')} style={{}}/>
                        <Text style={ThreePic.ThreePicRoomBetText}>Min/Max: 10/2000</Text>
                    </TouchableOpacity>
                </View>
                <View style={ThreePic.ThreePicRoomWrapper}>
                    <TouchableOpacity style={ThreePic.ThreePicRoomRightPadding}>
                        <Image source={require('../../../../assets/images/others/room3-image.png')} style={{}}/>
                        <Text style={ThreePic.ThreePicRoomBetText}>Min/Max: 10/2000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../../../../assets/images/others/room4-image.png')} style={{}}/>
                        <Text style={ThreePic.ThreePicRoomBetText}>Min/Max: 10/2000</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        <View style={ThreePic.ThreePicBlankSpace}></View>
        </View>
      </ScrollView>
      <BottomNavigation 
      home={() => navigate(ROUTES.PoseidonLobby)} 
        setting={() => navigate(ROUTES.PoseidonAccount)}>
      </BottomNavigation>
    </View>
  );
};
