import { describe, it, expect } from 'vitest';
import { persianToNumeric } from '../../utils/persianToNumeric';

describe('persianToNumeric', () => {
  it('should convert single Persian digits to numeric digits', () => {
    expect(persianToNumeric(['۰'])).toBe('0');
    expect(persianToNumeric(['۵'])).toBe('5');
  });

  it('should convert multiple Persian digits to numeric digits', () => {
    expect(persianToNumeric(['۱', '۲', '۳'])).toBe('123');
    expect(persianToNumeric(['۴', '۵', '۶', '۷', '۸', '۹'])).toBe('456789');
  });

  it('should handle mixed Persian and non-Persian characters gracefully', () => {
    // Include characters that aren't in the `persianNumbers` array
    expect(persianToNumeric(['۱', '۲', 'a', '۳', '!'])).toBe('12a3!');
  });

  it('should handle empty input', () => {
    expect(persianToNumeric([])).toBe('');
  });

});
