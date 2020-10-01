import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from "@react-native-community/slider";

const windowWidth = Dimensions.get('window').width;
const scale = windowWidth/414

export const LiveScore = (props: any) => {
  const {
    result,
    info
  } = props
  const balance = 1000;
  const [sliderValue, setsliderValue] = useState(0);
  const setSliderMethod = (sliderValue: number) => {
  setsliderValue(sliderValue)
  }
    
  return (
    <View style={styles.LiveScoreContainer}>
        <View style={styles.LiveScoreBodyWrapper}>
            <View style={styles.LiveScoreTitle}>
                <Text style={styles.LiveScoreTitleText}>Live Score</Text>
            </View>
            <View style={styles.LiveScoreBody}>
                <View style={styles.LiveScoreBodyTitleWrapper}>
                  <View style={[styles.LiveScoreBodyContent, styles.marginRight]}>
                    <LinearGradient colors={["#6E0000", "#400000"]} style={styles.LiveScoreBodyTitle}>
                      <Text style={styles.LiveScoreBodyTitleText}>Player</Text>
                    </LinearGradient>
                    <View style={styles.LiveScoreBodyContentDetail}>
                      {
                        result ? 
                          result.map(d => {
                            return (
                              <View style={styles.LiveScoreBodyContentDetailRow}>
                                <Text style={styles.LiveScoreBodyContentDetailRowText}>{d.username}</Text>
                              </View>
                            )
                          })
                          :
                          <></>
                      }
                    </View>
                  </View>
                  <View style={[styles.LiveScoreBodyContent, styles.marginLeft]}>
                    <LinearGradient colors={["#6E0000", "#400000"]} style={styles.LiveScoreBodyTitle}>
                      <Text style={styles.LiveScoreBodyTitleText}>Win/Lose</Text>
                    </LinearGradient>
                    <View style={styles.LiveScoreBodyContentDetail}>
                      {
                        result ? 
                          result.map(d => {
                            return (
                              <View style={styles.LiveScoreBodyContentDetailRow}>
                                <Text style={d.win < 0 ? styles.LiveScoreBodyContentDetailRowValueRed : styles.LiveScoreBodyContentDetailRowValueGreen}>{d.win > 0 ? "+" + d.win : d.win}</Text>
                              </View>
                            )
                          })
                          :
                          <></>
                      }
                    </View>
                  </View>
                </View>
            </View>
            <View style={styles.LiveScoreBodySpectator}>
              <LinearGradient colors={["#6E0000", "#400000"]} style={styles.LiveScoreBodySpectatorTitle}>
                <Text style={styles.LiveScoreBodySpectatorTitleText}>Spectators</Text>
              </LinearGradient>
              <View style={styles.LiveScoreBodySpectatorContent}>
                {
                  info ? 
                    info.map(d => {
                      if(d.seatNumber == 0)
                        return (
                          <View style={styles.LiveScoreBodySpectatorContentPlayer}>
                            <Image source={require('../assets/images/others/player1.png')} style={styles.LiveScoreBodySpectatorContentPlayerIcon}/>
                            <View style={{}}>
                              <Text style={{fontSize: 8, lineHeight: 9, color: '#FAE88C'}}>{d.username}</Text>
                            </View>
                          </View>
                        )
                    })
                    :
                    <></>
                }
              </View>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  LiveScoreContainer: {
    position: 'absolute',
    right: 0,
    width: 326,
    height: '100%',
    zIndex: 999,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    
  },
  LiveScoreBodyWrapper: {
      position: 'relative',
      height: '100%',
  },
  LiveScoreTitle: {
    height: 43,
    justifyContent: 'center',
    alignItems: 'center'
  },
  LiveScoreTitleText: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 17,
    color: '#FAE88C'
  },
  LiveScoreBody: {
      width: '100%',
      height: 344
  },
  LiveScoreBodyTitleWrapper: {
    flexDirection: 'row'
  },
  LiveScoreBodyContent: {
    height: '100%',
    flex: 0.5
  },
  LiveScoreBodyTitle: {
    width: '100%',
    height: 27,
    alignItems: 'center',
    justifyContent: 'center'
  },
  marginRight: {
    marginRight: 0.5
  },
  marginLeft: {
    marginLeft: 0.5
  },
  LiveScoreBodyTitleText: {
    fontSize: 11,
    fontWeight: 'bold',
    lineHeight: 12,
    color: '#FAE88C'
  },
  LiveScoreBodyContentDetail: {
    height: 317,
    backgroundColor: '#1E1E1E'
  },
  LiveScoreBodyContentDetailRow: {
    height: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
    alignItems: 'center',
    justifyContent: 'center'
  },
  LiveScoreBodyContentDetailRowText: {
    fontSize: 11,
    fontWeight: 'bold',
    lineHeight: 12,
    color: '#E6E6E6' 
  },
  LiveScoreBodyContentDetailRowValueGreen: {
    fontSize: 12, 
    lineHeight: 14, 
    color: '#00F930'
  },
  LiveScoreBodyContentDetailRowValueRed: {
    fontSize: 12, 
    lineHeight: 14, 
    color: '#F03939'
  },
  LiveScoreBodySpectator: {
    height: '100%'
  },
  LiveScoreBodySpectatorTitle: {
    height: 38,
    alignItems: 'center',
    justifyContent: 'center'
  },
  LiveScoreBodySpectatorTitleText: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 16,
    color: '#FAE88C'
  },
  LiveScoreBodySpectatorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 13,
    flexWrap: 'wrap',
    transform: [{ scaleX: scale }, { scaleY: scale }]
  },
  LiveScoreBodySpectatorContentPlayer: {
    width: '33.333%',
    alignItems: 'center',
    paddingBottom: 17
  },
  LiveScoreBodySpectatorContentPlayerIcon: {
    width: 45,
    height: 44,
    marginBottom: 4,
  }
});

