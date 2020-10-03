import React, { FC } from "react";
import AppContainer from "../poseidon/routes/routing";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App: FC = () => {
  return (
    <SafeAreaProvider>
      <AppContainer />
    </SafeAreaProvider>
  )
};
export default App;