import { describe, it, expect } from 'vitest';
import { toPersianNumber } from '../../utils/toPersianNumber';

describe('toPersianNumber', () => {
  it('should convert single-digit numbers to Persian digits', () => {
    expect(toPersianNumber(5)).toBe('۵');
    expect(toPersianNumber(0)).toBe('۰');
  });

  it('should convert multi-digit numbers to Persian digits', () => {
    expect(toPersianNumber(123)).toBe('۱۲۳');
    expect(toPersianNumber(456789)).toBe('۴۵۶۷۸۹');
  });

  it('should convert string numbers to Persian digits', () => {
    expect(toPersianNumber('123')).toBe('۱۲۳');
    expect(toPersianNumber('09876')).toBe('۰۹۸۷۶');
  });

  it('should handle mixed strings with numbers', () => {
    expect(toPersianNumber('abc123xyz')).toBe('abc۱۲۳xyz');
    expect(toPersianNumber('Room 404')).toBe('Room ۴۰۴');
  });

  it('should handle edge cases', () => {
    // Empty input
    expect(toPersianNumber('')).toBe('');
    // Only non-numeric characters
    expect(toPersianNumber('abc')).toBe('abc');
    // Numbers with special characters
    expect(toPersianNumber('12-34')).toBe('۱۲-۳۴');
  });

  it('should handle numbers with leading zeros', () => {
    expect(toPersianNumber('00123')).toBe('۰۰۱۲۳');
  });
});
