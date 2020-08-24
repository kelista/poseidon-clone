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
import skpStyle from "../../../../styles/SkpStyle"
import { CustomheaderLogo } from "../../../../components/HeaderLogo"
import { WSContext } from '../../../../../routes/wsContext';


export const PoseidonSkpRoom: NavigationScreenComponent<any, any> = (props) => {
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
      <CustomheaderLogo name="skp" lobby={() => lobbyHandler()}></CustomheaderLogo>
      <ScrollView>
        <StatusBar hidden />
        <View style={skpStyle.container}>
          <Image source={require('../../../../assets/images/others/home.png')}/>
          <CustomHeader title="Rockies07" status="userLobby"></CustomHeader>
          <View style={skpStyle.skpImageContainer}>
            <View style={skpStyle.skpImageWrapper}>
              <ImageBackground source={require('../../../../assets/images/others/skp-roombg.png')} style={skpStyle.skpImageBackground}></ImageBackground>
              <View style={skpStyle.skpRoomContainer}>
                <View style={skpStyle.skpRoomWrapper}>
                    <TouchableOpacity style={skpStyle.skpRoomRightPadding}>
                        <Image source={require('../../../../assets/images/others/room1-image.png')} style={{}}/>
                        <Text style={skpStyle.skpRoomBetText}>Min/Max: 10/2000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../../../../assets/images/others/room2-image.png')} style={{}}/>
                        <Text style={skpStyle.skpRoomBetText}>Min/Max: 10/2000</Text>
                    </TouchableOpacity>
                </View>
                <View style={skpStyle.skpRoomWrapper}>
                    <TouchableOpacity style={skpStyle.skpRoomRightPadding}>
                        <Image source={require('../../../../assets/images/others/room3-image.png')} style={{}}/>
                        <Text style={skpStyle.skpRoomBetText}>Min/Max: 10/2000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../../../../assets/images/others/room4-image.png')} style={{}}/>
                        <Text style={skpStyle.skpRoomBetText}>Min/Max: 10/2000</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        <View style={skpStyle.skpBlankSpace}></View>
        </View>
      </ScrollView>
      <BottomNavigation home={() => navigate(ROUTES.PoseidonLobby)} setting={() => navigate(ROUTES.PoseidonAccount)} status={'room'}>
      </BottomNavigation>
    </View>
  );
};
