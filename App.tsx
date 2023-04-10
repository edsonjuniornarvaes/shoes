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
import { tagUserEmailCreate } from "./src/notifications/notificationsTags";

const oneSignalAppId =
  Platform.OS === "ios" ? "" : "53895c6d-9668-436c-88e7-4d63ca794f54";

OneSignal.setAppId(oneSignalAppId);
OneSignal.setEmail("edsonjunior.narvaes@gmail.com");

OneSignal.promptForPushNotificationsWithUserResponse((response) => {
  console.log(response);
});

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserEmailCreate("edsonjunior.narvaes@gmail.com);

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
