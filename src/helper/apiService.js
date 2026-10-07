import { INITIAL_COURSES } from './mockData';

const NETWORK_LATENCY_MS = 600;

export const loginApi = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (
        (email.trim().toLowerCase() === 'test@example.com' && password === 'password123') ||
        (email.trim().length > 0 && password.length >= 6)
      ) {
        resolve({
          success: true,
          data: {
            user: {
              id: 'usr_1001',
              name: 'John Developer',
              email: email.trim().toLowerCase(),
            },
            token: 'mock_jwt_token_learning_dashboard_abc123',
          },
        });
      } else {
        resolve({
          success: false,
          error: 'Invalid email or password. Please check your credentials.',
        });
      }
    }, NETWORK_LATENCY_MS);
  });
};

export const fetchCoursesApi = async (shouldSimulateError = false) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldSimulateError) {
        resolve({
          success: false,
          error: 'Network request failed. Unable to fetch courses from server.',
        });
      } else {
        resolve({
          success: true,
          data: INITIAL_COURSES,
        });
      }
    }, NETWORK_LATENCY_MS);
  });
};

export default {
  loginApi,
  fetchCoursesApi,
};
