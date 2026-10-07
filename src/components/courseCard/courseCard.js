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

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
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
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: scales(16),
    padding: scales(18),
    marginBottom: scales(14),
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scales(14),
  },
  titleContainer: {
    flex: 1,
    marginRight: scales(10),
  },
  title: {
    fontSize: scales(18),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: scales(24),
    marginBottom: scales(4),
  },
  instructor: {
    fontSize: scales(13),
    fontFamily: fontFamily.regular,
    color: Colors.textSecondary,
  },
  badge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: scales(10),
    paddingVertical: scales(5),
    borderRadius: scales(20),
  },
  badgeText: {
    fontSize: scales(12),
    fontFamily: fontFamily.medium,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  progressSection: {
    marginBottom: scales(16),
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: scales(6),
  },
  progressLabel: {
    fontSize: scales(12),
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: Colors.primary,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: scales(12),
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: scales(16),
    paddingVertical: scales(9),
    borderRadius: scales(10),
  },
  continueText: {
    fontSize: scales(14),
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: Colors.white,
    marginRight: scales(4),
  },
  arrowIcon: {
    fontSize: scales(14),
    color: Colors.white,
    fontWeight: '700',
  },
});

export default CourseCard;
