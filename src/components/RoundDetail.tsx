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
                          }}>
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
                          }}>
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
                          }}>
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
            <View style={{ width: '100%', position: 'absolute', bottom: 85}}>
              <View style={{width: "100%", paddingLeft: 10, paddingRight: 10}}>
                  <Slider
                      style={styles.RoundDetailSlider}
                      step={1}
                      minimumValue={0}
                      maximumValue={balance}
                      minimumTrackTintColor="#FFFFFF"
                      maximumTrackTintColor="#8E8E8E"
                      value={sliderValue}
                      onValueChange={(sliderValue) => setSliderMethod(sliderValue)}
                      thumbTintColor="#E30000"
                      // thumbImage={require("../assets/images/others/slider-button-new.png")}
                  />
              </View>
              <View style={styles.RoundDetailPaging}>
                <View style={{position: 'relative', width: '100%'}}>
                    <TouchableOpacity style={styles.RoundDetailPagingButtonBackward}>
                      <Image source={require('../assets/images/others/button-backward.png')} style={styles.RoundDetailPagingButtonBackwardImage}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.RoundDetailPagingButtonBack}>
                      <Image source={require('../assets/images/others/button-back.png')} style={styles.RoundDetailPagingButtonBackwardImage}/>
                    </TouchableOpacity>
                    <View style={{width: '100%', alignItems: 'center'}}>
                    <Text style={styles.RoundDetailPagingText}>57 / 57</Text>
                    </View>
                    <TouchableOpacity style={styles.RoundDetailPagingButtonBackwardReverse}>
                      <Image source={require('../assets/images/others/button-backward.png')} style={styles.RoundDetailPagingButtonBackwardImage}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.RoundDetailPagingButtonBackReverse}>
                      <Image source={require('../assets/images/others/button-back.png')} style={styles.RoundDetailPagingButtonBackwardImage}/>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
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
  },
  RoundDetailPaging: {
		position: 'relative',
    height: 18,
		width: '100%',
		marginTop: 18,
		paddingLeft: 25,
		paddingRight: 25,
		alignItems: 'center',
		justifyContent: 'center'
	},
	RoundDetailPagingText: {
		fontSize: 11,
    fontWeight: 'bold',
    lineHeight: 12,
    color: '#FAE88C'
	},
	RoundDetailPagingButtonBackward: {
		position: 'absolute',
		left: 0,
		width: 18,
		height: 18,
		backgroundColor: '#FAE88C',
		borderRadius: 18,
		transform: [{ translateY: -4.5 }]
  },
  RoundDetailPagingButtonBackwardImage: {
    width: 18,
		height: 18,
  },
	RoundDetailPagingButtonBack: {
		position: 'absolute',
		left: 25,
		width: 18,
		height: 18,
		backgroundColor: '#FAE88C',
		borderRadius: 18,
		transform: [{ translateY: -4.5 }]
	},
	RoundDetailPagingButtonBackwardReverse: {
		position: 'absolute',
		right: 0,
		width: 18,
		height: 18,
		backgroundColor: '#FAE88C',
		borderRadius: 18,
		transform: [{ translateY: -4.5 }, { rotate: "-180deg" }]
	},
	RoundDetailPagingButtonBackReverse: {
		position: 'absolute',
		right: 25,
		width: 18,
		height: 18,
		backgroundColor: '#FAE88C',
		borderRadius: 18,
		transform: [{ translateY: -4.5 }, { rotate: "-180deg" }]
	}
});

