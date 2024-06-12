import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useNavigation,
  NavigationProp,
  StackActions,
} from "@react-navigation/native";
import Background from "@/src/Background";
import { employeeStore } from "@/store/employee";
import avatarImage from "@/assets/images/pngegg.png";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

type RootStackParamList = {
  Profile: undefined;
  login: undefined;
};

export default function Profile() {
  const userProfile = employeeStore((state) => state.userProfile);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.dispatch(StackActions.replace("login"));
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while logging out. Please try again."
      );
    }
  };

  return (
    <Background>
      <View style={styles.innerContainer}>
        <View style={styles.container}>
          {userProfile ? (
            <>
              <View style={styles.avatarFrame}>
                <Image source={avatarImage} style={styles.avatar} />
              </View>
              <View style={styles.card}>
                <View style={styles.icon}>
                  <Feather name="user" size={22} color="black" />
                </View>
                <Text style={styles.text}>{userProfile.fullName}</Text>
              </View>
              <View style={styles.card}>
                <View style={styles.icon}>
                  <Feather name="mail" size={22} color="black" />
                </View>
                <Text style={styles.text}> {userProfile.email}</Text>
              </View>
              <View style={styles.card}>
                <View style={styles.icon}>
                  <FontAwesome name="birthday-cake" size={22} color="black" />
                </View>
                <Text style={styles.text}>{userProfile.dateOfBirth}</Text>
              </View>
              <View style={styles.card}>
                <View style={styles.icon}>
                  <FontAwesome name="phone" size={22} color="black" />
                </View>
                <Text style={styles.text}>{userProfile.phoneNumber}</Text>
              </View>
              <View style={styles.card}>
                <View style={styles.icon}>
                  <FontAwesome name="address-card" size={22} color="black" />
                </View>
                <Text style={styles.text}>{userProfile.address}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.errorText}>User profile not found</Text>
          )}
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: "93%",
    height: "96%",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  avatarFrame: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    marginTop: 50,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#006A42",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  icon: {
    marginEnd: 20,
  },
});
