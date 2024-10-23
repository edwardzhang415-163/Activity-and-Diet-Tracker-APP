import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles';

const ACTIVITY_TYPES = [
  { label: 'Walking', value: 'Walking' },
  { label: 'Running', value: 'Running' },
  { label: 'Swimming', value: 'Swimming' },
  { label: 'Weights', value: 'Weights' },
  { label: 'Yoga', value: 'Yoga' },
  { label: 'Cycling', value: 'Cycling' },
  { label: 'Hiking', value: 'Hiking' },
];

const EditActivityScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { updateActivity, deleteActivity } = useData();
  const { backgroundColor, textColor } = useTheme();
  
  const [type, setType] = useState(item.type);
  const [duration, setDuration] = useState(item.duration.toString());
  const [date, setDate] = useState(new Date(item.date));
  const [isSpecial, setIsSpecial] = useState(item.isSpecial);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      "Delete Activity",
      "Are you sure you want to delete this activity?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            await deleteActivity(item.id);
            navigation.goBack();
          }
        }
      ]
    );
  };

  const handleUpdate = () => {
    if (!type) {
      Alert.alert('Error', 'Please select an activity type');
      return;
    }
    if (!duration || isNaN(duration) || parseInt(duration) <= 0) {
      Alert.alert('Error', 'Please enter a valid duration');
      return;
    }

    Alert.alert(
      "Update Activity",
      "Are you sure you want to update this activity?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Update",
          onPress: async () => {
            await updateActivity(item.id, {
              type,
              duration: parseInt(duration),
              date: date.toISOString(),
              isSpecial: isSpecial
            });
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.common.container, { backgroundColor }]}>
      <Text style={[styles.common.label, { color: textColor }]}>Activity *</Text>
      <SelectList
        placeholder={type}
        data={ACTIVITY_TYPES}
        setSelected={setType}
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
        keyboardType="numbers-and-punctuation"
        placeholder="Enter duration"
        placeholderTextColor={styles.colors.grey}
      />

      <Text style={[styles.common.label, { color: textColor }]}>Date *</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(!showDatePicker)}
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
            setShowDatePicker();
            if (selectedDate) {
              setDate(selectedDate);
              setShowDatePicker(false)
            }
          }}
        />
      )}

      { (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
        <Text style={[styles.common.label, { color: textColor, marginLeft: 8 }]}>
        This item is marked as special. Select the
        checkbox if you would lke to approve it.
          </Text>
          <Checkbox
            value={isSpecial}
            onValueChange={() => setIsSpecial(!isSpecial)}
            color={styles.colors.primary}
          />
        </View>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <TouchableOpacity
          style={[styles.common.button, { backgroundColor: styles.colors.danger, flex: 1, marginRight: 8 }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.common.buttonText, { color: styles.colors.lightText }]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.common.button, { backgroundColor: styles.colors.primary, flex: 1, marginLeft: 8 }]}
          onPress={handleUpdate}
        >
          <Text style={[styles.common.buttonText, { color: styles.colors.lightText }]}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditActivityScreen;
