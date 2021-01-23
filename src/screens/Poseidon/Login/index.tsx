import React, { useEffect, useState, useContext, useRef, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  StatusBar,
  AsyncStorage,
  Keyboard,
  Dimensions,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { NavigationScreenComponent } from "react-navigation";
import LoginStyle from "../../../styles/LoginStyle";
import { CustomButton } from "../../../components/Button";
import { ROUTES } from "../../../../routes";
import { initBacksound, playBacksound } from "../../../services/sound_manager";
import Constants from "expo-constants";
import base from "../../../styles/base";
import axios from "axios";
import { SSContext } from "../../../../routes/simpleStoreContext";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export const PoseidonLogin: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const host = "http://34.101.158.255:5000";
  const path = host + "/login";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bottomPage, setBottomPage] = useState(false);

  const store = useContext(SSContext);

  const scrollView = useRef<any>(null);

  const lobbyHandler = () => {
    axios
      .post(path, { username: username.toLowerCase(), password })
      .then((response) => {
        store.token.setValue(response.data.token);
        Promise.all([AsyncStorage.setItem("token", response.data.token)]).then(
          () => {
            navigate(ROUTES.PoseidonLobby);
          }
        );
      })
      .catch((error) => {
        alert("Username / Password wrong");
        console.log(error)
      });
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", keyboardDidHide);
  }, []);

  const keyboardDidShow = () => {
    setBottomPage(true);
  };

  const keyboardDidHide = () => {
    setBottomPage(false);
  };

  const insets = useSafeAreaInsets();

  const loginContainer: any = useMemo(() => {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    return {
      flex: 1,
      height: windowHeight - (insets.bottom + insets.top),
      width: windowWidth,
      paddingTop: 42,
      backgroundColor: "#000000",
    };
  }, [insets]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <ScrollView
          ref={scrollView}
          onContentSizeChange={() =>
            scrollView?.current?.scrollToEnd({ animated: true })
          }
        >
          <View
            style={
              bottomPage
                ? LoginStyle.loginContainerFocus
                : { ...loginContainer }
            }
          >
            <View style={LoginStyle.loginImageWrapper}>
              <View style={LoginStyle.loginImage}>
                <Image
                  source={require("../../../assets/images/others/logo.png")}
                />
              </View>
            </View>
            <View style={LoginStyle.loginBoxWrapper}>
              <View style={LoginStyle.loginBox}>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#AEAEAE"
                  style={LoginStyle.loginInput}
                  value={username}
                  onChangeText={(e) => setUsername(e)}
                ></TextInput>
              </View>
              <View style={LoginStyle.loginBox}>
                <TextInput
                  placeholder="Password"
                  secureTextEntry={true}
                  placeholderTextColor="#AEAEAE"
                  style={LoginStyle.loginInput}
                  value={password}
                  onChangeText={(e) => setPassword(e)}
                ></TextInput>
              </View>
              <CustomButton
                title="Sign In"
                click={() => lobbyHandler()}
                type="login"
              ></CustomButton>
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
    textAlign: "center",
  },
});
