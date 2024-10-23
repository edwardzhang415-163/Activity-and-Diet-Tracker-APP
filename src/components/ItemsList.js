import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataHelper';
import { styles } from '../styles';
import PressableButton from './PressableButton';
import { Ionicons } from '@expo/vector-icons';

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
    <PressableButton 
      onPress={() => handlePress(item)}
      style={[
        styles.common.listItem, 
        { 
          backgroundColor,
          borderBottomColor: styles.colors.grey 
        }
      ]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {type === 'activities' ? (
          <>
            <Text style={[localStyles.title, { color: textColor }]}>
              {item.type}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',flex: 1  }}>
                {item.isSpecial && (
                  <Ionicons 
                    name="warning"
                    size={24}
                    color={styles.colors.primary}
                    style={{ margin: 6 }} 
                  /> 
                )}
                <Text style={[localStyles.subtitle, { color: textColor }]}>
                  {new Date(item.date).toLocaleDateString()}
                </Text>
                <Text style={[localStyles.subtitle, { color: textColor, width : 80  }]}>
                  {item.duration} min
                </Text>
              </View>
          </>
        ) : (
          <>
            <Text style={[localStyles.title, { color: textColor }]}>
              {item.description}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',flex: 1  }}>
            {item.isSpecial && (
              <Ionicons 
            name="warning"
            size={24}
            color={styles.colors.primary}
            style={{ margin: 6 }} /> 
            )}
            <Text style={[localStyles.subtitle, { color: textColor }]}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
            <Text style={[localStyles.subtitle, { color: textColor , width : 50 }]}>
               {item.calories}
            </Text>
            </View>
          </>
        )}
      </View>
      
      </View>
    </PressableButton>
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
    marginRight: 8,
  },
  subtitle: {
    fontSize: 15,
    margin: 4,
    borderWidth: 1, 
    borderColor: 'grey', 
    borderRadius: 4, 
    padding: 4, 
    width: 100,
    textAlign: 'center'
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