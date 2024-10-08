import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../constants/styles';

const ItemsList = ({ items, type }) => {
  const theme = useTheme();
  const screenStyles = createScreenStyles(theme);

  const renderItem = ({ item }) => (
    <View style={[
      styles.item,
      { backgroundColor: theme.cardBackground },
      item.isSpecial && styles.specialItem
    ]}>
      {type === 'activity' ? (
        <>
          <Text style={screenStyles.text}>{item.type}</Text>
          <Text style={screenStyles.text}>{item.duration} minutes</Text>
        </>
      ) : (
        <>
          <Text style={screenStyles.text}>{item.description}</Text>
          <Text style={screenStyles.text}>{item.calories} calories</Text>
        </>
      )}
      <Text style={screenStyles.text}>{new Date(item.date).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.list}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    padding: styles.common.padding,
  },
  item: {
    padding: styles.common.spacing.medium,
    marginVertical: styles.common.spacing.small,
    borderRadius: styles.common.borderRadius,
  },
  specialItem: {
    borderWidth: 2,
    borderColor: styles.lightMode.accentColor,
  },
});

export default ItemsList;