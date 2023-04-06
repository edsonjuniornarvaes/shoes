import { Platform, StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";

import { CartContextProvider } from "./src/contexts/CartContext";

import OneSignal from "react-native-onesignal";

const oneSignalAppId =
  Platform.OS === "ios"
    ? "2b542c58-e2e9-48f1-8bff-004caefe40c4"
    : "dd6753a9-19ad-4f0f-b1c3-700cff7f9dcc";
OneSignal.setAppId(oneSignalAppId);

OneSignal.promptForPushNotificationsWithUserResponse((response) => {
  console.log(response);
});

OneSignal.setAppId("53895c6d-9668-436c-88e7-4d63ca794f54");

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
