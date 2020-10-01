import React, { useEffect, useState, useContext, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Image, StatusBar, AsyncStorage, Keyboard } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import LoginStyle from "../../../styles/LoginStyle"
import { CustomButton } from "../../../components/Button"
import { ROUTES } from "../../../../routes";
import { initBacksound, playBacksound } from '../../../services/sound_manager'
import Constants from "expo-constants";
import base from '../../../styles/base';
import axios from 'axios';
import { SSContext } from "../../../../routes/simpleStoreContext";
import { SafeAreaView } from 'react-native-safe-area-context';

export const PoseidonLogin: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const host = 'http://35.197.156.255:5000'
  const path = host + "/login"
  const [username, setUsername] = useState("rabbit")
  const [password, setPassword] = useState("rabbit")
  const [bottomPage, setBottomPage] = useState(false)

  const store = useContext(SSContext);

  const scrollView = useRef(null)

  const lobbyHandler = () => {
    axios.post(path, { username, password })
      .then((response) => {
        store.token.setValue(response.data.token);
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

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', keyboardDidHide)
  }, [])

  const keyboardDidShow = () => {
    setBottomPage(true)
  }

  const keyboardDidHide = () => {
    setBottomPage(false)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" />
      <View style={{flex: 1}}>
        <StatusBar hidden />
        <ScrollView ref={scrollView}>
          <View style={bottomPage ? LoginStyle.loginContainerFocus : LoginStyle.loginContainer}>
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
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center'
  },
});