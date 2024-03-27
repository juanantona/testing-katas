export const getPrimeFactorsFor = (number: number) => {
  const factor = findSmallestPrime(number);
  const reminder = number / factor;
  return reminder <= 1
    ? [factor]
    : [factor].concat(getPrimeFactorsFor(reminder));
};
function findSmallestPrime(number: number) {
  let factor = 2;
  while (number % factor != 0) {
    ++factor;
  }
  return factor;
}
