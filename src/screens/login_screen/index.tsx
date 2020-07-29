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
      <View style={style.container}>
        <TouchableOpacity onPress={lobbyHandler} style={style.loginButton}>
          <Text style={style.welcome}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 18,
    paddingRight: 18
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center'
  },
  loginButton: {
    height: 44,
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: 'yellow'
  }
});