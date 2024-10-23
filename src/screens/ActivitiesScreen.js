import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemsList from '../components/ItemsList';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles';
import PressableButton from '../components/PressableButton';

const ActivitiesScreen = ({ navigation }) => {
  const { backgroundColor } = useTheme();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
        pressedFunction={() =>navigation.navigate('AddActivity')}
        componentStyle={styles.colors.primary}
        pressedStyle={styles.common.button}
      >
        <Ionicons 
          name="add"
          size={24}
          color={styles.colors.primary}
          style={{ marginRight: 16 }} />
      </PressableButton>
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