import React from 'react';
import { Pressable, View } from 'react-native';
import {styles} from '../styles';

import React from 'react';
import { Pressable, View } from 'react-native';
import { styles } from '../styles';

export default function PressableButton({ children, onPress, Style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        Style,
        { opacity: pressed ? 0.6 : 1 }, // Change opacity when pressed
      ]}
      android_ripple={{ color: styles.colors.ripple, borderless: false }}
    >
      <View>{children}</View>
    </Pressable>
  );
}

