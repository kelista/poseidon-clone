import { StyleSheet, Dimensions, Platform } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  accountContainer: {
    flex: 1,
    width: windowWidth,
    minHeight: windowHeight - 53,
    backgroundColor: '#000000'
  },
  accountImageContainer: {
    position: 'relative',
    width: '100%',
    height: 102,
    marginTop: 22
  },
  accountImageWrapper: {
    alignItems: 'center'
  },
  accountImage: {
    width: 102,
    height: 102,
    borderRadius: 102,
  },
  accountPencilWrapper: {
    position: 'absolute',
    transform: [{ translateX: (windowWidth/2) + 53 }, {translateY: 85.5}]
  },
  accountPencilClick: {
    flex: 1,
    width: 101,
    paddingBottom: 4.5,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
  },
  accountPencilImage: {
    flex: 0.15
  },
  accountPencilText: {
    flex: 0.85,
    paddingLeft: 5,
    fontSize: 11,
    color: "#E6E6E6"
  },
  accountUser: {
    color: 'white',
    alignItems: 'center',
    marginTop: 25.5
  },
  accountUserName: {
    color: '#FAE087',
    fontSize: 16,
  },
  accountUserId: {
    color: '#CFCFCF',
    fontSize: 12,
    marginTop: 7,
  },
  accountUserBalance: {
    marginTop: 15,
  },
  accountUserBalanceText: {
    fontSize: 16,
    color: '#FFFFFF',
    right: 11,
    position: 'absolute',
    top: Platform.OS == 'ios' ? '50%' : 0,
    transform: [{translateY: Platform.OS == 'ios' ? -9 : 0}]
  },
  accountMenuContainer: {
    width: '100%',
    height: 226,
    marginTop: 37,
    paddingLeft: 22,
    paddingRight: 21,
  },
  accountMenuWrapper: {
    paddingLeft: 25,
    paddingRight: 33.7,
    borderRadius: 5,
    // backgroundColor: 'green',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopColor: "#2D2D2D",
    borderRightColor: "#2D2D2D",
    borderBottomColor: "#2D2D2D",
    borderLeftColor: "#2D2D2D",
  },
  accountMenu: {
    borderBottomWidth: 1,
    borderBottomColor: "#2D2D2D",
  },
  accountButton: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
    height: 30.5,
  },
  accountMenuImage: {
    width: 16,
    height: 16,
  },
  accountMenuImage_Lock: {
    width: 11,
    height: 15,
  },
  accountMenuArrow: {
    position: 'absolute',
    right: 0,
    width: 11,
    height: 6.5,
  },
  accountMenuText: {
    paddingTop: Platform.OS == "ios" ? 3 : 0,
    lineHeight: 14,
    color: '#E6E6E6',
    fontSize: 14,
    paddingLeft: 21,
  },
  accountVersion: {
    width: '100%',
    paddingTop: 14.5,
    paddingBottom: 13,
    alignItems: 'center'
  },
  accountVersionText: {
    fontSize: 10,
    color: '#E6E6E6'
  },
  accountLogout: {
    width: '100%',
    paddingLeft: 21,
    paddingRight: 21,
    marginTop: 15,
    alignItems: 'center'
  },
  accountMenuToogle: {
    position: 'absolute',
    right: 0,
    padding: 2,
    width: 27,
    height: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8
  },
  accountMenuToogleOn: {
    width: 12,
    height: 12,
    backgroundColor: '#48D148',
    borderRadius: 12,
    marginLeft: 11
  },
  accountMenuToogleOff: {
    width: 12,
    height: 12,
    backgroundColor: '#A2A2A2',
    borderRadius: 12
  }
});