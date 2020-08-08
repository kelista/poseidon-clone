import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const CustomHeader = ({ title }: { title: string }) => {
  return (
    <View style={{}}>
      <LinearGradient colors={['#C73131', '#6E0000', '#400000']} style={styles.loginButton}>
        <Text style={styles.headerText}>
          {title}
        </Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    height: 44,
    width: '100%',
    paddingLeft: 24,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 23,
    color: '#FAE087',
    textShadowColor: 'rgba(0, 0, 0, 0.57)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1
  }
});

