import dayjs from 'dayjs';
import { CodeflixUser, isUserAllowedToWatchMovie } from '../src';
import { BrazilianRatingSystem } from '../src/types';

const makeUser = (age: number) => {
  const birthDate = dayjs().subtract(age, 'year').format('YYYY-MM-DD');
  return new CodeflixUser(1, 'Test User', birthDate);
};

describe('isUserAllowedToWatchMovie', () => {
  it('should allow all users to watch rating L', () => {
    expect(isUserAllowedToWatchMovie(makeUser(5), BrazilianRatingSystem.L)).toBe(true);
    expect(isUserAllowedToWatchMovie(makeUser(99), BrazilianRatingSystem.L)).toBe(true);
  });

  it('should restrict users based on age thresholds', () => {
    expect(isUserAllowedToWatchMovie(makeUser(9), BrazilianRatingSystem.AGE_10)).toBe(false);
    expect(isUserAllowedToWatchMovie(makeUser(10), BrazilianRatingSystem.AGE_10)).toBe(true);

    expect(isUserAllowedToWatchMovie(makeUser(11), BrazilianRatingSystem.AGE_12)).toBe(false);
    expect(isUserAllowedToWatchMovie(makeUser(12), BrazilianRatingSystem.AGE_12)).toBe(true);

    expect(isUserAllowedToWatchMovie(makeUser(13), BrazilianRatingSystem.AGE_14)).toBe(false);
    expect(isUserAllowedToWatchMovie(makeUser(14), BrazilianRatingSystem.AGE_14)).toBe(true);

    expect(isUserAllowedToWatchMovie(makeUser(15), BrazilianRatingSystem.AGE_16)).toBe(false);
    expect(isUserAllowedToWatchMovie(makeUser(16), BrazilianRatingSystem.AGE_16)).toBe(true);

    expect(isUserAllowedToWatchMovie(makeUser(17), BrazilianRatingSystem.AGE_18)).toBe(false);
    expect(isUserAllowedToWatchMovie(makeUser(18), BrazilianRatingSystem.AGE_18)).toBe(true);
  });

  it('should return false for unknown rating values', () => {
    // @ts-expect-error: testando valor inválido proposital
    expect(isUserAllowedToWatchMovie(makeUser(50), 'INVALID')).toBe(false);
  });
});
