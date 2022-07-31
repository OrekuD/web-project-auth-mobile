import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants";
import { normalizeX, normalizeY } from "../../utils/normalize";
import { ArrowLeftIcon } from "../Icons";

const styles = StyleSheet.create({
  container: {
    width: normalizeY(36),
    height: normalizeY(36),
    borderRadius: normalizeY(36 / 2),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: normalizeX(24),
    zIndex: 10
  }
});

interface Props {
  onPress: () => void;
}

const BackButton = (props: Props) => {
  const { top } = useSafeAreaInsets();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={{ ...styles.container, top: top + normalizeY(12) }}
    >
      <ArrowLeftIcon
        width={normalizeY(24)}
        height={normalizeY(24)}
        color={colors.white}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
