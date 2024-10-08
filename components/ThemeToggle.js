import React from 'react';
import { 
  View, 
  Text, 
  Switch, 
  StyleSheet,
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const theme = useTheme();

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        { 
          backgroundColor: theme.isDarkMode ? '#1C1C1E' : '#FFFFFF',
          borderColor: theme.isDarkMode ? '#333333' : '#E5E5EA'
        }
      ]}
      onPress={theme.toggleTheme}
    >
      <View style={styles.content}>
        <View style={styles.labelContainer}>
          <Ionicons 
            name={theme.isDarkMode ? 'moon' : 'sunny'} 
            size={24} 
            color={theme.isDarkMode ? '#FFFFFF' : '#FF9500'}
            style={styles.icon}
          />
          <Text style={[styles.label, { color: theme.textColor }]}>
            Dark Mode
          </Text>
        </View>
        <Switch
          value={theme.isDarkMode}
          onValueChange={theme.toggleTheme}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={theme.isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ThemeToggle;