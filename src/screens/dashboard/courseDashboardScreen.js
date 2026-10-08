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
        <View style={styles.headerTopRow}>
          <View style={styles.brandRow}>
            <View style={styles.miniLogo}>
              <Text style={styles.miniLogoText}>E</Text>
            </View>
            <View>
              <Text style={styles.appName}>{CommonText.appName}</Text>
              <Text style={styles.greetingText}>
                {user?.name ? `Hello, ${user.name}` : CommonText.dashboardSubtitle}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>{CommonText.logout}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.headerTitle}>{CommonText.dashboardTitle}</Text>
          <View style={styles.statsBadge}>
            <View style={styles.liveIndicator} />
            <Text style={styles.statsBadgeText}>
              {courses?.length || 0} Courses Enrolled
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>{renderContent()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: scales(20),
    paddingTop: scales(14),
    paddingBottom: scales(16),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scales(16),
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniLogo: {
    width: scales(34),
    height: scales(34),
    borderRadius: scales(10),
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scales(10),
  },
  miniLogoText: {
    fontSize: scales(16),
    fontFamily: fontFamily.extraBold,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  appName: {
    fontSize: scales(13),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.3,
  },
  greetingText: {
    fontSize: scales(12),
    fontFamily: fontFamily.regular,
    color: '#64748B',
  },
  logoutButton: {
    paddingHorizontal: scales(12),
    paddingVertical: scales(6),
    borderRadius: scales(8),
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  logoutText: {
    fontSize: scales(12),
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: '#64748B',
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: scales(22),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  statsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: scales(10),
    paddingVertical: scales(4),
    borderRadius: scales(20),
  },
  liveIndicator: {
    width: scales(6),
    height: scales(6),
    borderRadius: scales(3),
    backgroundColor: '#4F46E5',
    marginRight: scales(6),
  },
  statsBadgeText: {
    fontSize: scales(11),
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: '#4F46E5',
  },
  contentContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: scales(20),
    paddingTop: scales(16),
    paddingBottom: scales(30),
  },
});

export default CourseDashboardScreen;
