import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;

export const BottomNavigation = ({home, setting, status, balance, roundDetail, liveScore} : { home: Function, setting: Function, status: String, balance: Number, roundDetail: Function, liveScore: Function }) => {
  return (
    <View style={styles.navigationContainer}>
      <View style={styles.navigationSecondLayer}>
        <LinearGradient colors={['#6E0000', '#400000']} style={styles.navigationLinear}>
          {
            status == 'game' ?
            <View style={styles.navigationGameContainer}>
              <View style={styles.navigationGameWrapper}>
                <View style={styles.navigationGame}>
                  <View style={styles.navigationGameButton}>
                    <TouchableOpacity style={styles.buttonSelection} onPress={() => roundDetail()}>
                      <Image style={[styles.imgButton, styles.homeNavImg]} source={require('../assets/images/others/detail_button.png')}/>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.navigationGameButtonlast}>
                    <TouchableOpacity style={styles.buttonSelection} onPress={() => liveScore()}>
                      <Image style={[styles.imgButton, styles.reportNavImg]} source={require('../assets/images/others/live-score.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
                <LinearGradient colors={['#5B0000', '#2C0000']} style={styles.navigationBalance}>
                  <View style={styles.navigationBalanceWrapper}>
                    <Image source={require('../assets/images/others/casino-chip.png')} style={styles.navigationChipImage}/>
                    <Image source={require('../assets/images/others/big-cointext.png')} style={styles.navigationBalanceImageSquare}/>
                    <Text style={styles.navigationBalanceText}>{balance}</Text>
                  </View>
                </LinearGradient>
              </View>
            </View>
            :
            <View style={styles.navigationWrapper}>
              <View style={styles.navigationButton}>
                <TouchableOpacity style={styles.buttonSelection} onPress={() => home()}>
                  <Image style={[styles.imgButton, styles.homeNavImg]} source={require('../assets/images/others/home-nav.png')}/>
                </TouchableOpacity>
              </View>
              <View style={styles.navigationButton}>
                <TouchableOpacity style={styles.buttonSelection} onPress={() => liveScore()}>
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
          }
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    width: '100%',
    height: 53,
    bottom: 0,
  },
  navigationSecondLayer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 0 : 0,
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
  navigationGame: {
    paddingTop: 7.5,
    paddingBottom: 6.5,
    flexDirection: 'row',
    flex: 0.5
  },
  navigationGameContainer: {
    height: '100%',
  },
  navigationGameWrapper: {
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
  navigationGameButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#8B2B2B'
  },
  navigationGameButtonlast: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationBalance: {
    flex: 0.5,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  navigationChipImage: {
    zIndex: 99,
    width: 38,
    height: 26,
    marginRight: 6,
  },
  navigationBalanceImageSquare: {
    zIndex: 99,
    width: 109,
    height: 25,
  },
  navigationBalanceText: {
    position: 'absolute',
    right: 5,
    fontSize: 14, 
    color: '#FFFFFF', 
    zIndex: 100, 
    fontWeight: "700",
    paddingTop: Platform.OS == 'ios' ? 2 : 0
  },
  navigationBalanceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

