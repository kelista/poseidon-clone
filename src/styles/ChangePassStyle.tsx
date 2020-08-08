import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingRight: 21,
    paddingLeft: 21,
    flex: 1,
    width: windowWidth,
    minHeight: windowHeight - 53,
    backgroundColor: '#000000'
  },
  box: {
    width: '100%',
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginTop: 10,
  },
  input: {
    paddingLeft: 28,
    lineHeight: 23, 
    fontSize: 17,
    height: '100%',
    color: '#000000',
  },
});