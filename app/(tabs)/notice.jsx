import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import messaging from "@react-native-firebase/messaging";
import NotificationItem from "@/components/NotificationItem";

export default function notice() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log("FCM Token:", fcmToken);
        } else {
          console.log("Failed to get FCM token");
        }
      } catch (error) {
        console.error("Error getting FCM token:", error);
      }
    };

    fetchData();

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          const { title, body, sentTime } = remoteMessage.notification;
          setNotifications((prevNotifications) => [
            { title, body, time: new Date(sentTime).toLocaleTimeString() },
            ...prevNotifications,
          ]);
          console.log("Notification", remoteMessage.notification);
        }
      });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      const { title, body } = remoteMessage.notification;
      setNotifications((prevNotifications) => [
        { title, body },
        ...prevNotifications,
      ]);
      console.log("Notification", remoteMessage.notification);
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      const { title, body } = remoteMessage.notification;
      setNotifications((prevNotifications) => [
        { title, body },
        ...prevNotifications,
      ]);
      console.log("Message handled", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const { title, body } = remoteMessage.notification;
      setNotifications((prevNotifications) => [
        { title, body },
        ...prevNotifications,
      ]);
      Alert.alert("A new FCM message arrived", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        {notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            title={notification.title}
            body={notification.body}
            time={notification.time}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
