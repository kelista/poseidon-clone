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
    height: 508, 
    width: '100%',
    paddingBottom: 10
  },
  lobbyImageWrapper: {
    height: 460, 
    width: '100%',
  },
  lobbyImageBackground: {
    position: 'absolute', 
    height: '100%', 
    width: '100%'
  },
  lobbyGameWrapper: {
    height: Platform.OS === 'ios' ? windowHeight - 391.1 : windowHeight - 373.1,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue'
  },
  lobbyGameSkpWrapper: {
    marginTop: 4,
    width: '95.65%',
    height: '46.72%',
    // backgroundColor: 'green'
  },
  lobbyGameSkp: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  lobbyGameThreePicWrapper: {
    width: '98.65%',
    height: '48%',
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