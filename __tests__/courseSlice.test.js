import courseReducer, {
  setSelectedCourseId,
  setOfflineStatus,
  clearCourseError,
  toggleLessonThunk,
} from '../src/redux/slices/courseSlice';

describe('courseSlice Reducer Tests', () => {
  const initialState = {
    courses: [
      {
        id: 1,
        title: 'Python Programming',
        progress: 50,
        lessons: [
          { id: 101, title: 'Lesson 1', isCompleted: true },
          { id: 102, title: 'Lesson 2', isCompleted: false },
        ],
      },
    ],
    selectedCourseId: null,
    isLoading: false,
    isRefreshing: false,
    error: 'Some error',
    isOffline: false,
    fromCache: false,
  };

  it('should set selected course ID', () => {
    const nextState = courseReducer(initialState, setSelectedCourseId(1));
    expect(nextState.selectedCourseId).toBe(1);
  });

  it('should set offline status', () => {
    const nextState = courseReducer(initialState, setOfflineStatus(true));
    expect(nextState.isOffline).toBe(true);
  });

  it('should clear course error', () => {
    const nextState = courseReducer(initialState, clearCourseError());
    expect(nextState.error).toBeNull();
  });

  it('should handle toggleLessonThunk.fulfilled', () => {
    const updatedCourses = [
      {
        id: 1,
        title: 'Python Programming',
        progress: 100,
        lessons: [
          { id: 101, title: 'Lesson 1', isCompleted: true },
          { id: 102, title: 'Lesson 2', isCompleted: true },
        ],
      },
    ];

    const nextState = courseReducer(
      initialState,
      toggleLessonThunk.fulfilled({ updatedCourses, courseId: 1, lessonId: 102 }),
    );

    expect(nextState.courses[0].progress).toBe(100);
    expect(nextState.courses[0].lessons[1].isCompleted).toBe(true);
  });
});
