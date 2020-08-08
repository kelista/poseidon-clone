import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import { ROUTES } from "../../../../routes";
import { WebSocketClient } from "../../../services/websocket"
import { playBacksound, stopBacksound } from '../../../services/sound_manager'
import { SafeAreaView } from 'react-native-safe-area-context';

export const PoseidonLobby: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const client = new WebSocketClient("ws://35.220.179.54:3021/events?token=asd");

  const logoutHandler = () => {
    stopBacksound()
    navigate(ROUTES.PoseidonLogin);
  };

  const accountHandler = () => {
    stopBacksound()
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
    <SafeAreaView>
      <ScrollView>
        <View>
          <View>
            <Text>This is Poseidon Lobby</Text>
          </View>
          <TouchableOpacity onPress={logoutHandler}>
            <Text>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={gameHandler}>
            <Text>Game</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={accountHandler}>
            <Text>Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
