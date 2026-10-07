import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

const UseInternetConnectivity = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const checkInitialConnection = async () => {
      try {
        const state = await NetInfo.fetch();
        setIsConnected(state.isConnected);
      } catch (error) {
        setIsConnected(false);
      }
    };

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    checkInitialConnection();

    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
};

export default UseInternetConnectivity;
