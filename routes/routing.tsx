import React, { useState, useContext, useEffect, useMemo } from "react";
import { BSContext } from "./bsContext";
import { WSContext } from "./wsContext";
import { Backsound } from "../src/services/soundServices";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { AsyncStorage } from "react-native";

import { PoseidonLogin } from "../src/screens/Poseidon/Login";
import { PoseidonLobby } from "../src/screens/Poseidon/Lobby";
import { PoseidonAccount } from "../src/screens/Poseidon/Account";
import { PoseidonProfile } from "../src/screens/Poseidon/UpdateProfile/expo-tmp";
import { PoseidonChangePass } from "../src/screens/Poseidon/ChangePassword";
import { PoseidonSkpRoom } from "../src/screens/Poseidon/Game/Skp/room";
import { PoseidonThreePicRoom } from "../src/screens/Poseidon/Game/ThreePic/room";
import { PoseidonThreePicGame } from "../src/screens/Poseidon/Game/ThreePic/index";
import { PoseidonThreePicGame2 } from "../src/screens/Poseidon/Game/ThreePic/index2test";
import { PoseidonSkpGame } from "../src/screens/Poseidon/Game/Skp/index";
import { PoseidonTnc } from "../src/screens/Poseidon/Policy/tnc";
import { PoseidonPrivacy } from "../src/screens/Poseidon/Policy/privacy";

import { ROUTES } from "./index";
import { WebSocketClient } from "../src/services/websocket";
import { SSContext } from "./simpleStoreContext";

const MainStack = createStackNavigator(
  {
    [ROUTES.PoseidonLogin]: {
      screen: PoseidonLogin,
    },
    [ROUTES.PoseidonLobby]: {
      screen: PoseidonLobby,
    },
    [ROUTES.PoseidonAccount]: {
      screen: PoseidonAccount,
    },
    [ROUTES.PoseidonProfile]: {
      screen: PoseidonProfile,
    },
    [ROUTES.PoseidonChangePass]: {
      screen: PoseidonChangePass,
    },
    [ROUTES.PoseidonSkpRoom]: {
      screen: PoseidonSkpRoom,
    },
    [ROUTES.PoseidonThreePicRoom]: {
      screen: PoseidonThreePicRoom,
    },
    [ROUTES.PoseidonThreePicGame]: {
      screen: PoseidonThreePicGame,
    },
    [ROUTES.PoseidonThreePicGame2]: {
      screen: PoseidonThreePicGame2,
    },
    [ROUTES.PoseidonSkpGame]: {
      screen: PoseidonSkpGame,
    },
    [ROUTES.PoseidonTnc]: {
      screen: PoseidonTnc,
    },
    [ROUTES.PoseidonPrivacy]: {
      screen: PoseidonPrivacy,
    },
  },
  {
    // mode: "modal",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
);

const AppContainer = createAppContainer(MainStack);

const Wrapped = function () {
  const [bs, setBs] = useState<Backsound>();
  const [wsClient, setWsClient] = useState<WebSocketClient>();
  const [token, setToken] = useState<string>("");

  const ss = useMemo(
    () => ({
      token: {
        value: token,
        setValue: setToken,
      },
    }),
    [token]
  );

  useEffect(() => {
    Backsound.Factory(
      "mainsound",
      require("../src/assets/music/Games2.mp3"),
      true
    ).then((newBacksound) => {
      setBs(newBacksound);
    });
  }, [bs ? true : false]);

  // listen token
  useEffect(() => {
    if (token) {
      const url = "ws://34.101.158.255:5000/events?token=" + token;
      console.log(url);
      const client = new WebSocketClient(url);
      setWsClient(client);
    }
  }, [token]);

  // get token
  // useEffect(() => {
  //   AsyncStorage.getItem("token").then(token => {
  //     if (token) setToken(token);
  //   })
  // }, []);

  return (
    <BSContext.Provider value={bs}>
      <WSContext.Provider value={wsClient}>
        <SSContext.Provider value={ss}>
          <AppContainer />
        </SSContext.Provider>
      </WSContext.Provider>
    </BSContext.Provider>
  );
};

export default Wrapped;
