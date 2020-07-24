import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import { ROUTES } from "../../../routes";

export const LoginScreen: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;

  const lobbyHandler = () => {
    navigate(ROUTES.RootLobby);
  };

  return (
    <ScrollView>
      <View>
        <TouchableOpacity onPress={lobbyHandler}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};