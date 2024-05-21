import { Account, StatementPrinter, Console } from './account';
import { Repository } from './repository';

// Requisites
// Make a deposit into the account
// Make a withdraw from the account
// Print banking movements

describe('#Banking', () => {
  const repository = new Repository();

  const console = new Console();
  const statementPrinter = new StatementPrinter(console);
  const spyConsole = jest.spyOn(console, 'log');
  const account = new Account(repository, statementPrinter);

  it('Should print transactions', async () => {
    jest.useFakeTimers({ now: new Date('2022/01/10') });
    account.deposit(1000);
    jest.useFakeTimers({ now: new Date('2022/01/13') });
    account.withdraw(500);
    jest.useFakeTimers({ now: new Date('2022/01/14') });
    account.deposit(2000);

    account.printStatement();

    expect(spyConsole).toHaveBeenCalledWith('Date | Amount | Balance');
    expect(spyConsole).toHaveBeenCalledWith('14/01/2022 | 2000 | 2500');
    expect(spyConsole).toHaveBeenCalledWith('13/01/2022 | -500 | 500');
    expect(spyConsole).toHaveBeenCalledWith('10/01/2022 | 1000 | 1000');
  });
});
