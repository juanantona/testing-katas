import { StatementPrinter } from './statement-printer';
import { Repository } from './repository';

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
