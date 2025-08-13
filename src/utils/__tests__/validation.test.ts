import {
  isValidEmail,
  getPasswordStrength,
  isValidPhoneNumber,
  isValidUrl,
  isRequired,
  hasMinLength,
  hasMaxLength,
  isInRange,
  isValidDate,
  isValidCreditCard,
} from '../validation';

describe('Validation Utilities', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.org')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('getPasswordStrength', () => {
    it('should return very-weak for passwords with score <= 1', () => {
      const result = getPasswordStrength('a');
      expect(result.strength).toBe('very-weak');
      expect(result.score).toBeLessThanOrEqual(1);
    });

    it('should return weak for passwords with score = 2', () => {
      const result = getPasswordStrength('ab');
      expect(result.strength).toBe('weak');
      expect(result.score).toBe(2);
    });

    it('should return fair for passwords with score = 3', () => {
      const result = getPasswordStrength('abc');
      expect(result.strength).toBe('fair');
      expect(result.score).toBe(3);
    });

    it('should return good for passwords with score = 4', () => {
      const result = getPasswordStrength('abcd');
      expect(result.strength).toBe('good');
      expect(result.score).toBe(4);
    });

    it('should return strong for passwords with score = 5', () => {
      const result = getPasswordStrength('abcde');
      expect(result.strength).toBe('strong');
      expect(result.score).toBe(5);
    });

    it('should provide appropriate feedback', () => {
      const result = getPasswordStrength('a');
      expect(result.feedback.length).toBeGreaterThan(0);
      expect(result.feedback).toContain('Password should be at least 8 characters long');
    });
  });

  describe('isValidPhoneNumber', () => {
    it('should validate correct phone numbers', () => {
      expect(isValidPhoneNumber('1234567890')).toBe(true);
      expect(isValidPhoneNumber('+1234567890')).toBe(true);
      expect(isValidPhoneNumber('+1 234 567 890')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(isValidPhoneNumber('')).toBe(false);
      expect(isValidPhoneNumber('abc')).toBe(false);
      expect(isValidPhoneNumber('123')).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('https://example.com/path')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl('ftp://')).toBe(false);
    });
  });

  describe('isRequired', () => {
    it('should validate required values', () => {
      expect(isRequired('text')).toBe(true);
      expect(isRequired(123)).toBe(true);
      expect(isRequired(true)).toBe(true);
      expect(isRequired(false)).toBe(true);
    });

    it('should reject empty values', () => {
      expect(isRequired('')).toBe(false);
      expect(isRequired('   ')).toBe(false);
      expect(isRequired(null)).toBe(false);
      expect(isRequired(undefined)).toBe(false);
    });
  });

  describe('hasMinLength', () => {
    it('should validate minimum length', () => {
      expect(hasMinLength('hello', 3)).toBe(true);
      expect(hasMinLength('hi', 2)).toBe(true);
    });

    it('should reject strings that are too short', () => {
      expect(hasMinLength('hi', 3)).toBe(false);
      expect(hasMinLength('', 1)).toBe(false);
    });
  });

  describe('hasMaxLength', () => {
    it('should validate maximum length', () => {
      expect(hasMaxLength('hello', 10)).toBe(true);
      expect(hasMaxLength('hi', 5)).toBe(true);
    });

    it('should reject strings that are too long', () => {
      expect(hasMaxLength('hello world', 5)).toBe(false);
      expect(hasMaxLength('very long string', 10)).toBe(false);
    });
  });

  describe('isInRange', () => {
    it('should validate numbers in range', () => {
      expect(isInRange(5, 1, 10)).toBe(true);
      expect(isInRange(1, 1, 10)).toBe(true);
      expect(isInRange(10, 1, 10)).toBe(true);
    });

    it('should reject numbers outside range', () => {
      expect(isInRange(0, 1, 10)).toBe(false);
      expect(isInRange(11, 1, 10)).toBe(false);
    });
  });

  describe('isValidDate', () => {
    it('should validate correct dates', () => {
      expect(isValidDate('2023-01-01')).toBe(true);
      expect(isValidDate('2023-12-31')).toBe(true);
    });

    it('should reject invalid dates', () => {
      expect(isValidDate('invalid-date')).toBe(false);
      expect(isValidDate('2023-13-01')).toBe(false);
      expect(isValidDate('')).toBe(false);
    });
  });

  describe('isValidCreditCard', () => {
    it('should validate correct credit card numbers', () => {
      // Test with a valid Luhn algorithm number
      expect(isValidCreditCard('4532015112830366')).toBe(true);
      expect(isValidCreditCard('4532 0151 1283 0366')).toBe(true);
    });

    it('should reject invalid credit card numbers', () => {
      expect(isValidCreditCard('1234567890123456')).toBe(false);
      expect(isValidCreditCard('')).toBe(false);
      expect(isValidCreditCard('abc')).toBe(false);
    });
  });
}); 