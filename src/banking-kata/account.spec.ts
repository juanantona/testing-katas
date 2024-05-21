import { Account, StatementPrinter, Console } from './account';
import { Repository } from './repository';

describe('#Banking', () => {
  const repository = new Repository();
  const addDepositSpy = jest.spyOn(repository, 'addDeposit');
  const addWithdrawtSpy = jest.spyOn(repository, 'addWithdraw');
  const allTransactionsSpy = jest.spyOn(repository, 'allTransactions');

  const console = new Console();
  const statementPrinter = new StatementPrinter(console);
  const printSpy = jest.spyOn(statementPrinter, 'print');

  const account = new Account(repository, statementPrinter);

  it('Should store a transaction throught the repository', async () => {
    account.deposit(1000);

    expect(addDepositSpy).toHaveBeenCalledWith(1000);
  });

  it('Should store a withdrawal throught the repository', async () => {
    account.withdraw(1000);

    expect(addWithdrawtSpy).toHaveBeenCalledWith(1000);
  });

  it('Should print the statements throught the statementPrinter', async () => {
    allTransactionsSpy.mockReturnValue([]);
    account.printStatement();

    expect(printSpy).toHaveBeenCalledWith([]);
  });
});
