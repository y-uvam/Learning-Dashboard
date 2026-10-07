import NetInfo from '@react-native-community/netinfo';

export const isNetworkConnected = async () => {
  try {
    const state = await NetInfo.fetch();
    return Boolean(state.isConnected && state.isInternetReachable !== false);
  } catch (error) {
    return true;
  }
};

export const subscribeToNetworkChanges = (callback) => {
  return NetInfo.addEventListener((state) => {
    const isOnline = Boolean(state.isConnected && state.isInternetReachable !== false);
    callback(isOnline);
  });
};

export const networkUtils = isNetworkConnected;
export default isNetworkConnected;
