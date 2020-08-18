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
  ThreePicGameContainer: {
    width: '100%',
    height: '100%',
  },
  ThreePicGameTableImageWrapper: {
    position: 'relative',
    alignItems: 'center'
  },
  ThreePicGameTableImage: {
    position: 'absolute',
    top: 74
  },
});