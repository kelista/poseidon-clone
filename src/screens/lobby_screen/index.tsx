import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import { ROUTES } from "../../../routes";

export const LobbyScreen: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;

  const loginHandler = () => {
    navigate(ROUTES.RootMain);
  };

  return (
    <ScrollView>
      <View>
        <View>
          <Text>This is Lobby</Text>
        </View>
        <TouchableOpacity onPress={loginHandler}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
