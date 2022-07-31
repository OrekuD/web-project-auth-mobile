import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("screen");

const screenwidth = width;
const screenheight = height;
const isAndroid = Platform.OS === "android";

const colors = {
  primary: "#3461FD",
  white: "#ffffff",
  black: "#000000",
  accent: "#F4F7FF",
  grey: "#B3B4BB",
  error: "#D62839",
  purple: "#313579",
  darkgrey: "#868688"
};

export { screenheight, screenwidth, isAndroid, colors };
