import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Activities from '../screens/Activities';
import AddActivity from '../screens/AddActivity';
import Diet from '../screens/Diet';
import AddDiet from '../screens/AddDiet';
import Settings from '../screens/Settings';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ActivityStack = () => {
  const theme = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.backgroundColor },
        headerTintColor: theme.textColor,
      }}>
      <Stack.Screen 
        name="ActivitiesList" 
        component={Activities}
        options={({ navigation }) => ({
          title: 'Activities',
          headerRight: () => (
            <Ionicons 
              name="add" 
              size={24} 
              color={theme.textColor}
              onPress={() => navigation.navigate('AddActivity')}
              style={{ marginRight: 16 }}
            />
          ),
        })}
      />
      <Stack.Screen 
        name="AddActivity" 
        component={AddActivity}
        options={{ title: 'Add An Activity' }}
      />
    </Stack.Navigator>
  );
};

const DietStack = () => {
  const theme = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.backgroundColor },
        headerTintColor: theme.textColor,
      }}>
      <Stack.Screen 
        name="DietList" 
        component={Diet}
        options={({ navigation }) => ({
          title: 'Diet',
          headerRight: () => (
            <Ionicons 
              name="add" 
              size={24} 
              color={theme.textColor}
              onPress={() => navigation.navigate('AddDiet')}
              style={{ marginRight: 16 }}
            />
          ),
        })}
      />
      <Stack.Screen 
        name="AddDiet" 
        component={AddDiet}
        options={{ title: 'Add A Diet Entry' }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const theme = useTheme();

  return (
    <NavigationContainer>
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
          tabBarActiveTintColor: theme.textColor,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: theme.backgroundColor },
          headerShown: false,
        })}>
        <Tab.Screen name="Activities" component={ActivityStack} />
        <Tab.Screen name="Diet" component={DietStack} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;