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
            <View style={PhotoStyle.PhotoBox}>
            <View style={PhotoStyle.PhotoBoxMask}></View>
              <Image source={require("../../../assets/images/others/poseidon-logo.png")} style={[PhotoStyle.PhotoBoxContentMiniImage, {position: 'absolute', zIndex: 1}]}/>
              <View style={PhotoStyle.PhotoBoxCircle}>
                <Image source={require("../../../assets/images/others/poseidon-logo.png")} style={[PhotoStyle.PhotoBoxContentBigImage]}/>
              </View>
            </View>
            <View style={PhotoStyle.PhotoBoxContentWrapper}>
              <View style={PhotoStyle.PhotoBoxContent}>
                <View style={PhotoStyle.PhotoBoxContentMini}>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/images/others/Sample.png")} style={PhotoStyle.PhotoBoxContentMiniImage}/>
                  </TouchableOpacity>
                </View>
                <View style={PhotoStyle.PhotoBoxContentMini}>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/images/others/poseidon-logo.png")} style={PhotoStyle.PhotoBoxContentMiniImage}/>
                  </TouchableOpacity>
                </View>
                <View style={PhotoStyle.PhotoBoxContentMini}>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/images/others/Sample.png")} style={PhotoStyle.PhotoBoxContentMiniImage}/>
                  </TouchableOpacity>
                </View>
                <View style={PhotoStyle.PhotoBoxContentMini}>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/images/others/poseidon-logo.png")} style={PhotoStyle.PhotoBoxContentMiniImage}/>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={PhotoStyle.PhotoBoxContent}>
                <View style={PhotoStyle.PhotoBoxContentMini}>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/images/others/Sample.png")} style={PhotoStyle.PhotoBoxContentMiniImage}/>
                  </TouchableOpacity>
                </View>
                <View style={PhotoStyle.PhotoBoxContentMini}>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/images/others/poseidon-logo.png")} style={PhotoStyle.PhotoBoxContentMiniImage}/>
                  </TouchableOpacity>
                </View>
                <View style={PhotoStyle.PhotoBoxContentMini}>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/images/others/Sample.png")} style={PhotoStyle.PhotoBoxContentMiniImage}/>
                  </TouchableOpacity>
                </View>
                <View style={PhotoStyle.PhotoBoxContentMini}>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/images/others/poseidon-logo.png")} style={PhotoStyle.PhotoBoxContentMiniImage}/>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={PhotoStyle.PhotoBoxContent}>
                <View style={PhotoStyle.PhotoBoxContentMini}>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/images/others/Sample.png")} style={PhotoStyle.PhotoBoxContentMiniImage}/>
                  </TouchableOpacity>
                </View>
                <View style={PhotoStyle.PhotoBoxContentMini}>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/images/others/poseidon-logo.png")} style={PhotoStyle.PhotoBoxContentMiniImage}/>
                  </TouchableOpacity>
                </View>
                <View style={PhotoStyle.PhotoBoxContentMini}>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/images/others/Sample.png")} style={PhotoStyle.PhotoBoxContentMiniImage}/>
                  </TouchableOpacity>
                </View>
                <View style={PhotoStyle.PhotoBoxContentMini}>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/images/others/poseidon-logo.png")} style={PhotoStyle.PhotoBoxContentMiniImage}/>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={PhotoStyle.PhotoBoxContent}>
                <View style={PhotoStyle.PhotoBoxContentMini}>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/images/others/Sample.png")} style={PhotoStyle.PhotoBoxContentMiniImage}/>
                  </TouchableOpacity>
                </View>
                <View style={PhotoStyle.PhotoBoxContentMini}>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/images/others/poseidon-logo.png")} style={PhotoStyle.PhotoBoxContentMiniImage}/>
                  </TouchableOpacity>
                </View>
                <View style={PhotoStyle.PhotoBoxContentMini}>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/images/others/Sample.png")} style={PhotoStyle.PhotoBoxContentMiniImage}/>
                  </TouchableOpacity>
                </View>
                <View style={PhotoStyle.PhotoBoxContentMini}>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/images/others/poseidon-logo.png")} style={PhotoStyle.PhotoBoxContentMiniImage}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={PhotoStyle.PhotoBoxBlankSpace}></View>
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
