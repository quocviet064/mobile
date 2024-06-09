import React, { ReactNode } from "react";
import { View, StyleSheet, ImageBackground, ViewStyle } from "react-native";

interface BackgroundProps {
  children: ReactNode;
  style?: ViewStyle;
}

const Background: React.FC<BackgroundProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <ImageBackground
        source={require("../assets/images/leaves.jpg")}
        style={styles.backgroundImage}
      >
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Background;
