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

// Possible test list
// A file with a single invoice where everything is correct, should output the same line
// A file with a single invoice where VAT and IGIC are filled in, you should delete the line
// A file with a single invoice where the net amount is incorrectly calculated should be deleted.
// A file with a single invoice where CIF and NIF are filled in, you should delete the line
// If the invoice number is repeated in several lines, all of them are deleted (without leaving any line).
// An empty list will produce an empty output list.
// A single line file is incorrect because it does not have a header.

type Invoice = {
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

type InvoiceFieldName =
  | 'Num_factura'
  | 'Fecha'
  | 'Bruto'
  | 'Neto'
  | 'IVA'
  | 'IGIC'
  | 'Concepto'
  | 'CIF_cliente'
  | 'NIF_cliente';

function buildFile(headerRow: string, invoiceRows: string[]): string {
  return [headerRow, ...invoiceRows].join('\n');
}

export const csvFilter = (file: string): string => {
  const rows = file.split('\n');
  const headerRow = rows[0];

  const validInvoices: string[] = [];
  for (let index = 1; index < rows.length; index++) {
    const invoiceRow = rows[index];
    const invoiceFields = invoiceRow.split(',').map((header) => header.trim());

    const gross = Number.parseFloat(invoiceFields[2]);
    const net = Number.parseFloat(invoiceFields[3]);
    const ivaTax = invoiceFields[4];
    const igicTax = invoiceFields[5];
    const cifNumber = invoiceFields[7];
    const nifNumber = invoiceFields[8];

    const taxRuleViolation = ivaTax && igicTax;
    const fiscalIdRuleViolation = cifNumber && nifNumber;
    const tax = Number.parseInt(ivaTax || igicTax) / 100;
    const netCalculationError = net !== gross * (1 - tax);

    if (taxRuleViolation || fiscalIdRuleViolation || netCalculationError)
      continue;
    validInvoices.push(invoiceRow);
  }

  return buildFile(headerRow, validInvoices);
};
