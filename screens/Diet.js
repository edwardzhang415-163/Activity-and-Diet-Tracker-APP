import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import ItemsList from '../components/ItemsList';
import { createScreenStyles } from '../constants/styles';

const Diet = () => {
  const { dietEntries } = useData();
  const theme = useTheme();
  const screenStyles = createScreenStyles(theme);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <ItemsList items={dietEntries} type="diet" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Diet;