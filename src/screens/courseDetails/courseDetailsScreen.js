import React from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fontFamily } from '../../assets';
import { LessonItem, OfflineBanner, ProgressBar } from '../../components';
import {
  selectIsOffline,
  selectSelectedCourse,
  toggleLessonThunk,
} from '../../redux/slices/courseSlice';
import { Colors, CommonText, scales } from '../../utils';

export const CourseDetailsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const course = useSelector(selectSelectedCourse);
  const isOffline = useSelector(selectIsOffline);

  const lessons = course?.lessons || course?.lessonsList || [];
  const completedLessonsCount = lessons.filter((l) => l.isCompleted).length;
  const totalLessonsCount = lessons.length;
  const progressPercent = course?.progress ?? 0;

  const handleToggleLesson = (lesson) => {
    if (!course?.id || !lesson?.id) return;
    dispatch(
      toggleLessonThunk({
        courseId: course.id,
        lessonId: lesson.id,
      }),
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (!course) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{CommonText.courseDetailsTitle}</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>{CommonText.emptyCourses}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      {isOffline ? <OfflineBanner /> : null}

      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {CommonText.courseDetailsTitle}
        </Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <View style={styles.overviewCard}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.instructorName}>
          {CommonText.instructorBy(course.instructor)}
        </Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>{CommonText.overallProgress}</Text>
            <Text style={styles.progressValue}>{progressPercent}%</Text>
          </View>
          <ProgressBar
            progress={progressPercent}
            height={scales(10)}
            style={styles.progressBar}
          />
          <Text style={styles.completedCountText}>
            {completedLessonsCount} of {totalLessonsCount} lessons completed
          </Text>
        </View>

        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>💡 {CommonText.tapToToggleHint}</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{CommonText.syllabusTitle}</Text>
        <Text style={styles.sectionCount}>
          {CommonText.lessonsCount(totalLessonsCount)}
        </Text>
      </View>

      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <LessonItem
            lesson={item}
            index={index}
            onToggle={handleToggleLesson}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scales(16),
    paddingVertical: scales(12),
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    width: scales(36),
    height: scales(36),
    borderRadius: scales(18),
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: scales(20),
    fontWeight: '700',
    color: Colors.text,
  },
  headerTitle: {
    fontSize: scales(17),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: Colors.text,
  },
  headerRightPlaceholder: {
    width: scales(36),
  },
  overviewCard: {
    backgroundColor: Colors.white,
    paddingHorizontal: scales(20),
    paddingTop: scales(18),
    paddingBottom: scales(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  courseTitle: {
    fontSize: scales(20),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: scales(4),
  },
  instructorName: {
    fontSize: scales(14),
    fontFamily: fontFamily.medium,
    color: Colors.textSecondary,
    marginBottom: scales(14),
  },
  progressContainer: {
    backgroundColor: Colors.background,
    borderRadius: scales(12),
    padding: scales(14),
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scales(8),
  },
  progressLabel: {
    fontSize: scales(13),
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  progressValue: {
    fontSize: scales(15),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: Colors.primary,
  },
  progressBar: {
    marginBottom: scales(8),
  },
  completedCountText: {
    fontSize: scales(12),
    fontFamily: fontFamily.regular,
    color: Colors.textSecondary,
  },
  hintContainer: {
    marginTop: scales(12),
    alignItems: 'center',
  },
  hintText: {
    fontSize: scales(12),
    fontFamily: fontFamily.medium,
    color: Colors.textSecondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scales(20),
    paddingTop: scales(16),
    paddingBottom: scales(10),
  },
  sectionTitle: {
    fontSize: scales(16),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: Colors.text,
  },
  sectionCount: {
    fontSize: scales(13),
    fontFamily: fontFamily.medium,
    color: Colors.textSecondary,
  },
  listContent: {
    paddingHorizontal: scales(18),
    paddingBottom: scales(30),
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scales(20),
  },
  notFoundText: {
    fontSize: scales(15),
    fontFamily: fontFamily.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default CourseDetailsScreen;
