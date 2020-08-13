import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, StatusBar, AsyncStorage } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import LoginStyle from "../../../styles/LoginStyle"
import { CustomButton } from "../../../components/Button"
import { ROUTES } from "../../../../routes";  
import { initBacksound, playBacksound } from '../../../services/sound_manager'
import { SafeAreaView } from 'react-native-safe-area-context';
import base from '../../../styles/base';
import axios from 'axios';

export const PoseidonLogin: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const host = 'ws://35.220.179.54:3021'
  const path = host + "/login"
  const [username, setUsername] = useState("test")
  const [password, setPassword] = useState("test")

  const lobbyHandler = () => {
    axios.post(path, {username, password})
    .then((response) => {
      Promise.all([
        AsyncStorage.setItem("token", response.data.token)
      ])
        .then(() => {
          navigate(ROUTES.PoseidonLobby);
        })
    })
    .catch(() => {
      alert("Username / Password wrong")
    })
  };

  return (
    <SafeAreaView style={base.safeAreaView}>
      <StatusBar hidden />
      <ScrollView>
        <View style={LoginStyle.loginContainer}>
          <View style={LoginStyle.loginImageWrapper}>
            <View style={LoginStyle.loginImage}>
              <Image source={require('../../../assets/images/others/logo.png')} />
            </View>
          </View>
          <View style={LoginStyle.loginBoxWrapper}>
            <View style={LoginStyle.loginBox}>
              <TextInput 
                placeholder="Username" 
                placeholderTextColor="#AEAEAE" 
                style={LoginStyle.loginInput}
                value={username}
                onChangeText={e => setUsername(e)}
              ></TextInput>
            </View>
            <View style={LoginStyle.loginBox}>
              <TextInput 
                placeholder="Password" 
                secureTextEntry={true} 
                placeholderTextColor="#AEAEAE" 
                style={LoginStyle.loginInput}
                value={password}
                onChangeText={e => setPassword(e)}
              ></TextInput>
            </View>
            <CustomButton title="Sign In" click={() => lobbyHandler()} type="login"></CustomButton>
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