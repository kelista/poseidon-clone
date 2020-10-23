import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TextInput, Platform, Button } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import PhotoStyle from "../../../styles/UpdatePhoto"

import { CustomButton } from "../../../components/Button"
// import { CustomHeader } from "../../../components/Header"
import { CustomheaderLogo } from "../../../components/HeaderLogo"
import { BottomNavigation } from "../../../components/BottomNavigation"
import { ROUTES } from "../../../../routes";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatementInfo } from '../../../components/Statement';
import * as ImagePicker from 'expo-image-picker';

export const PoseidonProfile: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const [modalStatement, setModalStatement] = useState(false)
  const [image, setImage] = useState("");

  const accountHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonAccount);
  }

  const closeOpenStatement = () => {
    setModalStatement(!modalStatement)
  }

  useEffect(() => {
    (async() => {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert("Sorry, we need camera roll permissions to make this work");
      }
    })();
  }, []);

  const pickImage = async () => {
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
          <View style={PhotoStyle.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Button title="Pick an image from camera roll" onPress={pickImage}/>
              { image ? 
                <Image source={{ uri: image }} style={{ width: 200, height: 200}} /> 
                :
                <></>
              }
            </View>
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

