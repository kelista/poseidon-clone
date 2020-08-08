import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const CustomButton = ({ title, click, type }: { title: string, click: Function ,type: string }) => {
  return (
    <TouchableOpacity onPress={() => click()} style={styles.loginButton}>
      <LinearGradient colors={['#E60000', '#730000']} style={type == 'login' ? styles.loginLinear : styles.elseLinear}>
        <Text style={styles.loginText}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    height: 38,
    width: '100%',
    marginTop: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginLinear: {
    width: 258,
    height: '100%',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
    elseLinear: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginText : {
    fontSize: 17,
    color: '#FFFFFF'
  }
});

