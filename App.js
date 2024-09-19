import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './screens/landing/Landing';
import BottomTabNavigator from './navigators/BottomTabNavigator';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import LandingManageTask from './screens/landing/LandingManageTask';
import LandingDaily from './screens/landing/LandingDaily';
import LandingOrganize from './screens/landing/LandingOrganize';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider } from './store/store';
import AsyncStorageService from './services/AsyncStorageService';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

export default function App() {

  return (
    <SafeAreaProvider>
      <StoreProvider>
        <ApplicationProvider {...eva} theme={eva.dark}>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="FirstScreen" component={FirstScreen} />
              <Stack.Screen name="LandingPage" component={LandingPage} />
              <Stack.Screen name="LandingManageTaskPage" component={LandingManageTask} />
              <Stack.Screen name="LandingDaily" component={LandingDaily} />
              <Stack.Screen name="LandingOrganize" component={LandingOrganize} />
              <Stack.Screen name="Main" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="light"/>
        </ApplicationProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
}

// Outside your App component, define a navigationRef for imperative navigation
import { createNavigationContainerRef } from '@react-navigation/native';
import FirstScreen from './screens/FirstScreen';

export const navigationRef = createNavigationContainerRef();
