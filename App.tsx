import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ProfileScreen from './src/screens/ProfileScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import UpdateProfileScreen from './src/screens/UpdateProfileScreen';
import {useSelectState} from './src/store/selectors';
import {RootStackParams} from './types';

const Stack = createStackNavigator<RootStackParams>();

const RootStackNavigation = () => {
  const {authentication} = useSelectState();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {authentication.isAuthenticated ? (
        <>
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen
            name="UpdateProfileScreen"
            component={UpdateProfileScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};

export default App;
