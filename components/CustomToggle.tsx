import React, { useState } from 'react';
import { View, Pressable, Animated } from 'react-native';

// Define the props interface for CustomToggle
interface CustomToggleProps {
  value: boolean;
  onValueChange?: (value: boolean) => void; // Callback for when the toggle changes
}

const CustomToggle: React.FC<CustomToggleProps> = ({
  value,
  onValueChange,
}) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(value);
  const animatedValue = useState(new Animated.Value(value ? 1 : 0))[0];

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }

    // Animate the circle movement
    Animated.timing(animatedValue, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Interpolate the circle's position from left (0) to right (1)
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 15], // Adjusted for smaller toggle width and circle size
  });

  return (
    <Pressable onPress={toggleSwitch}>
      <View
        className={`w-[30px] h-[15px] rounded-full justify-center p-[1px] ${
          isEnabled ? 'bg-primary' : 'bg-gray/25'
        }`}
      >
        <Animated.View
          className="w-[12px] h-[13px] rounded-full bg-white shadow-md"
          style={{ transform: [{ translateX }] }}
        />
      </View>
    </Pressable>
  );
};

export default CustomToggle;
