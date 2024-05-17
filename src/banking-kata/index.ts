type Record = {
  date: string;
  amount: number;
  total: number;
};

export class Account {
  records: Record[];
  constructor() {
    this.records = [];
  }

  getLastRecord(): Record | undefined {
    return this.records.slice(-1).shift();
  }

  getTotalAmount(): number {
    return this.getLastRecord()?.total | 0;
  }

  deposit(amount: number): void {
    const record = {
      date: new Date().toISOString(),
      amount,
      total: this.getTotalAmount() + amount,
    };
    this.records.push(record);
  }
  withdraw(amount: number): void {}
  printStatement(): void {}
}
