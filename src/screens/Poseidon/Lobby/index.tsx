import React, { useEffect, useState, useContext, useMemo } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Image, ImageBackground, ImageSourcePropType, StyleProp, ViewStyle, ImageStyle, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import { ROUTES } from "../../../../routes";
import { BSContext } from "../../../../routes/bsContext";
import { WebSocketClient } from "../../../services/websocket"
import { initBacksound } from '../../../services/sound_manager'
import { CustomHeader } from "../../../components/Header"
import { CustomheaderLogo } from "../../../components/HeaderLogo"
import { BottomNavigation } from "../../../components/BottomNavigation"
import LobbyStyle from "../../../styles/LobbyStyle"
import { Backsound } from "../../../services/soundServices"
import { WSContext } from '../../../../routes/wsContext';
import { SSContext } from '../../../../routes/simpleStoreContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatementInfo } from '../../../components/Statement'

interface Game {
  _id: string;
  name: string;
  codename: string;
}

interface GameSelect {
  codename: string;
  image: ImageSourcePropType;
  route: string;
  wrapStyle: StyleProp<ViewStyle>,
  lobbyStyle: StyleProp<ImageStyle>
}

interface GameSelectComponentProps {
  image: ImageSourcePropType;
  press: any;
  wrapStyle: StyleProp<ViewStyle>,
  lobbyStyle: StyleProp<ImageStyle>
}

function GameSelectComponent({ press, image, wrapStyle, lobbyStyle }: GameSelectComponentProps) {
  return (<View style={wrapStyle}>
    <TouchableOpacity onPress={press}>
      <Image source={image} style={lobbyStyle} />
    </TouchableOpacity>
  </View>)
}

const games: GameSelect[] = [
  {
    codename: "three-pictures",
    image: require('../../../assets/images/others/3pic-image.png'),
    route: ROUTES.PoseidonThreePicRoom,
    wrapStyle: LobbyStyle.lobbyGameThreePicWrapper,
    lobbyStyle: LobbyStyle.lobbyGameThreePic
  }
]

const infoEvent = "info";

export const PoseidonLobby: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;

  const wsClient = useContext(WSContext)
  const bs = useContext(BSContext);
  const ss = useContext(SSContext);

  const [availableGames, setAvailableGames] = useState<Game[]>([]);
  const [modalStatement, setModalStatement] = useState(false)

  // contoh: game Three Pictures => codename nya three-pictures (ini dari backend, jadi tinggal panggil doang)
  const codenames = availableGames.map(g => g.codename);

  const lobbyGamesEvent = "lobby/games";
  const messageStr = JSON.stringify({ event: lobbyGamesEvent });
  const [connecting, setConnecting] = useState(true);
  const [username, setUsername] = useState("");
  const [balancePlayer, setBalancePlayer] = useState(0);

  // connect
  useEffect(function cb() {
    wsClient?.connect(() => {
      setConnecting(false);
      console.log("connected");
      wsClient?.sendMessage(lobbyGamesEvent, { event: lobbyGamesEvent });
      updateInfo()
    }, () => {
      console.log("disconnected");
      navigate(ROUTES.PoseidonLogin);
    });
  }, [ss.token?.value]);

  const updateInfo = () => {
    wsClient?.sendMessage(infoEvent, {});
  }

  // listen connect
  useEffect(function cb() {
    if (!wsClient) return;
    const listeners: string[] = [];

    const connectCB = async function (data: any) {
      setAvailableGames(data);
    }

    const infoAction = async function (data: any) {
      setUsername(data.username);
      setBalancePlayer(data.balance);
    }

    const lobbyListenerId = wsClient.addListener(lobbyGamesEvent, connectCB);
    listeners.push(lobbyListenerId);

    const infoListener = wsClient.addListener(infoEvent, infoAction);
    listeners.push(infoListener);

    return () => {
      listeners.map(lst => {
        wsClient?.removeListener(lst);
      })
    }
  }, [wsClient ? true : false]);

  // start sound
  useEffect(function bsEffect() {
    bs?.start();

    return function unmount() {
      bs?.stop();
    }
  }, [bs ? true : false]);

  const skpGameRoom = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonSkpRoom);
  };

  const threePicGameROom = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonThreePicRoom);
  };

  const goToHome = () => {
    setModalStatement(false)
    navigate(ROUTES.PoseidonLobby)
  };

  const goToSetting = () => {
    setModalStatement(false)
    navigate(ROUTES.PoseidonAccount)
  }

  const closeOpenStatement = () => {
    setModalStatement(!modalStatement)
  }

  const insets = useSafeAreaInsets();

  const styleSafeArea:any = useMemo(() => {
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    return {
      minHeight: windowHeight - (insets.bottom + insets.top) - 53,
      width: windowWidth,
      backgroundColor: '#000000'
    }
  },[insets])


  if (connecting) return (<Text>Connecting</Text>)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" />
      <View style={{flex: 1}}>
        <CustomheaderLogo name="lobby" lobby={() => false}></CustomheaderLogo>
        <ScrollView scrollEnabled={modalStatement ? false : true}>
          <StatusBar hidden />
          {
            modalStatement ? <StatementInfo></StatementInfo> : <></>
          }
          <View style={{...styleSafeArea}}>
            <Image source={require('../../../assets/images/others/home.png')} />
            <CustomHeader title={username} status="userLobby" balance={balancePlayer} updateInfo={updateInfo}></CustomHeader>
            <View style={LobbyStyle.lobbyImageContainer}>
              <View style={LobbyStyle.lobbyImageWrapper}>
                <ImageBackground source={require('../../../assets/images/others/background-revision.png')} style={LobbyStyle.lobbyImageBackground}></ImageBackground>
                <View style={LobbyStyle.lobbyGameWrapper}>
                  {/* <View style={LobbyStyle.lobbyGameSkpWrapper}>
                    <TouchableOpacity onPress={skpGameRoom}>
                      <Image source={require('../../../assets/images/others/skp-image.png')} style={LobbyStyle.lobbyGameSkp} />
                    </TouchableOpacity>
                  </View>
                  <View style={LobbyStyle.lobbyGameThreePicWrapper}>
                    <TouchableOpacity onPress={threePicGameROom}>
                      <Image source={require('../../../assets/images/others/3pic-image.png')} style={LobbyStyle.lobbyGameThreePic} />
                    </TouchableOpacity>
                  </View> */}

                  {/* test only */}
                  {/* <View style={LobbyStyle.lobbyGameSkpWrapper}>
                    <TouchableOpacity onPress={skpGameRoom}>
                      <Image source={require('../../../assets/images/others/skp-image.png')} style={LobbyStyle.lobbyGameSkp} />
                    </TouchableOpacity>
                  </View> */}
                  {
                    games.map(g => {
                      if (codenames.includes(g.codename)) {
                        return <GameSelectComponent key={g.codename}
                          press={() => navigate(g.route)}
                          image={g.image}
                          lobbyStyle={g.lobbyStyle}
                          wrapStyle={g.wrapStyle}
                        />
                      }
                    })
                  }
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <BottomNavigation 
          home={() => goToHome()} 
          setting={goToSetting} 
          status={'room'} 
          liveScore={() => closeOpenStatement()}>
        </BottomNavigation>
      </View>
    </SafeAreaView>
  );
};
