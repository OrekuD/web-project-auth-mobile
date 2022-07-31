import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Doesn't scale well on android

// const scaleX = SCREEN_WIDTH / 375;
// const scaleY = SCREEN_HEIGHT / 812;

// export const normalizeX = (size: number) => {
//   const newSize = size * scaleX;
//   if (Platform.OS === 'ios') {
//     return Math.round(PixelRatio.roundToNearestPixel(newSize));
//   }
//   return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
// };

// export const normalizeY = (size: number) => {
//   const newSize = size * scaleY;
//   if (Platform.OS === 'ios') {
//     return Math.round(PixelRatio.roundToNearestPixel(newSize));
//   }
//   return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
// };

const [shortDimension, longDimension] =
  SCREEN_WIDTH < SCREEN_HEIGHT
    ? [SCREEN_WIDTH, SCREEN_HEIGHT]
    : [SCREEN_HEIGHT, SCREEN_WIDTH];

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const normalizeX = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel((shortDimension / guidelineBaseWidth) * size)
  );
export const normalizeY = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel((longDimension / guidelineBaseHeight) * size)
  );
