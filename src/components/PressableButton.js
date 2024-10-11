import React from 'react';
import { Pressable, View } from 'react-native';
import {styles} from '../styles';

export default function PressableButton({ children, pressedFunction, componentStyle, pressedStyle }) {
  return (
    <Pressable
      onPress={pressedFunction}
      style={({ pressed }) => (pressed ? [componentStyle, pressedStyle] : componentStyle)}
      android_ripple={{ color: styles.colors.ripple, borderless: false }}
    >
      <View>{children}</View>
    </Pressable>
  );
}