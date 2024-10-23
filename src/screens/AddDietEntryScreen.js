import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useData } from '../context/DataHelper';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles';
import PressableButton from '../components/PressableButton';

const AddDietEntryScreen = ({ navigation }) => {
  const { addDietEntry } = useData();
  const { backgroundColor, textColor } = useTheme();
  
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateAndSave = () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }
    if (!calories || isNaN(calories) || parseInt(calories) <= 0) {
      Alert.alert('Error', 'Please enter valid calories');
      return;
    }

    addDietEntry({
      description: description.trim(),
      calories: parseInt(calories),
      date: date.toISOString(),
    });

    navigation.goBack();
  };

  return (
    <View style={[styles.common.container, { backgroundColor }]}>
      <Text style={[styles.common.label, { color: textColor }]}>Description *</Text>
      <TextInput
        style={[styles.common.input, { color: textColor, borderColor: textColor, height: 100 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        placeholderTextColor={styles.colors.grey}
        multiline={true}
        numberOfLines={4}
      />

      <Text style={[styles.common.label, { color: textColor }]}>Calories *</Text>
      <TextInput
        style={[styles.common.input, { color: textColor, borderColor: textColor }]}
        value={calories}
        onChangeText={setCalories}
        keyboardType="numbers-and-punctuation"
        placeholder="Enter calories"
        placeholderTextColor={styles.colors.grey}
      />

      <Text style={[styles.common.label, { color: textColor }]}>Date *</Text>
      <PressableButton
        onPress={() => setShowDatePicker(!showDatePicker)}
        style={[styles.common.input, { justifyContent: 'center' }]}
      >
        <Text style={{ color: textColor }}>{date.toLocaleDateString()}</Text>
      </PressableButton>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => {
            setShowDatePicker();
            if (selectedDate) {
              setDate(selectedDate);
              setShowDatePicker(false)
            }
          }}
        />
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <PressableButton
          style={[styles.common.button, { backgroundColor: styles.colors.danger, flex: 1, marginRight: 8 }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.common.buttonText, { color: styles.colors.lightText }]}>Cancel</Text>
        </PressableButton>
        <PressableButton
          style={[styles.common.button, { backgroundColor: styles.colors.primary, flex: 1, marginLeft: 8 }]}
          onPress={validateAndSave}
        >
          <Text style={[styles.common.buttonText, { color: styles.colors.lightText }]}>Save</Text>
        </PressableButton>
      </View>
    </View>
  );
};

export default AddDietEntryScreen;