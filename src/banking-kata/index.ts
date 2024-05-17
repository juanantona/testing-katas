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
  deposit(amount: number): void {
    const lastRecord = this.records.slice(-1).shift();

    const record = {
      date: new Date().toISOString(),
      amount,
      total: (lastRecord?.total | 0) + amount,
    };
    this.records.push(record);
  }
  withdraw(amount: number): void {}
  printStatement(): void {}
}
