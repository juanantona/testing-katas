import { csvFilter } from './csv-filter';

describe('CSV Filter', () => {
  it('should remove rows with repeated bill number', () => {
    const inputFile = `
Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,
1,03/08/2019,2000,2000,,8,MacBook Pro,,78544372A
`;

    const outputFile = `
Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,
`;
    const result = csvFilter(inputFile);

    expect(result).toBe(outputFile);
  });

  it('should remove rows where IVA and IGIC taxes are both present', () => {
    const inputFile = `
Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,
2,03/08/2019,2000,2000,19,8,MacBook Pro,,78544372A
`;

    const outputFile = `
Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,
`;
    const result = csvFilter(inputFile);

    expect(result).toBe(outputFile);
  });

  it('should remove rows where CIF and NIF are both present', () => {
    const inputFile = `
Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,
2,03/08/2019,2000,2000,19,8,MacBook Pro,B76430134,78544372A
`;

    const outputFile = `
Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,
`;
    const result = csvFilter(inputFile);

    expect(result).toBe(outputFile);
  });

  it('should remove rows with incorrect net calculations', () => {
    const inputFile = `
Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,
2,03/08/2019,2000,2000,,8,MacBook Pro,B76430134,78544372A
`;

    const outputFile = `
Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,
`;
    const result = csvFilter(inputFile);

    expect(result).toBe(outputFile);
  });
});
