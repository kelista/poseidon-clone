import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const scale = windowWidth/414

export default StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    minHeight: windowHeight - 53,
    backgroundColor: '#000000'
  },
  ThreePicBlankSpace: {
    height: 53
  },
  ThreePicImageContainer: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  ThreePicImageWrapper: {
    height: '100%', 
    width: '100%',
    backgroundColor: 'yellow'
  },
  ThreePicImageBackground: {
    position: 'absolute', 
    height: '100%', 
    width: '100%'
  },
  ThreePicRoomContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ThreePicRoomWrapper: {
      flexDirection: 'row'
  },
  ThreePicRoomBetText: {
    position: 'absolute',
    width:'100%',
    bottom: 19,
    fontSize: 9,
    color: '#E6E6E6',
    textAlign: 'center'
  },
  ThreePicRoomRightPadding: {
      paddingRight: 50
  },


  //Game
  containerGame: {
    flex: 1,
    width: windowWidth,
    minHeight: windowHeight,
    backgroundColor: '#000000'
  },
  ThreePicGameBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  ThreePicGameContainer: {
    width: '100%',
    height: '100%',
  },
  ThreePicGameProfile: {
    position: 'absolute',
    top: 20,
    left: 23
  },
  ThreePicGameProfileWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ThreePicGameProfileImage: {
    zIndex: 99,
    width: 31,
    height: 31
  },
  ThreePicGameProfileUsername: {
    paddingLeft: 9, 
    fontSize: 14, 
    color: '#FAE087', 
    zIndex: 99, 
    fontWeight: "700"
  },
  ThreePicGameBalance: {
    position: 'absolute', 
    top: 25,
    right: 23
  },
  ThreePicGameBalanceText: {
    position: 'absolute',
    right: 5,
    fontSize: 14, 
    color: '#FFFFFF', 
    zIndex: 100, 
    fontWeight: "700"
  },
  ThreePicGameCasinoChip: {
    position: 'absolute', 
    bottom: 11,
    right: 23
  },
  ThreePicGameCasinoChipImage: {
    zIndex: 99,
    width: 38,
    height: 26,
    marginRight: 6,
  },
  ThreePicGameBalanceImage: {
    zIndex: 99,
    width: 15,
    height: 14,
    marginRight: 6,
  },
  ThreePicGameBalanceImageSquare: {
    zIndex: 99,
    width: 100,
    height: 21
  },
  ThreePicGameTableImageWrapper: {
    position: 'relative',
    alignItems: 'center',
    marginTop: -20,
    height: '100%',
    // backgroundColor: 'yellow',
    justifyContent: 'center'
  },
  ThreePicGameTableImage: {
    position: 'absolute',
    transform: [{ scaleX: scale }, { scaleY: scale }]
    // backgroundColor: 'green'
  },
  ThreePicGameTableTextWrapper: {
    position: 'absolute', 
    zIndex: 99, 
    top: '44.8%', 
    alignItems: 'center'
  },
  ThreePicGameTableText: {
    paddingTop: 5,
    fontSize: 11,
    lineHeight: 12,
    color: '#FFFFFF'
  },
  ThreePicGameTableLogo: {
    position: 'absolute',
    width: 128,
    height: 72,
    zIndex: 99,
    top: '28.3%',
    // backgroundColor: 'green'
  },
  ThreePicGamePinWrapper: { 
    position: 'relative',
    height: 584,
    width: 331,
    transform: [{ scaleX: scale }, { scaleY: scale }]
    // backgroundColor: 'green'
  },
  ThreePicGamePin1: {
    position: 'absolute', 
    width: 67, 
    height: 60, 
    bottom: '87%',
    left: '50%', 
    transform: [{ translateX: -27.8 }]
  },
  ThreePicGamePin2: {
    position: 'absolute', 
    width: 67, 
    height: 60,
    top: '15%',
    left: '3%', 
  },
  ThreePicGamePin3: {
    position: 'absolute', 
    width: 67, 
    height: 60, 
    top: '15%',
    right: '0%', 
  },
  ThreePicGamePin4: {
    position: 'absolute', 
    width: 67, 
    height: 60, 
    top: '39%',
    left: '3%', 
  },
  ThreePicGamePin5: {
    position: 'absolute', 
    width: 67, 
    height: 60, 
    top: '39%',
    right: '0%', 
  },
  ThreePicGamePin6: {
    position: 'absolute', 
    width: 67, 
    height: 60, 
    top: '68%',
    left: '3%', 
  },
  ThreePicGamePin7: {
    position: 'absolute', 
    width: 67, 
    height: 60, 
    top: '68%',
    right: '0%', 
  },
  ThreePicGamePin8: {
    position: 'absolute', 
    width: 67, 
    height: 60, 
    bottom: '5%',
    left: '50%', 
    transform: [{ translateX: -27.8 }]
  }
  
});