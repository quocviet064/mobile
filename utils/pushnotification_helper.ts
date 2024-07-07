import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFCMToken();
  }
}

async function getFCMToken() {
  const fcmToken = await AsyncStorage.getItem("fcmToken");
  if (!fcmToken) {
    const deviceToken = await messaging().getToken();
    if (deviceToken) {
      AsyncStorage.setItem("fcmToken", deviceToken);
      console.log("Token", deviceToken);
    } else {
      console.log("Failed", "No token received");
    }
  }
}

const NotificationListner = () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log("OnNotificationOpenedApp", remoteMessage.notification);
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log("Notification caused ", remoteMessage.notification);
      }
    });

  messaging().onMessage(async (remoteMessage: any) => {
    // console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    remoteMessage.notification &&
      Alert.alert(
        remoteMessage.notification ? remoteMessage.notification.title : "",
        remoteMessage.notification ? remoteMessage.notification.body : ""
      );
  });
};
export { NotificationListner, getFCMToken, requestUserPermission };
