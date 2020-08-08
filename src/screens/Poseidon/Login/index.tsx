import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput,Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import BaseStyle from "../../../styles/base"
import LoginStyle from "../../../styles/LoginStyle"
import { CustomButton } from "../../../components/Button"
import { ROUTES } from "../../../../routes";
import { initBacksound, playBacksound } from '../../../services/sound_manager'
import { SafeAreaView } from 'react-native-safe-area-context';
import base from '../../../styles/base';

export const PoseidonLogin: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;

  const lobbyHandler = () => {
    navigate(ROUTES.PoseidonLobby);
    // playBacksound()
  };

  useEffect(() => {
    initBacksound()
  })

  const testAlert = () => {
    return alert('hello')
  }

  return (
    <SafeAreaView style={base.safeAreaView}>
      <ScrollView>
        <View style={LoginStyle.loginContainer}>
          <View style={LoginStyle.loginImageWrapper}>
            <View style={LoginStyle.loginImage}>
              <Image source={require('../../../assets/images/others/logo.png')} />
            </View>
          </View>
          <View style={LoginStyle.loginBoxWrapper}>
            <View style={LoginStyle.loginBox}>
              <TextInput placeholder="Username" placeholderTextColor="#000000" style={LoginStyle.loginInput}></TextInput>
            </View>
            <View style={LoginStyle.loginBox}>
              <TextInput placeholder="Password" placeholderTextColor="#000000" style={LoginStyle.loginInput}></TextInput>
            </View>
            <CustomButton title="Sign In" click={() => lobbyHandler()}></CustomButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center'
  },
});