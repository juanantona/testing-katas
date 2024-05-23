import { Console, StatementPrinter } from './statement-printer';

const transaction = (date: string, amount: number, total: number) => ({
  date,
  amount,
  total,
});

describe('#StatementPrinter', () => {
  const console = new Console();
  const logSpy = jest.spyOn(console, 'log');
  const statementPrinter = new StatementPrinter(console);

  it('Should always print header when print method is called', async () => {
    statementPrinter.print([]);

    expect(logSpy).toHaveBeenCalledWith('Date | Amount | Balance');
  });

  it('Should print the statement when one is provided to print method', async () => {
    const transactions = [transaction('2024-01-01', 1000, 2000)];
    statementPrinter.print(transactions);

    expect(logSpy).toHaveBeenCalledWith('01/01/2024 | 1000 | 2000');
  });

  it('Should print the statements when several are provided to the print method', async () => {
    const transactions = [
      transaction('2024-01-01', 1000, 2000),
      transaction('2024-01-02', 500, 2500),
    ];
    statementPrinter.print(transactions);

    expect(logSpy).toHaveBeenCalledWith('01/01/2024 | 1000 | 2000');
    expect(logSpy).toHaveBeenCalledWith('02/01/2024 | 500 | 2500');
  });
});
