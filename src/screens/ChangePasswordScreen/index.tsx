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
import {useSelectState} from '../../store/selectors';
import UpdateUserRequest from '../../network/requests/UpdateUserRequest';
import validateEmail from '../../utils/validateEmail';
import ChangePasswordRequest from '../../network/requests/ChangePasswordRequest';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalizeX(24),
    paddingBottom: normalizeY(100),
  },
});

interface Props
  extends StackScreenProps<RootStackParams, 'ChangePasswordScreen'> {}

const ChangePasswordScreen = (props: Props) => {
  const {user} = useSelectState();
  const {top} = useSafeAreaInsets();
  const [passwordError, setPasswordError] = React.useState('');
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const canProceed = React.useMemo(() => {
    return !isAnyEmpty([oldPassword, newPassword]);
  }, [oldPassword, newPassword]);

  const handleSubmit = async () => {
    if (!canProceed || isLoading) {
      return;
    }

    setIsLoading(true);

    const payload: ChangePasswordRequest = {
      oldPassword: oldPassword.trim(),
      newPassword: newPassword.trim(),
      _id: user._id,
    };
    try {
      const response = await API.client.put<
        SignUpRequest,
        AxiosResponse<AuthenticationResponse>
      >('/user/change-password', payload);

      setOldPassword('');
      setNewPassword('');
      setIsLoading(false);
      props.navigation.goBack();
      return response.data;
    } catch (error: any) {
      setIsLoading(false);
      console.log({error: error?.list});
      if ((error?.list[0]?.msg as string).toLowerCase() === 'bad request') {
        setPasswordError('Your password is incorrect');
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
              Change your password
            </Typography>
            <TextField
              textInputProps={{
                placeholder: 'Password',
                secureTextEntry: !showOldPassword,
                value: oldPassword,
                onChangeText: text => {
                  setOldPassword(text);
                  setPasswordError('');
                },
              }}
              rightIcon={
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShowOldPassword(prevValue => !prevValue)}>
                  {!showOldPassword ? (
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
              error={passwordError}
            />
            <TextField
              textInputProps={{
                placeholder: 'New password',
                secureTextEntry: !showNewPassword,
                value: newPassword,
                onChangeText: text => {
                  setNewPassword(text);
                  setPasswordError('');
                },
              }}
              rightIcon={
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShowNewPassword(prevValue => !prevValue)}>
                  {!showNewPassword ? (
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
            <Button
              label="Update"
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

export default ChangePasswordScreen;
