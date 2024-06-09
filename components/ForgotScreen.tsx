
import { Link } from "expo-router";
import React, { useState } from "react";
import Background from "@/src/Background";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { darkGreen } from "@/src/Constants";
import { Feather } from "@expo/vector-icons";


  export default function ForgotScreen() {
  return (
    <Background>
      <View style={styles.outerContainer}>
        <Text style={styles.loginText}>Forgot Password</Text>
        <View style={styles.innerContainer}>
        <Text style={[styles.loginPromptText, {textAlign: "center"}]}>Please enter your email address below to receive a password reset link.</Text>
        <View style={styles.inputContainer}>
            <View style={styles.icon}>
              <Feather name="mail" size={32} color="#7C808D" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#7C808D"
              selectionColor="#3662AA"
            />
          </View>
        <TouchableOpacity style={styles.button}>
          <Link href={"/reset"}>
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </Link>
        </TouchableOpacity>
      </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({

  button: {
    backgroundColor: "#006A42",
    paddingVertical: 10,
    borderRadius: 100,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  outerContainer: {
    alignItems: "center",
    width: "100%", 
    height: "100%", 
  },
  loginText: {
    color: "white",
    fontSize: 44,
    fontWeight: "bold",
    marginVertical: 100,
  },
  innerContainer: {
    backgroundColor: "white",
    height: 700,
    width: "100%", 
    borderTopLeftRadius: 130,
    paddingTop: 100,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  loginPromptText: {
    color: "grey",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 20,
  },
  icon: {
    marginRight: 15,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  input: {
    borderRadius: 100,
    color: darkGreen,
    paddingHorizontal: 10,
    width: "70%",
    height: 40,
    backgroundColor: "rgb(220,220,220)",
    marginVertical: 10,
  },
});

