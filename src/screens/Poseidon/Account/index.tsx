import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar  } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import { ROUTES } from "../../../../routes";
import { WebSocketClient } from "../../../services/websocket"
import { playBacksound, stopBacksound } from '../../../services/sound_manager'
import { SafeAreaView } from 'react-native-safe-area-context';
import AccountStyle from "../../../styles/AccountStyle"

import { CustomButton } from "../../../components/Button"
import { CustomHeader } from "../../../components/Header"

export const PoseidonAccount: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;

  const logoutHandler = () => {
    stopBacksound()
    navigate(ROUTES.PoseidonLogin);
  };

  return (
    // <SafeAreaView>
      <ScrollView>
        <StatusBar hidden />
        <View style={AccountStyle.accountContainer}>
          <CustomHeader title="Profile"></CustomHeader>
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
              <TouchableOpacity style={AccountStyle.accountMenu}>
                <Image source={require('../../../assets/images/others/lock-menu.png')} style={AccountStyle.accountMenuImage_Lock}/>
                <Text style={AccountStyle.accountMenuText}>Change Password</Text>
                <Image source={require('../../../assets/images/others/right-arrow.png')} style={AccountStyle.accountMenuArrow}/>
              </TouchableOpacity>
              <TouchableOpacity style={AccountStyle.accountMenu}>
                <Image source={require('../../../assets/images/others/sound-menu.png')} style={AccountStyle.accountMenuImage} />
                <Text style={AccountStyle.accountMenuText}>BGM / Sounds</Text>
                <Image source={require('../../../assets/images/others/right-arrow.png')} style={AccountStyle.accountMenuArrow} />
              </TouchableOpacity>
              <TouchableOpacity style={AccountStyle.accountMenu}>
                <Image source={require('../../../assets/images/others/term-menu.png')} style={AccountStyle.accountMenuImage} />
                <Text style={AccountStyle.accountMenuText}>Terms and Conditions</Text>
                <Image source={require('../../../assets/images/others/right-arrow.png')} style={AccountStyle.accountMenuArrow} />
              </TouchableOpacity>
              <TouchableOpacity style={AccountStyle.accountMenu}>
                <Image source={require('../../../assets/images/others/term-menu.png')} style={AccountStyle.accountMenuImage} />
                <Text style={AccountStyle.accountMenuText}>Privacy Policy</Text>
                <Image source={require('../../../assets/images/others/right-arrow.png')} style={AccountStyle.accountMenuArrow} />
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
    // </SafeAreaView>
  );
};