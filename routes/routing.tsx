import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import { LoginScreen } from "../src/screens/login_screen/index";
// import { LobbyScreen } from "../src/screens/lobby_screen/index";
// import { Game1Screen } from "../src/screens/game1_screen/index";
import { PoseidonLogin } from "../src/screens/Poseidon/Login"
import { PoseidonLobby } from "../src/screens/Poseidon/Lobby"
import { ROUTES } from "./index"

const MainStack = createStackNavigator(
  {
    [ROUTES.PoseidonLogin]: {
      screen: PoseidonLogin
    },
    [ROUTES.PoseidonLobby]: {
      screen: PoseidonLobby
    }
  },
  {
    // mode: "modal",
    headerMode: "none",
  }
);

const AppContainer = createAppContainer(MainStack);

export default AppContainer;
