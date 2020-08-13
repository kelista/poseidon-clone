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
    height: 363, 
    width: '100%',
  },
  skpImageWrapper: {
    height: '100%', 
    width: '100%',
    backgroundColor: 'yellow'
  },
  skpImageBackground: {
    position: 'absolute', 
    height: '100%', 
    width: '100%'
  },
  skpRoomContainer: {
    alignItems: 'center'
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