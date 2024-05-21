export type Transaction = {
  date: string;
  amount: number;
  total: number;
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

  allTransactions() {
    return this.transactions;
  }
}
