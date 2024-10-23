import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { styles } from '../styles';

const ItemsList = ({ type }) => {
  const navigation = useNavigation();
  const { backgroundColor, textColor } = useTheme();
  const { activities, dietEntries } = useData();

  const data = type === 'activities' ? activities : dietEntries;

  const handlePress = (item) => {
    const screenName = type === 'activities' ? 'EditActivity' : 'EditDiet';
    navigation.navigate(screenName, { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => handlePress(item)}
      style={[
        styles.common.listItem, 
        { 
          backgroundColor,
          borderBottomColor: styles.colors.grey 
        }
      ]}
    >
      <View>
        {type === 'activities' ? (
          <>
            <Text style={[localStyles.title, { color: textColor }]}>
              {item.type}
            </Text>
            <Text style={[localStyles.subtitle, { color: textColor }]}>
              Duration: {item.duration} min
            </Text>
          </>
        ) : (
          <>
            <Text style={[localStyles.title, { color: textColor }]}>
              {item.description}
            </Text>
            <Text style={[localStyles.subtitle, { color: textColor }]}>
              Calories: {item.calories}
            </Text>
          </>
        )}
        <Text style={[localStyles.date, { color: textColor }]}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
      {item.isSpecial && (
        <View style={localStyles.specialBadge}>
          <Text style={localStyles.specialText}>Special</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={{ backgroundColor }}
    />
  );
};

const localStyles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  specialBadge: {
    backgroundColor: styles.colors.warning,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  specialText: {
    color: styles.colors.lightText,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ItemsList;