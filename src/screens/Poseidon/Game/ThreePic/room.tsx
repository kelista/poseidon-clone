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
<<<<<<< HEAD
import { CustomheaderLogo } from "../../../../components/HeaderLogo"

=======
import { WSContext } from '../../../../../routes/wsContext';
>>>>>>> b5f5cb8786a598e7b3f5b9251594c59f6af0f781

export const PoseidonThreePicRoom: NavigationScreenComponent<any, any> = (props) => {
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
          <Image source={require('../../../../assets/images/others/home.png')}/>
          <CustomHeader title="Rockies07" status="userLobby"></CustomHeader>
          <View style={ThreePic.ThreePicImageContainer}>
            <View style={ThreePic.ThreePicImageWrapper}>
              <ImageBackground source={require('../../../../assets/images/others/skp-roombg.png')} style={ThreePic.ThreePicImageBackground}></ImageBackground>
              <View style={ThreePic.ThreePicRoomContainer}>
                <View style={ThreePic.ThreePicRoomWrapper}>
                    <TouchableOpacity style={ThreePic.ThreePicRoomRightPadding}>
                        <Image source={require('../../../../assets/images/others/room1-image.png')} style={{}}/>
                        <Text style={ThreePic.ThreePicRoomBetText}>Min/Max: 10/2000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
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
