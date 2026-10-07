import { CommonText } from './commonText';

export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

export const validatePassword = (password, minLength = 6) => {
  if (!password || typeof password !== 'string') return false;
  return password.trim().length >= minLength;
};

export const validateLoginForm = (email, password) => {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: CommonText.emptyEmail, field: 'email' };
  }
  if (!validateEmail(email)) {
    return { isValid: false, error: CommonText.invalidEmail, field: 'email' };
  }
  if (!password || password.trim().length === 0) {
    return { isValid: false, error: CommonText.emptyPassword, field: 'password' };
  }
  if (!validatePassword(password)) {
    return { isValid: false, error: CommonText.shortPassword, field: 'password' };
  }
  return { isValid: true };
};

export default {
  validateEmail,
  validatePassword,
  validateLoginForm,
};
