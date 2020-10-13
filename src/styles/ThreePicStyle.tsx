import { transform } from '@babel/core';
import { StyleSheet, Dimensions, Platform } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const scale = windowWidth/414
const scaleTable = windowWidth/375

export default StyleSheet.create({
  relative: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  firstCard: {
    width: 17, 
    height: 21,  
    marginTop: 2.2, 
    transform: [{ rotate: '-15deg'}]
  },
  secondCard: {
    width: 17, 
    height: 21, 
    marginLeft: -1
  },
  thirdCard: {
    width: 17, 
    height: 21, 
    marginLeft: -1, 
    marginTop: 2.2, 
    transform: [{ rotate: '15deg'}]
  },
  cardDiv: {
    alignItems: 'flex-end', 
    zIndex: 5, 
    height: 25.05, 
    marginTop: 42, 
    transform: [{ translateX: 50.1+14 }]
  },
  cardImage: {
    width: 20,
    height: 24
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
    width: 34,
    height: 34
  },
  autoBet: {
    width: 53,
    height: 25
  },
  infoButton: {
    position: 'absolute',
    zIndex: 1,
    top: 14,
    right: 30,
    width: 34,
    height: 34,
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
  amountResultPlayer5: {
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
    right: -70
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
    width: '100%',
  },
  ThreePicImageWrapper: {
    height: '100%', 
    width: '100%',
    // backgroundColor: 'yellow'
  },
  ThreePicImageBackground: {
    position: 'absolute', 
    height: '100%', 
    width: '100%'
  },
  ThreePicRoomContainer: {
    // height: Platform.OS === 'ios' ? windowHeight - 391.1 : windowHeight - 373.1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ThreePicRoomWrapper: {
    flexDirection: 'row',
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
  ThreePicCardPoint: {
    fontSize: 8, 
    lineHeight: 9, 
    color: "#FFFFFF",
    // backgroundColor: 'green',
    // width: '100%',
    textAlign: 'center'
  },
  ThreePicCardPointDiv: {
    // backgroundColor: 'blue',
    alignItems: 'center', 
    height: 10, 
    marginTop: 6.5, 
    width: 58
  },
  ThreePicCardPointDivSkp: {
    // backgroundColor: 'blue',
    alignItems: 'center', 
    height: 10, 
    marginTop: 6.5, 
    width: 42
  },
  ThreePicTransparentModal: {
    position: 'absolute',
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "rgba(0, 0, 0, 0)",
    zIndex: 9
  },
  ThreePicTransparentModalButton: {
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(0, 0, 0, 0)",
    zIndex: 10
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
    height: windowHeight - 106,
    position: 'relative',
    alignItems: 'center'
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
    position: 'absolute',
    alignItems: 'center',
    marginTop: 2,
    height: '100%',
    // backgroundColor: 'blue',
    justifyContent: 'center',
  },
  ThreePicGameTableImage: {
    position: 'absolute',
    transform: [{ scaleX: scaleTable}, { scaleY: scaleTable }],
  },
  ThreePicGameTableTextWrapper: {
    position: 'absolute', 
    zIndex: 99, 
    top: '49.5%', 
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
    width: 106,
    height: 60,
    zIndex: 4,
    top: '41%',
    opacity: 0.25
    // backgroundColor: 'green'
  },
  ThreePic1Digit: {
    flex: 0.5,
    height: '100%',
    backgroundColor: 'red'
  },
  ThreePic1DigitBlue: {
    flex: 0.5,
    height: '100%',
    backgroundColor: 'blue'
  },
  ThreePicCircle: {
    position: 'absolute',
    width: 95,
    height: 95,
    top: '50%',
    left: '50%',
    transform: [
      {translateX: -47.5},
      {translateY: -47.5}
    ]
  },
  ThreePicTimer2: {
    width: 61,
    height: 46,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      {translateX: -30.5},
      {translateY: -23}
    ],
  },
  ThreePicTimer3: {
    width: 55,
    height: 44,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      {translateX: -27.5},
      {translateY: -22}
    ],
  },
  ThreePicTimer1: {
    position: 'absolute',
    zIndex: 5,
    top: '50%',
    left: '50%',
    transform: [
      {translateX: -17.5}, {translateY: -23.5}
    ],
    width: 35,
    height: 47,
  },
  ThreePicTimer2Div: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'blue'
  },
  ThreePicTimerDiv: {
    position: 'absolute',
    zIndex: 5,
    top: '27%',
    left: '50%',
    transform: [
      {translateX: -50}
    ],
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  SkpTimer: {
    top: '29%',
  },
  ThreePicGamePinWrapper: { 
    position: 'relative',
    height: 584,
    zIndex: 5,
    width: 331,
    transform: [{ scaleX: scaleTable }, { scaleY: scaleTable }]
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
    bottom: -3,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  ThreePicGamePin1: {
    position: 'absolute', 
    width: 77, 
    height: 89, 
    top: "-4%",
    // bottom: "84%",
    left: '50%', 
    transform: [{ translateX: -38.5 }],
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0
  },
  ThreePicGamePin8: {
    position: 'absolute', 
    width: 77, 
    height: 89,
    top: '12%',
    left: '0%', 
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ThreePicGamePin2: {
    position: 'absolute', 
    width: 77, 
    height: 89, 
    top: '12%',
    right: '0%',
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  ThreePicGamePin7: {
    position: 'absolute', 
    width: 77, 
    height: 89,
    top: '37%',
    left: '0%',
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',  
  },
  ThreePicGamePin3: {
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
  ThreePicGamePin4: {
    position: 'absolute', 
    width: 77, 
    height: 89, 
    top: '66%',
    right: '0%', 
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  ThreePicGamePin5: {
    position: 'absolute', 
    width: 77, 
    height: 89, 
    bottom: '2%',
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center', 
    left: '50%', 
    transform: [{ translateX: -38.5 }]
  }
  
});