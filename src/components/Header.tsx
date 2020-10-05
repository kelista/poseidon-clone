import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const CustomHeader = ({ title, status, balance }: { title: string, balance: number, status: string }) => {
  return (
    <View style={{}}>
      <LinearGradient colors={['#6E0000', '#400000']} locations={[0, 1]} style={styles.loginButton}>
        <View style={styles.header}>
          <Text style={[styles.headerBase, status == "userLobby" ? styles.headerUserLobby : styles.headerText]}>
            {title}
          </Text>
          {
            status == "lobby" ?
            <View style={styles.userSlot}>
              <Image source={require('../assets/images/others/green-people.png')} style={styles.userSlotImage}/>
              <Text style={styles.userSlotText}>54 / 60</Text>
            </View>
            :
            <></>
          }
          {
            status == "lobby" ? 
            <Image source={require('../assets/images/others/drop-img.png')} style={styles.dropImg}/>
            :
            <></>
          }
          {
            status == "userLobby" ?
            <View style={styles.userBalance}>
              <Image source={require('../assets/images/others/balance-image.png')} />
              <Text style={styles.userBalanceText}>{balance}</Text>
            </View>
            :
            <></>
          }
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  lobbyWrapper: {
    backgroundColor: 'yellow'
  },
  userSlot: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    right: 32,
  },
  userSlotImage: {
    right: 10,
    top: 3,
  },
  userSlotText: {
    fontSize: 13,
    color: '#E6E6E6'
  },
  dropImg: {
    marginLeft: 17,
    marginTop: 10
  },
  userBalance: {
    position: 'absolute',
    right: 32,
    textAlign: 'center'
  },
  userBalanceText: {
    fontSize: 16,
    color: '#FFFFFF',
    right: 8,
    position: 'absolute',
    paddingTop: Platform.OS == 'ios' ? 2 : 0
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  loginButton: {
    height: 53,
    width: '100%',
    paddingLeft: 24,
  },
  headerBase: {
    // fontFamily: 'helvetica',
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

