import { getPrimeFactorsFor } from '.';

describe('Prime Factors', () => {
  it('Should return an array with the prime for a given prime number', () => {
    expect(getPrimeFactorsFor(2)).toStrictEqual([2]);
    expect(getPrimeFactorsFor(3)).toStrictEqual([3]);
  });

  it('Should return an array with the prime composition for a given number multiply of a prime', () => {
    expect(getPrimeFactorsFor(2 * 2 * 2)).toStrictEqual([2, 2, 2]);
  });

  it('Should return an array with the prime composition sorted from smallest to biggest', () => {
    expect(getPrimeFactorsFor(3 * 5 * 7 * 11)).toStrictEqual([3, 5, 7, 11]);
  });
});
