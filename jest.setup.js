import React from 'react';

const mockStorage = {};

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn((key, value) => {
    mockStorage[key] = value;
    return Promise.resolve(null);
  }),
  getItem: jest.fn((key) => {
    return Promise.resolve(mockStorage[key] || null);
  }),
  removeItem: jest.fn((key) => {
    delete mockStorage[key];
    return Promise.resolve(null);
  }),
  clear: jest.fn(() => {
    Object.keys(mockStorage).forEach((k) => delete mockStorage[k]);
    return Promise.resolve(null);
  }),
  getAllKeys: jest.fn(() => Promise.resolve(Object.keys(mockStorage))),
  multiGet: jest.fn((keys) =>
    Promise.resolve(keys.map((k) => [k, mockStorage[k] || null])),
  ),
  multiSet: jest.fn((keyValuePairs) => {
    keyValuePairs.forEach(([k, v]) => {
      mockStorage[k] = v;
    });
    return Promise.resolve(null);
  }),
}));

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(() =>
    Promise.resolve({
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
    }),
  ),
  addEventListener: jest.fn(() => jest.fn()),
}));

const mockInsets = { top: 0, right: 0, bottom: 0, left: 0 };
const mockFrame = { x: 0, y: 0, width: 375, height: 812 };

const mockSafeAreaInsetsContext = React.createContext(mockInsets);
const mockSafeAreaFrameContext = React.createContext(mockFrame);

jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaConsumer: ({ children }) => children(mockInsets),
    SafeAreaView: ({ children, style }) => <View style={style}>{children}</View>,
    SafeAreaInsetsContext: mockSafeAreaInsetsContext,
    SafeAreaFrameContext: mockSafeAreaFrameContext,
    useSafeAreaInsets: () => mockInsets,
    useSafeAreaFrame: () => mockFrame,
    initialWindowMetrics: { insets: mockInsets, frame: mockFrame },
  };
});
