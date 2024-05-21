import { Repository } from './repository';

const deposit = (date: string, amount: number, total: number) => ({
  date: `${date}T00:00:00.000Z`,
  amount,
  total,
});

const withdraw = (date: string, amount: number, total: number) => ({
  date: `${date}T00:00:00.000Z`,
  amount: -amount,
  total,
});

describe('#Banking - Repository', () => {
  const today = '2024-01-01';
  jest.useFakeTimers({ now: new Date(today) });

  let repository: Repository;
  beforeEach(() => {
    repository = new Repository();
  });

  describe('addDeposit method', () => {
    it('Should create a deposit type transaction for a given amount', async () => {
      const amount = 1000;
      repository.addDeposit(amount);
      const transactions = repository.allTransactions();
      const total = repository.total;

      expect(transactions[0]).toStrictEqual(deposit(today, amount, total));
    });
  });

  describe('addWithdraw method', () => {
    it('Should create a withdraw type transaction for a given amount', async () => {
      const amount = 500;
      repository.addWithdraw(amount);
      const transactions = repository.allTransactions();
      const total = repository.total;

      expect(transactions[0]).toStrictEqual(withdraw(today, amount, total));
    });
  });
});
