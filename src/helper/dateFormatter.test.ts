import { describe, expect, test } from 'vitest';
import { formatDate } from './dateFormatter';

describe('formatDate', () => {
  test('formats a valid ISO date string correctly', () => {
    const dateString = '2025-03-18T15:30:00.000Z';
    const formatted = formatDate(dateString);

    expect(formatted).toContain('2025');
    expect(formatted).toMatch(/Mar|Mär/);
    expect(formatted).toMatch(/\b18\b/);
    expect(formatted).toMatch(/\d{2}:\d{2}/);
  });

  test('formats another valid ISO date string correctly', () => {
    const dateString = '2022-12-25T10:00:00.000Z';
    const formatted = formatDate(dateString);

    expect(formatted).toContain('2022');
    expect(formatted).toMatch(/Dec|Dez/);
    expect(formatted).toMatch(/\b25\b/);
    expect(formatted).toMatch(/\d{2}:\d{2}/);
  });

  test('returns "Invalid Date" for an invalid date string', () => {
    const dateString = 'invalid-date';
    const formatted = formatDate(dateString);

    expect(formatted).toBe('Invalid Date');
  });
});
