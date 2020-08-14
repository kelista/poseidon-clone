import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;

export const BottomNavigation = ({home, setting} : { home: Function, setting: Function }) => {
  return (
    <View style={styles.navigationContainer}>
      <LinearGradient colors={['#6E0000', '#400000']} style={styles.navigationLinear}>
        <View style={styles.navigationWrapper}>
          <View style={styles.navigationButton}>
            <TouchableOpacity style={styles.buttonSelection} onPress={() => home()}>
              <Image style={[styles.imgButton, styles.homeNavImg]} source={require('../assets/images/others/home-nav.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.navigationButton}>
            <TouchableOpacity style={styles.buttonSelection} >
              <Image style={[styles.imgButton, styles.reportNavImg]} source={require('../assets/images/others/report-nav.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.navigationButton}>
            <TouchableOpacity style={styles.buttonSelection} >
              <Image style={[styles.imgButton, styles.mailNavImg]} source={require('../assets/images/others/mail-nav.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.navigationButtonLast}>
            <TouchableOpacity style={styles.buttonSelection} onPress={() => setting()}>
              <Image style={[styles.imgButton, styles.settingNavImg]} source={require('../assets/images/others/setting-nav.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    height: 53,
  },
  navigationLinear: {
    width: '100%',
    height: '100%'
  },
  navigationWrapper: {
    height: '100%',
    paddingTop: 7.5,
    paddingBottom: 6.5,
    flexDirection: "row",
  },
  navigationButton: {
    flex: 0.25,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#8B2B2B'
  },
  navigationButtonLast: {
    flex: 0.25,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonSelection: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  imgButton: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  },
  homeNavImg: {
    transform: [
      {translateX: -11},
      {translateY: -10}
    ]
  },
  reportNavImg: {
    transform: [
      {translateX: -8},
      {translateY: -10}
    ]
  },
  mailNavImg: {
    transform: [
      {translateX: -13.5},
      {translateY: -8.5}
    ]
  },
  settingNavImg: {
    transform: [
      {translateX: -10},
      {translateY: -10}
    ]
  }
});

