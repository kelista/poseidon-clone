import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { LoginScreen } from "../src/screens/login_screen/index";
import { LobbyScreen } from "../src/screens/lobby_screen/index";
import { ROUTES } from "./index"

const MainStack = createStackNavigator(
  {
    [ROUTES.RootMain]: {
      screen: LoginScreen
    },
    [ROUTES.RootLobby]: {
      screen: LobbyScreen
    }
  },
  {
    // mode: "modal",
    // headerMode: "none",
  }
);

const AppContainer = createAppContainer(MainStack);

export default AppContainer;
