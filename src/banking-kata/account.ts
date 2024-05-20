type Transaction = {
  date: string;
  amount: number;
  total: number;
};

export class Console {
  constructor() {}

  log(message: string) {
    console.log(message);
  }
}

type TypeRepository = {
  addDeposit: (amount: number) => void;
  addWithdraw: (amount: number) => void;
};

export class Repository {
  transactions: Transaction[];
  constructor() {
    this.transactions = [];
  }

  addDeposit(amount: number) {
    this.transactions.push({
      date: new Date().toISOString(),
      amount,
      total: this.total + amount,
    });
  }

  addWithdraw(amount: number) {
    this.transactions.push({
      date: new Date().toISOString(),
      amount: -amount,
      total: this.total - amount,
    });
  }

  get total() {
    return this.transactions
      .map((transaction) => transaction.amount)
      .reduce((acc, amount) => acc + amount, 0);
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
