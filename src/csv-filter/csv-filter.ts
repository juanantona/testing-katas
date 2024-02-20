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

function getInvoice(fieldNames: string[], invoiceFields: string[]) {
  const fieldsTypeNumber = ['Neto', 'Bruto', 'IVA', 'IGIC'];

  const invoice = {};
  fieldNames.forEach((fieldName, index) => {
    const value = invoiceFields[index];
    invoice[fieldName] = fieldsTypeNumber.includes(fieldName)
      ? Number.parseInt(value)
      : value;
  });
  return invoice;
}

function splitRow(row: string) {
  return row.split(',').map((field) => field.trim());
}

function buildFile(headerRow: string, invoiceRows: string[]): string {
  return [headerRow, ...invoiceRows].join('\n');
}

export const csvFilter = (file: string): string => {
  const rows = file.split('\n');
  const headerRow = rows[0];
  const fieldNames = splitRow(headerRow);

  if (rows.length === 1 && !headerRow.includes('Num_factura'))
    throw new Error('error');

  const validInvoices: string[] = [];
  for (let index = 1; index < rows.length; index++) {
    const invoiceRow = rows[index];
    const invoiceFields = splitRow(invoiceRow);

    const invoice = getInvoice(fieldNames, invoiceFields);

    const gross = invoice['Bruto'];
    const net = invoice['Neto'];
    const ivaTax = invoice['IVA'];
    const igicTax = invoice['IGIC'];
    const cifNumber = invoice['CIF_cliente'];
    const nifNumber = invoice['NIF_cliente'];

    const taxRuleViolation = Boolean(ivaTax) && Boolean(igicTax);
    const fiscalIdRuleViolation = Boolean(cifNumber) && Boolean(nifNumber);
    const tax = (ivaTax || igicTax) / 100;
    const netCalculationError = net !== gross * (1 - tax);

    const id = invoice['Num_factura'];
    let idRuleViolation = false;
    for (let innerIndex = 1; innerIndex < rows.length; innerIndex++) {
      const innerInvoiceFields = splitRow(rows[innerIndex]);
      const innerInvoice = getInvoice(fieldNames, innerInvoiceFields);
      if (id === innerInvoice['Num_factura'] && index !== innerIndex)
        idRuleViolation = true;
    }

    if (
      taxRuleViolation ||
      fiscalIdRuleViolation ||
      netCalculationError ||
      idRuleViolation
    )
      continue;
    validInvoices.push(invoiceRow);
  }

  return buildFile(headerRow, validInvoices);
};
