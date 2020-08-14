import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    minHeight: windowHeight - 53,
    backgroundColor: '#000000'
  },
  skpBlankSpace: {
    height: 53
  },
  skpImageContainer: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  skpImageWrapper: {
    height: '100%', 
    width: '100%',
  },
  skpImageBackground: {
    position: 'absolute', 
    height: '100%', 
    width: '100%'
  },
  skpRoomContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skpRoomWrapper: {
      flexDirection: 'row'
  },
  skpRoomBetText: {
    position: 'absolute',
    width:'100%',
    bottom: 19,
    fontSize: 9,
    color: '#E6E6E6',
    textAlign: 'center'
  },
  skpRoomRightPadding: {
      paddingRight: 50
  }
});