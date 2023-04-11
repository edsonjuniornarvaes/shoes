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

import OneSignal, { NotificationReceivedEvent } from "react-native-onesignal";
import { tagUserInfoCreate } from "./src/notifications/notificationsTags";
import { useEffect } from "react";

const oneSignalAppId =
  Platform.OS === "ios" ? "" : "53895c6d-9668-436c-88e7-4d63ca794f54";

OneSignal.setAppId(oneSignalAppId);
OneSignal.setEmail("edsonjunior.narvaes@gmail.com");

OneSignal.promptForPushNotificationsWithUserResponse();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationRecivedEvent: NotificationReceivedEvent) => {
        console.log(notificationRecivedEvent);
      }
    );

    return () => unsubscribe;
  }, []);

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
