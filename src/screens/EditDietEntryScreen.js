import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { styles } from '../styles';
import { Ionicons } from '@expo/vector-icons';

const EditDietEntryScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { backgroundColor, textColor } = useTheme();
  const { updateDietEntry, deleteDietEntry } = useData();

  const [description, setDescription] = useState(item.description);
  const [calories, setCalories] = useState(item.calories.toString());
  const [date, setDate] = useState(new Date(item.date));
  const [showDatePicker, setShowDatePicker] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="trash-outline"
          size={24}
          color={styles.colors.danger}
          onPress={handleDelete}
          style={{ marginRight: 16 }}
        />
      ),
    });
  }, [navigation]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Diet Entry',
      'Are you sure you want to delete this diet entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteDietEntry(item.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleUpdate = () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }
    if (!calories || isNaN(calories) || parseInt(calories) <= 0) {
      Alert.alert('Error', 'Please enter valid calories');
      return;
    }

    updateDietEntry(item.id, {
      description: description.trim(),
      calories: parseInt(calories),
      date: date.toISOString(),
    });
    navigation.goBack();
  };

  return (
    <View style={[styles.common.container, { backgroundColor }]}>
      <Text style={[styles.common.label, { color: textColor }]}>Description</Text>
      <TextInput
        style={[styles.common.input, { color: textColor, borderColor: textColor }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        placeholderTextColor={styles.colors.grey}
      />

      <Text style={[styles.common.label, { color: textColor }]}>Calories</Text>
      <TextInput
        style={[styles.common.input, { color: textColor, borderColor: textColor }]}
        value={calories}
        onChangeText={setCalories}
        keyboardType="numbers-and-punctuation"
        placeholder="Enter calories"
        placeholderTextColor={styles.colors.grey}
      />

      <Text style={[styles.common.label, { color: textColor }]}>Date</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={[styles.common.input, { justifyContent: 'center' }]}
      >
        <Text style={{ color: textColor }}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === 'ios');
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <TouchableOpacity
          style={[styles.common.button, { backgroundColor: styles.colors.danger, flex: 1, marginRight: 8 }]}
          onPress={handleDelete}
        >
          <Text style={[styles.common.buttonText, { color: styles.colors.lightText }]}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.common.button, { backgroundColor: styles.colors.primary, flex: 1, marginLeft: 8 }]}
          onPress={handleUpdate}
        >
          <Text style={[styles.common.buttonText, { color: styles.colors.lightText }]}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditDietEntryScreen;
