import React, {useState, useContext, useEffect, useMemo} from "react";
import {BSContext} from "./bsContext";
import {WSContext} from "./wsContext";
import { Backsound } from "../src/services/soundServices";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { AsyncStorage } from "react-native"

import { PoseidonLogin } from "../src/screens/Poseidon/Login"
import { PoseidonLobby } from "../src/screens/Poseidon/Lobby"
import { PoseidonAccount } from "../src/screens/Poseidon/Account"
import { PoseidonChangePass } from "../src/screens/Poseidon/ChangePassword"
import { PoseidonSkpRoom } from "../src/screens/Poseidon/Game/Skp/room"
import { PoseidonThreePicRoom } from "../src/screens/Poseidon/Game/ThreePic/room"
import { PoseidonThreePicGame } from "../src/screens/Poseidon/Game/ThreePic/index"
import { ThreePicGame2 } from "../src/screens/Poseidon/Game/ThreePic/index2"

import { ROUTES } from "./index"
import { WebSocketClient } from "../src/services/websocket";
import {SSContext} from "./simpleStoreContext";

const MainStack = createStackNavigator(
  {
    [ROUTES.PoseidonLogin]: {
      screen: PoseidonLogin
    },
    [ROUTES.PoseidonLobby]: {
      screen: PoseidonLobby
    },
    [ROUTES.PoseidonAccount]: {
      screen: PoseidonAccount
    },
    [ROUTES.PoseidonChangePass]: {
      screen: PoseidonChangePass
    },
    [ROUTES.PoseidonSkpRoom]: {
      screen: PoseidonSkpRoom
    },
    [ROUTES.PoseidonThreePicRoom]: {
      screen: PoseidonThreePicRoom
    },
    [ROUTES.PoseidonThreePicGame]: {
      screen: PoseidonThreePicGame
    },
    [ROUTES.ThreePicGame2]: {
      screen: ThreePicGame2
    }
  },
  {
    // mode: "modal",
    headerMode: "none",
  }
);

const AppContainer = createAppContainer(MainStack);

const Wrapped = function() {
  const [bs, setBs] = useState<Backsound>();
  const [wsClient, setWsClient] = useState<WebSocketClient>();
  const [token, setToken] = useState<string>("");
  
  const ss = useMemo(() => ({
    token: {
      value: token,
      setValue: setToken
    }
  }), [token]);

  useEffect(() => {
    Backsound.Factory("mainsound",require("../src/assets/music/Lobby.mp3"))
    .then(newBacksound => {
      setBs(newBacksound);
    });
  },[bs?true:false]);

  // listen token
  useEffect(() => {
    if(token) {
      const client = new WebSocketClient("ws://35.220.179.54:3021/events?token="+token);
      setWsClient(client);
    }
  }, [token]);

  // get token
  useEffect(() => {
    AsyncStorage.getItem("token").then(token => {
      if(token) setToken(token);
    })
  }, []);

  return <BSContext.Provider value={bs}>
    <WSContext.Provider value={wsClient}>
      <SSContext.Provider value={ss}>
        <AppContainer />
      </SSContext.Provider>
    </WSContext.Provider>
  </BSContext.Provider>
}

export default Wrapped;
