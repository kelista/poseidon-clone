import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import Slider from '@react-native-community/slider';

const windowWidth = Dimensions.get('window').width;

export const BettingWindow = ({submit, close} : { submit: Function, close: Function})=> {

const [balance, setBalance] = useState(0);
const [betValue, setBetValue] = useState(0);
const [checked, setChecked] = useState(false);

const getBalance = () => {
    setBalance(999999999)
}

const separatorBalance = (chip: number) => {
    return chip.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const toogleChecked = () => {
    setChecked(!checked)
}

const chipOne = () => {
    setBetValue(betValue => betValue+ 1)
}

const chipTwo = () => {
    setBetValue(betValue => betValue+ 5)
}

const chipThree = () => {
    setBetValue(betValue => betValue+ 10)
}

const resetBet = () => {
    setBetValue(0)
}

useEffect(() => {
    getBalance()
})

  return (
    <View style={styles.bettingContainer}>
        <View style={styles.bettingContent}>
            <View style={styles.bettingTitle}>
                <TouchableOpacity style={styles.bettingClose} onPress={() => close()}>
                    <Svg width={13.426} height={13.423} viewBox="0 0 13.426 13.423">
                        <Path
                            data-name="Icon ionic-ios-close"
                            d="M8.304 6.711l4.8-4.8A1.124 1.124 0 0011.515.327l-4.8 4.8-4.8-4.8A1.124 1.124 0 10.331 1.911l4.8 4.8-4.8 4.8a1.124 1.124 0 001.584 1.584l4.8-4.8 4.8 4.8a1.124 1.124 0 101.584-1.584z"
                            fill="#fae087"
                        />
                    </Svg>
                </TouchableOpacity>
                <Text style={styles.bettingTitleText}>Poseidon Club</Text>
            </View>
            <View style={styles.bettingBody}>
                <View style={styles.bettingBoxContainer}>
                    <View style={styles.bettingBoxWrapper}>
                        <LinearGradient colors={['#6E0000', '#400000']} style={[styles.bettingBoxContent, styles.separatorLeft]}>
                            <Text style={styles.bettingBoxContentTitleText}>Balance</Text>
                        </LinearGradient>
                        <LinearGradient colors={['#6E0000', '#400000']} style={[styles.bettingBoxContent, styles.separatorRight]}>
                            <Text style={styles.bettingBoxContentTitleText}>Amount</Text>
                        </LinearGradient>
                    </View>
                    <View style={styles.bettingBoxWrapper}>
                        <View style={[styles.bettingBoxContentBalance, styles.separatorLeft]}>
                            <Text style={styles.bettingBoxContentBalanceText}>{separatorBalance(balance)}</Text>
                        </View>
                        <View style={[styles.bettingBoxContentBalance, styles.separatorRight]}>
                            <Text style={styles.bettingBoxContentBalanceText}>{separatorBalance(betValue)}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bettingCoinContainer}>
                    <View style={styles.bettingCoinWrapper}>
                        <TouchableOpacity style={styles.bettingCoinButton} onPress={chipOne}>
                            <Image source={require('../assets/images/others/red-chip.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bettingCoinButton} onPress={chipTwo}>
                            <Image source={require('../assets/images/others/blue-chip.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bettingCoinButton} onPress={chipThree}>
                            <Image source={require('../assets/images/others/green-chip.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bettingLastContainer}>
                        <View style={styles.bettingLastWrapper1}>
                            <TouchableOpacity style={styles.bettingLastButton} onPress={toogleChecked}>
                                <View style={styles.bettingLastSquare}>
                                    {
                                        checked ?
                                        <Image source={require('../assets/images/others/green-checklist.png')} style={styles.bettingLastChecked}/>
                                        :
                                        <></>
                                    }
                                </View>
                                <Text style={styles.bettingLastText}>Last Bet</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bettingLastWrapper2}>
                            <TouchableOpacity onPress={resetBet}>
                                <View style={styles.bettingLastReset}>
                                    <Text style={[styles.bettingLastText, styles.noPaddingLeft]}>Reset</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <LinearGradient colors={['#E60000', '#730000']} style={[styles.bettingButtonGradient]}>
                    <TouchableOpacity style={styles.bettingButton} onPress={() => submit()}>
                        <Text style={styles.bettingButtonText}>SUBMIT</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    bettingContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bettingContent: {
        position: 'relative',
        width: 350,
        height: 385,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1000,
        borderRadius: 7,
        paddingLeft: 28,
        paddingRight: 28
    },
    bettingTitle: {
        width: '100%',
        height: 44.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#707070",
    },
    bettingClose: {
        position: 'absolute',
        right: -27.5,
        height: '100%',
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
    },
    bettingTitleText: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: "700",
        color: '#FAE087'
    },
    bettingBody: {
        alignItems: 'center',
        paddingLeft: 1,
        paddingRight: 1,
    },
    bettingBoxContainer: {
        flexDirection: 'column',
        width: '100%',
        height: 64,
        marginTop: 18.5,
    },
    bettingBoxWrapper: {
        flexDirection: 'row',
        width: '100%',
    },
    bettingBoxContent: {
        flex: 0.5,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    },
    bettingBoxContentBalance: {
        flex: 0.5,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1E1E1E',
    },
    bettingBoxContentTitleText: {
        fontSize: 10,
        lineHeight: 11,
        fontWeight: "700",
        color: "#FAE087"
    },
    bettingBoxContentBalanceText: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: "700",
        color: "#FFFFFF"
    },
    separatorRight: {
        marginLeft: 0.5
    },
    separatorLeft: {
        marginRight: 0.5
    },
    bettingButtonGradient: {
        width: '100%',
        height: 44,
        marginTop: 27,
    },
    bettingButton: {    
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bettingButtonText: {
        fontSize: 17,
        fontWeight: "700",
        lineHeight: 23,
        color: '#FFFFFF'
    },
    bettingCoinContainer: {
        width: '100%',
        marginTop: 22,
        alignItems: 'center',
    },
    bettingCoinWrapper: {
        flexDirection: 'row'
    },
    bettingCoinButton: {
        flex: 0.333,
        alignItems: 'center'
    },
    bettingLastContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35,
    },
    bettingLastWrapper1: {
        flex: 0.5,
        alignItems: 'center',
        paddingRight: 5,
    },
    bettingLastWrapper2: {
        flex: 0.5,
        paddingLeft: 5,
    },
    bettingLastSquare: {
        width: 18,
        height: 19,
        backgroundColor: '#1E1E1E',
        borderRadius: 2,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderTopColor: '#4A4A4A',
        borderRightColor: '#4A4A4A',
        borderBottomColor: '#4A4A4A',
        borderLeftColor: '#4A4A4A',
    },
    bettingLastReset: {
        width: 91,
        height: 29,
        backgroundColor: '#1E1E1E',
        borderRadius: 2,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderTopColor: '#4A4A4A',
        borderRightColor: '#4A4A4A',
        borderBottomColor: '#4A4A4A',
        borderLeftColor: '#4A4A4A',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
    },
    bettingLastChecked: {
        marginLeft: 5  
    },
    noPaddingLeft: {
        paddingLeft: 0,
    },
    bettingLastButton: {
        flexDirection: 'row'
    },
    bettingLastText: {
        paddingLeft: 13,
        fontSize: 10,
        fontWeight: "700",
        lineHeight: 11,
        color: '#E6E6E6'
    }
});

