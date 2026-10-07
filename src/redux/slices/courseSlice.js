import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CourseRepository } from '../../helper/courseRepository';

export const fetchCoursesThunk = createAsyncThunk(
  'courses/fetchCourses',
  async (forceRefresh = false, { rejectWithValue }) => {
    try {
      const result = await CourseRepository.getCourses(forceRefresh);
      if (result.error && (!result.courses || result.courses.length === 0)) {
        return rejectWithValue(result.error);
      }
      return result;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch courses');
    }
  },
);

export const toggleLessonThunk = createAsyncThunk(
  'courses/toggleLesson',
  async ({ courseId, lessonId }, { getState, rejectWithValue }) => {
    try {
      const { courses } = getState().courses;
      const updatedCourses = await CourseRepository.toggleLesson(courses, courseId, lessonId);
      return { updatedCourses, courseId, lessonId };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update lesson');
    }
  },
);

const initialState = {
  courses: [],
  selectedCourseId: null,
  isLoading: false,
  isRefreshing: false,
  error: null,
  isOffline: false,
  fromCache: false,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSelectedCourseId: (state, action) => {
      state.selectedCourseId = action.payload;
    },
    setOfflineStatus: (state, action) => {
      state.isOffline = action.payload;
    },
    clearCourseError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoursesThunk.pending, (state, action) => {
      if (action.meta.arg === true) {
        state.isRefreshing = true;
      } else {
        state.isLoading = true;
      }
      state.error = null;
    });
    builder.addCase(fetchCoursesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isRefreshing = false;
      state.courses = action.payload.courses;
      state.isOffline = Boolean(action.payload.isOffline);
      state.fromCache = Boolean(action.payload.fromCache);
      state.error = null;
    });
    builder.addCase(fetchCoursesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isRefreshing = false;
      state.error = action.payload || 'Failed to load courses';
    });

    builder.addCase(toggleLessonThunk.fulfilled, (state, action) => {
      state.courses = action.payload.updatedCourses;
    });
  },
});

export const { setSelectedCourseId, setOfflineStatus, clearCourseError } = courseSlice.actions;

export const selectCourses = (state) => state.courses.courses;
export const selectSelectedCourse = (state) =>
  state.courses.courses.find((c) => c.id === state.courses.selectedCourseId);
export const selectCoursesLoading = (state) => state.courses.isLoading;
export const selectCoursesRefreshing = (state) => state.courses.isRefreshing;
export const selectCoursesError = (state) => state.courses.error;
export const selectIsOffline = (state) => state.courses.isOffline;

export default courseSlice.reducer;
