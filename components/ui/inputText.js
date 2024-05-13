import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/colors";

const InputText = ({ children, style }) => {
  return <Text style={[styles.inputText, style]}>{children}</Text>;
};

export default InputText;

const styles = StyleSheet.create({
  inputText: {
    fontFamily: "open-sans-regular",
    color: Colors.accent500,
    fontSize: 24,
  },
});
