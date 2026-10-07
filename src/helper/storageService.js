import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  COURSES: '@learning_dashboard_courses_v1',
  AUTH_SESSION: '@learning_dashboard_auth_session_v1',
  LAST_SYNC: '@learning_dashboard_last_sync_v1',
};

export const getCachedCourses = async () => {
  try {
    const rawData = await AsyncStorage.getItem(STORAGE_KEYS.COURSES);
    if (!rawData) return null;
    return JSON.parse(rawData);
  } catch (error) {
    return null;
  }
};

export const setCachedCourses = async (courses) => {
  try {
    if (!courses || !Array.isArray(courses)) return false;
    await AsyncStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    return true;
  } catch (error) {
    return false;
  }
};

export const updateCachedLesson = async (courseId, lessonId, isCompleted, newProgress) => {
  try {
    const currentCourses = await getCachedCourses();
    if (!currentCourses) return null;

    const updatedCourses = currentCourses.map((course) => {
      if (course.id === courseId) {
        const updatedLessons = course.lessons.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, isCompleted } : lesson,
        );
        return {
          ...course,
          lessons: updatedLessons,
          progress: newProgress,
        };
      }
      return course;
    });

    await setCachedCourses(updatedCourses);
    return updatedCourses;
  } catch (error) {
    return null;
  }
};

export const saveAuthSession = async (user) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(user));
    return true;
  } catch (error) {
    return false;
  }
};

export const getAuthSession = async () => {
  try {
    const session = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    return null;
  }
};

export const clearAuthSession = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    return true;
  } catch (error) {
    return false;
  }
};

export default {
  getCachedCourses,
  setCachedCourses,
  updateCachedLesson,
  saveAuthSession,
  getAuthSession,
  clearAuthSession,
};
