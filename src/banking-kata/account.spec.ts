import { Account, Repository } from './account';

// Requisites
// Make a deposit into the account
// Make a withdraw from the account
// Print banking movements

describe('#Banking', () => {
  const repository = new Repository();
  const addDepositSpy = jest.spyOn(repository, 'addDeposit');
  const addWithdrawtSpy = jest.spyOn(repository, 'addWithdraw');

  it('Should store a transaction throught the repository', async () => {
    const account = new Account(repository);
    account.deposit(1000);

    expect(addDepositSpy).toHaveBeenCalledWith(1000);
    expect(repository.total).toBe(1000);
  });

  it('Should store a withdrawal thouught the repository', async () => {
    const account = new Account(repository);
    account.withdraw(1000);

    expect(addWithdrawtSpy).toHaveBeenCalledWith(1000);
    expect(repository.total).toBe(0);
  });

  it('Should print transactions', async () => {
    const account = new Account(repository);
    account.deposit(1000);
    account.withdraw(500);
    account.deposit(2000);
    account.printStatement();

    const spyConsole = jest.spyOn(console, 'log');

    expect(spyConsole).toHaveBeenCalledWith('Date | Amount | Balance');
    expect(spyConsole).toHaveBeenCalledWith('14/01/2022 | 2000 | 2500.00');
    expect(spyConsole).toHaveBeenCalledWith('13/01/2022 | -500 | 500');
    expect(spyConsole).toHaveBeenCalledWith('10/01/2022 | 1000 | 1000');
  });
});
