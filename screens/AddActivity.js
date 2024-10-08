import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { createScreenStyles } from '../constants/styles';

const activityTypes = [
  { label: 'Walking', value: 'Walking' },
  { label: 'Running', value: 'Running' },
  { label: 'Swimming', value: 'Swimming' },
  { label: 'Weights', value: 'Weights' },
  { label: 'Yoga', value: 'Yoga' },
  { label: 'Cycling', value: 'Cycling' },
  { label: 'Hiking', value: 'Hiking' },
];

const AddActivity = ({ navigation }) => {
  const { addActivity } = useData();
  const theme = useTheme();
  const screenStyles = createScreenStyles(theme);

  const [type, setType] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const validateAndSave = () => {
    if (!type) {
      Alert.alert('Error', 'Please select an activity type');
      return;
    }

    const durationNum = parseInt(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      Alert.alert('Error', 'Please enter a valid duration');
      return;
    }

    addActivity({
      type,
      duration: durationNum,
      date: date.toISOString(),
    });

    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.label, { color: theme.textColor }]}>Activity Type</Text>
      <DropDownPicker
        open={dropdownOpen}
        value={type}
        items={activityTypes}
        setOpen={setDropdownOpen}
        setValue={setType}
        style={[styles.dropdown, { backgroundColor: theme.backgroundColor }]}
        textStyle={{ color: theme.textColor }}
        theme={theme.isDarkMode ? "DARK" : "LIGHT"}
      />

      <Text style={[styles.label, { color: theme.textColor }]}>Duration (minutes)</Text>
      <TextInput
        style={[styles.input, { color: theme.textColor, borderColor: theme.textColor }]}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        placeholder="Enter duration"
        placeholderTextColor="gray"
      />

      <Text style={[styles.label, { color: theme.textColor }]}>Date</Text>
      <TouchableOpacity
        style={[styles.input, { color: theme.textColor, borderColor: theme.textColor }]}
        onPress={() => setShowDatePicker(true)}>
        <Text style={{ color: theme.textColor }}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={validateAndSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  saveButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddActivity;