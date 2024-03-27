export const getPrimeFactorsFor = (number: number) => {
  let factor = 2;
  if (number % factor !== 0) factor = 3;
  if (number % factor !== 0) factor = 5;
  if (number % factor !== 0) factor = 7;
  if (number % factor !== 0) factor = 11;
  const factors = [factor];
  const reminder = number / factor;
  if (reminder > 1) {
    return factors.concat(getPrimeFactorsFor(reminder));
  }
  return factors;
};
