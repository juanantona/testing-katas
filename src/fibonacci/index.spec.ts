import { Fibonacci } from '.';

// Cases:
// 1 -> 0
// 2 -> 1
// 3 -> 1
// 4 -> 2
// 5 -> 3
// 6 -> 5

describe('The fibonacci series', () => {
  it('Should return 0 if 1 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getElement(1);

    expect(result).toStrictEqual(0);
  });

  it('Should return 1 if 2 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getElement(2);

    expect(result).toStrictEqual(1);
  });

  it('Should return 1 if 3 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getElement(3);

    expect(result).toStrictEqual(1);
  });

  it('Should return 2 if 4 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getElement(4);

    expect(result).toStrictEqual(2);
  });

  it('Should return 3 if 5 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getElement(5);

    expect(result).toStrictEqual(3);
  });

  it('Should return 5 if 6 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getElement(6);

    expect(result).toStrictEqual(5);
  });
});
