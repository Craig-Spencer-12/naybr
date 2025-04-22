// components/AnimatedTabIcon.tsx
import React from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  icon: React.ReactNode;
  focused: boolean;
};

export default function AnimatedTabIcon({ icon, focused }: Props) {
  const scale = useSharedValue(1);

  scale.value = withSpring(focused ? 1.3 : 1); // Simple bounce effect

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return <Animated.View style={[animatedStyle]}>{icon}</Animated.View>;
}
