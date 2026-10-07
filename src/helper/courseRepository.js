import NetInfo from '@react-native-community/netinfo';
import { fetchCoursesApi } from './apiService';
import { INITIAL_COURSES } from './mockData';
import { getCachedCourses, setCachedCourses } from './storageService';
import { calculateProgress } from '../utils/progressUtils';

export const CourseRepository = {
  async isOnline() {
    try {
      const state = await NetInfo.fetch();
      return Boolean(state.isConnected && state.isInternetReachable !== false);
    } catch {
      return false;
    }
  },

  async getCourses(forceRefresh = false) {
    const isOnline = await this.isOnline();

    if (!isOnline) {
      const cached = await getCachedCourses();
      if (cached && cached.length > 0) {
        return { courses: cached, isOffline: true, fromCache: true };
      }
      await setCachedCourses(INITIAL_COURSES);
      return { courses: INITIAL_COURSES, isOffline: true, fromCache: true };
    }

    try {
      const response = await fetchCoursesApi();
      if (response.success && response.data) {
        const cached = await getCachedCourses();

        let mergedCourses = response.data;
        if (cached && cached.length > 0) {
          mergedCourses = response.data.map((remoteCourse) => {
            const cachedCourse = cached.find((c) => c.id === remoteCourse.id);
            if (!cachedCourse) return remoteCourse;

            const updatedLessons = remoteCourse.lessons.map((remoteLesson) => {
              const cachedLesson = cachedCourse.lessons?.find((l) => l.id === remoteLesson.id);
              return cachedLesson ? { ...remoteLesson, isCompleted: cachedLesson.isCompleted } : remoteLesson;
            });

            return {
              ...remoteCourse,
              lessons: updatedLessons,
              progress: calculateProgress(updatedLessons),
            };
          });
        }

        await setCachedCourses(mergedCourses);
        return { courses: mergedCourses, isOffline: false, fromCache: false };
      } else {
        const cached = await getCachedCourses();
        if (cached && cached.length > 0) {
          return { courses: cached, isOffline: true, fromCache: true };
        }
        return { courses: [], isOffline: false, fromCache: false, error: response.error };
      }
    } catch (err) {
      const cached = await getCachedCourses();
      if (cached && cached.length > 0) {
        return { courses: cached, isOffline: true, fromCache: true };
      }
      return { courses: [], isOffline: true, fromCache: false, error: err.message };
    }
  },

  async toggleLesson(currentCourses, courseId, lessonId) {
    const updatedCourses = currentCourses.map((course) => {
      if (course.id !== courseId) return course;

      const updatedLessons = course.lessons.map((lesson) => {
        if (lesson.id === lessonId) {
          return { ...lesson, isCompleted: !lesson.isCompleted };
        }
        return lesson;
      });

      const newProgress = calculateProgress(updatedLessons);

      return {
        ...course,
        lessons: updatedLessons,
        progress: newProgress,
      };
    });

    await setCachedCourses(updatedCourses);

    return updatedCourses;
  },
};

export default CourseRepository;
