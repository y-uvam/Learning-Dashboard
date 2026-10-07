import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../../helper/apiService';
import { clearAuthSession, getAuthSession, saveAuthSession } from '../../helper/storageService';

export const loginUserThunk = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginApi(email, password);
      if (response.success && response.data) {
        await saveAuthSession(response.data);
        return response.data;
      }
      return rejectWithValue(response.error || 'Authentication failed');
    } catch (error) {
      return rejectWithValue(error.message || 'Login request failed');
    }
  },
);

export const restoreSessionThunk = createAsyncThunk(
  'auth/restoreSession',
  async () => {
    const session = await getAuthSession();
    return session;
  },
);

export const logoutUserThunk = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    await clearAuthSession();
    return null;
  },
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Login failed';
    });

    builder.addCase(restoreSessionThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      }
    });

    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
