// import 'react-native-gesture-handler';  // This must be at the top
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import AppNavigator from './navigation/AppNavigator';


import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews',
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ThemeProvider>
          <DataProvider>
            <StatusBar 
              barStyle="dark-content" 
              backgroundColor="transparent" 
              translucent 
            />
            <AppNavigator />
          </DataProvider>
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}