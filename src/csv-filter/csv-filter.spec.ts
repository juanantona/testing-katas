import { csvFilter } from './csv-filter';

describe('CSV Filter', () => {
  it('should return line if there is just one line and all the conditions are ok', () => {
    const inputFile = `Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1000,810,19,,ACERLaptop,B76430134,`;

    const outputFile = `Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1000,810,19,,ACERLaptop,B76430134,`;
    const result = csvFilter(inputFile);

    expect(result).toBe(outputFile);
  });

  it('should return delete invoice if there is just one line and VAT an IGIC are filled in', () => {
    const inputFile = `Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1008,810,19,15,ACERLaptop,B76430134,`;

    const outputFile = `Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente`;
    const result = csvFilter(inputFile);

    expect(result).toBe(outputFile);
  });

  it('should return delete invoice if there is just one line and CIF an NIF are filled in', () => {
    const inputFile = `Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,78544372A`;

    const outputFile = `Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente`;
    const result = csvFilter(inputFile);

    expect(result).toBe(outputFile);
  });

  it('should return delete invoice if there is just one line and net is wrongly calculated', () => {
    const inputFile = `Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1000,800,19,,ACERLaptop,B76430134,`;

    const outputFile = `Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente`;
    const result = csvFilter(inputFile);

    expect(result).toBe(outputFile);
  });

  it('should return delete both invoices if there is 2 with the same number', () => {
    const inputFile = `Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1000,810,19,,ACERLaptop,B76430134,
1,02/05/2019,1000,810,19,,ACERLaptop,B76430134,`;

    const outputFile = `Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente`;
    const result = csvFilter(inputFile);

    expect(result).toBe(outputFile);
  });
});
