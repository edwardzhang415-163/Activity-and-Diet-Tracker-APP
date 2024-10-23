import React from 'react';
import { Pressable, View } from 'react-native';
import {styles} from '../styles';

export default function PressableButton({ children, onPress, componentStyle, pressedStyle }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => (pressed ? [componentStyle, pressedStyle] : componentStyle)}
      android_ripple={{ color: styles.colors.ripple, borderless: false }}
    >
      <View>{children}</View>
    </Pressable>
  );
}