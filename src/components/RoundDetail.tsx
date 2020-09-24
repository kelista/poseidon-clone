import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from "@react-native-community/slider";

const windowWidth = Dimensions.get('window').width;
const scale = windowWidth/414

export const RoundDetail = () => {
    const balance = 1000;
    const [sliderValue, setsliderValue] = useState(0);
    const setSliderMethod = (sliderValue: number) => {
		setsliderValue(sliderValue)
    }
    
  return (
    <View style={styles.RoundDetailContainer}>
        <View style={styles.RoundBodyWrapper}>
            <View style={styles.RoundDetailTitle}>
                <Text style={styles.RoundDetailTitleText}>Round Detail</Text>
            </View>
            <LinearGradient colors={["#6E0000", "#400000"]} style={styles.RoundDetailHeader} >
                <Text style={styles.RoundDetailHeaderText}>Round: #1234123</Text>
            </LinearGradient>
            <View>
                <View style={styles.RoundDetailList}>
                    <View style={styles.RoundDetailListRowOne}>
                        <View style={styles.RoundDetailListRowOneWrapper}>
                            <Image source={require('../assets/images/others/player1.png')} style={styles.RoundDetailUserIcon}/>
                            <View style={{}}>
                                <Text style={styles.RoundDetailListRowOneText}>Wyvern</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.RoundDetailListRowTwo}>
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginTop: 2.2,
                                transform: [{ rotate: "-15deg" }],
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_jack.png')}/>
                                {/* <Image
                                source={images[player1?.cards[0]]}
                                style={ThreePic.cardImage}
                                /> */}
                            </View>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginLeft: -1,
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_queen.png')}/>
                                {/* <Image
                                source={images[player1?.cards[1]]}
                                style={ThreePic.cardImage}
                                ></Image> */}
                            </View>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginLeft: -1,
                                marginTop: 2.2,
                                transform: [{ rotate: "15deg" }],
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_king.png')}/>
                                {/* <Image
                                source={images[player1?.cards[2]]}
                                style={ThreePic.cardImage}
                                ></Image> */}
                            </View>
                        </View>
                        <View style={{paddingTop: 5.6}}>
                            <Text style={{fontSize: 8, lineHeight: 9, color: '#FFFFFF'}}>9Pts</Text>
                        </View>
                    </View>
                    <View style={styles.RoundDetailListRowThree}>
                        <View style={styles.RoundDetailListRowThreeWrapper}>
                            <Text style={styles.RoundDetailListRowThreeText}>+1,234</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.RoundDetailList}>
                    <View style={styles.RoundDetailListRowOne}>
                        <View style={styles.RoundDetailListRowOneWrapper}>
                            <Image source={require('../assets/images/others/player1.png')} style={styles.RoundDetailUserIcon}/>
                            <View style={{}}>
                                <Text style={styles.RoundDetailListRowOneText}>Wyvern</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.RoundDetailListRowTwo}>
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginTop: 2.2,
                                transform: [{ rotate: "-15deg" }],
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_jack.png')}/>
                                {/* <Image
                                source={images[player1?.cards[0]]}
                                style={ThreePic.cardImage}
                                /> */}
                            </View>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginLeft: -1,
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_queen.png')}/>
                                {/* <Image
                                source={images[player1?.cards[1]]}
                                style={ThreePic.cardImage}
                                ></Image> */}
                            </View>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginLeft: -1,
                                marginTop: 2.2,
                                transform: [{ rotate: "15deg" }],
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_king.png')}/>
                                {/* <Image
                                source={images[player1?.cards[2]]}
                                style={ThreePic.cardImage}
                                ></Image> */}
                            </View>
                        </View>
                        <View style={{paddingTop: 5.6}}>
                            <Text style={{fontSize: 8, lineHeight: 9, color: '#FFFFFF'}}>9Pts</Text>
                        </View>
                    </View>
                    <View style={styles.RoundDetailListRowThree}>
                        <View style={styles.RoundDetailListRowThreeWrapper}>
                            <Text style={styles.RoundDetailListRowThreeText}>+1,234</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.RoundDetailList}>
                    <View style={styles.RoundDetailListRowOne}>
                        <View style={styles.RoundDetailListRowOneWrapper}>
                            <Image source={require('../assets/images/others/player1.png')} style={styles.RoundDetailUserIcon}/>
                            <View style={{}}>
                                <Text style={styles.RoundDetailListRowOneText}>Wyvern</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.RoundDetailListRowTwo}>
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginTop: 2.2,
                                transform: [{ rotate: "-15deg" }],
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_jack.png')}/>
                                {/* <Image
                                source={images[player1?.cards[0]]}
                                style={ThreePic.cardImage}
                                /> */}
                            </View>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginLeft: -1,
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_queen.png')}/>
                                {/* <Image
                                source={images[player1?.cards[1]]}
                                style={ThreePic.cardImage}
                                ></Image> */}
                            </View>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginLeft: -1,
                                marginTop: 2.2,
                                transform: [{ rotate: "15deg" }],
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_king.png')}/>
                                {/* <Image
                                source={images[player1?.cards[2]]}
                                style={ThreePic.cardImage}
                                ></Image> */}
                            </View>
                        </View>
                        <View style={{paddingTop: 5.6}}>
                            <Text style={{fontSize: 8, lineHeight: 9, color: '#FFFFFF'}}>9Pts</Text>
                        </View>
                    </View>
                    <View style={styles.RoundDetailListRowThree}>
                        <View style={styles.RoundDetailListRowThreeWrapper}>
                            <Text style={styles.RoundDetailListRowThreeText}>+1,234</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.RoundDetailList}>
                    <View style={styles.RoundDetailListRowOne}>
                        <View style={styles.RoundDetailListRowOneWrapper}>
                            <Image source={require('../assets/images/others/player1.png')} style={styles.RoundDetailUserIcon}/>
                            <View style={{}}>
                                <Text style={styles.RoundDetailListRowOneText}>Wyvern</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.RoundDetailListRowTwo}>
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginTop: 2.2,
                                transform: [{ rotate: "-15deg" }],
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_jack.png')}/>
                                {/* <Image
                                source={images[player1?.cards[0]]}
                                style={ThreePic.cardImage}
                                /> */}
                            </View>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginLeft: -1,
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_queen.png')}/>
                                {/* <Image
                                source={images[player1?.cards[1]]}
                                style={ThreePic.cardImage}
                                ></Image> */}
                            </View>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginLeft: -1,
                                marginTop: 2.2,
                                transform: [{ rotate: "15deg" }],
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_king.png')}/>
                                {/* <Image
                                source={images[player1?.cards[2]]}
                                style={ThreePic.cardImage}
                                ></Image> */}
                            </View>
                        </View>
                        <View style={{paddingTop: 5.6}}>
                            <Text style={{fontSize: 8, lineHeight: 9, color: '#FFFFFF'}}>9Pts</Text>
                        </View>
                    </View>
                    <View style={styles.RoundDetailListRowThree}>
                        <View style={styles.RoundDetailListRowThreeWrapper}>
                            <Text style={styles.RoundDetailListRowThreeText}>+1,234</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.RoundDetailList}>
                    <View style={styles.RoundDetailListRowOne}>
                        <View style={styles.RoundDetailListRowOneWrapper}>
                            <Image source={require('../assets/images/others/player1.png')} style={styles.RoundDetailUserIcon}/>
                            <View style={{}}>
                                <Text style={styles.RoundDetailListRowOneText}>Wyvern</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.RoundDetailListRowTwo}>
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginTop: 2.2,
                                transform: [{ rotate: "-15deg" }],
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_jack.png')}/>
                                {/* <Image
                                source={images[player1?.cards[0]]}
                                style={ThreePic.cardImage}
                                /> */}
                            </View>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginLeft: -1,
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_queen.png')}/>
                                {/* <Image
                                source={images[player1?.cards[1]]}
                                style={ThreePic.cardImage}
                                ></Image> */}
                            </View>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginLeft: -1,
                                marginTop: 2.2,
                                transform: [{ rotate: "15deg" }],
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_king.png')}/>
                                {/* <Image
                                source={images[player1?.cards[2]]}
                                style={ThreePic.cardImage}
                                ></Image> */}
                            </View>
                        </View>
                        <View style={{paddingTop: 5.6}}>
                            <Text style={{fontSize: 8, lineHeight: 9, color: '#FFFFFF'}}>9Pts</Text>
                        </View>
                    </View>
                    <View style={styles.RoundDetailListRowThree}>
                        <View style={styles.RoundDetailListRowThreeWrapper}>
                            <Text style={styles.RoundDetailListRowThreeTextRed}>+1,234</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.RoundDetailList}>
                    <View style={styles.RoundDetailListRowOne}>
                        <View style={styles.RoundDetailListRowOneWrapper}>
                            <Image source={require('../assets/images/others/player1.png')} style={styles.RoundDetailUserIcon}/>
                            <View style={{}}>
                                <Text style={styles.RoundDetailListRowOneText}>Wyvern</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.RoundDetailListRowTwo}>
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginTop: 2.2,
                                transform: [{ rotate: "-15deg" }],
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_jack.png')}/>
                                {/* <Image
                                source={images[player1?.cards[0]]}
                                style={ThreePic.cardImage}
                                /> */}
                            </View>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginLeft: -1,
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_queen.png')}/>
                                {/* <Image
                                source={images[player1?.cards[1]]}
                                style={ThreePic.cardImage}
                                ></Image> */}
                            </View>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginLeft: -1,
                                marginTop: 2.2,
                                transform: [{ rotate: "15deg" }],
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_king.png')}/>
                                {/* <Image
                                source={images[player1?.cards[2]]}
                                style={ThreePic.cardImage}
                                ></Image> */}
                            </View>
                        </View>
                        <View style={{paddingTop: 5.6}}>
                            <Text style={{fontSize: 8, lineHeight: 9, color: '#FFFFFF'}}>9Pts</Text>
                        </View>
                    </View>
                    <View style={styles.RoundDetailListRowThree}>
                        <View style={styles.RoundDetailListRowThreeWrapper}>
                            <Text style={styles.RoundDetailListRowThreeText}>+1,234</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.RoundDetailList}>
                    <View style={styles.RoundDetailListRowOne}>
                        <View style={styles.RoundDetailListRowOneWrapper}>
                            <Image source={require('../assets/images/others/player1.png')} style={styles.RoundDetailUserIcon}/>
                            <View style={{}}>
                                <Text style={styles.RoundDetailListRowOneText}>Wyvern</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.RoundDetailListRowTwo}>
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginTop: 2.2,
                                transform: [{ rotate: "-15deg" }],
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_jack.png')}/>
                                {/* <Image
                                source={images[player1?.cards[0]]}
                                style={ThreePic.cardImage}
                                /> */}
                            </View>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginLeft: -1,
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_queen.png')}/>
                                {/* <Image
                                source={images[player1?.cards[1]]}
                                style={ThreePic.cardImage}
                                ></Image> */}
                            </View>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginLeft: -1,
                                marginTop: 2.2,
                                transform: [{ rotate: "15deg" }],
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_king.png')}/>
                                {/* <Image
                                source={images[player1?.cards[2]]}
                                style={ThreePic.cardImage}
                                ></Image> */}
                            </View>
                        </View>
                        <View style={{paddingTop: 5.6}}>
                            <Text style={{fontSize: 8, lineHeight: 9, color: '#FFFFFF'}}>9Pts</Text>
                        </View>
                    </View>
                    <View style={styles.RoundDetailListRowThree}>
                        <View style={styles.RoundDetailListRowThreeWrapper}>
                            <Text style={styles.RoundDetailListRowThreeText}>+1,234</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.RoundDetailList}>
                    <View style={styles.RoundDetailListRowOne}>
                        <View style={styles.RoundDetailListRowOneWrapper}>
                            <Image source={require('../assets/images/others/player1.png')} style={styles.RoundDetailUserIcon}/>
                            <View style={{}}>
                                <Text style={styles.RoundDetailListRowOneText}>Wyvern</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.RoundDetailListRowTwo}>
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginTop: 2.2,
                                transform: [{ rotate: "-15deg" }],
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_jack.png')}/>
                                {/* <Image
                                source={images[player1?.cards[0]]}
                                style={ThreePic.cardImage}
                                /> */}
                            </View>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginLeft: -1,
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_queen.png')}/>
                                {/* <Image
                                source={images[player1?.cards[1]]}
                                style={ThreePic.cardImage}
                                ></Image> */}
                            </View>
                            <View
                                style={{
                                width: 17,
                                height: 21,
                                marginLeft: -1,
                                marginTop: 2.2,
                                transform: [{ rotate: "15deg" }],
                                }}
                            >
                                <Image source={require('../assets/images/card/small/card_king.png')}/>
                                {/* <Image
                                source={images[player1?.cards[2]]}
                                style={ThreePic.cardImage}
                                ></Image> */}
                            </View>
                        </View>
                        <View style={{paddingTop: 5.6}}>
                            <Text style={{fontSize: 8, lineHeight: 9, color: '#FFFFFF'}}>9Pts</Text>
                        </View>
                    </View>
                    <View style={styles.RoundDetailListRowThree}>
                        <View style={styles.RoundDetailListRowThreeWrapper}>
                            <Text style={styles.RoundDetailListRowThreeText}>+1,234</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Slider
                style={styles.RoundDetailSlider}
                step={1}
                minimumValue={0}
                maximumValue={balance}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#8E8E8E"
                value={sliderValue}
                onValueChange={(sliderValue) => setSliderMethod(sliderValue)}
                thumbTintColor="#730000"
                thumbImage={require("../assets/images/others/slider-button-new.png")}
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  RoundDetailContainer: {
    position: 'absolute',
    left: 0,
    width: 259,
    height: '100%',
    zIndex: 999,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    
  },
  RoundBodyWrapper: {
      position: 'relative',
      height: '100%',
    //   backgroundColor: 'red'
    // transform: [{ scaleX: scale }, { scaleY: scale }]
  },
  RoundDetailTitle: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center'
  },
  RoundDetailTitleText: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 17,
    color: '#FAE88C'
  },
  RoundDetailHeader: {
    height: 26,
    justifyContent: 'center'
  },
  RoundDetailHeaderText: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 17,
    color: '#FAE88C',
    paddingLeft: 29,
  },
  RoundDetailUserIcon: {
      width: 29,
      height: 29,
  },
  RoundDetailSlider: {
    width: "100%",
    height: 18,
    marginTop: 24,
    transform: [{ scaleX: scale }, { scaleY: scale }]
    // backgroundColor: 'green'
  },
  RoundDetailList: {
    height: 41, 
    marginTop: scale < 0.9 ? 8: 12, 
    paddingLeft: 30, 
    paddingRight: 24, 
    display: 'flex', 
    flexDirection: 'row'
  },
  RoundDetailListRowOne: {
    flex: 0.31, alignItems: 'center',
    transform: [{ scaleX: scale }, { scaleY: scale }],
    // backgroundColor: 'red'
  },
  RoundDetailListRowTwo: {
    flex: 0.268, alignItems: 'center',
    transform: [{ scaleX: scale }, { scaleY: scale }]
  },
  RoundDetailListRowThree: {
    flex: 0.421, alignItems: 'center',
    transform: [{ scaleX: scale }, { scaleY: scale }]
  },
  RoundDetailListRowOneWrapper: {
    width: '100%',
    height: '100%', 
    alignItems: 'flex-start'
  },
  RoundDetailListRowOneText: {
    fontSize: 8, 
    lineHeight: 9, 
    color: '#FAE88C'
  },
  RoundDetailListRowThreeWrapper: {
    width: '100%', 
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'flex-end'
  },
  RoundDetailListRowThreeText: {
    fontSize: 12, 
    lineHeight: 14, 
    color: '#00F930'
  },
  RoundDetailListRowThreeTextRed: {
    fontSize: 12, 
    lineHeight: 14, 
    color: '#F03939'
  }
});

