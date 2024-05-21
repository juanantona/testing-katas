import { type Transaction, Repository } from './repository';

export class Console {
  constructor() {}

  log(message: string) {
    console.log(message);
  }
}

export class StatementPrinter {
  console: Console;
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

export class Account {
  repository: Repository;
  statementPrinter: StatementPrinter;
  constructor(repository: Repository, statementPrinter: StatementPrinter) {
    this.repository = repository;
    this.statementPrinter = statementPrinter;
  }

  deposit(amount: number): void {
    this.repository.addDeposit(amount);
  }

  withdraw(amount: number): void {
    this.repository.addWithdraw(amount);
  }

  printStatement(): void {
    this.statementPrinter.print(this.repository.allTransactions());
  }
}
