import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { images } from "../services/imageServices";
import Svg, { Circle, Rect, Path } from "react-native-svg";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ThreePicGameRules = (props: any) => {
  const {
		close
  } = props; 
  
  const insets = useSafeAreaInsets();

  const [rulesStats, setRulesStats] = useState('handranks');
  
  const changeStat = (stats:any) => {
    setRulesStats(stats)
  }

  const SkpRulesContainer:any = useMemo(() => {
    const windowHeight = Dimensions.get('window').height;
    return {
      position: "absolute",
      minHeight: windowHeight - (insets.bottom + insets.top) - 106,
      width: "100%",
      zIndex: 1000,
      justifyContent: "center",
      alignItems: "center",
    }
  },[insets])

  return (
    <View style={{...SkpRulesContainer}}>
      <View style={styles.SkpRulesContent}>
        <View style={styles.SkpRulesTitle}>
          <TouchableOpacity style={styles.checkInClose} onPress={() => close()}>
            <Svg width={13.426} height={13.423} viewBox="0 0 13.426 13.423">
              <Path
                data-name="Icon ionic-ios-close"
                d="M8.304 6.711l4.8-4.8A1.124 1.124 0 0011.515.327l-4.8 4.8-4.8-4.8A1.124 1.124 0 10.331 1.911l4.8 4.8-4.8 4.8a1.124 1.124 0 001.584 1.584l4.8-4.8 4.8 4.8a1.124 1.124 0 101.584-1.584z"
                fill="#fae087"
              />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.SkpRulesTitleText}>Game Info</Text>
        </View>
        <View style={styles.SkpRulesLinearWrapper}>
          <LinearGradient colors={rulesStats == 'handranks' ? ["#751C1C", "#1D0000"] : ["#E60000", "#730000"]} style={styles.SkpRulesLinearGradient}>
            <TouchableOpacity style={styles.SkpRulesLinearButton} onPress={() => changeStat('handranks')}>
              <Text style={styles.SkpRulesLinearButtonText}>Hand Ranks</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient colors={rulesStats == 'gamerules' ? ["#751C1C", "#1D0000"] : ["#E60000", "#730000"]} style={styles.SkpRulesLinearGradient}>
            <TouchableOpacity style={styles.SkpRulesLinearButton} onPress={() => changeStat('gamerules')}>
              <Text style={styles.SkpRulesLinearButtonText}>Game Rules</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient colors={rulesStats == 'modeinfo' ? ["#751C1C", "#1D0000"] : ["#E60000", "#730000"]} style={styles.SkpRulesLinearGradient}>
            <TouchableOpacity style={styles.SkpRulesLinearButton} onPress={() => changeStat('modeinfo')}>
              <Text style={styles.SkpRulesLinearButtonText}>Mode Info</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.SkpRulesContentData}>
          {
            rulesStats == 'handranks' ?
              <ScrollView>
                <View style={{flex: 1, paddingBottom: 12}}>
                  <View style={styles.SkpRulesContentCardImageContainer}>
                    <View style={styles.SkpRulesContentCardImageWrapper}>
                      <Image source={images['back']} style={[styles.SkpRulesContentCardImage, {marginTop: 3.2,transform: [{ rotate: "-12deg" }]}]}/>
                      <Image source={images['back']} style={[styles.SkpRulesContentCardImage, {transform: [{ rotate: "-180deg" }]}]}/>
                      <Image source={images['back']} style={[styles.SkpRulesContentCardImage, {marginTop: 3.2, transform: [{ rotate: "-169deg" }]}]}/>
                    </View>
                  </View>
                </View>
                <View style={styles.SkpRulesContentImage}>
                  <Text style={styles.SkpRulesTitleText}>SPECIAL COMBOS</Text>
                </View>
                <View style={styles.SkpRulesSpecialComboWrapper}>
                  <View style={styles.SkpRulesSpecialComboHand}>
                    <Text style={styles.SkpRulesSpecialComboText}>HAND</Text>
                  </View>
                  <View style={styles.SkpRulesSpecialComboTitle}>
                    <Text style={styles.SkpRulesSpecialComboText}>TITLE</Text>
                  </View>
                </View>
                <View style={styles.SkpRulesSpecialComboWrapper}>
                  <View style={styles.SkpRulesSpecialComboHandContent}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.SkpRulesSpecialComboHandContentImage}>
                        <View style={styles.SkpRulesContentCardImageWrapper}>
                          <Image source={images['JH']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['QS']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['KD']} style={styles.SkpRulesSpecialComboImage}/>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.SkpRulesSpecialComboTitleContent}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.SkpRulesSpecialComboHandContentImage}>
                        <Text style={styles.SkpRulesSpecialText}>Three Knights</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.SkpRulesContentImage}>
                  <Text style={styles.SkpRulesTitleText}>RESPECTIVE TIERS</Text>
                </View>
                <View style={styles.SkpRulesSpecialComboWrapper}>
                  <View style={styles.SkpRulesSpecialComboHand}>
                    <Text style={styles.SkpRulesSpecialComboText}>HAND</Text>
                  </View>
                  <View style={styles.SkpRulesSpecialComboTitle}>
                    <Text style={styles.SkpRulesSpecialComboText}>TITLE</Text>
                  </View>
                </View>
                <View style={styles.SkpRulesSpecialComboWrapper}> 
                  <View style={styles.SkpRulesSpecialComboHandContent}>

                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <View style={styles.SkpRulesContentCardImageWrapper}>
                          <Image source={images['KH']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['7S']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['2C']} style={styles.SkpRulesSpecialComboImage}/>
                          <Text style={styles.separatorTextCircle}>...</Text>
                          <Image source={images['AD']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['5D']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['3C']} style={styles.SkpRulesSpecialComboImage}/>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <View style={styles.SkpRulesContentCardImageWrapper}>
                          <Image source={images['KH']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['6S']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['2C']} style={styles.SkpRulesSpecialComboImage}/>
                          <Text style={styles.separatorTextCircle}>...</Text>
                          <Image source={images['AD']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['5D']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['2C']} style={styles.SkpRulesSpecialComboImage}/>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <View style={styles.SkpRulesContentCardImageWrapper}>
                          <Image source={images['KH']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['5S']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['2C']} style={styles.SkpRulesSpecialComboImage}/>
                          <Text style={styles.separatorTextCircle}>...</Text>
                          <Image source={images['AD']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['4D']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['2C']} style={styles.SkpRulesSpecialComboImage}/>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <View style={styles.SkpRulesContentCardImageWrapper}>
                          <Image source={images['KH']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['4S']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['2C']} style={styles.SkpRulesSpecialComboImage}/>
                          <Text style={styles.separatorTextCircle}>...</Text>
                          <Image source={images['AD']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['3D']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['2C']} style={styles.SkpRulesSpecialComboImage}/>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <View style={styles.SkpRulesContentCardImageWrapper}>
                          <Image source={images['KH']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['3S']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['2C']} style={styles.SkpRulesSpecialComboImage}/>
                          <Text style={styles.separatorTextCircle}>...</Text>
                          <Image source={images['QD']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['AD']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['4C']} style={styles.SkpRulesSpecialComboImage}/>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <View style={styles.SkpRulesContentCardImageWrapper}>
                          <Image source={images['KH']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['2S']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['2C']} style={styles.SkpRulesSpecialComboImage}/>
                          <Text style={styles.separatorTextCircle}>...</Text>
                          <Image source={images['QD']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['AD']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['3C']} style={styles.SkpRulesSpecialComboImage}/>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <View style={styles.SkpRulesContentCardImageWrapper}>
                          <Image source={images['KH']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['10S']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['3C']} style={styles.SkpRulesSpecialComboImage}/>
                          <Text style={styles.separatorTextCircle}>...</Text>
                          <Image source={images['QD']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['JD']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['3C']} style={styles.SkpRulesSpecialComboImage}/>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <View style={styles.SkpRulesContentCardImageWrapper}>
                          <Image source={images['KH']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['10S']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['2C']} style={styles.SkpRulesSpecialComboImage}/>
                          <Text style={styles.separatorTextCircle}>...</Text>
                          <Image source={images['QD']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['JD']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['2C']} style={styles.SkpRulesSpecialComboImage}/>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <View style={styles.SkpRulesContentCardImageWrapper}>
                          <Image source={images['KH']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['10S']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['AC']} style={styles.SkpRulesSpecialComboImage}/>
                          <Text style={styles.separatorTextCircle}>...</Text>
                          <Image source={images['QD']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['JD']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['AC']} style={styles.SkpRulesSpecialComboImage}/>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <View style={styles.SkpRulesContentCardImageWrapper}>
                          <Image source={images['KH']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['10S']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['10C']} style={styles.SkpRulesSpecialComboImage}/>
                          <Text style={styles.separatorTextCircle}>...</Text>
                          <Image source={images['QD']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['JD']} style={styles.SkpRulesSpecialComboImage}/>
                          <Image source={images['10C']} style={styles.SkpRulesSpecialComboImage}/>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.SkpRulesSpecialComboTitleContent}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <Text style={styles.SkpRulesSpecialText}>9 Pts</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <Text style={styles.SkpRulesSpecialText}>8 Pts</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <Text style={styles.SkpRulesSpecialText}>7 Pts</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <Text style={styles.SkpRulesSpecialText}>6 Pts</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <Text style={styles.SkpRulesSpecialText}>5 Pts</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <Text style={styles.SkpRulesSpecialText}>4 Pts</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <Text style={styles.SkpRulesSpecialText}>3 Pts</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <Text style={styles.SkpRulesSpecialText}>2 Pts</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <Text style={styles.SkpRulesSpecialText}>1 Pt</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={[styles.SkpRulesSpecialComboHandContentImageRespective, {paddingTop: 16}]}>
                        <Text style={styles.SkpRulesSpecialText}>0 Pt</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            :
            <></>
          }
          {
            rulesStats == 'gamerules' ?
              <ScrollView>
                <View style={{flex: 1, paddingBottom: 12, paddingTop: 17, paddingLeft: 10, paddingRight: 10}}>
                  <Text style={styles.SkpRulesText}>The Game of Three Pictures shall be played with one deck of 52 cards without jokers and with backs of the same colour and design. {'\n'} </Text>
                  <Text style={styles.SkpRulesText}>Commencement of play shall begin when the Dealer open the bet phase and close when the modal is closed.{'\n'}</Text>
                  <Text style={styles.SkpRulesText}>After all wagers have been placed, starting from the Banker’s left and continuing clockwise, the Banker shall deal three cards face down to each playing area. The Banker will receive the last hand dealt.</Text>
                  <View style={{paddingTop: 15.3}}>
                    <Text style={styles.SkpRulesText}>Each hand consists of three cards with the point total of each hand determined by adding the value of each individual card. The point of each is their face value except for: </Text>
                    <Text style={[styles.SkpRulesText, {paddingLeft: 19}]}>1. Ten, King, Queen, Jack which have point value of zero.</Text>
                    <Text style={[styles.SkpRulesText, {paddingLeft: 19}]}>2. As card which have point value as one.</Text>
                    <Text style={[styles.SkpRulesText, {paddingLeft: 19}]}>3. King, Queen, Jack will rank as knight cards with their respective point total.{'\n'} </Text>
                  </View>
                  <View style={{paddingTop: 15.3}}>
                    <Text style={styles.SkpRulesText}>The point total of a hand shall be: </Text>
                    <Text style={[styles.SkpRulesText, {paddingLeft: 19}]}>1. That number where the total value of the cards in the hand is a number between zero and nine</Text>
                    <Text style={[styles.SkpRulesText, {paddingLeft: 19}]}>2. The right digit of that number where total value of the cards in the hand is the number ten or a higher number. {'\n'} </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.SkpRulesTitleText}>BANKER BET</Text>
                  </View>
                  <View style={{alignItems: 'center', paddingTop: 13}}>
                    <Image source={require("../assets/images/others/banker-rules.png")} style={styles.SkpRulesContentBankerImage}/> 
                  </View>
                  <View style={{paddingTop: 15.3}}>
                    <Text style={styles.SkpRulesText}>Players can decide the amount they wish to wager againts the banker during the betting phase. The minimum bet amount will be placed if the player does not make any wager in the time given. Players can select “Auto Last Bet” function to allow the system to auto place the previous bet by the player continuously. {'\n'} </Text>
                    <Text style={styles.SkpRulesText}>Players have to maintain their wallet balance at 2x of their bets, i.e. if a player wishes to wager 10 againts the Banker, he needs to have 20 in his wallet. </Text>
                  </View>
                  <View style={{alignItems: 'center', paddingTop: 25}}>
                    <Text style={styles.SkpRulesTitleText}>HOW TO WIN</Text>
                  </View>
                  <View style={{paddingTop: 15.3}}>
                    <Text style={styles.SkpRulesText}>Card values in each tier is determined using the combined value of the cards. Player is considered to have won in the following scenarios: </Text>
                    <Text style={[styles.SkpRulesText, {paddingLeft: 19}]}>1. Cards value bigger than banker cards value</Text>
                    <Text style={[styles.SkpRulesText, {paddingLeft: 19}]}>2. Own most Knights cards when the value is tie with Banker {'\n'} </Text>
                    <Text style={styles.SkpRulesText}>Winner will be determined based on the following comparison priorities:</Text>
                    <Text style={[styles.SkpRulesText, {paddingLeft: 19}]}>1. Points</Text>
                    <Text style={[styles.SkpRulesText, {paddingLeft: 19}]}>2. Knight cards number {'\n'} </Text>
                    <Text style={styles.SkpRulesText}>* There are no comparison of shapes in 4 Treasures and Knight cards have no ranking, i.e. King is equal to Queen and Jack.</Text>
                  </View>
                </View>
              </ScrollView>
            :
            <></>
          }
          {
            rulesStats == 'modeinfo' ?
              <ScrollView>
                <View style={{flex: 1, paddingBottom: 12, paddingTop: 15, paddingLeft: 10, paddingRight: 10}}>
                  <View style={{alignItems : 'center'}}>
                    <Text style={styles.SkpRulesTitleText}>GAME MODES</Text>
                  </View>
                  <View style={styles.SkpRulesSpecialComboWrapper}>
                    <View style={styles.SkpRulesModeInfoHand}>
                      <Text style={styles.SkpRulesSpecialComboText}>HAND RANKS</Text>
                    </View>
                    <View style={styles.SkpRulesModeInfoHand}>
                      <Text style={styles.SkpRulesSpecialComboText}>MULTIPLIER MODE</Text>
                    </View>
                  </View>
                  <View style={styles.SkpRulesSpecialComboWrapper}>
                    <View style={styles.SkpRulesModeInfoContent}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.SkpRulesModeInfoContentImage}>
                          <Text style={styles.SkpRulesSpecialText}>Three Knights</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.SkpRulesModeInfoContent}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.SkpRulesModeInfoContentImage}>
                          <Text style={styles.SkpRulesSpecialText}>x 2 pts</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{paddingTop: 15.2}}>
                    <Text style={styles.SkpRulesText}>The Game of Three Pictures shall be played with one deck of 52 cards without jokers and with backs of the same colour and design.</Text>
                  </View>
                </View>
              </ScrollView>
            :
            <></>
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkInClose: {
    position: "absolute",
    right: -15,
    height: "100%",
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  SkpRulesContainer: {
    position: "absolute",
    height: windowHeight - 106,
    width: "100%",
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  SkpRulesContent: {
    position: "relative",
    width: 330,
    height: 475,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    zIndex: 1000,
    borderRadius: 7,
    paddingLeft: 11,
    paddingRight: 11,
  },
  SkpRulesTitle: {
    width: '100%',
    height: 39,
    alignItems: 'center',
    justifyContent: 'center'
  },
  SkpRulesTitleText: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 17,
    color: '#FAE087'
  },
  SkpRulesLinearWrapper: {
    flexDirection: 'row'
  },
  SkpRulesLinearGradient: {
    width: '33.333%',
    height: 27
  },
  SkpRulesLinearButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  SkpRulesLinearButtonText: {
    fontSize: 11,
    fontWeight: 'bold',
    lineHeight: 17,
    color: '#FAE087'
  },
  SkpRulesContentData: {
    flex: 1,
    height: 397,
    paddingBottom: 20
  },
  SkpRulesContentCardImageContainer: {
    paddingTop: 23.5,
    alignItems: 'center'
  },
  SkpRulesContentCardImageWrapper: {
    flexDirection: 'row'
  },
  SkpRulesContentCardImage: {
    width: 29,
    height: 37
  },
  SkpRulesGamesContentCardImage: {
    width: 42.29,
    height: 53.94
  },
  SkpRulesContentImage: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 24.1
  },
  SkpRulesSpecialComboWrapper: {
    flexDirection: 'row'
  },
  SkpRulesSpecialComboHand: {
    marginTop: 11,
    height: 25,
    backgroundColor: '#3A0000',
    width: '64%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  SkpRulesModeInfoHand: {
    marginTop: 11,
    height: 25,
    backgroundColor: '#3A0000',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  SkpRulesSpecialComboHandContent: {
    height: '100%',
    backgroundColor: '#1E1E1E',
    width: '64%',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 15,
  },
  SkpRulesModeInfoContent: {
    height: '100%',
    backgroundColor: '#191919',
    width: '50%',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 15,
  },
  SkpRulesSpecialComboTitleContent: {
    height: '100%',
    paddingTop: 14,
    paddingBottom: 15,
    backgroundColor: '#282727',
    width: '36%',
    alignItems: 'center',
  },
  SkpRulesSpecialComboTitle: {
    marginTop: 11,
    height: 25,
    backgroundColor: '#3A0000',
    width: '36%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  SkpRulesSpecialComboText: {
    fontSize: 11,
    fontWeight: 'bold',
    lineHeight: 12,
    color: '#FFFFFF'
  },
  SkpRulesSpecialComboImage: {
    width: 23,
    height: 30,
    marginRight: 3
  },
  SkpRulesSpecialComboHandContentImage: {
    height: 61,
    justifyContent: 'center'
  },
  SkpRulesModeInfoContentImage: {
    marginTop: 11,
    marginBottom: 11,
    height: 10,
    justifyContent: 'center'
  },
  SkpRulesSpecialComboHandContentImageRespective: {
    height: 30,
    justifyContent: 'center',
    marginBottom: 12
  },
  SkpRulesSpecialText: {
    fontSize: 9,
    fontWeight: 'bold',
    lineHeight: 10,
    color: '#FFFFFF'
  },
  SeparatorText: {
    fontSize: 22, 
    lineHeight: 30, 
    height: 30, 
    fontWeight: 'bold', 
    color: '#FFFFFF', 
    justifyContent: 'center', 
    // paddingLeft: 2, 
    paddingRight: 4, 
    marginTop: -6,
  },
  separatorTextCircle: {
    fontSize: 22, 
    lineHeight: 30, 
    height: 30, 
    fontWeight: 'bold', 
    color: '#FFFFFF', 
    justifyContent: 'center', 
    // paddingLeft: 6, 
    paddingRight: 6,
    marginTop: -6,
  },
  SkpRulesText: {
    fontSize: 10,
    lineHeight: 11,
    color: '#FFFFFF'
  },
  SkpRulesTextValid: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: 'bold',
    color: '#03CC02',
    paddingLeft: 5,
  },
  SkpRulesTextInvalid: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: 'bold',
    color: '#FA3939',
    paddingLeft: 6
  },
  SkpRulesContentBankerImage: {
    width: 116,
    height: 86
  },
  falseCorrectImage: {
    width: 15,
    height: 15
  },
});

