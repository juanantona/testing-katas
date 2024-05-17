import { Account } from '.';

// Requisites
// Make a deposit into the account
// Make a withdraw from the account
// Print banking movements

describe('#Banking', () => {
  it('Should make a deposit', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-01-01'));
    const account = new Account();
    account.deposit(1000);

    expect(account.getLastRecord()).toStrictEqual({
      date: '2024-01-01T00:00:00.000Z',
      amount: 1000,
      total: 1000,
    });

    expect(account.getTotalAmount()).toBe(1000);
  });
});
