import { getPrimeFactorsFor } from '.';

//  Prime factors
//  2 -> [2]
//  2 * 2 -> [2,2]
//  2 * 2 * 2 -> [2,2,2]
//  3 -> [3]
//  3 * 3 * 3 -> [3,3]
//  2 * 3 -> [2,3]
//  5 -> [5]
//  5 * 5 -> [5,5]
//  10 -> [2,5]
//  5 * 7 * 11 *  -> [5,7,11,3]

describe('Prime Factors', () => {
  it('Should return an array with the prime composition for a given number', () => {
    expect(getPrimeFactorsFor(2)).toStrictEqual([2]);
    expect(getPrimeFactorsFor(2 * 2)).toStrictEqual([2, 2]);
    expect(getPrimeFactorsFor(2 * 2 * 2)).toStrictEqual([2, 2, 2]);
    expect(getPrimeFactorsFor(3)).toStrictEqual([3]);
    expect(getPrimeFactorsFor(3)).toStrictEqual([3]);
    expect(getPrimeFactorsFor(3 * 3)).toStrictEqual([3, 3]);
    expect(getPrimeFactorsFor(2 * 3)).toStrictEqual([2, 3]);
    expect(getPrimeFactorsFor(5)).toStrictEqual([5]);
    expect(getPrimeFactorsFor(5 * 5)).toStrictEqual([5, 5]);
    expect(getPrimeFactorsFor(3 * 5 * 7 * 11)).toStrictEqual([3, 5, 7, 11]);
  });
});
