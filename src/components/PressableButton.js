import React from 'react';
import { Pressable, View } from 'react-native';
import { commonStyles, colors } from '../styles';

export default function PressableButton({ children, pressedFunction, componentStyle, pressedStyle }) {
  return (
    <Pressable
      onPress={pressedFunction}
      style={({ pressed }) => (pressed ? [componentStyle, pressedStyle] : componentStyle)}
      android_ripple={{ color: colors.ripple, borderless: false }}
    >
      <View>{children}</View>
    </Pressable>
  );
}