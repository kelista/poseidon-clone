import React, { useEffect, useState, useContext, useMemo } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Image, ImageBackground, ImageSourcePropType, StyleProp, ViewStyle, ImageStyle, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import { ROUTES } from "../../../../routes";
import { CustomHeader } from "../../../components/Header"
import { CustomheaderLogo } from "../../../components/HeaderLogo"
import { BottomNavigation } from "../../../components/BottomNavigation"
import PolicyStyle from "../../../styles/Policy"
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


export const PoseidonPrivacy: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;

  const accountHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonAccount);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" />
      <View style={{flex: 1}}>
        <CustomheaderLogo name="TnC" lobby={() => accountHandler()}></CustomheaderLogo>
        <ScrollView>
          <View style={PolicyStyle.PolicyContainer}>
            <View style={PolicyStyle.PolicyTitle}>
              <Text style={PolicyStyle.PolicyTitleText}>Privacy Policy</Text>
            </View>
            <View style={PolicyStyle.PolicyBody}>
              <Text style={PolicyStyle.PolicyBodyText}>
                Privacy Policy for Poseidon {"\n"}{"\n"}
                At Poseidon, accessible from poseidon-games.net, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Poseidon and how we use it.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Log Files {"\n"}{"\n"}
                Poseidon follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information. Our Privacy Policy was created with the help of the Privacy Policy Generator and the Privacy Policy Generator.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Cookies and Web Beacons {"\n"}{"\n"}
                Like any other website, Poseidon uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                For more general information on cookies, please read the "What Are Cookies" article on Cookie Consent website.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Privacy Policies {"\n"}{"\n"}
                You may consult this list to find the Privacy Policy for each of the advertising partners of Poseidon.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Poseidon, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Note that Poseidon has no access to or control over these cookies that are used by third-party advertisers.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Third Party Privacy Policies {"\n"}{"\n"}
                Poseidon's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites. What Are Cookies?
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Children's Information {"\n"}{"\n"}
                Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Poseidon does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Online Privacy Policy Only {"\n"}{"\n"}
                This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Poseidon. This policy is not applicable to any information collected offline or via channels other than this website.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Consent {"\n"}{"\n"}
                By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
              </Text>
            </View>
          </View>
          <View style={PolicyStyle.PolicyBlankSpace}></View>
        </ScrollView>
        <BottomNavigation home={() => navigate(ROUTES.PoseidonLobby)} setting={() => navigate(ROUTES.PoseidonAccount)} status={'room'} liveScore={() => closeOpenStatement()}>
        </BottomNavigation>
      </View>
    </SafeAreaView>
  );
};
