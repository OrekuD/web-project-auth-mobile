import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { colors, screenwidth } from "../../constants";
import { normalizeX, normalizeY } from "../../utils/normalize";
import Typography from "../Typography";

const styles = StyleSheet.create({
  container: {
    width: screenwidth - normalizeX(48),
    height: normalizeY(55),
    borderRadius: normalizeY(12),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  }
});

interface Props {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const Button = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={{
        ...styles.container,
        backgroundColor:
          props.isDisabled || props.isLoading
            ? "rgba(52, 97, 253, 0.5)"
            : colors.primary
      }}
      disabled={props.isDisabled}
    >
      {props.isLoading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Typography variant="sm" color="white" style={{ fontWeight: "600" }}>
          {props.label}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

export default Button;
