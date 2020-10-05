import React, { useEffect, useContext, useState, useMemo } from "react";
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  ImageSourcePropType,
  ViewStyle,
  TextStyle,
  StyleProp, Dimensions
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { NavigationScreenComponent } from "react-navigation";
import { ROUTES } from "../../../../../routes";
import { CustomHeader } from "../../../../components/Header";
import { BottomNavigation } from "../../../../components/BottomNavigation";
import ThreePic from "../../../../styles/ThreePicStyle";
import { CustomheaderLogo } from "../../../../components/HeaderLogo";
import { WSContext } from "../../../../../routes/wsContext";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatementInfo } from '../../../../components/Statement'

interface Room {
  _id: string;
  no: number;
  name: string;
  min: number;
  mid: number;
  max: number;
  cap: number;
}

// interface RoomGroup {
//   _id: string;
//   codename: string;
//   rooms: IRoom[];
// }

interface RoomsRequest {
  codename: string;
}

interface RoomSelect {
  no: number;
  image: ImageSourcePropType;
  wrapStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
}

const rooms: RoomSelect[] = [
  {
    no: 1,
    image: require("../../../../assets/images/others/room1-image.png"),
    wrapStyle: ThreePic.ThreePicRoomRightPadding,
    textStyle: ThreePic.ThreePicRoomBetText,
  },
  {
    no: 2,
    image: require("../../../../assets/images/others/room2-image.png"),
    wrapStyle: {},
    textStyle: ThreePic.ThreePicRoomBetText,
  },
  {
    no: 3,
    image: require("../../../../assets/images/others/room3-image.png"),
    wrapStyle: ThreePic.ThreePicRoomRightPadding,
    textStyle: ThreePic.ThreePicRoomBetText,
  },
  {
    no: 4,
    image: require("../../../../assets/images/others/room4-image.png"),
    wrapStyle: {},
    textStyle: ThreePic.ThreePicRoomBetText,
  },
];

interface RoomSelectComponentProps {
  image: ImageSourcePropType;
  press: any;
  wrapStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  min: number;
  max: number;
  keyProp: number;
}

function RoomSelectRow({ data, keyProp}: { data: RoomSelectComponentProps[], keyProp: any }) {
  return (
    <View style={ThreePic.ThreePicRoomWrapper} key={keyProp+"ch"}>
      {data.map((d, index) => {
        return <RoomSelectComponent {...d} key={index+"r"} />;
      })}
    </View>
  );
}

function RoomSelectComponent({
  press,
  image,
  wrapStyle,
  textStyle,
  min,
  max,
  keyProp,
}: RoomSelectComponentProps) {
  return (
    <TouchableOpacity key={keyProp} style={wrapStyle} onPress={press}>
      <Image source={image} style={{}} />
      <Text style={textStyle}>
        Min/Max: {min}/{max}
      </Text>
    </TouchableOpacity>
  );
}
const infoEvent = "info";

