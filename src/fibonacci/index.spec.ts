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

    expect(result).toBe(0);
  });

  it('Should return 1 if 2 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getElement(2);

    expect(result).toBe(1);
  });

  it('Should return 1 if 3 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getElement(3);

    expect(result).toBe(1);
  });

  it('Should return 2 if 4 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getElement(4);

    expect(result).toBe(2);
  });

  it('Should return 3 if 5 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getElement(5);

    expect(result).toBe(3);
  });

  it('Should return 5 if 6 is provided', async () => {
    const fibonacci = new Fibonacci();

    const result = fibonacci.getElement(6);

    expect(result).toBe(5);
  });

  it('Should return 5 if 6 is provided', async () => {
    const fibonacci = new Fibonacci();

    [6, 7, 8, 9, 10].forEach((n) => {
      expect(fibonacci.getElement(n)).toBe(
        fibonacci.getElement(n - 2) + fibonacci.getElement(n - 1)
      );
    });
  });
});
