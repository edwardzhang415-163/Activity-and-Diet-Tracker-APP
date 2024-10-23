import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ActivitiesScreen from '../screens/ActivitiesScreen';
import DietScreen from '../screens/DietScreen';
import AddActivityScreen from '../screens/AddActivityScreen';
import AddDietEntryScreen from '../screens/AddDietEntryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { backgroundColor, textColor, headerColor } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Activities') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Diet') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: styles.colors.primary,
        tabBarInactiveTintColor: styles.colors.grey,
        tabBarStyle: { backgroundColor: headerColor },
        headerStyle: { backgroundColor: headerColor },
        headerTintColor: textColor,
      })}
    >
      <Tab.Screen name="Activities" component={ActivitiesScreen} />
      <Tab.Screen name="Diet" component={DietScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { backgroundColor, textColor, headerColor } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor },
          headerTintColor: textColor,
        }}
      >
        <Stack.Screen 
          name="MainTabs" 
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AddActivity" 
          component={AddActivityScreen}
          options={{ title: 'Add An Activity' }}
        />
        <Stack.Screen 
          name="AddDietEntry" 
          component={AddDietEntryScreen}
          options={{ title: 'Add A Diet Entry' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;