import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontFamily } from '../../assets';
import { Colors, CommonText, scales } from '../../utils';

export const LessonItem = ({ lesson, index, onToggle }) => {
  const isCompleted = Boolean(lesson?.isCompleted);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        isCompleted ? styles.completedContainer : styles.pendingContainer,
      ]}
      onPress={() => onToggle && onToggle(lesson)}
    >
      <View style={styles.indexCircle}>
        <Text style={[styles.indexText, isCompleted && styles.completedIndexText]}>
          {index + 1}
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.title,
            isCompleted && styles.completedTitle,
          ]}
          numberOfLines={2}
        >
          {lesson?.title}
        </Text>
      </View>

      <View
        style={[
          styles.badge,
          isCompleted ? styles.completedBadge : styles.pendingBadge,
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            isCompleted ? styles.completedBadgeText : styles.pendingBadgeText,
          ]}
        >
          {isCompleted ? CommonText.completedBadge : CommonText.pendingBadge}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scales(16),
    paddingVertical: scales(16),
    paddingHorizontal: scales(16),
    marginBottom: scales(12),
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  completedContainer: {
    borderColor: '#A7F3D0',
    backgroundColor: '#F0FDF4',
  },
  pendingContainer: {
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  indexCircle: {
    width: scales(32),
    height: scales(32),
    borderRadius: scales(10),
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scales(14),
  },
  indexText: {
    fontSize: scales(13),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: '#64748B',
  },
  completedIndexText: {
    color: '#059669',
  },
  contentContainer: {
    flex: 1,
    marginRight: scales(10),
  },
  title: {
    fontSize: scales(14),
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: '#0F172A',
    lineHeight: scales(20),
  },
  completedTitle: {
    color: '#065F46',
  },
  badge: {
    paddingHorizontal: scales(10),
    paddingVertical: scales(5),
    borderRadius: scales(20),
  },
  completedBadge: {
    backgroundColor: '#DCFCE7',
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
  },
  badgeText: {
    fontSize: scales(11),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  completedBadgeText: {
    color: '#15803D',
  },
  pendingBadgeText: {
    color: '#B45309',
  },
});

export default LessonItem;
