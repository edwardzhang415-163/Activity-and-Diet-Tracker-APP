import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles';
import PressableButton from '../components/PressableButton';

const SettingsScreen = () => {
  const { backgroundColor, textColor, isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={[styles.common.container, { backgroundColor }]}>
      <PressableButton
        style={[styles.common.button, { backgroundColor: styles.colors.primary }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.common.buttonText, { color: styles.colors.lightText }]}>
          Switch to {isDarkMode ? 'Light' : 'Dark'} Theme
        </Text>
      </PressableButton>
    </View>
  );
};

export default SettingsScreen;