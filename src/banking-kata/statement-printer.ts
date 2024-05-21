import { type Transaction } from './repository';

export class Console {
  constructor() {}

  log(message: string) {
    console.log(message);
  }
}

export class StatementPrinter {
  private console: Console;
  constructor(console: Console) {
    this.console = console;
  }

  print(transactions: Transaction[]) {
    this.console.log('Date | Amount | Balance');
    transactions.reverse().forEach((transaction) => {
      const { date, amount, total } = transaction;
      const formattedDate = new Date(date).toLocaleDateString('en-GB');
      return this.console.log(`${formattedDate} | ${amount} | ${total}`);
    });
  }
}
