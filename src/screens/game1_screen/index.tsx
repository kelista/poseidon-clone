import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import { ROUTES } from "../../../routes";

export const Game1Screen: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;

  const lobbyHandler = () => {
    navigate(ROUTES.RootLobby);
  };

  const loginHandler = () => {
    navigate(ROUTES.RootMain);
  };

  return (
    <ScrollView>
      <View>
        <View>
          <Text>This is Game </Text>
        </View>
        <TouchableOpacity onPress={lobbyHandler}>
          <Text>lobby</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={loginHandler}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
