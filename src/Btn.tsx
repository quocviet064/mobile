import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface BtnProps {
  textColor: string;
  bgColor: string;
  btnLabel: string;
  Press: () => void;
}

const Btn: React.FC<BtnProps> = ({ textColor, bgColor, btnLabel, Press }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: bgColor }]} onPress={Press}>
      <Text style={[styles.text, { color: textColor }]}>{btnLabel}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  text: {
    fontSize: 23,
    fontWeight: 'bold',
  },
});

export default Btn;
