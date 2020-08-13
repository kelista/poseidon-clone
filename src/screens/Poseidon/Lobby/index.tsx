import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Image, ImageBackground, AsyncStorage } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import { ROUTES } from "../../../../routes";
import { BSContext } from "../../../../routes/bsContext";
import { WebSocketClient } from "../../../services/websocket"
import { initBacksound } from '../../../services/sound_manager'
import { CustomHeader } from "../../../components/Header"
import { BottomNavigation } from "../../../components/BottomNavigation"
import LobbyStyle from "../../../styles/LobbyStyle"
import { Backsound } from "../../../services/soundServices"

export const PoseidonLobby: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;

  const [wsClient, setWsClient] = useState<WebSocketClient>();
  const bs = useContext(BSContext);

  useEffect(function cb() {
    AsyncStorage.getItem("token").then(token => {
      const client = new WebSocketClient("ws://35.220.179.54:3021/events?token="+token);

      setWsClient(client);
  
      wsClient?.connect(
        () => {
          console.log("connected boi");
        },
        () => {
          console.log("remove dari client");
        }
      );
  
      wsClient?.addListener("echo", async (data) => {
        console.log("ini echo ", data);
      });
  
      wsClient?.addListener("lobby/rooms", async (data) => {
        console.log("ini rooms", data);
      });
    })


  }, []);

  // start sound
  useEffect(function bsEffect()  {
      bs?.start();
      
      return function unmount() {
        bs?.stop();
      }
  }, [bs ? true : false]);

  const skpGameRoom = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonSkpRoom);
  };

  const threePicGameROom = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonThreePicRoom);
  };

  const hold = () => {
    // navigate(ROUTES.RootGame1);
    wsClient?.sendMessage("thanks", { message: "terimakasih udah kasih lobby/rooms" });
    
  };


  return (
    <View style={{flex: 1}}>
      <CustomHeader title="Poseidon Club" status="lobby"></CustomHeader>
      <ScrollView>
        <StatusBar hidden />
        <View style={LobbyStyle.container}>
          <Image source={require('../../../assets/images/others/home.png')}/>
          <CustomHeader title="Rockies07" status="userLobby"></CustomHeader>
          <View style={LobbyStyle.lobbyImageContainer}>
            <View style={LobbyStyle.lobbyImageWrapper}>
              <ImageBackground source={require('../../../assets/images/others/background-revision.png')} style={LobbyStyle.lobbyImageBackground}></ImageBackground>
              <View style={LobbyStyle.lobbyGameWrapper}>
                <View style={LobbyStyle.lobbyGameSkpWrapper}>
                  <TouchableOpacity onPress={skpGameRoom}>
                    <Image source={require('../../../assets/images/others/skp-image.png')} style={LobbyStyle.lobbyGameSkp}/>
                  </TouchableOpacity>
                </View>
                <View style={LobbyStyle.lobbyGameThreePicWrapper}>
                  <TouchableOpacity onPress={threePicGameROom}>
                    <Image source={require('../../../assets/images/others/3pic-image.png')} style={LobbyStyle.lobbyGameThreePic}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomNavigation 
      home={() => navigate(ROUTES.PoseidonLobby)} 
        setting={() => navigate(ROUTES.PoseidonAccount)}>
      </BottomNavigation>
    </View>
  );
};
