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

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputWrapper,
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
        />

        {isPassword ? (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setIsSecure((prev) => !prev)}
            activeOpacity={0.7}
          >
            <Text style={styles.eyeText}>{isSecure ? '👁️ Show' : '🙈 Hide'}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scales(16),
    width: '100%',
  },
  label: {
    fontSize: scales(14),
    fontFamily: fontFamily.medium,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: scales(6),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: scales(12),
    paddingHorizontal: scales(14),
    height: scales(52),
  },
  input: {
    flex: 1,
    fontSize: scales(15),
    fontFamily: fontFamily.regular,
    color: Colors.text,
    paddingVertical: 0,
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: '#FFF8F8',
  },
  inputDisabled: {
    backgroundColor: Colors.background,
    opacity: 0.7,
  },
  eyeButton: {
    paddingLeft: scales(8),
    paddingVertical: scales(6),
  },
  eyeText: {
    fontSize: scales(12),
    fontFamily: fontFamily.medium,
    color: Colors.textSecondary,
  },
  errorText: {
    fontSize: scales(12),
    fontFamily: fontFamily.regular,
    color: Colors.error,
    marginTop: scales(4),
    marginLeft: scales(2),
  },
});

export default CustomInput;
