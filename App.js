import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch } from 'react-redux';
import { Routes } from './src/navigation';
import { restoreSessionThunk } from './src/redux/slices/authSlice';
import { setOfflineStatus } from './src/redux/slices/courseSlice';
import { store } from './src/redux/store';
import { isNetworkConnected, subscribeToNetworkChanges } from './src/helper/networkUtils';
import { Colors } from './src/utils';

const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    isNetworkConnected().then((isOnline) => {
      dispatch(setOfflineStatus(!isOnline));
    });

    const unsubscribe = subscribeToNetworkChanges((isOnline) => {
      dispatch(setOfflineStatus(!isOnline));
    });

    dispatch(restoreSessionThunk());

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [dispatch]);

  return <Routes />;
};

export const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.background}
          translucent={false}
        />
        <View style={styles.root}>
          <AppInitializer />
        </View>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default App;
