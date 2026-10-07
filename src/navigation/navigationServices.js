import * as React from 'react';
import {CommonActions, StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export const navigate = (path, params = null) => {
  navigationRef.current?.navigate(path, params);
};

export const goBack = () => {
  navigationRef.current?.goBack();
};

export const pop = (count = 1) => {
  navigationRef.current?.dispatch(StackActions.pop(count));
};

export const reset = (name, index = 0, data = null) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: index,
      routes: [
        {
          name: name,
          params: data,
        },
      ],
    }),
  );
};

export const push = (...args) => {
  navigationRef.current?.dispatch(StackActions.push(...args));
};

export const replace = (name, data = null) => {
  navigationRef.current?.dispatch(StackActions.replace(name, data));
};

export const getCurrentRoute = () => {
  const route = navigationRef.current?.getCurrentRoute();
  return route?.name;
};
