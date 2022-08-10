import React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle
} from "react-native";
import { colors, screenwidth } from "../../constants";
import { normalizeX, normalizeY } from "../../utils/normalize";
import Typography from "../Typography";

const styles = StyleSheet.create({
  container: {
    width: screenwidth - normalizeX(48),
    marginBottom: normalizeY(20)
  },
  textInputContainer: {
    width: "100%",
    height: normalizeY(55),
    borderRadius: normalizeY(12),
    backgroundColor: colors.accent,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: normalizeX(16)
  },
  textInput: {
    flex: 1,
    height: "90%",
    marginRight: normalizeX(16),
    color: colors.black,
    fontSize: normalizeY(16)
  }
});

interface Props {
  textInputProps?: TextInputProps;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
}

const TextField = (props: Props) => {
  return (
    <View style={{ ...styles.container, ...props.containerStyle }}>
      <View style={styles.textInputContainer}>
        {props.leftIcon}
        <TextInput style={styles.textInput} placeholderTextColor="grey" {...props.textInputProps} />
        {props.rightIcon}
      </View>
      {props?.error && props.error.length > 0 && (
        <Typography
          variant="sm"
          color={colors.error}
          style={{ marginLeft: normalizeX(4), marginTop: normalizeY(4) }}
        >
          {props.error}
        </Typography>
      )}
    </View>
  );
};

export default TextField;
