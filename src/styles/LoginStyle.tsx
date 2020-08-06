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
  },
  loginBox: {
    width: 258,
    height: 38,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginTop: 10,
  },
  loginImageWrapper: {
    zIndex: 10,
    height: 260,
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  loginImage: {
    width: 188,
    height: 260,
    backgroundColor: 'green'
  },
  loginInput: {
    paddingLeft: 20,
    lineHeight: 23,
    fontSize: 17,
    height: '100%',
    color: '#000000',
  },
});