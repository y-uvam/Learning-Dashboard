import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { CourseDashboardScreen, CourseDetailsScreen, LoginScreen } from '../screens';
import { Colors } from '../utils';
import { routesConstants } from './routeConstants';

const { Navigator, Screen } = createNativeStackNavigator();

export const MainStack = () => {
  const { isAuthenticated, isRestoringSession } = useSelector((state) => state.auth);

  if (isRestoringSession) {
    return null;
  }

  return (
    <Navigator
      key={isAuthenticated ? 'user-authenticated' : 'user-guest'}
      initialRouteName={isAuthenticated ? routesConstants.CourseDashboard : routesConstants.Login}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: 'slide_from_right',
        orientation: Platform.OS === 'ios' ? 'portrait' : undefined,
      }}
    >
      <Screen name={routesConstants.Login} component={LoginScreen} />
      <Screen name={routesConstants.CourseDashboard} component={CourseDashboardScreen} />
      <Screen name={routesConstants.CourseDetails} component={CourseDetailsScreen} />
    </Navigator>
  );
};

export default MainStack;
