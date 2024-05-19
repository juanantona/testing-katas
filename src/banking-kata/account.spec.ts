import { Account } from './account';

// Requisites
// Make a deposit into the account
// Make a withdraw from the account
// Print banking movements

describe('#Banking', () => {
  it('Should make a deposit', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-01-01'));
    const account = new Account();
    account.deposit(1000);

    expect(account.lastTransaction).toStrictEqual({
      date: '2024-01-01T00:00:00.000Z',
      amount: 1000,
      total: 1000,
    });

    expect(account.totalAmount).toBe(1000);
  });

  it('Should make a withdraw', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-01-01'));

    const account = new Account();
    account.deposit(1000);
    account.withdraw(500);

    expect(account.lastTransaction).toStrictEqual({
      date: '2024-01-01T00:00:00.000Z',
      amount: -500,
      total: 500,
    });

    expect(account.totalAmount).toBe(500);
  });

  it('Should print transactions', async () => {
    const account = new Account();
    jest.useFakeTimers().setSystemTime(new Date('2022-10-01'));
    account.deposit(1000);
    jest.useFakeTimers().setSystemTime(new Date('2022-10-13'));
    account.withdraw(500);
    jest.useFakeTimers().setSystemTime(new Date('2022-10-14'));
    account.deposit(2000);
    account.printStatement();

    const spyConsole = jest.spyOn(console, 'log');

    expect(spyConsole).toHaveBeenCalledWith('Date | Amount | Balance');
    expect(spyConsole).toHaveBeenCalledWith('14/01/2022 | 2000 | 2500.00');
    expect(spyConsole).toHaveBeenCalledWith('13/01/2022 | -500 | 500');
    expect(spyConsole).toHaveBeenCalledWith('10/01/2022 | 1000 | 1000');
  });
});
