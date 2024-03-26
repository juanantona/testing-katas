export class Fibonacci {
  constructor() {}

  getElement(element: number) {
    if (element === 1) return 0;
    if (element === 2) return 1;
    return this.getElement(element - 1) + this.getElement(element - 2);
  }
}
