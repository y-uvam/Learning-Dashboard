import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontFamily } from '../../assets';
import { Colors, scales } from '../../utils';

export const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  isPassword = false,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
  editable = true,
  maxLength,
  containerStyle,
  inputStyle,
}) => {
  const [isSecure, setIsSecure] = useState(isPassword);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputWrapper,
          isFocused ? styles.inputFocused : null,
          error ? styles.inputError : null,
          !editable && styles.inputDisabled,
        ]}
      >
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          editable={editable}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {isPassword ? (
          <TouchableOpacity
            style={styles.togglePill}
            onPress={() => setIsSecure((prev) => !prev)}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.toggleText}>{isSecure ? 'SHOW' : 'HIDE'}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorDot}>•</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scales(18),
    width: '100%',
  },
  label: {
    fontSize: scales(13),
    fontFamily: fontFamily.medium,
    fontWeight: '600',
    color: '#334155',
    marginBottom: scales(7),
    letterSpacing: 0.2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: scales(14),
    paddingHorizontal: scales(16),
    height: scales(54),
  },
  inputFocused: {
    borderColor: '#4F46E5',
    backgroundColor: '#FFFFFF',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: scales(15),
    fontFamily: fontFamily.regular,
    color: '#0F172A',
    paddingVertical: 0,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FFF8F8',
  },
  inputDisabled: {
    backgroundColor: '#F1F5F9',
    opacity: 0.7,
  },
  togglePill: {
    paddingHorizontal: scales(10),
    paddingVertical: scales(5),
    borderRadius: scales(8),
    backgroundColor: '#EEF2FF',
  },
  toggleText: {
    fontSize: scales(11),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: '#4F46E5',
    letterSpacing: 0.5,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scales(6),
    marginLeft: scales(2),
  },
  errorDot: {
    color: '#EF4444',
    fontSize: scales(14),
    marginRight: scales(4),
  },
  errorText: {
    fontSize: scales(12),
    fontFamily: fontFamily.medium,
    color: '#EF4444',
  },
});

export default CustomInput;
