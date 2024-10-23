import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataHelper';
import { styles } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import PressableButton from '../components/PressableButton';
import Checkbox from 'expo-checkbox';

const EditDietEntryScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { backgroundColor, textColor } = useTheme();
  const { updateDietEntry, deleteDietEntry } = useData();

  const [description, setDescription] = useState(item.description);
  const [calories, setCalories] = useState(item.calories.toString());
  const [date, setDate] = useState(new Date(item.date));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSpecial, setIsSpecial] = useState(item.isSpecial);

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
    Alert.alert(
        "Update Activity",
        "Are you sure you want to update this activity?",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Update",
            onPress: async () => {
            updateDietEntry(item.id, {
            description: description.trim(),
            calories: parseInt(calories),
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

      <Text style={[styles.common.label, { color: textColor }]}>Date</Text>
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
        <PressableButton
          style={[styles.common.button, { backgroundColor: styles.colors.danger, flex: 1, marginRight: 8 }]}
          onPress={handleDelete}
        >
          <Text style={[styles.common.buttonText, { color: styles.colors.lightText }]}>Delete</Text>
        </PressableButton>
        <PressableButton
          style={[styles.common.button, { backgroundColor: styles.colors.primary, flex: 1, marginLeft: 8 }]}
          onPress={handleUpdate}
        >
          <Text style={[styles.common.buttonText, { color: styles.colors.lightText }]}>Update</Text>
        </PressableButton>
      </View>
    </View>
  );
};

export default EditDietEntryScreen;
