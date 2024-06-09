// import { Link } from "expo-router";
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";

// const NewPassScreen = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleResetPassword = () => {
//     if (!password || !confirmPassword) {
//       Alert.alert("Error", "Please fill in all fields.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match.");
//       return;
//     }

//     Alert.alert("Success", "Your password has been reset successfully.");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Reset Password</Text>
//       <Text style={styles.instructions}>
//         Please enter your new password below.
//       </Text>
//       <TextInput
//         style={styles.input}
//         placeholder="New Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Confirm New Password"
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         secureTextEntry
//       />
//       <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
//         <Link href={"/login"}>
//           <Text style={styles.buttonText}>Reset Password</Text>
//         </Link>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 16,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   instructions: {
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 20,
//     color: "#333",
//   },
//   input: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 4,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "#3662AA",
//     paddingVertical: 10,
//     borderRadius: 4,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default NewPassScreen;

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

export default function NewPassScreen() {
  return (
    <Background>
      <View style={styles.outerContainer}>
        <Text style={styles.loginText}>Reset Password</Text>
        <View style={styles.innerContainer}>
          <Text style={[styles.loginPromptText, { textAlign: "center" }]}>
            Please enter your new password below.
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#7C808D"
              selectionColor="#3662AA"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              placeholderTextColor="#7C808D"
              selectionColor="#3662AA"
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Link href={"/login"}>
              <Text style={styles.buttonText}>Send Reset Password</Text>
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
    width: 250,
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
