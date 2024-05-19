type Transactions = {
  date: string;
  amount: number;
  total: number;
};

export class Account {
  transactions: Transactions[];
  constructor() {
    this.transactions = [];
  }

  get lastTransaction(): Transactions | undefined {
    return this.transactions.slice(-1).shift();
  }

  get totalAmount(): number {
    const lastTransactions = this.lastTransaction;
    return lastTransactions ? lastTransactions.total : 0;
  }

  deposit(amount: number): void {
    const record = {
      date: new Date().toISOString(),
      amount,
      total: this.totalAmount + amount,
    };
    this.transactions.push(record);
  }

  withdraw(amount: number): void {
    const record = {
      date: new Date().toISOString(),
      amount: -amount,
      total: this.totalAmount - amount,
    };
    this.transactions.push(record);
  }
  printStatement(): void {
    console.log('Date | Amount | Balance');
  }
}
