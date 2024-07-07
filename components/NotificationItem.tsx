import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface NotificationItemProps {
  title: string;
  body: string;
  time: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  body,
  time,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  body: {
    fontSize: 16,
  },
  time: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
});

export default NotificationItem;
