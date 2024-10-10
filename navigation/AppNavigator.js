import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Activities from '../screens/Activities';
import AddActivity from '../screens/AddActivity';
import Diet from '../screens/Diet';
import AddDiet from '../screens/AddDiet';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ActivityStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ActivitiesList" 
      component={Activities} 
      options={{ title: 'Activities' }}
    />
    <Stack.Screen 
      name="AddActivity" 
      component={AddActivity} 
      options={{ title: 'Add Activity' }}
    />
  </Stack.Navigator>
);

const DietStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="DietList" 
      component={Diet} 
      options={{ title: 'Diet' }}
    />
    <Stack.Screen 
      name="AddDiet" 
      component={AddDiet} 
      options={{ title: 'Add Diet' }}
    />
  </Stack.Navigator>
);


const AppNavigator = () => {
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
      })}
    >
      <Tab.Screen 
        name="Activities" 
        component={ActivityStack} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Diet" 
        component={DietStack} 
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default AppNavigator;