import { Fibonacci } from '.';

// Cases:
// 1 -> 0
// 2 -> 0, 1
// 3 -> 0, 1, 1
// 4 -> 0, 1, 1, 2
// 5 -> 0, 1, 1, 2, 3
// 6 -> 0, 1, 1, 2, 3, 5

describe('The fibonacci series', () => {
  it('Should return [0] if 1 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getSerie(1);

    expect(result).toStrictEqual([0]);
  });

  it('Should return [0, 1] if 2 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getSerie(2);

    expect(result).toStrictEqual([0, 1]);
  });

  it('Should return [0, 1, 1] if 3 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getSerie(3);

    expect(result).toStrictEqual([0, 1, 1]);
  });

  it('Should return [0, 1, 1, 2] if 4 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getSerie(4);

    expect(result).toStrictEqual([0, 1, 1, 2]);
  });

  it('Should return [0, 1, 1, 2, 3] if 5 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getSerie(5);

    expect(result).toStrictEqual([0, 1, 1, 2, 3]);
  });

  it('Should return [0, 1, 1, 2, 3, 5] if 6 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getSerie(6);

    expect(result).toStrictEqual([0, 1, 1, 2, 3, 5]);
  });
});
