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
    height: scales(52),
    borderRadius: scales(12),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scales(20),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  outlineButton: {
    backgroundColor: Colors.transparent,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    elevation: 0,
    shadowOpacity: 0,
  },
  disabledButton: {
    opacity: 0.6,
  },
  label: {
    fontSize: scales(16),
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryLabel: {
    color: Colors.white,
  },
  outlineLabel: {
    color: Colors.primary,
  },
});

export default CustomButton;
