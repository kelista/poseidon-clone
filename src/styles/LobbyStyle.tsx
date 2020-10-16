import { StyleSheet, Dimensions, Platform } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    minHeight: windowHeight - 53,
    backgroundColor: '#000000'
  },
  lobbyImageContainer: {
    height: 440, 
    width: '100%',
  },
  lobbyImageWrapper: {
    height: 390, 
    width: '100%',
  },
  lobbyImageBackground: {
    position: 'absolute', 
    height: '100%', 
    width: '100%'
  },
  lobbyHome: {
    height: 190, 
    position: 'relative'
  },
  lobbyHomeImg: {
    position: 'absolute', 
    top: -10, 
    left: 0
  },
  lobbyGameWrapper: {
    // height: Platform.OS === 'ios' ? windowHeight - 391.1 : windowHeight - 373.1,
    height: '100%',
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue'
  },
  lobbyGameSkpWrapper: {
    width: '95.65%',
    height: '49%',
    // backgroundColor: 'green'
  },
  lobbyGameSkp: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  lobbyGameThreePicWrapper: {
    width: '98.65%',
    height: '50%',
    // backgroundColor: 'yellow'
  },
  lobbyGameThreePic: {
    position: 'relative',
    right: 5,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  lobbyGameButton: {
    marginBottom: 100
  }
});