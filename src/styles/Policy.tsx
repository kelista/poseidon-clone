import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  PolicyContainer: {
    flex: 1,
    width: '100%',
    minHeight: windowHeight - 106,
    paddingLeft: 44.5,
    paddingRight: 44.5
  },
  PolicyBlankSpace: {
    paddingBottom: 106
  },
  PolicyTitle: {
    height: 42.5,
    marginTop: 29,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#707070'
  },
  PolicyTitleText: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#FAE087'
  },
  PolicyBody: {
    paddingTop: 24.5,
    paddingLeft: 13.5,
    paddingRight: 6.5,
    alignItems: 'flex-start'
  },
  PolicyBodyText: {
    fontSize: 13,
    lineHeight: 15.5,
    paddingBottom: 21,
    color: '#FFFFFF'
  },
  PolicyBodyTextList: {
    fontSize: 13,
    lineHeight: 15.5,
    color: '#FFFFFF'
  }
});