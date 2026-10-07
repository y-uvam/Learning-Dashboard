import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fontFamily } from '../../assets';
import { CustomButton, CustomInput } from '../../components';
import { routesConstants } from '../../navigation/routeConstants';
import { clearAuthError, loginUserThunk } from '../../redux/slices/authSlice';
import { Colors, CommonText, scales, validateLoginForm } from '../../utils';

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [formErrors, setFormErrors] = useState({});

  const handleEmailChange = (text) => {
    setEmail(text);
    if (formErrors.email) {
      setFormErrors((prev) => ({ ...prev, email: undefined }));
    }
    if (error) {
      dispatch(clearAuthError());
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (formErrors.password) {
      setFormErrors((prev) => ({ ...prev, password: undefined }));
    }
    if (error) {
      dispatch(clearAuthError());
    }
  };

  const handleLogin = async () => {
    const validation = validateLoginForm(email, password);
    if (!validation.isValid) {
      setFormErrors({ [validation.field]: validation.error });
      return;
    }

    setFormErrors({});
    const resultAction = await dispatch(loginUserThunk({ email, password }));

    if (loginUserThunk.fulfilled.match(resultAction)) {
      navigation.reset({
        index: 0,
        routes: [{ name: routesConstants.CourseDashboard }],
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Text style={styles.appIcon}>🎓</Text>
            </View>
            <Text style={styles.title}>{CommonText.welcomeBack}</Text>
            <Text style={styles.subtitle}>{CommonText.loginSubtitle}</Text>
          </View>

          <View style={styles.card}>
            {error ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerText}>{error}</Text>
              </View>
            ) : null}

            <CustomInput
              label={CommonText.emailLabel}
              placeholder={CommonText.emailPlaceholder}
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              error={formErrors.email}
            />

            <CustomInput
              label={CommonText.passwordLabel}
              placeholder={CommonText.passwordPlaceholder}
              value={password}
              onChangeText={handlePasswordChange}
              isPassword={true}
              error={formErrors.password}
            />

            <CustomButton
              label={isLoading ? CommonText.loggingIn : CommonText.loginButton}
              onPress={handleLogin}
              loading={isLoading}
              style={styles.loginButton}
            />

            <View style={styles.hintContainer}>
              <Text style={styles.hintText}>{CommonText.demoCredentialsHint}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: scales(20),
    paddingVertical: scales(30),
  },
  header: {
    alignItems: 'center',
    marginBottom: scales(28),
  },
  iconCircle: {
    width: scales(68),
    height: scales(68),
    borderRadius: scales(34),
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scales(14),
  },
  appIcon: {
    fontSize: scales(32),
  },
  title: {
    fontSize: scales(26),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: scales(6),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scales(14),
    fontFamily: fontFamily.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: scales(20),
    padding: scales(22),
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  errorBanner: {
    backgroundColor: Colors.errorLight,
    borderRadius: scales(10),
    padding: scales(12),
    marginBottom: scales(16),
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorBannerText: {
    fontSize: scales(13),
    fontFamily: fontFamily.medium,
    color: Colors.error,
    textAlign: 'center',
  },
  loginButton: {
    marginTop: scales(8),
  },
  hintContainer: {
    marginTop: scales(18),
    paddingTop: scales(14),
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    alignItems: 'center',
  },
  hintText: {
    fontSize: scales(12),
    fontFamily: fontFamily.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default LoginScreen;
