import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { BSContext } from "../../../../routes/bsContext";
import { NavigationScreenComponent } from "react-navigation";
import { ROUTES } from "../../../../routes";
import { WebSocketClient } from "../../../services/websocket";
import { playBacksound, stopBacksound } from "../../../services/sound_manager";
import AccountStyle from "../../../styles/AccountStyle";

import { CustomButton } from "../../../components/Button";
import { CustomheaderLogo } from "../../../components/HeaderLogo";
import { BottomNavigation } from "../../../components/BottomNavigation";
import { WSContext } from "../../../../routes/wsContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatementInfo } from "../../../components/Statement";
import * as ImagePicker from 'expo-image-picker';

import Svg, { Path } from "react-native-svg";

const infoEvent = "info";

export const PoseidonAccount: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const [toggle, setToggle] = useState(true);
  const [username, setUsername] = useState("");
  const [balancePlayer, setBalancePlayer] = useState(0);
  const [idPlayer, setIdPlayer] = useState("");
  const [modalStatement, setModalStatement] = useState(false);
  const [image, setImage] = useState("");

  const wsClient = useContext(WSContext);

  const bs = useContext(BSContext);

  const lobbyHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonLobby);
  };

  const logoutHandler = () => {
    wsClient?.disconnect()
  };

  const updateProfileHandler = async () => {
    // navigate(ROUTES.PoseidonProfile);

    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      alert("Sorry, we need permissions to change profile picture");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1
      });
  
      console.log(result)
  
      if (!result.cancelled) {
        setImage(result.uri)
      }
    }
  };

  const goToSetting = () => {
    setModalStatement(false);
    navigate(ROUTES.PoseidonAccount);
  };

  const goToHome = () => {
    setModalStatement(false);
    navigate(ROUTES.PoseidonLobby);
  };

  const separatorBalance = (chip: number) => {
    return chip.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(
    function cb() {
      if (!wsClient) return;
      const listeners: string[] = [];

      const infoAction = async function (data: any) {
        setUsername(data.username);
        setBalancePlayer(data.balance);
        setIdPlayer(data.meb_id);
      };

      const infoListener = wsClient.addListener(infoEvent, infoAction);
      listeners.push(infoListener);

      return () => {
        listeners.map((lst) => {
          wsClient?.removeListener(lst);
        });
      };
    },
    [wsClient ? true : false]
  );

  const toggleClick = () => {
    if (toggle) {
      bs?.pause().then(() => {
        setToggle(!toggle); // ini apa
      });
    } else {
      bs?.start().then(() => {
        setToggle(!toggle);
      });
    }
  };

  const closeOpenStatement = () => {
    setModalStatement(!modalStatement);
  };

  useEffect(() => {
    console.log(bs?.getStatus());
    if (bs?.getStatus() == "play") {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, []);

  useEffect(function gameInit() {
    wsClient?.sendMessage(infoEvent, {});
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <CustomheaderLogo
          name="account"
          lobby={() => lobbyHandler()}
        ></CustomheaderLogo>
        <ScrollView>
          <StatusBar hidden />
          {modalStatement ? <StatementInfo></StatementInfo> : <></>}
          <View style={AccountStyle.accountContainer}>
            <View style={AccountStyle.accountImageContainer}>
              <View style={AccountStyle.accountImageWrapper}>
                {
                  !image ?
                  <Image
                    source={require("../../../assets/images/others/Sample.png")}
                    style={AccountStyle.accountImage}
                  />
                  :
                  <Image
                    source={{ uri: image }}
                    style={AccountStyle.accountImage}
                  />
                }
              </View>
              <View style={AccountStyle.accountPencilWrapper}>
                <TouchableOpacity style={AccountStyle.accountPencilClick} onPress={() => updateProfileHandler()}>
                  <Image
                    source={require("../../../assets/images/others/pencil-update.png")}
                    style={AccountStyle.accountPencilImage}
                  />
                  <Text style={AccountStyle.accountPencilText}>
                    Update Photo
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={AccountStyle.accountUser}>
              <Text style={AccountStyle.accountUserName}>{username}</Text>
              <Text style={AccountStyle.accountUserId}>ID: {idPlayer}</Text>
              <View style={AccountStyle.accountUserBalance}>
                <Image
                  source={require("../../../assets/images/others/balance-image.png")}
                />
                <Text style={AccountStyle.accountUserBalanceText}>
                  {separatorBalance(balancePlayer)}
                </Text>
              </View>
            </View>
            <View style={AccountStyle.accountMenuContainer}>
              <View style={AccountStyle.accountMenuWrapper}>
                <View style={AccountStyle.accountMenu}>
                  <TouchableOpacity
                    style={AccountStyle.accountButton}
                    onPress={() => navigate(ROUTES.PoseidonChangePass)}
                  >
                    <Image
                      source={require("../../../assets/images/others/lock-menu.png")}
                      style={AccountStyle.accountMenuImage_Lock}
                    />
                    <Text style={AccountStyle.accountMenuText}>
                      Change Password
                    </Text>
                    <Svg
                      width={6.502}
                      height={10.53}
                      viewBox="0 0 6.502 10.53"
                      style={AccountStyle.accountMenuArrow}
                    >
                      <Path
                        data-name="Icon material-expand-more"
                        d="M0 1.237l4.015 4.028-4.019 4.028 1.241 1.237 5.265-5.265L1.237 0z"
                        fill="#e6e6e6"
                      />
                    </Svg>
                  </TouchableOpacity>
                </View>
                <View style={AccountStyle.accountMenu}>
                  <View style={AccountStyle.accountButton}>
                    <Image
                      source={require("../../../assets/images/others/sound-menu.png")}
                      style={AccountStyle.accountMenuImage}
                    />
                    <Text style={AccountStyle.accountMenuText}>
                      BGM / Sounds
                    </Text>
                    <View style={AccountStyle.accountMenuToogle}>
                      <TouchableOpacity onPress={toggleClick}>
                        {toggle ? (
                          <View style={AccountStyle.accountMenuToogleOn}></View>
                        ) : (
                          <View
                            style={AccountStyle.accountMenuToogleOff}
                          ></View>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={AccountStyle.accountMenu}>
                  <TouchableOpacity
                    style={AccountStyle.accountButton}
                    onPress={() => navigate(ROUTES.PoseidonTnc)}
                  >
                    <Image
                      source={require("../../../assets/images/others/term-menu.png")}
                      style={AccountStyle.accountMenuImage}
                    />
                    <Text style={AccountStyle.accountMenuText}>
                      Terms and Conditions
                    </Text>
                    <Svg
                      width={6.502}
                      height={10.53}
                      viewBox="0 0 6.502 10.53"
                      style={AccountStyle.accountMenuArrow}
                    >
                      <Path
                        data-name="Icon material-expand-more"
                        d="M0 1.237l4.015 4.028-4.019 4.028 1.241 1.237 5.265-5.265L1.237 0z"
                        fill="#e6e6e6"
                      />
                    </Svg>
                  </TouchableOpacity>
                </View>
                <View style={AccountStyle.accountMenu}>
                  <TouchableOpacity
                    style={AccountStyle.accountButton}
                    onPress={() => navigate(ROUTES.PoseidonPrivacy)}
                  >
                    <Image
                      source={require("../../../assets/images/others/term-menu.png")}
                      style={AccountStyle.accountMenuImage}
                    />
                    <Text style={AccountStyle.accountMenuText}>
                      Privacy Policy
                    </Text>
                    <Svg
                      width={6.502}
                      height={10.53}
                      viewBox="0 0 6.502 10.53"
                      style={AccountStyle.accountMenuArrow}
                    >
                      <Path
                        data-name="Icon material-expand-more"
                        d="M0 1.237l4.015 4.028-4.019 4.028 1.241 1.237 5.265-5.265L1.237 0z"
                        fill="#e6e6e6"
                      />
                    </Svg>
                  </TouchableOpacity>
                </View>
                <View style={AccountStyle.accountVersion}>
                  <Text style={AccountStyle.accountVersionText}> Ver. 1.1</Text>
                </View>
              </View>
            </View>
            <View style={AccountStyle.accountLogout}>
              <CustomButton
                title="Logout"
                click={() => logoutHandler()}
                type="else"
              ></CustomButton>
            </View>
          </View>
        </ScrollView>
        <BottomNavigation
          home={goToHome}
          setting={goToSetting}
          status={"account"}
          balance={0}
          liveScore={() => closeOpenStatement()}
        ></BottomNavigation>
      </View>
    </SafeAreaView>
  );
};
