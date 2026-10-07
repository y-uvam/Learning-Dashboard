import React, { useEffect, useCallback } from 'react';
import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fontFamily } from '../../assets';
import {
  CourseCard,
  EmptyView,
  ErrorView,
  LoadingView,
  OfflineBanner,
} from '../../components';
import { routesConstants } from '../../navigation/routeConstants';
import { logoutUserThunk } from '../../redux/slices/authSlice';
import {
  fetchCoursesThunk,
  selectCourses,
  selectCoursesError,
  selectCoursesLoading,
  selectCoursesRefreshing,
  selectIsOffline,
  setSelectedCourseId,
} from '../../redux/slices/courseSlice';
import { Colors, CommonText, scales } from '../../utils';

export const CourseDashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const courses = useSelector(selectCourses);
  const isLoading = useSelector(selectCoursesLoading);
  const isRefreshing = useSelector(selectCoursesRefreshing);
  const error = useSelector(selectCoursesError);
  const isOffline = useSelector(selectIsOffline);
  const user = useSelector((state) => state.auth.user);

  const loadCourses = useCallback(
    (forceRefresh = false) => {
      dispatch(fetchCoursesThunk(forceRefresh));
    },
    [dispatch],
  );

  useEffect(() => {
    loadCourses(false);
  }, [loadCourses]);

  const handleSelectCourse = (course) => {
    dispatch(setSelectedCourseId(course.id));
    navigation.navigate(routesConstants.CourseDetails, { courseId: course.id });
  };

  const handleLogout = () => {
    dispatch(logoutUserThunk());
    navigation.reset({
      index: 0,
      routes: [{ name: routesConstants.Login }],
    });
  };

  const renderContent = () => {
    if (isLoading && (!courses || courses.length === 0)) {
      return <LoadingView message={CommonText.loadingCourses} />;
    }

    if (error && (!courses || courses.length === 0)) {
      return (
        <ErrorView
          message={error}
          onRetry={() => loadCourses(true)}
        />
      );
    }

    if (!courses || courses.length === 0) {
      return (
        <EmptyView
          message={CommonText.emptyCourses}
          onRefresh={() => loadCourses(true)}
        />
      );
    }

    return (
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            onContinue={handleSelectCourse}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => loadCourses(true)}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {isOffline ? <OfflineBanner /> : null}

      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.appName}>{CommonText.appName}</Text>
          <Text style={styles.headerTitle}>{CommonText.dashboardTitle}</Text>
          <Text style={styles.headerSubtitle}>
            {user?.name ? `Hello, ${user.name} 👋` : CommonText.dashboardSubtitle}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>{CommonText.logout}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>{renderContent()}</View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scales(20),
    paddingTop: scales(14),
    paddingBottom: scales(16),
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTextContainer: {
    flex: 1,
  },
  appName: {
    fontSize: scales(12),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: scales(2),
  },
  headerTitle: {
    fontSize: scales(22),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: scales(13),
    fontFamily: fontFamily.regular,
    color: Colors.textSecondary,
    marginTop: scales(2),
  },
  logoutButton: {
    paddingHorizontal: scales(12),
    paddingVertical: scales(6),
    borderRadius: scales(8),
    backgroundColor: Colors.borderLight,
  },
  logoutText: {
    fontSize: scales(12),
    fontFamily: fontFamily.medium,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  contentContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: scales(18),
    paddingTop: scales(16),
    paddingBottom: scales(30),
  },
});

export default CourseDashboardScreen;
