import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles';

const SettingsScreen = () => {
  const { backgroundColor, textColor, isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={[styles.common.container, { backgroundColor }]}>
      <TouchableOpacity
        style={[styles.common.button, { backgroundColor: styles.colors.primary }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.common.buttonText, { color: styles.colors.lightText }]}>
          Switch to {isDarkMode ? 'Light' : 'Dark'} Theme
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;