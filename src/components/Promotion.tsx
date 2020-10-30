import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CustomPromotion = ({closePromotion} : {closePromotion:Function}) => {

  const insets = useSafeAreaInsets();
  
  const promotionMask: any = useMemo(() => {
    const windowHeight = Dimensions.get("window").height;
    return {
      width: "100%",
      position: "absolute",
      height: windowHeight - insets.bottom - insets.top,
      zIndex: 5,
      // height: '100%',
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      justifyContent: 'center',
      alignItems: 'center'
    };
  }, [insets]);

  return (
    <View style={{...promotionMask}}>
      <View style={styles.promotionContent}>
        <TouchableOpacity style={styles.promotionCloseButton} onPress={() => closePromotion()}>
          <Image source={require('../assets/images/others/closebutton.png')} style={styles.promotionCloseButtonImage}/>
        </TouchableOpacity>
          <Image source={require('../assets/images/others/promotionimg.png')} style={{}}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  promotionMask: {
    position: 'absolute',
    width: '100%',
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 5,
    height: '100%'
  },
  promotionContent: {
    width: 331,
    height: 509,
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    position: 'relative'
  },
  promotionCloseButton: {
    position: 'absolute',
    right: -14,
    top: -14,
    zIndex: 4
  },
  promotionCloseButtonImage: {
    width: 38,
    height: 38,
  }
});

