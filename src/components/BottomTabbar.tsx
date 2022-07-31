import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  Image,
  ImageRequireSource,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { BottomTabNavigatorProps } from "../../types";
import { colors, screenwidth } from "../constants";
import { normalizeX, normalizeY } from "../utils/normalize";
import {
  DashboardFilledIcon,
  DashboardIcon,
  PastIcon,
  UserFilledIcon,
  UserIcon
} from "./Icons";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    width: screenwidth,
    paddingHorizontal: normalizeX(16),
    zIndex: 10000,
    shadowColor: colors.grey,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 8
  },
  tab: {
    flex: 1,
    paddingTop: normalizeY(24),
    alignItems: "center",
    justifyContent: "center"
  },
  activeIndicator: {
    position: "absolute",
    top: "0%",
    left: (screenwidth - normalizeX(32)) / 3 / 2,
    transform: [{ translateX: -normalizeX(36 / 2) }],
    height: normalizeY(3),
    width: normalizeX(36)
  },
  indicatorWrapper: {
    width: screenwidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

const BottomTabbar = (props: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();
  const HEIGHT = React.useMemo(
    () => normalizeY(40) + (bottom || normalizeY(12)) + normalizeY(16),
    [bottom]
  );

  type Route = {
    icon: typeof DashboardIcon;
    filledIcon: typeof DashboardIcon;
    route: keyof BottomTabNavigatorProps;
  };

  const routes: Array<Route> = React.useMemo(
    () => [
      {
        icon: DashboardIcon,
        filledIcon: DashboardFilledIcon,
        route: "DashboardScreen"
      },
      {
        icon: PastIcon,
        filledIcon: PastIcon,
        route: "PreviousScansScreen"
      },
      {
        icon: UserIcon,
        filledIcon: UserFilledIcon,
        route: "ProfileScreen"
      }
    ],
    []
  );

  return (
    <>
      <View
        style={{
          ...styles.container,
          height: HEIGHT,
          paddingBottom: (bottom || normalizeY(12)) + normalizeY(12),
          backgroundColor: colors.white
        }}
      >
        {routes.map(({ icon: Icon, filledIcon: FilledIcon, route }, index) => {
          const isFocused = props.state.index === index;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              onPress={() => props.navigation.navigate(route)}
              style={styles.tab}
            >
              {isFocused ? (
                <FilledIcon
                  width={normalizeY(24)}
                  height={normalizeY(24)}
                  color={colors.primary}
                />
              ) : (
                <Icon
                  width={normalizeY(24)}
                  height={normalizeY(24)}
                  color={colors.primary}
                />
              )}
              {isFocused && (
                <View
                  style={{
                    ...styles.activeIndicator,
                    backgroundColor: colors.primary
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default BottomTabbar;
