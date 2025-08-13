import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  helperStyle?: TextStyle;
  variant?: 'outlined' | 'filled';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  helperStyle,
  variant = 'outlined',
  style,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      marginBottom: 16,
    };

    if (variant === 'filled') {
      baseStyle.backgroundColor = '#F8FAFC';
      baseStyle.borderRadius = 12;
      baseStyle.paddingHorizontal = 16;
      baseStyle.paddingVertical = 8;
    }

    return baseStyle;
  };

  const getInputContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: variant === 'outlined' ? 2 : 0,
      borderColor: error ? '#EF4444' : isFocused ? '#6366F1' : '#E2E8F0',
      borderRadius: 12,
      backgroundColor: variant === 'outlined' ? 'transparent' : '#F8FAFC',
      paddingHorizontal: 16,
      paddingVertical: 12,
      minHeight: 48,
    };

    if (isFocused && variant === 'outlined') {
      baseStyle.borderColor = '#6366F1';
      baseStyle.shadowColor = '#6366F1';
      baseStyle.shadowOffset = { width: 0, height: 0 };
      baseStyle.shadowOpacity = 0.2;
      baseStyle.shadowRadius = 4;
      baseStyle.elevation = 2;
    }

    return baseStyle;
  };

  const getInputStyle = (): TextStyle => {
    return {
      flex: 1,
      fontSize: 16,
      color: '#1E293B',
      paddingVertical: 0,
    };
  };

  const getLabelStyle = (): TextStyle => {
    return {
      fontSize: 14,
      fontWeight: '600',
      color: '#1E293B',
      marginBottom: 8,
    };
  };

  const getErrorStyle = (): TextStyle => {
    return {
      fontSize: 12,
      color: '#EF4444',
      marginTop: 4,
    };
  };

  const getHelperStyle = (): TextStyle => {
    return {
      fontSize: 12,
      color: '#64748B',
      marginTop: 4,
    };
  };

  return (
    <View style={[getContainerStyle(), containerStyle]}>
      {label && <Text style={[getLabelStyle(), labelStyle]}>{label}</Text>}
      
      <View style={getInputContainerStyle()}>
        {leftIcon && (
          <View style={styles.iconContainer}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={[getInputStyle(), inputStyle, style]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor="#94A3B8"
          {...props}
        />
        
        {rightIcon && (
          <View style={styles.iconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {error && <Text style={[getErrorStyle(), errorStyle]}>{error}</Text>}
      {helperText && <Text style={[getHelperStyle(), helperStyle]}>{helperText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 