import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { fontFamily } from '../../assets';
import { Colors, scales } from '../../utils';

export const CustomButton = ({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
  labelStyle,
}) => {
  const isActionDisabled = disabled || loading;
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isActionDisabled}
      style={[
        styles.button,
        isOutline ? styles.outlineButton : styles.primaryButton,
        isActionDisabled && styles.disabledButton,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isOutline ? Colors.primary : Colors.white}
        />
      ) : (
        <Text
          style={[
            styles.label,
            isOutline ? styles.outlineLabel : styles.primaryLabel,
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: scales(54),
    borderRadius: scales(14),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scales(24),
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#4F46E5',
    elevation: 0,
    shadowOpacity: 0,
  },
  disabledButton: {
    opacity: 0.65,
    shadowOpacity: 0,
  },
  label: {
    fontSize: scales(15),
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  primaryLabel: {
    color: '#FFFFFF',
  },
  outlineLabel: {
    color: '#4F46E5',
  },
});

export default CustomButton;
