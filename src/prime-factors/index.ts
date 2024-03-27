export const getPrimeFactorsFor = (number: number) => {
  let factor = 2;
  while (number % factor != 0) {
    ++factor;
  }
  const factors = [factor];
  const reminder = number / factor;
  if (reminder > 1) {
    return factors.concat(getPrimeFactorsFor(reminder));
  }
  return factors;
};
