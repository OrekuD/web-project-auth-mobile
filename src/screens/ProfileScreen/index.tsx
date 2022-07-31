import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import { colors } from "../../constants";
import OkResponse from "../../network/responses/OkResponse";
import { normalizeX, normalizeY } from "../../utils/normalize";
import API from "../../constants/api";
import { AxiosResponse } from "axios";
import ErrorResponse from "../../network/responses/ErrorResponse";
import { authenticationActions } from "../../store/slices/authentication.slice";
import { userActions } from "../../store/slices/user.slice";
import {
  LogoutIcon,
  SettingsIcon,
  UserCircleIcon
} from "../../components/Icons";
import { useSelectState } from "../../store/selectors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: normalizeX(24),
    paddingBottom: normalizeY(100)
  },
  rowItem: {
    width: "100%",
    height: normalizeY(50),
    borderRadius: normalizeY(6),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: normalizeX(16),
    shadowColor: colors.grey,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginBottom: normalizeY(14),
    backgroundColor: colors.white
  },
  profile: {
    width: "100%",
    height: normalizeY(150),
    borderRadius: normalizeY(12),
    shadowColor: colors.grey,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: colors.white,
    marginTop: normalizeY(24),
    padding: normalizeY(16),
    marginBottom: normalizeY(24)
  }
});

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { user } = useSelectState();

  const { top } = useSafeAreaInsets();
  const dispatch = useDispatch();

  const signOut = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await API.client.get<any, AxiosResponse<OkResponse>>(
        "/user/sign-out"
      );
      dispatch(authenticationActions.signOut());
      dispatch(userActions.signOut());
      setIsLoading(false);
      return response.data;
    } catch (error) {
      dispatch(authenticationActions.signOut());
      dispatch(userActions.signOut());
      setIsLoading(false);
      // console.log({ error });
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          paddingTop: normalizeY(24) + top,
          paddingHorizontal: normalizeX(24)
        }}
        style={{ backgroundColor: colors.white }}
      >
        <Typography variant="h2" color={colors.primary} fontWeight={600}>
          ProfileScreen
        </Typography>
        <View style={styles.profile}>
          <UserCircleIcon
            width={normalizeY(42)}
            height={normalizeY(42)}
            color={colors.darkgrey}
          />
          <Typography
            variant="h1"
            color={colors.black}
            style={{ marginTop: normalizeY(6) }}
          >
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography variant="sm" color={colors.darkgrey}>
            {user.email}
          </Typography>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={styles.rowItem}>
          <SettingsIcon
            width={normalizeY(18)}
            height={normalizeY(18)}
            color={colors.black}
          />
          <Typography
            variant="h1"
            color={colors.black}
            style={{ marginLeft: normalizeX(12) }}
          >
            Settings
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.rowItem}
          onPress={signOut}
        >
          <LogoutIcon
            width={normalizeY(18)}
            height={normalizeY(18)}
            color={colors.black}
          />
          <Typography
            variant="h1"
            color={colors.black}
            style={{ marginLeft: normalizeX(12) }}
          >
            Log out
          </Typography>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;
