export const getPrimeFactorsFor = (number: number) => {
  if (number < 0) throw new Error('Negative numbers are not allowed');
  return primeFactors(number);
};

function primeFactors(number: number) {
  const factor = findSmallestPrime(number);
  const reminder = number / factor;
  return reminder <= 1
    ? [factor]
    : [factor].concat(getPrimeFactorsFor(reminder));
}

function findSmallestPrime(number: number) {
  if (number === 1) return 1;
  let factor = 2;
  while (number % factor != 0) {
    ++factor;
  }
  return factor;
}
