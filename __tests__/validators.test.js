import {
  validateEmail,
  validatePassword,
  validateLoginForm,
} from '../src/utils/validators';
import { CommonText } from '../src/utils/commonText';

describe('Validation Logic Tests', () => {
  describe('validateEmail', () => {
    it('should return false for empty email', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail(null)).toBe(false);
      expect(validateEmail(undefined)).toBe(false);
    });

    it('should return false for malformed email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('test@domain')).toBe(false);
    });

    it('should return true for well-formed email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('john.doe@company.co.uk')).toBe(true);
      expect(validateEmail('user.name+tag@domain.org')).toBe(true);
    });
  });

  describe('validatePassword', () => {
    it('should return false for empty or missing password', () => {
      expect(validatePassword('')).toBe(false);
      expect(validatePassword(null)).toBe(false);
      expect(validatePassword(undefined)).toBe(false);
    });

    it('should return false for password shorter than 6 characters', () => {
      expect(validatePassword('12345')).toBe(false);
      expect(validatePassword('abc')).toBe(false);
    });

    it('should return true for password with 6 or more characters', () => {
      expect(validatePassword('123456')).toBe(true);
      expect(validatePassword('password123')).toBe(true);
    });
  });

  describe('validateLoginForm', () => {
    it('should fail when email is empty', () => {
      const result = validateLoginForm('', 'password123');
      expect(result.isValid).toBe(false);
      expect(result.field).toBe('email');
      expect(result.error).toBe(CommonText.emptyEmail);
    });

    it('should fail when email format is invalid', () => {
      const result = validateLoginForm('invalidEmail', 'password123');
      expect(result.isValid).toBe(false);
      expect(result.field).toBe('email');
      expect(result.error).toBe(CommonText.invalidEmail);
    });

    it('should fail when password is empty', () => {
      const result = validateLoginForm('test@example.com', '');
      expect(result.isValid).toBe(false);
      expect(result.field).toBe('password');
      expect(result.error).toBe(CommonText.emptyPassword);
    });

    it('should fail when password is too short', () => {
      const result = validateLoginForm('test@example.com', '123');
      expect(result.isValid).toBe(false);
      expect(result.field).toBe('password');
      expect(result.error).toBe(CommonText.shortPassword);
    });

    it('should succeed when both email and password are valid', () => {
      const result = validateLoginForm('test@example.com', 'password123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });
});
