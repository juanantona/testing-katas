const file = `
Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente
1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,
2,03/08/2019,2000,2000,,8,MacBook Pro,,78544372A
3,03/12/2019,1000,2000,19,8, LenovoLaptop,,78544372A
`;

// Bussiness rules
// Fields can be empty
// Bill number can't be repited -> that case repetitions should be removed
// IVA and IGIG taxes are exclusive and both can't be present at the same time
// CIF and NIF are also exclusive
// Net = gross * tax -> wrong calculations should be removed

type Bill = {
  Num_factura: string;
  Fecha: string;
  Bruto: number;
  Neto: number;
  IVA: number;
  IGIC: number;
  Concepto: string;
  CIF_cliente: string;
  NIF_cliente: string;
};

type Headers =
  | 'Num_factura'
  | 'Fecha'
  | 'Bruto'
  | 'Neto'
  | 'IVA'
  | 'IGIC'
  | 'Concepto'
  | 'CIF_cliente'
  | 'NIF_cliente';

export const csvFilter = (file: string): string => {
  const rows = file.split('\n');
  const headerRow = rows.shift() as string;

  const billNumbers: string[] = [];
  const filteredRows: string[] = [];
  for (const row of rows) {
    const fields = row.split(',');
    const billNumber = fields[0];
    if (billNumbers.includes(billNumber)) {
      continue;
    } else {
      billNumbers.push(billNumber);
      filteredRows.push(row);
    }
  }

  return [headerRow].concat(filteredRows).join('\n');
};
