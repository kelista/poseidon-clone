import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;

export const BottomNavigation = ({home, setting} : { home: Function, setting: Function }) => {
  return (
    <View style={styles.navigationContainer}>
      <LinearGradient colors={['#6E0000', '#400000']} style={styles.navigationLinear}>
        <View style={styles.navigationWrapper}>
          <TouchableOpacity style={styles.navigationButton} onPress={() => home()}>
            <Image source={require('../assets/images/others/home-nav.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigationButton}>
            <Image source={require('../assets/images/others/report-nav.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigationButton}>
            <Image source={require('../assets/images/others/mail-nav.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigationButtonLast} onPress={() => setting()}>
            <Image source={require('../assets/images/others/setting-nav.png')} />
          </TouchableOpacity>
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
  }
});

