export class Fibonacci {
  constructor() {}

  getSerie(numberOfItems: number) {
    let serie = [0];

    for (let index = 1; index <= numberOfItems; index++) {
      if (index === 1) continue;
      if (index === 2) {
        serie.push(1);
        continue;
      }
      const nextValue = serie[index - 3] + serie[index - 2];
      serie.push(nextValue);
    }
    return serie;
  }
}
