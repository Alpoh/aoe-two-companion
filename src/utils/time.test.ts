import { formatSeconds, parseTimeToSeconds } from './time';

describe('parseTimeToSeconds', () => {
  it('converts a mm:ss string into total seconds', () => {
    expect(parseTimeToSeconds('14:30')).toBe(870);
  });

  it('handles a single-digit seconds value', () => {
    expect(parseTimeToSeconds('0:05')).toBe(5);
  });
});

describe('formatSeconds', () => {
  it('formats total seconds back into mm:ss', () => {
    expect(formatSeconds(870)).toBe('14:30');
  });

  it('pads single-digit seconds with a leading zero', () => {
    expect(formatSeconds(65)).toBe('1:05');
  });

  it('formats zero as 0:00', () => {
    expect(formatSeconds(0)).toBe('0:00');
  });
});
