import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput,Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import BaseStyle from "../../styles/base"
import LoginStyle from "../../styles/LoginStyle"
import { CustomButton } from "../../components/Button"
import { ROUTES } from "../../../routes";
// import style from "../../styles/base";
import { initBacksound, playBacksound } from '../../services/sound_manager'
import { } from "../../services/websocket"

export const LoginScreen: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;

  const lobbyHandler = () => {
    navigate(ROUTES.RootLobby);
    // initWebsocket()
    playBacksound()
  };

  useEffect(() => {
    initBacksound()
  })

  const testAlert = () => {
    return alert('hello')
  }

  return (
    <ScrollView>
      <View style={LoginStyle.loginContainer}>
        <View style={LoginStyle.loginImageWrapper}>
          <View style={LoginStyle.loginImage}>
            <Image source={require('../../assets/images/others/poseidon-logo.png')} />
          </View>
          {/* <View style={LoginStyle.loginRedCircle}>
            <Image source={require('../../assets/images/others/red-circle.png')} style={{backgroundColor: 'blue'}}/>
          </View> */}
        </View>
        <View style={LoginStyle.loginBoxWrapper}>
          <View style={LoginStyle.loginBox}>
            <TextInput placeholder="Username" placeholderTextColor="#AEAEAE" style={LoginStyle.loginInput}></TextInput>
          </View>
          <View style={LoginStyle.loginBox}>
            <TextInput placeholder="Password" secureTextEntry={true} placeholderTextColor="#AEAEAE" style={LoginStyle.loginInput}></TextInput>
          </View>
          <CustomButton title="Sign In" click={() => lobbyHandler()}></CustomButton>
        </View>
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