export const PoseidonThreePicRoom: NavigationScreenComponent<any, any> = (
  props
) => {
  const { navigate } = props.navigation;
  const wsClient = useContext(WSContext);
  const lobbyRoomsEvent = "lobby/rooms";
  const moveEvent = "move";
  const joinEvent = "lobby/join";
  const [listenerReady, setListenerReady] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [username, setUsername] = useState("");
  const [balancePlayer, setBalancePlayer] = useState(0);
  const [modalStatement, setModalStatement] = useState(false)

  const lobbyHandler = () => {
    navigate(ROUTES.PoseidonLobby);
  };

  const gameHandler = (no: number) => {
    wsClient?.sendMessage(joinEvent, { codename: "three-pictures", no: no });
  };

  const chunkedRooms = useMemo(() => {
    const _transformed: any[] = availableRooms.map((ar, index) => {
      const select = rooms.find((r) => r.no === ar.no);
      if (select) {
        const ret: RoomSelectComponentProps = {
          image: select.image,
          press: () => gameHandler(index + 1),
          max: ar.max,
          min: ar.min,
          textStyle: select.textStyle,
          wrapStyle: select.wrapStyle,
          keyProp: index,
        };
        return ret;
      }
    });

    const transformed: RoomSelectComponentProps[] = _transformed.filter(
      (i) => i
    );

    const dataPerRow = 2;
    const rowNums = Math.ceil(transformed.length / dataPerRow);

    let allData: RoomSelectComponentProps[][] = [];
    let index = 0;
    for (let i = 0; i < rowNums; i++) {
      const row: RoomSelectComponentProps[] = [];
      let count = 0;
      while (count++ < dataPerRow) {
        row.push(transformed[index++]);
      }
      allData.push(row);
    }

    return allData;
  }, [availableRooms]);

  useEffect(() => {
    if (!wsClient) return;
    const listeners: string[] = [];

    const connectCB = async function (data: any) {
      setAvailableRooms(data.rooms);
    };

    const moveAction = async function (data: any) {
      if (data !== "L") {
        navigate(ROUTES.PoseidonThreePicGame);
      }
    };

    const roomListenerId = wsClient.addListener(lobbyRoomsEvent, connectCB);
    listeners.push(roomListenerId);

    const moveListener = wsClient.addListener(moveEvent, moveAction);
    listeners.push(moveListener);


    const infoAction = async function (data: any) {
      setUsername(data.username);
      setBalancePlayer(data.balance);
    }

    const infoListener = wsClient.addListener(infoEvent, infoAction);
    listeners.push(infoListener);

    setListenerReady(true);

    return () => {
      listeners.forEach((lst) => {
        wsClient.removeListener(lst);
      });
    };
  }, [wsClient ? true : false]);

  useEffect(() => {
    if (!listenerReady) return;
    if (!wsClient) return;

    wsClient.sendMessage(lobbyRoomsEvent, { codename: "three-pictures" });
  }, [wsClient ? true : false, listenerReady]);

  useEffect(function gameInit() {
    wsClient?.sendMessage(infoEvent, { });
  }, [])

  const insets = useSafeAreaInsets();

  const styleSafeArea:any = useMemo(() => {
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    return {
      flex: 1,
      width: windowWidth,
      minHeight: windowHeight - (insets.bottom + insets.top) - 53,
      backgroundColor: '#000000',
      position: 'relative'
    }
  },[insets])

  const closeOpenStatement = () => {
    setModalStatement(!modalStatement)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" />
      <View style={{flex: 1}}>
      {/* <CustomHeader title="Poseidon Club" status="lobby"></CustomHeader> */}
        <CustomheaderLogo
          name="threepic"
          lobby={() => lobbyHandler()}
        ></CustomheaderLogo>
        <ScrollView>
          <StatusBar hidden />
          {
            modalStatement ? <StatementInfo></StatementInfo> : <></>
          }
          <View style={{...styleSafeArea}}>
            <Image
              source={require("../../../../assets/images/others/home.png")}
            />
            <CustomHeader title={username} status="userLobby" balance={balancePlayer}></CustomHeader>
            <View style={ThreePic.ThreePicImageContainer}>
              <View style={ThreePic.ThreePicImageWrapper}>
                <ImageBackground
                  source={require("../../../../assets/images/others/skp-roombg.png")}
                  style={ThreePic.ThreePicImageBackground}
                ></ImageBackground>
                <View style={ThreePic.ThreePicRoomContainer}>
                  {chunkedRooms.map((cr, index) => {
                    console.log(index);
                    return <RoomSelectRow key={index+"s"} keyProp={index} data={cr} />;
                  })}
                </View>
              </View>
            </View>
            <View style={ThreePic.ThreePicBlankSpace}></View>
          </View>
        </ScrollView>
        <BottomNavigation
          home={() => navigate(ROUTES.PoseidonLobby)}
          setting={() => navigate(ROUTES.PoseidonAccount)}
          liveScore={() => closeOpenStatement()}
          status={"room"}
          balance={0}
        ></BottomNavigation>
      </View>
    </SafeAreaView>
  );
};
