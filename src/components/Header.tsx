import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const CustomHeader = ({ title, status }: { title: string, status: string }) => {
  return (
    <View style={{}}>
      <LinearGradient colors={['#6E0000', '#400000']} locations={[0, 1]} style={styles.loginButton}>
        <View style={styles.header}>
          <Text style={[styles.headerBase, status == "userLobby" ? styles.headerUserLobby : styles.headerText]}>
            {title}
          </Text>
          {
            status == "lobby" ? 
              <Image source={require('../assets/images/others/drop-img.png')} style={styles.dropImg}/>
              :
              <></>
          }
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  dropImg: {
    marginLeft: 17,
    marginTop: 11
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  loginButton: {
    height: 53,
    width: '100%',
    paddingLeft: 24,
  },
<<<<<<< HEAD
  headerBase: {
=======
  headerText: {
    fontFamily: 'helvetica',
    fontSize: 23,
>>>>>>> a70257daab0e904e580c0bbac46134eb25cc767f
    color: '#FAE087',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.57)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1
  },
  headerText: {
    fontSize: 23
  },
  headerUserLobby: {
    fontSize: 16
  }
});

