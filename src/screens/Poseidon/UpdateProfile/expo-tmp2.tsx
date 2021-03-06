import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TextInput } from 'react-native';
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
import { StatementInfo } from '../../../components/Statement'
import { ImageBrowser } from 'expo-image-picker-multiple'

export const PoseidonProfile: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const [modalStatement, setModalStatement] = useState(false)

  const accountHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonAccount);
  }

  const closeOpenStatement = () => {
    setModalStatement(!modalStatement)
  }

  const renderSelectedComponent = (number:any) => {
    return (
      <View style={styles.countBadge}>
        <Text style={styles.countBadgeText}>{number}</Text>
      </View>
    )
  }

  const imagesCallback = (callback:any) => {
    callback.then((photos:any) => {
      console.log(photos);
    }).catch()
  };

  const updateHandler = (count:any, onSubmit:any) => {
    // this.props.navigation.setParams({
    //   headerTitle: "{{count}} selected",
    //   headerRight: onSubmit,
    // });
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
          <View style={[styles.flex, styles.container]}>
            <ImageBrowser
              max={4}
              renderSelectedComponent={renderSelectedComponent}  
              callback={imagesCallback}
              onChange={updateHandler}
            >
            </ImageBrowser>
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

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    position: 'relative'
  },
  emptyStay:{
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF'
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff'
  }
});
