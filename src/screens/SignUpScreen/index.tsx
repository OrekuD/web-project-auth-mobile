import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {RootStackParams} from '../../../types';
import Button from '../../components/Button';
import {
  MailIcon,
  EyeCancelIcon,
  EyeIcon,
  UserIcon,
} from '../../components/Icons';
import TextField from '../../components/TextField';
import Typography from '../../components/Typography';
import {colors} from '../../constants';
import isAnyEmpty from '../../utils/isAnyEmpty';
import {normalizeX, normalizeY} from '../../utils/normalize';
import API from '../../constants/api';
import SignInRequest from '../../network/requests/SignInRequest';
import {AxiosResponse} from 'axios';
import AuthenticationResponse from '../../network/responses/AuthenticationResponse';
import {authenticationActions} from '../../store/slices/authentication.slice';
import {userActions} from '../../store/slices/user.slice';
import ErrorResponse from '../../network/responses/ErrorResponse';
import SignUpRequest from '../../network/requests/SignUpRequest';
import BackButton from '../../components/BackButton';
import validateEmail from '../../utils/validateEmail';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalizeX(24),
    paddingBottom: normalizeY(100),
  },
});

interface Props extends StackScreenProps<RootStackParams, 'SignUpScreen'> {}

const SignUpScreen = (props: Props) => {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const {top} = useSafeAreaInsets();

  const dispatch = useDispatch();

  const canProceed = React.useMemo(() => {
    if (emailError.trim().length > 0) {
      return false;
    }
    return !isAnyEmpty([email, password, firstName, lastName]);
  }, [email, password, emailError, firstName, lastName]);

  const handleSubmit = async () => {
    if (!canProceed || isLoading) {
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter valid E-Mail Address');
      return;
    }

    setIsLoading(true);

    const payload: SignUpRequest = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    };
    try {
      const response = await API.client.post<
        SignUpRequest,
        AxiosResponse<AuthenticationResponse>
      >('/user/sign-up', payload);
      dispatch(
        authenticationActions.addAuthState({
          accessToken: response.data.accessToken,
        }),
      );
      dispatch(userActions.updateUser({user: response.data.user}));
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
    <>
      <BackButton
        onPress={() => {
          if (props.navigation.canGoBack()) {
            props.navigation.goBack();
          }
        }}
      />
      <KeyboardAvoidingView style={{flex: 1}} behavior="height">
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            paddingTop: normalizeY(24) + top,
          }}
          style={{backgroundColor: colors.white}}>
          <View style={styles.container}>
            <Typography
              variant="h2"
              color={colors.primary}
              fontWeight={600}
              textAlign="center"
              style={{marginBottom: normalizeY(24)}}>
              Create a new account
            </Typography>
            <TextField
              textInputProps={{
                placeholder: 'First name',
                value: firstName,
                onChangeText: setFirstName,
                autoCapitalize: 'none',
              }}
              rightIcon={
                <UserIcon
                  width={normalizeY(24)}
                  height={normalizeY(24)}
                  color={colors.grey}
                />
              }
            />
            <TextField
              textInputProps={{
                placeholder: 'Last name',
                value: lastName,
                onChangeText: setLastName,
                autoCapitalize: 'none',
              }}
              rightIcon={
                <UserIcon
                  width={normalizeY(24)}
                  height={normalizeY(24)}
                  color={colors.grey}
                />
              }
            />
            <TextField
              textInputProps={{
                placeholder: 'Email',
                keyboardType: 'email-address',
                value: email,
                onChangeText: text => {
                  setEmail(text);
                  if (emailError.length > 0) {
                    if (!validateEmail(text)) {
                      setEmailError('Please enter valid E-Mail Address');
                    } else {
                      setEmailError('');
                    }
                  }
                },
                onBlur: () => {
                  if (!validateEmail(email)) {
                    setEmailError('Please enter valid E-Mail Address');
                  } else {
                    setEmailError('');
                  }
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
                onChangeText: setPassword,
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
            <Typography
              variant="sm"
              color={colors.black}
              textAlign="center"
              style={{marginBottom: normalizeY(16)}}>
              Already have an account?{' '}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => props.navigation.navigate('SignInScreen')}>
                <Typography
                  variant="sm"
                  color={colors.primary}
                  textAlign="center"
                  style={{marginTop: normalizeY(3)}}>
                  Sign in
                </Typography>
              </TouchableOpacity>
            </Typography>
            <Button
              label="Create account"
              onPress={handleSubmit}
              isDisabled={isLoading || !canProceed}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUpScreen;
