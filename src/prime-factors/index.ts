export const getPrimeFactorsFor = (number: number) => {
  const primes = [3, 5, 7, 11];
  const factor = primes.reduce((previousFactor, currentfactor) => {
    return number % previousFactor === 0 ? previousFactor : currentfactor;
  }, 2);
  const factors = [factor];
  const reminder = number / factor;
  if (reminder > 1) {
    return factors.concat(getPrimeFactorsFor(reminder));
  }
  return factors;
};
