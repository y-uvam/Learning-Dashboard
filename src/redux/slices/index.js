import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import courseReducer from './courseSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
});

export default rootReducer;
