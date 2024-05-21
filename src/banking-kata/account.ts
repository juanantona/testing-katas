import { type Transaction, Repository } from './repository';

export class Console {
  constructor() {}

  log(message: string) {
    console.log(message);
  }
}

export class Account {
  repository: TypeRepository;
  constructor(repository: TypeRepository) {
    this.repository = repository;
  }

  deposit(amount: number): void {
    this.repository.addDeposit(amount);
  }

  withdraw(amount: number): void {
    this.repository.addWithdraw(amount);
  }

  printStatement(): void {
    console.log('Date | Amount | Balance');
  }
}
