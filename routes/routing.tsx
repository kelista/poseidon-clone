import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { PoseidonLogin } from "../src/screens/Poseidon/Login"
import { PoseidonLobby } from "../src/screens/Poseidon/Lobby"
import { PoseidonAccount } from "../src/screens/Poseidon/Account"
import { PoseidonChangePass } from "../src/screens/Poseidon/ChangePassword"
import { PoseidonSkpRoom } from "../src/screens/Poseidon/Game/Skp/room"
import { PoseidonThreePicRoom } from "../src/screens/Poseidon/Game/ThreePic/room"

import { ROUTES } from "./index"

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
    }
  },
  {
    // mode: "modal",
    headerMode: "none",
  }
);

const AppContainer = createAppContainer(MainStack);

export default AppContainer;
