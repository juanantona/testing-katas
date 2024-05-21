import { type Transaction } from './repository';

export class Console {
  constructor() {}

  log(message: string) {
    console.log(message);
  }
}

export class StatementPrinter {
  private console: Console;
  private readonly header: string = 'Date | Amount | Balance';
  constructor(console: Console) {
    this.console = console;
  }

  print(transactions: Transaction[]) {
    this.console.log(this.header);
    transactions.forEach((transaction) => {
      const { date, amount, total } = transaction;
      const formattedDate = new Date(date).toLocaleDateString('en-GB');
      return this.console.log(`${formattedDate} | ${amount} | ${total}`);
    });
  }
}
