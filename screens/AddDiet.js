import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { createScreenStyles } from '../constants/styles';

const AddDiet = ({ navigation }) => {
  const { addDietEntry } = useData();
  const theme = useTheme();
  const screenStyles = createScreenStyles(theme);

  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateAndSave = () => {
    // Validate description
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    // Validate calories
    const caloriesNum = parseInt(calories);
    if (isNaN(caloriesNum) || caloriesNum <= 0) {
      Alert.alert('Error', 'Please enter a valid number of calories');
      return;
    }

    // Save the entry
    addDietEntry({
      description: description.trim(),
      calories: caloriesNum,
      date: date.toISOString(),
    });

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.label, { color: theme.textColor }]}>Description</Text>
        <TextInput
          style={[
            styles.input, 
            styles.descriptionInput,
            { 
              color: theme.textColor, 
              borderColor: theme.textColor,
              backgroundColor: theme.isDarkMode ? '#1C1C1E' : '#FFFFFF'
            }
          ]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter meal description"
          placeholderTextColor="gray"
          multiline
        />

        <Text style={[styles.label, { color: theme.textColor }]}>Calories</Text>
        <TextInput
          style={[
            styles.input,
            { 
              color: theme.textColor, 
              borderColor: theme.textColor,
              backgroundColor: theme.isDarkMode ? '#1C1C1E' : '#FFFFFF'
            }
          ]}
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
          placeholder="Enter calories"
          placeholderTextColor="gray"
        />

        <Text style={[styles.label, { color: theme.textColor }]}>Date</Text>
        <TouchableOpacity
          style={[
            styles.input,
            { 
              color: theme.textColor, 
              borderColor: theme.textColor,
              backgroundColor: theme.isDarkMode ? '#1C1C1E' : '#FFFFFF'
            }
          ]}
          onPress={() => setShowDatePicker(true)}
        >
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
            style={styles.datePicker}
          />
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={validateAndSave}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Add extra padding at the bottom for keyboard avoiding view */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </KeyboardAvoidingView>
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
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
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
  datePicker: {
    marginBottom: 16,
  },
  bottomPadding: {
    height: 40, // Adds extra padding at the bottom
  }
});

export default AddDiet;