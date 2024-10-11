import { StyleSheet } from 'react-native';

export const styles = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    danger: '#FF3B30',
    warning: '#FF9500',
    lightBackground: '#FFFFFF',
    darkBackground: '#000000',
    lightText: '#FFFFFF',
    darkText: '#000000',
    grey: '#8E8E93',
    ripple: 'rgba(0, 0, 0, 0.32)',
  },
  
  common: StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      marginVertical: 8,
    },
    button: {
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 8,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 4,
    },
    listItem: {
      padding: 16,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }),
};