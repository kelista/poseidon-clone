import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  loginContainer: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    paddingTop: 42,
    backgroundColor: '#000000'
  },
  loginBoxWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: 220
  },
  loginBox: {
    width: 258,
    height: 38,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginTop: 10,
  },
  loginImageWrapper: {
    // zIndex: 10,
    height: 260,
    marginTop: -50,
    alignItems: 'center',
  },
  loginImage: {
    width: 508,
    height: 262,
  },
  loginRedCircle: {
    position: 'absolute',
    zIndex: 9,
    width: 262,
    height: 262,
    borderRadius: 262,
    backgroundColor: '#840000'
  },
  loginInput: {
    paddingLeft: 20,
    lineHeight: 23,
    fontSize: 17,
    height: '100%',
    color: '#000000',
  },
});