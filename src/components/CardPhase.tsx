import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import Slider from '@react-native-community/slider';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const scale = windowWidth/414

export const CardWindow = ()=> {

const [balance, setBalance] = useState(0);
const [betValue, setBetValue] = useState(0);
const [checked, setChecked] = useState(false);

  return (
    <View style={styles.cardContainer}>
        <View style={styles.cardContent}>
            <View style={styles.cardBodyScalling}>
                <View style={styles.cardCountdown}>
                    <Image source={require('../assets/images/others/countdown-dummy.png')}/>
                </View>
                <View style={styles.cardBodyContainer}>
                    <View style={styles.cardBodyWrapper}>
                        <View style={[styles.cardBody, styles.separatorLeft]}></View>
                        <View style={[styles.cardBody, styles.separatorRight]}></View>
                    </View>
                    <View style={styles.cardBodyWrapper}>
                        <View style={[styles.cardBody, styles.separatorLeft]}></View>
                        <View style={[styles.cardBody, styles.separatorRight]}></View>
                    </View>
                </View>
                <View style={styles.cardChooseContainer}>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/card/13-a.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/card/12-b.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/card/11-c.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/card/11-c.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardButtonContainer}>
                    <LinearGradient colors={['#E60000', '#730000']} style={styles.cardButtonWrapper}>
                        <TouchableOpacity style={styles.cardButton}>
                            <Text style={styles.cardButtonText}>CONFIRM</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1000,
        borderRadius: 7,
        paddingLeft: 28,
        paddingRight: 28,  
    },
    cardBodyScalling: {
        transform: [{ scaleX: scale }, { scaleY: scale }]
    },
    cardCountdown: {
        paddingTop: 47,
        alignItems: 'center'
    },
    cardBodyContainer: {
        paddingTop: 12,
        alignItems: 'center',
        flexDirection: 'column'
    },
    cardBodyWrapper: {
        paddingTop: 10,
        flexDirection: 'row'
    },
    cardBody: {
        width: 97,
        height: 125,
        backgroundColor: '#3A3C3A',
        borderRadius: 6,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderTopColor: '#636363',
        borderRightColor: '#636363',
        borderBottomColor: '#636363',
        borderLeftColor: '#636363',
    },
    separatorRight: {
        marginLeft: 3
    },
    separatorLeft: {
        marginRight: 3
    },
    cardChooseContainer: {
        flexDirection: 'row',
        paddingTop: 19,
        alignItems: 'center'
    },
    cardButtonContainer: {
        alignItems: 'center',
        marginTop: 14
    },
    cardButtonWrapper: {
        alignItems: 'center',
        width: 120,
        height:40,
    },
    cardButton: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardButtonText: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: "700",
        color: '#FFFFFF'
    }
});

