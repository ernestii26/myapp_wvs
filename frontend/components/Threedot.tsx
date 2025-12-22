import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons'; // Recommended for this icon
interface props {
  onPress?: () => void;
}
const ThreeDotButton = (
  { onPress }: props
) => {
  const handlePress = () => {
    // Replace this with your actual menu/option logic
    Alert.alert("Menu Button Pressed", "This is where your options would open.");
  };

  return (
    <TouchableOpacity 
      onPress={
          onPress ? onPress : handlePress
      } 
      style={styles.button}
      // Increase the hit-slop to make a small icon easier to press
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      {/* Entypo 'dots-three-horizontal' for three dots */}
      <Entypo name="dots-three-horizontal" size={24} color="#555" />
    </TouchableOpacity>
  );
};

// ---
// Expo StyleSheet
// ---

const styles = StyleSheet.create({
  button: {
    // Minimal padding around the icon for easier touch
    padding: 5,
    // Center the icon
    alignItems: 'center',
    justifyContent: 'center',
    // The icon itself handles the three dots visual
  },
});

export default ThreeDotButton;