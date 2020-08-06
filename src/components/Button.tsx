import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const CustomButton = ({ title, click }: { title: string, click: Function }) => {
  return (
    <TouchableOpacity onPress={() => click()}>
      <LinearGradient colors={['#E60000', '#730000']} style={styles.loginButton}>
        <Text style={styles.loginText}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    height: 44,
    width: 258,
    marginTop: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow'
  },
  loginText : {
    fontSize: 17,
    color: '#FFFFFF'
  }
});

