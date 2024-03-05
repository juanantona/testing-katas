export class csvFilter {
  constructor(private readonly file: string) {}

  static create(file: string) {
    return new csvFilter(file);
  }

  get filteredInvoices() {
    const rows = this.file.split('\n');
    if (rows.length === 1) throw new Error('error');

    const headers = rows[0];
    const invoices = rows.slice(1);

    const validInvoices: string[] = [];
    for (const invoice of invoices) {
      const invoiceFields = invoice.split(',').map((field) => field.trim());
      const ivaTax = parseInt(invoiceFields[4]);
      const igicTax = parseInt(invoiceFields[5]);
      const cifNumber = invoiceFields[7];
      const nifNumber = invoiceFields[8];
      const gross = parseInt(invoiceFields[2]);
      const net = parseInt(invoiceFields[3]);

      const fiscalIdRuleViolation = Boolean(cifNumber) && Boolean(nifNumber);
      const netCalculationError =
        net !== this.calculateNet(gross, ivaTax || igicTax);

      const id = invoiceFields[0];
      const sameIdInvoices = invoices.filter((invoice) => {
        const invoiceId = invoice.split(',')[0].trim();
        return invoiceId === id;
      });
      const idDuplicated = sameIdInvoices.length > 1;

      const anyError =
        this.isTaxRuleViolation(invoiceFields) ||
        fiscalIdRuleViolation ||
        netCalculationError ||
        idDuplicated;

      if (anyError) continue;
      else validInvoices.push(invoice);
    }
    return [headers, ...validInvoices].join('\n');
  }

  private calculateNet(gross: number, tax: number) {
    return gross * (1 - tax / 100);
  }

  private isTaxRuleViolation(invoiceFields: string[]) {
    const ivaTax = parseInt(invoiceFields[4]);
    const igicTax = parseInt(invoiceFields[5]);
    return Boolean(ivaTax) && Boolean(igicTax);
  }
}
