import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { RootStackParams } from '../../../types';
import Button from '../../components/Button';
import { MailIcon, EyeCancelIcon, EyeIcon } from '../../components/Icons';
import TextField from '../../components/TextField';
import Typography from '../../components/Typography';
import { colors, isAndroid, screenheight } from '../../constants';
import isAnyEmpty from '../../utils/isAnyEmpty';
import { normalizeX, normalizeY } from '../../utils/normalize';
import API from '../../constants/api';
import SignInRequest from '../../network/requests/SignInRequest';
import { AxiosResponse } from 'axios';
import AuthenticationResponse from '../../network/responses/AuthenticationResponse';
import { authenticationActions } from '../../store/slices/authentication.slice';
import { userActions } from '../../store/slices/user.slice';
import ErrorResponse from '../../network/responses/ErrorResponse';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalizeX(24),
    paddingBottom: normalizeY(100),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: normalizeY(16)
  }
});

interface Props extends StackScreenProps<RootStackParams, 'SignInScreen'> { }

const SignInScreen = (props: Props) => {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { top } = useSafeAreaInsets();

  const dispatch = useDispatch();

  const canProceed = React.useMemo(() => {
    if (emailError.trim().length > 0) {
      return false;
    }
    return !isAnyEmpty([email, password]);
  }, [email, password, emailError]);

  const handleSubmit = async () => {
    if (!canProceed || isLoading) {
      return;
    }
    setIsLoading(true);

    const payload = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };
    try {
      const response = await API.client.post<
        SignInRequest,
        AxiosResponse<AuthenticationResponse>
      >('/user/sign-in', payload);
      dispatch(
        authenticationActions.addAuthState({
          accessToken: response.data.accessToken,
        }),
      );
      dispatch(userActions.updateUser({ user: response.data.user }));
      setIsLoading(false);
      return response.data;
    } catch (error: any) {
      setIsLoading(false);
      // console.log({ error: error?.list });
      if ((error?.list[0]?.msg as string).toLowerCase() === 'unauthorized') {
        setEmailError('Your credentials are invalid');
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView
        contentContainerStyle={{
          paddingTop: screenheight * 0.2 + top,
        }}
        style={{ backgroundColor: colors.white }}>
        <View style={styles.container}>
          <Typography
            variant="h2"
            color={colors.primary}
            fontWeight={600}
            textAlign="center"
            style={{ marginBottom: normalizeY(24) }}>
            Welcome back
          </Typography>
          <TextField
            textInputProps={{
              placeholder: 'Email',
              keyboardType: 'email-address',
              value: email,
              onChangeText: text => {
                setEmail(text);
                setEmailError('');
              },
              autoCapitalize: 'none',
            }}
            rightIcon={
              <MailIcon
                width={normalizeY(24)}
                height={normalizeY(24)}
                color={colors.grey}
              />
            }
            error={emailError}
          />
          <TextField
            textInputProps={{
              placeholder: 'Password',
              secureTextEntry: !showPassword,
              value: password,
              onChangeText: text => {
                setPassword(text);
                setEmailError('');
              },
            }}
            rightIcon={
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowPassword(!showPassword)}>
                {!showPassword ? (
                  <EyeCancelIcon
                    width={normalizeY(24)}
                    height={normalizeY(24)}
                    color={colors.grey}
                  />
                ) : (
                  <EyeIcon
                    width={normalizeY(24)}
                    height={normalizeY(24)}
                    color={colors.grey}
                  />
                )}
              </TouchableOpacity>
            }
          />
          <View style={styles.row}>
            <Typography
              variant="sm"
              color={colors.black}
              textAlign="center">
              Don't have an account?
            </Typography>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => props.navigation.navigate('SignUpScreen')}>
              <Typography
                variant="sm"
                color={colors.primary}
                textAlign="center"
              >
                {' Create one'}
              </Typography>
            </TouchableOpacity>
          </View>
          <Button
            label="Sign in"
            onPress={handleSubmit}
            isDisabled={isLoading || !canProceed}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
