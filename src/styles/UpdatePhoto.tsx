import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const heightPhotoContent = windowWidth / 4

export default StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    minHeight: windowHeight - 106,
    // backgroundColor: '#000000'
  },
  PhotoBox: {
    position: 'relative',
    width: '100%',
    height: windowWidth,
    // backgroundColor: "rgba(255, 255, 255, 1)",
    zIndex: 101
    // backgroundColor: 'yellow'
  },
  PhotoBoxMask: {
    position: 'absolute',
    width: '100%',
    height: windowWidth,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 2,
  },
  PhotoBoxCircle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 1000,
    zIndex: 4
  },
  PhotoBoxContentWrapper: {
    width:'100%',
    height: windowWidth,
    // backgroundColor: 'yellow'
  },
  PhotoBoxContent: {
    flexDirection: 'row'
  },
  PhotoBoxContentMini: {
    flex: 0.25,
    height: heightPhotoContent,
    // backgroundColor: 'green',
    borderTopColor: '#707070',
    borderBottomColor: '#707070',
    borderLeftColor: '#707070',
    borderRightColor: '#707070',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1
  },
  PhotoBoxContentMiniImage: {
    width: '100%',
    height: '100%'
  },
  PhotoBoxContentBigImage: {
    width: '100%',
    height: '100%',
    borderRadius: 1000
  },
  PhotoBoxBlankSpace: {
    paddingBottom: 53
  }
});