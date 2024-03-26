export class Fibonacci {
  constructor() {}

  getElement(element: number) {
    let serie = [0];
    for (let index = 0; index < element; index++) {
      if (index === 0) continue;
      if (index === 1) {
        serie.push(1);
        continue;
      }
      serie.push(serie[index - 2] + serie[index - 1]);
    }
    return serie[element - 1];
  }
}
