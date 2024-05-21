export type Transaction = {
  date: string;
  amount: number;
  total: number;
};

export class Repository {
  private transactions: Transaction[] = [];
  constructor() {}

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
      .map(({ amount }) => amount)
      .reduce((acc, amount) => acc + amount, 0);
  }

  allTransactions() {
    return this.transactions;
  }
}
