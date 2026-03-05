import { describe, it, expect } from 'vitest';
import { stripHtml, getInitials, getHue, formatDate } from './format';

describe('stripHtml', () => {
  it('strips HTML tags and returns plain text', () => {
    expect(stripHtml('<p>Hello <strong>World</strong></p>')).toBe(
      'Hello World'
    );
  });

  it('returns empty string for empty input', () => {
    expect(stripHtml('')).toBe('');
    expect(stripHtml(null)).toBe('');
    expect(stripHtml(undefined)).toBe('');
  });

  it('handles nested and self-closing tags', () => {
    expect(stripHtml('<div><br/><span>Hi</span></div>')).toBe('Hi');
  });
});

describe('getInitials', () => {
  it('returns up to 2-letter initials from a name', () => {
    expect(getInitials('John Doe')).toBe('JD');
    expect(getInitials('Alice')).toBe('A');
    expect(getInitials('Alice Bob Charlie')).toBe('AB');
  });

  it('returns "U" for empty or missing input', () => {
    expect(getInitials('')).toBe('U');
    expect(getInitials()).toBe('U');
  });
});

describe('getHue', () => {
  it('returns a number between 0 and 359', () => {
    const hue = getHue('Test User');
    expect(hue).toBeGreaterThanOrEqual(0);
    expect(hue).toBeLessThan(360);
  });

  it('returns consistent results for the same input', () => {
    expect(getHue('Alice')).toBe(getHue('Alice'));
  });

  it('returns different results for different inputs', () => {
    expect(getHue('Alice')).not.toBe(getHue('Bob'));
  });
});

describe('formatDate', () => {
  it('formats a date string into a readable label', () => {
    const result = formatDate('2026-03-05T10:00:00Z');
    expect(result).toContain('Mar');
    expect(result).toContain('2026');
  });

  it('returns "—" for empty input', () => {
    expect(formatDate(null)).toBe('—');
    expect(formatDate(undefined)).toBe('—');
    expect(formatDate('')).toBe('—');
  });
});
