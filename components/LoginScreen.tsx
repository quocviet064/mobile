import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import React from "react";
import { Link, router } from "expo-router";
import { authApi } from "@/api/auth.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Background from "@/src/Background";
import { darkGreen } from "@/src/Constants";
import { Feather } from "@expo/vector-icons";
import { employeeStore } from "@/store/employee";

export default function LoginScreen() {
  const [employeeID, setEmployeeID] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordIsVisible, setPasswordIsVisible] =
    React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  //get update function in store
  const updateUserProfile = employeeStore((state) => state.updateProfile);

  const onSubmit = async () => {
    if (!!employeeID && !!password) {
      try {
        const res = await authApi.login(employeeID, password);
        if (res.message === "Login Successfully !") {
          updateUserProfile({
            id: res.data.employeeDto.id,
            employeeID: res.data.employeeDto.employeeID,
            fullName: res.data.employeeDto.fullName,
            avatarUrl: res.data.employeeDto.avatarUrl,
            email: res.data.employeeDto.email,
            phoneNumber: res.data.employeeDto.phoneNumber,
            address: res.data.employeeDto.address,
            dateOfBirth: res.data.employeeDto.dateOfBirth,
            roleName: res.data.employeeDtoroleName,
            restaurantID: res.data.employeeDto.restaurantID,
            isActive: res.data.employeeDto.isActive,
            dateJoined: res.data.employeeDto.dateJoined,
          });
          AsyncStorage.setItem("authToken", res.data.accessToken);
          router.push("/schedule");
        } else {
          setErrorMessage("Invalid employee ID or password.");
        }
      } catch (err) {
        console.log("err", err);
        setErrorMessage("Invalid employee ID or password.");
      }
    } else {
      setErrorMessage("Please fill in both fields.");
    }
  };

  return (
    <Background>
      <View style={styles.outerContainer}>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.innerContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.loginPromptText}>Login to your account</Text>
          <View style={styles.inputContainer}>
            <View style={styles.icon}>
              <Feather name="user" size={22} color="#7C808D" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="employeeID"
              placeholderTextColor="#7C808D"
              selectionColor="#3662AA"
              onChangeText={setEmployeeID}
              value={employeeID}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.icon}>
              <Feather name="lock" size={22} color="#7C808D" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!passwordIsVisible}
              placeholderTextColor="#7C808D"
              selectionColor="#3662AA"
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity
              style={styles.passwordVisibleButton}
              onPress={() => setPasswordIsVisible(!passwordIsVisible)}
            >
              <Feather
                name={passwordIsVisible ? "eye" : "eye-off"}
                size={20}
                color="#7C808D"
              />
            </TouchableOpacity>
          </View>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          {/* <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Link href={"/forgot"}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </Link>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={onSubmit} style={styles.loginButton}>
            <Text style={[styles.loginButtonText, { textAlign: "center" }]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  loginText: {
    color: "white",
    fontSize: 64,
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
  welcomeText: {
    fontSize: 40,
    color: darkGreen,
    fontWeight: "bold",
  },
  loginPromptText: {
    color: "grey",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    width: "78%",
    paddingRight: 16,
    marginBottom: 200,
  },
  forgotPasswordText: {
    color: darkGreen,
    fontWeight: "bold",
    fontSize: 16,
  },
  icon: {
    marginRight: 15,
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
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  passwordVisibleButton: {
    position: "absolute",
    right: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#fff",
  },
  loginButton: {
    backgroundColor: "#006A42",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
    bottom: 0,
  },
});
