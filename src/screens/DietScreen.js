import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemsList from '../components/ItemsList';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles';

const DietScreen = ({ navigation }) => {
  const { backgroundColor } = useTheme();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="add"
          size={24}
          color={styles.colors.primary}
          onPress={() => navigation.navigate('AddDietEntry')}
          style={{ marginRight: 16 }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={[styles.common.container, { backgroundColor }]}>
      <ItemsList type="diet" />
    </View>
  );
};

export default DietScreen;