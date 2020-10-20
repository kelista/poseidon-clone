import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TextInput, BackHandler, AsyncStorage } from 'react-native';
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
import { StatementInfo } from '../../../components/Statement';
import { WSContext } from "../../../../routes/wsContext";
import Axios from 'axios';

export const PoseidonChangePass: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const [modalStatement, setModalStatement] = useState(false)
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const [token, setToken] = useState("");

  const host = "http://35.197.156.255:5000";
  const path = host + "/settings/password";

  useEffect(() => {
    AsyncStorage.getItem("token").then((d:any) => {
      setToken(d)
    })
  }, [])

  const accountHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonAccount);
  }

  const closeOpenStatement = () => {
    setModalStatement(!modalStatement)
  }

  const sendChange = () => {
    if(oldPass && newPass && confirmPass) {
      console.log(oldPass + " " + newPass + " " + confirmPass)
      Axios
        .post(path, { oldPass: oldPass, newPass: newPass, confirmPass: confirmPass }, {headers: {'auth':token, 'Content-Type': 'application/json'}})
        .then((response) => {
          if(response.data == 'OK') {
            alert("Password Changed")
            navigate(ROUTES.PoseidonLogin);
          }
        })
        .catch((err) => {
          alert(err.response.data.message[0])
          console.log(err.response.data)
          // alert("Username / Password wrong");
        });
    }
  };


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
              <TextInput placeholder="Current Password" placeholderTextColor="#AEAEAE" value={oldPass} style={ChangePassStyle.input} secureTextEntry={true} onChangeText={(e) => setOldPass(e)}></TextInput>
            </View>
            <View style={ChangePassStyle.box}>
              <TextInput placeholder="New Password" placeholderTextColor="#AEAEAE" value={newPass} style={ChangePassStyle.input} secureTextEntry={true} onChangeText={(e) => setNewPass(e)}></TextInput>
            </View>
            <View style={ChangePassStyle.box}>
              <TextInput placeholder="Confirm New Pasword" placeholderTextColor="#AEAEAE" value={confirmPass} style={ChangePassStyle.input} secureTextEntry={true} onChangeText={(e) => setconfirmPass(e)}></TextInput>
            </View>
            <Text>Test</Text>
            <CustomButton title="Save New Password" click={() => sendChange()} type="changePass"></CustomButton>
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
