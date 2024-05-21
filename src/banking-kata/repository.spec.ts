import { Repository } from './repository';

describe('#Banking - Repository', () => {
  jest.useFakeTimers({ now: new Date('2024-01-01') });
  let repository: Repository;
  beforeEach(() => {
    repository = new Repository();
  });

  describe('addDeposit method', () => {
    it('Should create a deposit type transaction for a given amount', async () => {
      repository.addDeposit(1000);
      const transactions = repository.allTransactions();

      expect(transactions[0]).toStrictEqual({
        date: '2024-01-01T00:00:00.000Z',
        amount: 1000,
        total: 1000,
      });
    });
  });

  describe('addWithdraw method', () => {
    it('Should create a withdraw type transaction for a given amount', async () => {
      repository.addWithdraw(500);
      const transactions = repository.allTransactions();

      expect(transactions[0]).toStrictEqual({
        date: '2024-01-01T00:00:00.000Z',
        amount: -500,
        total: -500,
      });
    });
  });
});
