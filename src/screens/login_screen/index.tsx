import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import BaseStyle from "../../styles/base"
import LoginStyle from "../../styles/LoginStyle"
import { CustomButton } from "../../components/Button"
import { ROUTES } from "../../../routes";

export const LoginScreen: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;

  const lobbyHandler = () => {
    navigate(ROUTES.RootLobby);
  };

  const testAlert = () => {
    return alert('hello')
  }
  
  return (
    <ScrollView>
      <View style={BaseStyle.container}>
        <View style={LoginStyle.loginContainer}>
          <TextInput placeholder="Username" placeholderTextColor="#000000" style={LoginStyle.loginInput}></TextInput>
        </View>
        <View style={LoginStyle.loginContainer}>
          <TextInput placeholder="Password" placeholderTextColor="#000000" style={LoginStyle.loginInput}></TextInput>
        </View>
        <CustomButton title="Login" click={() => lobbyHandler()}></CustomButton>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center'
  },
});