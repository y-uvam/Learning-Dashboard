import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontFamily } from '../../assets';
import { Colors, CommonText, scales } from '../../utils';
import { ProgressBar } from '../progressBar/progressBar';

export const CourseCard = ({ course, onContinue }) => {
  const { title, instructor, progress = 0, lessonsCount, lessons } = course || {};
  const totalLessons = lessonsCount || lessons?.length || 0;

  // Generate instructor initials (e.g. "John Smith" -> "JS")
  const getInitials = (name) => {
    if (!name) return 'ED';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{getInitials(instructor)}</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.instructor}>
            {CommonText.instructorBy(instructor)}
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {CommonText.lessonsCount(totalLessons)}
          </Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressLabelRow}>
          <Text style={styles.progressTitle}>Progress</Text>
          <Text style={styles.progressLabel}>
            {CommonText.progressLabel(progress)}
          </Text>
        </View>
        <ProgressBar progress={progress} height={scales(8)} />
      </View>

      <View style={styles.footerRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.continueButton}
          onPress={() => onContinue && onContinue(course)}
        >
          <Text style={styles.continueText}>{CommonText.continueButton}</Text>
          <Text style={styles.arrowIcon}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: scales(20),
    padding: scales(20),
    marginBottom: scales(16),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scales(16),
  },
  avatarCircle: {
    width: scales(40),
    height: scales(40),
    borderRadius: scales(12),
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scales(12),
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  avatarText: {
    fontSize: scales(13),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: '#4F46E5',
    letterSpacing: 0.5,
  },
  titleContainer: {
    flex: 1,
    marginRight: scales(8),
  },
  title: {
    fontSize: scales(17),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: scales(23),
    marginBottom: scales(3),
  },
  instructor: {
    fontSize: scales(13),
    fontFamily: fontFamily.medium,
    color: '#64748B',
  },
  badge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: scales(10),
    paddingVertical: scales(4),
    borderRadius: scales(8),
  },
  badgeText: {
    fontSize: scales(11),
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: '#475569',
  },
  progressSection: {
    marginBottom: scales(16),
    backgroundColor: '#F8FAFC',
    borderRadius: scales(12),
    padding: scales(12),
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scales(8),
  },
  progressTitle: {
    fontSize: scales(12),
    fontFamily: fontFamily.medium,
    color: '#64748B',
  },
  progressLabel: {
    fontSize: scales(13),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: '#4F46E5',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: scales(14),
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: scales(18),
    paddingVertical: scales(10),
    borderRadius: scales(12),
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  continueText: {
    fontSize: scales(14),
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: scales(4),
    letterSpacing: 0.2,
  },
  arrowIcon: {
    fontSize: scales(16),
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: scales(16),
  },
});

export default CourseCard;
