import React, { useEffect, useState, useContext  } from 'react';
import { StyleSheet, Text, View, Image, StatusBar  } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {BSContext} from "../../../../routes/bsContext";
import {
  NavigationScreenComponent,
} from "react-navigation";
import { ROUTES } from "../../../../routes";
import { WebSocketClient } from "../../../services/websocket"
import { playBacksound, stopBacksound } from '../../../services/sound_manager'
import { SafeAreaView } from 'react-native-safe-area-context';
import AccountStyle from "../../../styles/AccountStyle"

import { CustomButton } from "../../../components/Button"
import { CustomheaderLogo } from "../../../components/HeaderLogo"
import { BottomNavigation } from "../../../components/BottomNavigation"

import Svg, { Path } from 'react-native-svg';

export const PoseidonAccount: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const [toggle, setToggle] = useState(true);

  const bs = useContext(BSContext);

  const lobbyHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonLobby);
  }
  
  const logoutHandler = () => {
    navigate(ROUTES.PoseidonLogin);
  };

  const toggleClick = () => {
    if(toggle) {
      bs?.pause().then(() => {
        setToggle(!toggle) // ini apa
      });
    } else {
      bs?.start().then(() => {
        setToggle(!toggle)
      });
    }
  }

  useEffect(() => {
    console.log(bs?.getStatus())
    if(bs?.getStatus() == "play") {
      setToggle(true)
    } else {
      setToggle(false)
    }
  }, [])

  return (
    // <SafeAreaView>
    <View style={{flex: 1}}>
      <CustomheaderLogo name="account" lobby={() => lobbyHandler()}></CustomheaderLogo>
      <ScrollView>
        <StatusBar hidden />
        <View style={AccountStyle.accountContainer}>
          <View style={AccountStyle.accountImageContainer}>
            <View style={AccountStyle.accountImageWrapper}>
              <Image source={require('../../../assets/images/others/Sample.png')} style={AccountStyle.accountImage}/>
            </View>
            <View style={AccountStyle.accountPencilWrapper} >
              <TouchableOpacity style={AccountStyle.accountPencilClick}>
                <Image source={require('../../../assets/images/others/pencil-update.png')} style={AccountStyle.accountPencilImage}/>
                <Text style={AccountStyle.accountPencilText}>Update Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={AccountStyle.accountUser}>
            <Text style={AccountStyle.accountUserName}>Rockies07</Text>
            <Text style={AccountStyle.accountUserId}>ID: S100127</Text>
            <View style={AccountStyle.accountUserBalance}>
              <Image source={require('../../../assets/images/others/balance-image.png')}/>
              <Text style={AccountStyle.accountUserBalanceText}>999,999,999</Text>
            </View>
          </View>
          <View style={AccountStyle.accountMenuContainer}>
            <View style={AccountStyle.accountMenuWrapper}>
              <TouchableOpacity style={AccountStyle.accountMenu} onPress={() => navigate(ROUTES.PoseidonChangePass)}>
                <Image source={require('../../../assets/images/others/lock-menu.png')} style={AccountStyle.accountMenuImage_Lock}/>
                <Text style={AccountStyle.accountMenuText}>Change Password</Text>
                <Svg width={6.502} height={10.53} viewBox="0 0 6.502 10.53" style={AccountStyle.accountMenuArrow}>
                  <Path
                    data-name="Icon material-expand-more"
                    d="M0 1.237l4.015 4.028-4.019 4.028 1.241 1.237 5.265-5.265L1.237 0z"
                    fill="#e6e6e6"
                  />
                </Svg>
              </TouchableOpacity>
              <TouchableOpacity style={AccountStyle.accountMenu} onPress={toggleClick}>
                <Image source={require('../../../assets/images/others/sound-menu.png')} style={AccountStyle.accountMenuImage} />
                <Text style={AccountStyle.accountMenuText}>BGM / Sounds</Text>
                <View style={AccountStyle.accountMenuToogle}>
                  {
                    toggle ? 
                    <View style={AccountStyle.accountMenuToogleOn}></View>
                    :
                    <View style={AccountStyle.accountMenuToogleOff}></View>
                  }
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={AccountStyle.accountMenu}>
                <Image source={require('../../../assets/images/others/term-menu.png')} style={AccountStyle.accountMenuImage} />
                <Text style={AccountStyle.accountMenuText}>Terms and Conditions</Text>
                <Svg width={6.502} height={10.53} viewBox="0 0 6.502 10.53" style={AccountStyle.accountMenuArrow}>
                  <Path
                    data-name="Icon material-expand-more"
                    d="M0 1.237l4.015 4.028-4.019 4.028 1.241 1.237 5.265-5.265L1.237 0z"
                    fill="#e6e6e6"
                  />
                </Svg>
              </TouchableOpacity>
              <TouchableOpacity style={AccountStyle.accountMenu}>
                <Image source={require('../../../assets/images/others/term-menu.png')} style={AccountStyle.accountMenuImage} />
                <Text style={AccountStyle.accountMenuText}>Privacy Policy</Text>
                <Svg width={6.502} height={10.53} viewBox="0 0 6.502 10.53" style={AccountStyle.accountMenuArrow}>
                  <Path
                    data-name="Icon material-expand-more"
                    d="M0 1.237l4.015 4.028-4.019 4.028 1.241 1.237 5.265-5.265L1.237 0z"
                    fill="#e6e6e6"
                  />
                </Svg>
              </TouchableOpacity>
              <View style={AccountStyle.accountVersion}>
                <Text style={AccountStyle.accountVersionText}> Ver. 1.1</Text>
              </View>
            </View>
          </View>
          <View style={AccountStyle.accountLogout}>
            <CustomButton title="Logout" click={() => logoutHandler()} type="else"></CustomButton>
          </View>
        </View>
      </ScrollView>
      <BottomNavigation 
        home={() => navigate(ROUTES.PoseidonLobby)} 
        setting={() => navigate(ROUTES.PoseidonAccount)}>
      </BottomNavigation>
    </View>
    // </SafeAreaView>
  );
};
