import { csvFilter } from './csv-filter-class';

describe('CSV Filter', () => {
  const headers =
    'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
  const emptyField = '';
  const csvFile = (rows: string[]) => rows.join('\n');

  it('should return line if there is just one line and all the conditions are ok', () => {
    const invoiceLine = oneInvoice({});
    const inputFile = csvFile([headers, invoiceLine]);
    const outputFile = csvFile([headers, invoiceLine]);

    const filter = csvFilter.create(inputFile);
    const result = filter.filteredInvoices;

    expect(result).toBe(outputFile);
  });

  it('should return valid invoices if all the conditions are ok', () => {
    const invoiceLine1 = oneInvoice({ id: '1' });
    const invoiceLine2 = oneInvoice({ id: '2' });
    const inputFile = csvFile([headers, invoiceLine1, invoiceLine2]);
    const outputFile = csvFile([headers, invoiceLine1, invoiceLine2]);

    const filter = csvFilter.create(inputFile);
    const result = filter.filteredInvoices;

    expect(result).toBe(outputFile);
  });

  it('should return delete invoice if there is just one line and VAT an IGIC are filled in', () => {
    const invoiceLine = oneInvoice({ iva: '19', igic: '15' });
    const inputFile = csvFile([headers, invoiceLine]);
    const outputFile = csvFile([headers]);

    const filter = new csvFilter(inputFile);
    const result = filter.filteredInvoices;

    expect(result).toBe(outputFile);
  });

  it('should return delete invoice if there is just one line and CIF an NIF are filled in', () => {
    const invoiceLine = oneInvoice({ nif: '78544372A' });
    const inputFile = csvFile([headers, invoiceLine]);
    const outputFile = csvFile([headers]);

    const filter = new csvFilter(inputFile);
    const result = filter.filteredInvoices;

    expect(result).toBe(outputFile);
  });

  it('should return delete invoice if there is just one line and net is wrongly calculated', () => {
    const invoiceLine = oneInvoice({ net: '800' });
    const inputFile = csvFile([headers, invoiceLine]);
    const outputFile = csvFile([headers]);

    const filter = new csvFilter(inputFile);
    const result = filter.filteredInvoices;

    expect(result).toBe(outputFile);
  });

  it('should return empty list if empty list is provided', () => {
    const inputFile = csvFile([headers, '']);
    const outputFile = csvFile([headers]);

    const filter = new csvFilter(inputFile);
    const result = filter.filteredInvoices;

    expect(result).toBe(outputFile);
  });

  it('should throw an error when a single line is provided', () => {
    const inputFile = csvFile([headers]);

    const filter = new csvFilter(inputFile);

    expect(() => filter.filteredInvoices).toThrow('error');
  });

  it('should return delete both invoices if there is 2 with the same id', () => {
    const invoiceLine1 = oneInvoice({ id: '1' });
    const invoiceLine2 = oneInvoice({ id: '2' });
    const invoiceLine3 = oneInvoice({ id: '3' });
    const invoiceLine4 = oneInvoice({ id: '3' });
    const inputFile = csvFile([
      headers,
      invoiceLine1,
      invoiceLine2,
      invoiceLine3,
      invoiceLine4,
    ]);
    const outputFile = csvFile([headers, invoiceLine1, invoiceLine2]);

    const filter = new csvFilter(inputFile);
    const result = filter.filteredInvoices;

    expect(result).toBe(outputFile);
  });

  interface Invoice {
    id?: string;
    iva?: string;
    igic?: string;
    net?: string;
    nif?: string;
  }

  const oneInvoice = ({
    id = '1',
    iva = '19',
    igic = emptyField,
    net = '810',
    nif = emptyField,
  }: Invoice) => {
    const date = '02/05/2019';
    const gross = '1000';
    const concept = 'ACERLaptop';
    const cif = 'B76430134';
    return [id, date, gross, net, iva, igic, concept, cif, nif].join(',');
  };
});
