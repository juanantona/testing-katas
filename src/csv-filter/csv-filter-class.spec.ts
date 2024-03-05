import { csvFilter } from './csv-filter-class';

describe('CSV Filter', () => {
  const headers =
    'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente';
  it('should return line if there is just one line and all the conditions are ok', () => {
    const inputFile = `${headers}
1,02/05/2019,1000,810,19,,ACERLaptop,B76430134,`;

    const outputFile = `${headers}
1,02/05/2019,1000,810,19,,ACERLaptop,B76430134,`;

    const filter = csvFilter.create(inputFile);
    const result = filter.filteredInvoices;

    expect(result).toBe(outputFile);
  });

  it('should return delete invoice if there is just one line and VAT an IGIC are filled in', () => {
    const inputFile = `${headers}
1,02/05/2019,1008,810,19,15,ACERLaptop,B76430134,`;

    const outputFile = `${headers}`;
    const filter = new csvFilter(inputFile);
    const result = filter.filteredInvoices;

    expect(result).toBe(outputFile);
  });

  it('should return delete invoice if there is just one line and CIF an NIF are filled in', () => {
    const inputFile = `${headers}
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,78544372A`;

    const outputFile = `${headers}`;
    const filter = new csvFilter(inputFile);
    const result = filter.filteredInvoices;

    expect(result).toBe(outputFile);
  });

  it('should return delete invoice if there is just one line and net is wrongly calculated', () => {
    const inputFile = `${headers}
1,02/05/2019,1000,800,19,,ACERLaptop,B76430134,`;

    const outputFile = `${headers}`;
    const filter = new csvFilter(inputFile);
    const result = filter.filteredInvoices;

    expect(result).toBe(outputFile);
  });

  it('should return delete both invoices if there is 2 with the same number', () => {
    const inputFile = `${headers}
1,02/05/2019,1000,810,19,,ACERLaptop,B76430134,
1,02/05/2019,1000,810,19,,ACERLaptop,B76430134,`;

    const outputFile = `${headers}`;
    const filter = new csvFilter(inputFile);
    const result = filter.filteredInvoices;

    expect(result).toBe(outputFile);
  });

  it('should return empty list if empty list is provided', () => {
    const inputFile = `${headers}
    `;

    const outputFile = `${headers}`;
    const filter = new csvFilter(inputFile);
    const result = filter.filteredInvoices;

    expect(result).toBe(outputFile);
  });

  it('should throw an error when a single line is provided', () => {
    const inputFile = `N1,02/05/2019,1000,810,19,,ACERLaptop,B76430134,`;
    const filter = new csvFilter(inputFile);
    expect(() => filter.filteredInvoices).toThrow('error');
  });
});
