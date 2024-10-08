import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import { styles as globalStyles } from '../constants/styles';

const SettingsSection = ({ title, children }) => {
  const theme = useTheme();
  
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
        {title}
      </Text>
      {children}
    </View>
  );
};

const Settings = () => {
  const theme = useTheme();

  return (
    <View style={[
      styles.container, 
      { backgroundColor: theme.backgroundColor }
    ]}>
      <StatusBar
        barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.backgroundColor}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <SettingsSection title="Appearance">
          <ThemeToggle />
        </SettingsSection>

        <SettingsSection title="About">
          <View style={[
            styles.infoCard, 
            { 
              backgroundColor: theme.isDarkMode ? '#1C1C1E' : '#FFFFFF',
              borderColor: theme.isDarkMode ? '#333333' : '#E5E5EA'
            }
          ]}>
            <Text style={[styles.infoText, { color: theme.textColor }]}>
              Activity & Diet Tracker
            </Text>
            <Text style={[styles.infoTextSecondary, { color: theme.isDarkMode ? '#8E8E93' : '#6E6E73' }]}>
              Version 1.0.0
            </Text>
          </View>
        </SettingsSection>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginLeft: 16,
    marginBottom: 8,
  },
  infoCard: {
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 16,
    padding: 16,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  infoTextSecondary: {
    fontSize: 14,
  },
});

export default Settings;