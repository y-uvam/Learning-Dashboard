import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fontFamily } from "../../assets";
import { CustomButton, CustomInput } from "../../components";
import { routesConstants } from "../../navigation/routeConstants";
import { clearAuthError, loginUserThunk } from "../../redux/slices/authSlice";
import { Colors, CommonText, scales, validateLoginForm } from "../../utils";

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password123");
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

  const handleFillDemo = () => {
    setEmail("test@example.com");
    setPassword("password123");
    setFormErrors({});
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
    await dispatch(loginUserThunk({ email, password }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand Header */}
          <View style={styles.brandContainer}>
            <View style={styles.logoBadge}>
              <View style={styles.logoInner}>
                <Text style={styles.logoLetter}>E</Text>
              </View>
            </View>
            <View style={styles.brandTitleRow}>
              <Text style={styles.brandName}>EduTrack</Text>
              <View style={styles.proTag}>
                <Text style={styles.proTagText}>STUDENT</Text>
              </View>
            </View>
            <Text style={styles.title}>{CommonText.welcomeBack}</Text>
            <Text style={styles.subtitle}>{CommonText.loginSubtitle}</Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            {error ? (
              <View style={styles.errorBanner}>
                <View style={styles.errorIconCircle}>
                  <Text style={styles.errorIconText}>!</Text>
                </View>
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

            {/* Quick Demo Credentials Chip */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleFillDemo}
              style={styles.demoChip}
            >
              <Text style={styles.demoChipTitle}>Quick Demo</Text>
              <Text style={styles.demoChipSub}>
                Tap to fill test credentials
              </Text>
            </TouchableOpacity>
          </View>

          {/* Trust & Security Footer */}
          <View style={styles.footer}>
            <View style={styles.securityDot} />
            <Text style={styles.footerText}>
              Secure offline-first learning platform
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: scales(22),
    paddingVertical: scales(24),
  },
  brandContainer: {
    alignItems: "center",
    marginBottom: scales(24),
  },
  logoBadge: {
    width: scales(64),
    height: scales(64),
    borderRadius: scales(20),
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scales(14),
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  logoInner: {
    width: scales(46),
    height: scales(46),
    borderRadius: scales(14),
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoLetter: {
    fontSize: scales(24),
    fontFamily: fontFamily.extraBold,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  brandTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scales(8),
  },
  brandName: {
    fontSize: scales(16),
    fontFamily: fontFamily.bold,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: 0.5,
  },
  proTag: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: scales(8),
    paddingVertical: scales(2),
    borderRadius: scales(6),
    marginLeft: scales(8),
  },
  proTagText: {
    fontSize: scales(10),
    fontFamily: fontFamily.bold,
    fontWeight: "700",
    color: "#4F46E5",
    letterSpacing: 0.8,
  },
  title: {
    fontSize: scales(24),
    fontFamily: fontFamily.bold,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: scales(4),
    textAlign: "center",
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: scales(13),
    fontFamily: fontFamily.regular,
    color: "#64748B",
    textAlign: "center",
    maxWidth: scales(280),
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: scales(22),
    padding: scales(24),
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderRadius: scales(12),
    padding: scales(12),
    marginBottom: scales(16),
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  errorIconCircle: {
    width: scales(20),
    height: scales(20),
    borderRadius: scales(10),
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scales(10),
  },
  errorIconText: {
    color: "#FFFFFF",
    fontSize: scales(12),
    fontWeight: "800",
  },
  errorBannerText: {
    flex: 1,
    fontSize: scales(12),
    fontFamily: fontFamily.medium,
    color: "#B91C1C",
    lineHeight: scales(16),
  },
  loginButton: {
    marginTop: scales(4),
  },
  demoChip: {
    marginTop: scales(16),
    paddingVertical: scales(10),
    paddingHorizontal: scales(14),
    borderRadius: scales(12),
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  demoChipTitle: {
    fontSize: scales(12),
    fontFamily: fontFamily.semiBold,
    fontWeight: "600",
    color: "#4F46E5",
    letterSpacing: 0.3,
  },
  demoChipSub: {
    fontSize: scales(11),
    fontFamily: fontFamily.regular,
    color: "#94A3B8",
    marginTop: scales(1),
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: scales(24),
  },
  securityDot: {
    width: scales(6),
    height: scales(6),
    borderRadius: scales(3),
    backgroundColor: "#10B981",
    marginRight: scales(8),
  },
  footerText: {
    fontSize: scales(12),
    fontFamily: fontFamily.medium,
    color: "#94A3B8",
  },
});

export default LoginScreen;
