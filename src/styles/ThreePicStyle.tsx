import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const scale = windowWidth/414

export default StyleSheet.create({
  relative: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  absCenter: {
    top: 0,
    left: '50%',
    position: 'absolute',
  },
  alertBtn: {
    width: 32,
    height: 32,
    transform: [
      {translateX: -16}
    ],
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: windowWidth,
    minHeight: windowHeight - 53,
    backgroundColor: '#000000',
    position: 'relative'
  },
  alertButton: {
    width: 32,
    height: 32
  },
  infoButton: {
    position: 'absolute',
    zIndex: 1,
    top: 19,
    right: 30,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  amountResult: {
    position: 'absolute',
    width: 46,
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 3,
    top: -20,
    left: '50%',
    transform: [{translateX: -20}]
  },
  amountResultBanker: {
    top: -53,
    left: '50%',
  },
  amountResultPlayer1: {
    position: 'absolute',
    width: 46,
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 3,
    top: 18,
    right: -38
  },
  banker: {
    position: 'absolute',
    top: -34,
    left: '50%',
    transform: [{translateX: -76.5}],
  },
  amountResultPlayer8: {
    position: 'absolute',
    width: 46,
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 3,
    top: 18,
    left: -38
  },
  amountResultPlayer8Banker: {
    top: 18,
    left: -81
  },
  amountResultPlayer1Banker: {
    top: 18,
    right: -85
  },
  coin: {
    width: 8,
    height: 8
  },
  positiveAmount: {
    color: '#00FB2F',
    marginLeft: 6
  },
  negativeAmount: {
    color: '#FF3D3D',
    marginLeft: 3
  },
  amountDiv: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  amountText: {
    fontSize: 11,
    lineHeight: 13,
  },
  emojiButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: 76,
    right: 30,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
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
    position: 'relative'
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
  SitTable: {
    marginTop: 17
  },
  SitTableBtm: {
    marginBottom: -17
  },
  username: {
    color: '#FAE88C',
    fontSize: 12,
    lineHeight: 14
  },
  balance: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700'
  },
  row: {
    flexDirection: 'row'
  },
  player1: {
    width: 52,
    height: 52,
    position: 'absolute',
    left: '50%',
    top: 0,
    transform: [{translateX: -26}]
  },
  ProfileTable: {
    width: '100%',
    height: 36,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.3)',
    opacity: 1,
    position: 'absolute',
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  ThreePicGamePin1: {
    position: 'absolute', 
    width: 77, 
    height: 89, 
    top: "-2%",
    // bottom: "84%",
    left: '50%', 
    transform: [{ translateX: -38.5 }],
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0
  },
  ThreePicGamePin2: {
    position: 'absolute', 
    width: 77, 
    height: 89,
    top: '12%',
    left: '0%', 
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ThreePicGamePin3: {
    position: 'absolute', 
    width: 77, 
    height: 89, 
    top: '12%',
    right: '0%',
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  ThreePicGamePin4: {
    position: 'absolute', 
    width: 77, 
    height: 89,
    top: '37%',
    left: '0%',
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',  
  },
  ThreePicGamePin5: {
    position: 'absolute', 
    width: 77, 
    height: 89, 
    top: '37%',
    right: '0%',
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  ThreePicGamePin6: {
    position: 'absolute', 
    width: 77, 
    height: 89, 
    top: '66%',
    left: '0%', 
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  ThreePicGamePin7: {
    position: 'absolute', 
    width: 77, 
    height: 89, 
    top: '66%',
    right: '0%', 
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  ThreePicGamePin8: {
    position: 'absolute', 
    width: 77, 
    height: 89, 
    bottom: '0%',
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center', 
    left: '50%', 
    transform: [{ translateX: -38.5 }]
  }
  
});