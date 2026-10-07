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
    backgroundColor: Colors.white,
    borderRadius: scales(12),
    paddingVertical: scales(14),
    paddingHorizontal: scales(14),
    marginBottom: scales(10),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  completedContainer: {
    borderColor: '#A7F3D0',
    backgroundColor: '#F0FDF4',
  },
  pendingContainer: {
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  indexCircle: {
    width: scales(28),
    height: scales(28),
    borderRadius: scales(14),
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scales(12),
  },
  indexText: {
    fontSize: scales(12),
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  completedIndexText: {
    color: Colors.success,
  },
  contentContainer: {
    flex: 1,
    marginRight: scales(10),
  },
  title: {
    fontSize: scales(14),
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: Colors.text,
    lineHeight: scales(20),
  },
  completedTitle: {
    color: '#065F46',
  },
  badge: {
    paddingHorizontal: scales(10),
    paddingVertical: scales(4),
    borderRadius: scales(20),
  },
  completedBadge: {
    backgroundColor: Colors.successLight,
  },
  pendingBadge: {
    backgroundColor: Colors.pendingLight,
  },
  badgeText: {
    fontSize: scales(12),
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
  },
  completedBadgeText: {
    color: '#047857',
  },
  pendingBadgeText: {
    color: '#B45309',
  },
});

export default LessonItem;
