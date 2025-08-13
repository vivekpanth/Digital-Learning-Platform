import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'small' | 'medium' | 'large';
  margin?: 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'elevated',
  padding = 'medium',
  margin = 'small',
}) => {
  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      overflow: 'hidden',
    };

    // Padding
    switch (padding) {
      case 'small':
        baseStyle.padding = 12;
        break;
      case 'large':
        baseStyle.padding = 24;
        break;
      default: // medium
        baseStyle.padding = 16;
    }

    // Margin
    switch (margin) {
      case 'small':
        baseStyle.margin = 8;
        break;
      case 'large':
        baseStyle.margin = 16;
        break;
      default: // medium
        baseStyle.margin = 12;
    }

    // Variant styling
    switch (variant) {
      case 'elevated':
        baseStyle.shadowColor = 'rgba(0, 0, 0, 0.1)';
        baseStyle.shadowOffset = { width: 0, height: 4 };
        baseStyle.shadowOpacity = 0.15;
        baseStyle.shadowRadius = 8;
        baseStyle.elevation = 6;
        break;
      case 'outlined':
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = '#E2E8F0';
        break;
      case 'filled':
        baseStyle.backgroundColor = '#F8FAFC';
        break;
    }

    return baseStyle;
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={[getCardStyle(), style]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[getCardStyle(), style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  // Additional styles can be added here if needed
}); 