import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import BaseStyle from "../styles/base"

export const CustomButton = ({ title, click }: { title: string, click: Function }) => {
  return (
    <TouchableOpacity style={styles.loginButton} onPress={() => click()}>
      <Text style={ BaseStyle.welcome }>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    height: 44,
    justifyContent: 'center',
    marginTop: 40,
    borderRadius: 25,
    backgroundColor: 'yellow'
  }
});

