export const CommonText = {
  appTitle: 'Learning Dashboard',
  appName: 'EduTrack',
  welcomeBack: 'Welcome Back!',
  loginSubtitle: 'Sign in to continue your learning journey',

  emailLabel: 'Email Address',
  emailPlaceholder: 'name@example.com',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Enter your password',
  loginButton: 'Sign In',
  loggingIn: 'Signing In...',
  logout: 'Log Out',
  demoCredentialsHint: 'Demo account: test@example.com / password123',

  emptyEmail: 'Please enter your email address.',
  invalidEmail: 'Please enter a valid email address.',
  emptyPassword: 'Please enter your password.',
  shortPassword: 'Password must be at least 6 characters.',
  invalidCredentials: 'Invalid email or password. Please try again.',

  dashboardTitle: 'My Courses',
  dashboardSubtitle: 'Keep up the good momentum',
  continueButton: 'Continue',
  lessonsCount: (count) => `${count} Lessons`,
  progressLabel: (progress) => `${progress}% Completed`,
  overallProgress: 'Overall Progress',
  instructorBy: (name) => `Instructor: ${name}`,

  courseDetailsTitle: 'Course Details',
  syllabusTitle: 'Course Lessons',
  lessonCompleted: 'Completed',
  lessonPending: 'Pending',
  completedBadge: '✓ Completed',
  pendingBadge: '○ Pending',
  markAsCompleted: 'Mark as Completed',
  markAsPending: 'Mark as Pending',
  tapToToggleHint: 'Tap any lesson to toggle completion status',

  offlineBannerMessage: 'You are currently offline. Showing cached courses.',
  noInternetConnection: 'No internet connection detected.',
  syncNotice: 'Changes are saved locally and will be synced.',

  loading: 'Loading...',
  loadingCourses: 'Fetching your courses...',
  errorLoadingCourses: 'Failed to load courses. Please try again.',
  retry: 'Retry',
  emptyCourses: 'No courses available at the moment.',
  pullToRefresh: 'Pull to refresh',
  errorTitle: 'Something went wrong',
  cancel: 'Cancel',
};

export const commonText = CommonText;
export default CommonText;
