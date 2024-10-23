import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles';
import PressableButton from '../components/PressableButton';

const ACTIVITY_TYPES = [
  { key: 'Walking', value: 'Walking' },
  { key: 'Running', value: 'Running' },
  { key: 'Swimming', value: 'Swimming' },
  { key: 'Weights', value: 'Weights' },
  { key: 'Yoga', value: 'Yoga' },
  { key: 'Cycling', value: 'Cycling' },
  { key: 'Hiking', value: 'Hiking' },
];

const AddActivityScreen = ({ navigation }) => {
  const { addActivity } = useData();
  const { backgroundColor, textColor } = useTheme();
  
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateAndSave = () => {
    if (!type) {
      Alert.alert('Error', 'Please select an activity type');
      return;
    }
    if (!duration || isNaN(duration) || parseInt(duration) <= 0) {
      Alert.alert('Error', 'Please enter a valid duration');
      return;
    }

    addActivity({
      type,
      duration: parseInt(duration),
      date: date.toISOString(),
    });

    navigation.goBack();
  };

  return (
    <View style={[styles.common.container, { backgroundColor }]}>
      <Text style={[styles.common.label, { color: textColor }]}>Activity *</Text>
      <SelectList
        setSelected={setType}
        data={ACTIVITY_TYPES}
        save="value"
        placeholder="Select activity type"
        boxStyles={{
          borderColor: textColor,
          backgroundColor: backgroundColor,
          marginBottom: 16
        }}
        inputStyles={{ color: textColor }}
        dropdownStyles={{
          borderColor: textColor,
          backgroundColor: backgroundColor
        }}
        dropdownTextStyles={{ color: textColor }}
        search={false}
      />

      <Text style={[styles.common.label, { color: textColor }]}>Duration (min) *</Text>
      <TextInput
        style={[styles.common.input, { color: textColor, borderColor: textColor }]}
        value={duration}
        onChangeText={setDuration}
        keyboardType='numbers-and-punctuation'
        placeholder="Enter duration"
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

export default AddActivityScreen;