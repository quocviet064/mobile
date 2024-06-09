import { View, Text,StyleSheet } from "react-native";
import React from "react";
import Background from "@/src/Background";

export default function notice() {
  return (
    <Background>
      <View>
        <Text style={styles.loginText}>Notice</Text>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  loginText: {
    color: "white",
    fontSize: 64,
    fontWeight: "bold",
    marginVertical: 100,
  },
})
