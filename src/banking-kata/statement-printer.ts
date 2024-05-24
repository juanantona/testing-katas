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
    this.printStatements(transactions);
  }

  private printStatements(transactions: Transaction[]) {
    transactions
      .sort(this.sortByDate)
      .map(this.formatStatementLine)
      .forEach((formattedTransaction) =>
        this.console.log(formattedTransaction)
      );
  }

  private sortByDate(transactionA: Transaction, transactionB: Transaction) {
    return (
      new Date(transactionA.date).valueOf() -
      new Date(transactionB.date).valueOf()
    );
  }

  private formatStatementLine(transaction: Transaction): string {
    const { date, amount, total } = transaction;
    const formattedDate = new Date(date).toLocaleDateString('en-GB');
    return `${formattedDate} | ${amount} | ${total}`;
  }
}
