import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

const CustomCheckbox = ({ isChecked, onPress, color }) => {
  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        status={isChecked ? 'checked' : 'unchecked'}
        onPress={onPress}
        color={color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    borderWidth: 1,
    borderColor: '#999', 
    borderRadius: 4,    
    margin: 1,          
  },
});

export default CustomCheckbox;
