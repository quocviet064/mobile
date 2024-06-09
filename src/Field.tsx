import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { darkGreen } from './Constants';

interface FieldProps extends TextInputProps {}

const Field: React.FC<FieldProps> = (props) => {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]} // Merge the custom style with any additional styles passed via props
      placeholderTextColor={darkGreen}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 100,
    color: darkGreen,
    paddingHorizontal: 10,
    width: '78%',
    backgroundColor: 'rgb(220,220,220)',
    marginVertical: 10,
  },
});

export default Field;
