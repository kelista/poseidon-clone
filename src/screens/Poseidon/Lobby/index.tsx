import React, { useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import { ROUTES } from "../../../../routes";
import { WebSocketClient } from "../../../services/websocket"
import { playBacksound, stopBacksound } from '../../../services/sound_manager'
import { CustomHeader } from "../../../components/Header"
import { BottomNavigation } from "../../../components/BottomNavigation"
import LobbyStyle from "../../../styles/LobbyStyle"


export const PoseidonLobby: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const client = new WebSocketClient("ws://35.220.179.54:3021/events?token=asd");

  const logoutHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonLogin);
  };

  const accountHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonAccount);
  };

  const gameHandler = () => {
    // navigate(ROUTES.RootGame1);
    client.sendMessage("thanks", { message: "terimakasih udah kasih lobby/rooms" });
    
  };

  useEffect(() => {
    client.connect(
      () => {
        console.log("connected boi");
      },
      () => {
        console.log("remove dari client");
      }
    );
    client.addListener("echo", async (data) => {
      console.log("ini echo ", data);
    });
    client.addListener("lobby/rooms", async (data) => {
      console.log("ini rooms", data);
    });
  })

  return (
    <View style={{flex: 1}}>
      <CustomHeader title="Poseidon Club" status="lobby"></CustomHeader>
      <ScrollView>
        <StatusBar hidden />
        <View style={LobbyStyle.container}>
          <Image source={require('../../../assets/images/others/home.png')}/>
          <CustomHeader title="Rockies07" status="userLobby"></CustomHeader>
        </View>
      </ScrollView>
      <BottomNavigation 
        home={() => navigate(ROUTES.PoseidonLobby)} 
        setting={() => navigate(ROUTES.PoseidonAccount)}>
      </BottomNavigation>
    </View>
  );
};
