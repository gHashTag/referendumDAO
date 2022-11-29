import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/types';

import {WelcomeScreen} from 'src/screens';
import {navigationRef} from './variables';

const Stack = createNativeStackNavigator<RootStackParamList>();

const stackScreenOptions: NativeStackNavigationOptions = {
  gestureEnabled: false,
  headerShown: false,
};

export const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={stackScreenOptions}>
        <Stack.Screen name="WELCOME" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
