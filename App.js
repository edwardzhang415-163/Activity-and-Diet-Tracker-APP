import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from './src/context/ThemeContext';
import { DataProvider } from './src/context/DataContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <StatusBar barStyle="light-content" />
        <AppNavigator />
      </DataProvider>
    </ThemeProvider>
  );
}