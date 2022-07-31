import React, { FC, ReactNode, useMemo } from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { isAndroid } from "../../constants";
import { normalizeY } from "../../utils/normalize";

const styles = StyleSheet.create({
  tiny: {
    fontSize: normalizeY(isAndroid ? 14.0 : 12.0),
    lineHeight: normalizeY(isAndroid ? 18.0 : 16.0)
  },
  sm: {
    fontSize: normalizeY(isAndroid ? 16.0 : 14.0),
    lineHeight: normalizeY(isAndroid ? 20.0 : 18.0)
  },
  h1: {
    // fontFamily: 'Poppins-Regular',
    // fontWeight: '400',
    fontSize: normalizeY(isAndroid ? 18.0 : 16.0),
    lineHeight: normalizeY(isAndroid ? 22.0 : 20.0)
  },

  h2: {
    // fontFamily: 'Open-Sans-Regular',
    // fontWeight: '400',
    fontSize: normalizeY(isAndroid ? 20.0 : 18.0),
    lineHeight: normalizeY(isAndroid ? 24.0 : 22.0)
  },
  h3: {
    // fontFamily: 'Poppins-Bold',
    // fontWeight: '400',
    fontSize: normalizeY(isAndroid ? 26.0 : 24.0),
    lineHeight: normalizeY(isAndroid ? 30.0 : 28.0)
  },

  // TODO: Update fontSize and lineHeight or remove variant.
  h4: {
    // fontFamily: 'Poppins-Bold',
    // fontWeight: '700',
    fontSize: normalizeY(isAndroid ? 38.0 : 34.0),
    lineHeight: normalizeY(isAndroid ? 44.0 : 40.0)
  },

  // TODO: Update fontSize and lineHeight or remove variant.
  h5: {
    // fontFamily: 'Poppins-Bold',
    // fontWeight: '400',
    fontSize: normalizeY(isAndroid ? 56.0 : 50.0),
    lineHeight: normalizeY(isAndroid ? 64.0 : 58.0)
  },

  // TODO: Update fontSize and lineHeight or remove variant.
  h6: {
    // fontFamily: 'Poppins-Bold',
    // fontWeight: '400',
    fontSize: normalizeY(isAndroid ? 72.0 : 64.0),
    lineHeight: normalizeY(isAndroid ? 80.0 : 76.0)
  }
});

interface Props extends TextProps {
  children: ReactNode;
  variant: "tiny" | "sm" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  fontFamily?: "Poppins" | "Open-Sans";
  fontWeight?: 300 | 400 | 500 | 600 | 700;
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  textAlign?: "center" | "auto" | "left" | "right" | "justify";
  style?: TextStyle;
}

const Typography: FC<Props> = (props: Props) => {
  const fontFamily = React.useMemo<string>(() => {
    let font = props.fontFamily ? props.fontFamily : "Poppins";
    if (props.fontWeight) {
      font +=
        props.fontWeight === 300
          ? "-Light"
          : props.fontWeight === 400
          ? "-Regular"
          : props.fontWeight === 500
          ? "-Medium"
          : props.fontWeight === 600
          ? "-SemiBold"
          : "-Bold";
    } else {
      font += "-Regular";
    }

    return font;
  }, [props.fontFamily, props.fontWeight]);

  return (
    <Text
      {...props}
      style={[
        {
          //   fontFamily,
          fontSize: props.fontSize,
          lineHeight: props.lineHeight,
          color: props.color,
          textAlign: props.textAlign
        },
        styles[props.variant],
        props.style
      ]}
    >
      {props.children}
    </Text>
  );
};

export default Typography;
