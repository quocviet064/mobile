import {
  NotificationListner,
  requestUserPermission,
} from "@/utils/pushnotification_helper";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";

export default function Index() {
  messaging().setBackgroundMessageHandler(async function (remoteMessage) {
    console.log("Message handled in the background!", remoteMessage);
    //   await AsyncStorage.setItem("isNotification", "true");
  });

  useEffect(() => {
    console.log("123");
    requestUserPermission();
    NotificationListner();
  }, []);

  return <Redirect href={"/login"} />;
}
