import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import { ROUTES } from "../../../routes";
import style from "../../styles/base"
import { initBacksound, playBacksound } from '../../services/sound_manager'

export const LoginScreen: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;

  const lobbyHandler = () => {
    navigate(ROUTES.RootLobby);
    playBacksound()
  };

  useEffect(() => {
    initBacksound()
  })

  return (
    <ScrollView>
      <View style={style.container}>
        <TouchableOpacity onPress={lobbyHandler} style={style.loginButton}>
          <Text style={style.welcome}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};