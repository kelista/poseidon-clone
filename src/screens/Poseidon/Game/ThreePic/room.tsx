import React, { useEffect, useContext, useState, useMemo } from 'react';
import { Text, View, StatusBar, Image, ImageBackground, ImageSourcePropType, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import { ROUTES } from "../../../../../routes";
import { CustomHeader } from "../../../../components/Header"
import { BottomNavigation } from "../../../../components/BottomNavigation"
import ThreePic from "../../../../styles/ThreePicStyle"
import { CustomheaderLogo } from "../../../../components/HeaderLogo"
import { WSContext } from '../../../../../routes/wsContext';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  wrapStyle: StyleProp<ViewStyle>,
  textStyle: StyleProp<TextStyle>
}

const rooms: RoomSelect[] = [
  {
    no: 1,
    image: require('../../../../assets/images/others/room1-image.png'),
    wrapStyle: ThreePic.ThreePicRoomRightPadding,
    textStyle: ThreePic.ThreePicRoomBetText
  },
  {
    no: 2,
    image: require('../../../../assets/images/others/room2-image.png'),
    wrapStyle: {},
    textStyle: ThreePic.ThreePicRoomBetText
  },
  {
    no: 3,
    image: require('../../../../assets/images/others/room3-image.png'),
    wrapStyle: ThreePic.ThreePicRoomRightPadding,
    textStyle: ThreePic.ThreePicRoomBetText
  },
  {
    no: 4,
    image: require('../../../../assets/images/others/room4-image.png'),
    wrapStyle: {},
    textStyle: ThreePic.ThreePicRoomBetText
  }
]

interface RoomSelectComponentProps {
  image: ImageSourcePropType;
  press: any;
  wrapStyle: StyleProp<ViewStyle>,
  textStyle: StyleProp<TextStyle>,
  min: number;
  max: number;
  key: number;
}

function RoomSelectRow({data}: {data:RoomSelectComponentProps[]}) {
  return <View style={ThreePic.ThreePicRoomWrapper}>
          {data.map((d, index) => {
            return <RoomSelectComponent {...d} /> 
          })}
        </View>
}

function RoomSelectComponent({ press, image, wrapStyle, textStyle, min, max, key}: RoomSelectComponentProps) {
  return (
    <TouchableOpacity key={key} style={wrapStyle} onPress={press}>
      <Image source={image} style={{}} />
      <Text style={textStyle}>Min/Max: {min}/{max}</Text>
    </TouchableOpacity>
  )
}

export const PoseidonThreePicRoom: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;
  const wsClient = useContext(WSContext)
  const lobbyRoomsEvent = "lobby/rooms"
  const moveEvent = "move"
  const joinEvent = "lobby/join"
  const [listenerReady, setListenerReady] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);

  const lobbyHandler = () => {
    navigate(ROUTES.PoseidonLobby);
  };

  const gameHandler = (no: number) => {
    wsClient?.sendMessage(joinEvent, { codename: "three-pictures", no: no })
  };

  const chunkedRooms = useMemo(() => {
    const _transformed: any[] = availableRooms.map((ar, index) => {
      const select = rooms.find(r => r.no === ar.no);
      if(select) {
        const ret: RoomSelectComponentProps = {
          image: select.image,
          press: () => gameHandler(index+1),
          max: ar.max,
          min: ar.min,
          textStyle: select.textStyle,
          wrapStyle: select.wrapStyle,
          key: index
        }
        return ret;
      }
    });

    const transformed : RoomSelectComponentProps[]= _transformed.filter(i => i);
    
    const dataPerRow = 2;
    const rowNums = Math.ceil(transformed.length / dataPerRow); 
    
    let allData: RoomSelectComponentProps[][] = [];
    let index = 0;
    for(let i = 0; i< rowNums; i++) {
      const row : RoomSelectComponentProps[] = [];
      let count = 0;
      while(count++ < dataPerRow) {
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
    }

    const moveAction = async function (data: any) {
      if(data !== "L") {
        navigate(ROUTES.PoseidonThreePicGame);
      }
    }

    const roomListenerId = wsClient.addListener(lobbyRoomsEvent, connectCB)
    listeners.push(roomListenerId);

    const moveListener = wsClient.addListener(moveEvent, moveAction)
    listeners.push(moveListener);

    setListenerReady(true);

    return () => {
      listeners.forEach(lst => {
        wsClient.removeListener(lst);
      });
    }

  }, [wsClient ? true : false]);

  useEffect(() => {
    if (!listenerReady) return;
    if (!wsClient) return;

    wsClient.sendMessage(lobbyRoomsEvent, { codename: "three-pictures" })

  }, [wsClient ? true : false, listenerReady]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* <CustomHeader title="Poseidon Club" status="lobby"></CustomHeader> */}
        <CustomheaderLogo name="threepic" lobby={() => lobbyHandler()}></CustomheaderLogo>
        <ScrollView>
          <StatusBar hidden />
          <View style={ThreePic.container}>
            <Image source={require('../../../../assets/images/others/home.png')} />
            <CustomHeader title="Rockies07" status="userLobby"></CustomHeader>
            <View style={ThreePic.ThreePicImageContainer}>
              <View style={ThreePic.ThreePicImageWrapper}>
                <ImageBackground source={require('../../../../assets/images/others/skp-roombg.png')} style={ThreePic.ThreePicImageBackground}></ImageBackground>
                <View style={ThreePic.ThreePicRoomContainer}>
                {
                  chunkedRooms.map((cr) => {
                    return <RoomSelectRow data={cr} />
                  })
                }
                </View>
              </View>
            </View>
            <View style={ThreePic.ThreePicBlankSpace}></View>
          </View>
        </ScrollView>
        <BottomNavigation home={() => navigate(ROUTES.PoseidonLobby)} setting={() => navigate(ROUTES.PoseidonAccount)} status={'room'}>
        </BottomNavigation>
      </View>
    </SafeAreaView>
  );
};
