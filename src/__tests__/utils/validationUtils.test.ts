import { describe, it, expect } from 'vitest';
import { validateEmail } from '../../utils/validationUtils';

describe('validateEmail', () => {
  it('should return true for valid email addresses', () => {
    const validEmails = [
      'test@example.com',
      'user.name+tag+sorting@example.com',
      'example@sub.domain.com',
    ];
    validEmails.forEach(email => {
      expect(validateEmail(email)).toBe(true);
    });
  });

  it('should return false for invalid email addresses', () => {
    const invalidEmails = [
      'plainaddress',
      '@missingusername.com',
      'username@.com',
      'username@domain..com',
      'user@domain.c',
    ];
    invalidEmails.forEach(email => {
      expect(validateEmail(email)).toBe(false);
    });
  });

  it('should return false for empty or null values', () => {
    const edgeCases = ['', '   ', null as any, undefined as any];
    edgeCases.forEach(email => {
      expect(validateEmail(email)).toBe(false);
    });
  });
});
