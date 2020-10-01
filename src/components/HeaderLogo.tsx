import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

export const CustomheaderLogo = ({lobby, name }: {lobby: Function, name: String }) => {
  return (
    <View style={{}}>
      <LinearGradient colors={['#6E0000', '#400000']} locations={[0, 1]} style={styles.loginButton}>
        <View style={styles.header}>
            {
                name != "lobby" ?
                <TouchableOpacity style={styles.backButton} onPress={() => lobby()}>
                    <Svg width={9.87} height={15.983} viewBox="0 0 9.87 15.983">
                        <Path
                            data-name="Icon material-expand-more"
                            d="M9.87 14.105l-6.1-6.114 6.1-6.114L7.992 0 0 7.992l7.992 7.992z"
                            fill="#fae087"
                        />
                    </Svg>
                </TouchableOpacity>
                : 
                <></>
            }
            {
              name == 'skp' ?
              <Text style={styles.temporaryText}>Banker SKP</Text>
              :
              name == 'threepic' ?
              <Text style={styles.temporaryText}>Three Pictures</Text>
              :
              <Image source={require('../assets/images/others/logo-header.png')}/>
              
            }
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  lobbyWrapper: {
    backgroundColor: 'yellow'
  },
  header: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center'
  },
  loginButton: {
    height: 53,
    width: '100%',
  },
  backButton: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 18,
    left: 29.1
  },
  temporaryText: {
    // fontFamily: 'helvetica',
    height: 35,
    fontSize: 23,
    color: '#FAE087',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.57)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
    paddingTop: Platform.OS == 'ios' ? 2 : 0
  },
});

