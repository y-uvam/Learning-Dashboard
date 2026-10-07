import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontFamily } from '../../assets';
import { Colors, CommonText, scales } from '../../utils';

export const LoadingView = ({ message = CommonText.loadingCourses }) => (
  <View style={styles.centerContainer}>
    <ActivityIndicator size="large" color={Colors.primary} />
    <Text style={styles.loadingText}>{message}</Text>
  </View>
);

export const ErrorView = ({
  message = CommonText.errorLoadingCourses,
  onRetry,
}) => (
  <View style={styles.centerContainer}>
    <Text style={styles.errorIcon}>⚠️</Text>
    <Text style={styles.errorTitle}>{CommonText.errorTitle}</Text>
    <Text style={styles.errorMessage}>{message}</Text>
    {onRetry ? (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.retryButton}
        onPress={onRetry}
      >
        <Text style={styles.retryButtonText}>{CommonText.retry}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

export const EmptyView = ({
  message = CommonText.emptyCourses,
  onRefresh,
}) => (
  <View style={styles.centerContainer}>
    <Text style={styles.emptyIcon}>📚</Text>
    <Text style={styles.emptyMessage}>{message}</Text>
    {onRefresh ? (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.retryButton}
        onPress={onRefresh}
      >
        <Text style={styles.retryButtonText}>{CommonText.retry}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scales(30),
    paddingVertical: scales(40),
  },
  loadingText: {
    fontSize: scales(14),
    fontFamily: fontFamily.medium,
    color: Colors.textSecondary,
    marginTop: scales(14),
  },
  errorIcon: {
    fontSize: scales(40),
    marginBottom: scales(12),
  },
  errorTitle: {
    fontSize: scales(18),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: scales(6),
  },
  errorMessage: {
    fontSize: scales(14),
    fontFamily: fontFamily.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: scales(20),
    lineHeight: scales(20),
  },
  emptyIcon: {
    fontSize: scales(40),
    marginBottom: scales(12),
  },
  emptyMessage: {
    fontSize: scales(15),
    fontFamily: fontFamily.medium,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: scales(20),
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: scales(24),
    paddingVertical: scales(10),
    borderRadius: scales(10),
  },
  retryButtonText: {
    fontSize: scales(14),
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default {
  LoadingView,
  ErrorView,
  EmptyView,
};
