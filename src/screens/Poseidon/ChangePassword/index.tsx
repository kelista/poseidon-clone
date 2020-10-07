import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import ChangePassStyle from "../../../styles/ChangePassStyle"

import { CustomButton } from "../../../components/Button"
// import { CustomHeader } from "../../../components/Header"
import { CustomheaderLogo } from "../../../components/HeaderLogo"
import { BottomNavigation } from "../../../components/BottomNavigation"
import { ROUTES } from "../../../../routes";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatementInfo } from '../../../components/Statement'

export const PoseidonChangePass: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const [modalStatement, setModalStatement] = useState(false)

  const accountHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonAccount);
  }

  const closeOpenStatement = () => {
    setModalStatement(!modalStatement)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" />
      <View style={{flex: 1}}>
      {/* <CustomHeader title="Change Password" status="changePass"></CustomHeader> */}
        <CustomheaderLogo name="Change Password" lobby={() => accountHandler()}></CustomheaderLogo>
        <ScrollView>
          <StatusBar hidden />
          {
            modalStatement ? <StatementInfo></StatementInfo> : <></>
          }
          <View style={ChangePassStyle.container}>
            <View style={ChangePassStyle.box}>
              <TextInput placeholder="Current Password" placeholderTextColor="#AEAEAE" style={ChangePassStyle.input}></TextInput>
            </View>
            <View style={ChangePassStyle.box}>
              <TextInput placeholder="New Password" placeholderTextColor="#AEAEAE" style={ChangePassStyle.input}></TextInput>
            </View>
            <View style={ChangePassStyle.box}>
              <TextInput placeholder="Confirm New Pasword" placeholderTextColor="#AEAEAE" style={ChangePassStyle.input}></TextInput>
            </View>
            <CustomButton title="Save New Password" click={() => navigate(ROUTES.PoseidonLobby)} type="changePass"></CustomButton>
          </View>
        </ScrollView>
        <BottomNavigation 
          home={() => navigate(ROUTES.PoseidonLobby)} 
          setting={() => navigate(ROUTES.PoseidonAccount)}
          liveScore={() => closeOpenStatement()}>
        </BottomNavigation>
      </View>
    </SafeAreaView>
  );
};
