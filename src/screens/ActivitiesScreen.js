import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemsList from '../components/ItemsList';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles';

const ActivitiesScreen = ({ navigation }) => {
  const { backgroundColor } = useTheme();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="add"
          size={24}
          color={styles.colors.primary}
          onPress={() => navigation.navigate('AddActivity')}
          style={{ marginRight: 16 }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={[styles.common.container, { backgroundColor }]}>
      <ItemsList type="activities" />
    </View>
  );
};

export default ActivitiesScreen;