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

    const validInvoices = invoices
      .filter(this.isValidInvoice)
      .filter(this.isUniqueIdInvoice);

    return [headers, ...validInvoices].join('\n');
  }

  private checkIfNetAmountIsCorrect(net: string, gross: string, tax: string) {
    const parsedNet = parseInt(net);
    const parsedGross = parseInt(gross);
    const parsedTax = parseInt(tax);
    return parsedNet === parsedGross * (1 - parsedTax / 100);
  }

  private isTaxRuleViolation(fields: string[]) {
    const ivaTax = fields[4];
    const igicTax = fields[5];
    return Boolean(ivaTax) && Boolean(igicTax);
  }

  private isValidInvoice = (invoice: string) => {
    const fields = invoice.split(',').map((field) => field.trim());
    const ivaTax = fields[4];
    const igicTax = fields[5];
    const cifNumber = fields[7];
    const nifNumber = fields[8];
    const gross = fields[2];
    const net = fields[3];

    const isTaxRuleViolation = this.isTaxRuleViolation(fields);
    const fiscalIdRuleViolation = Boolean(cifNumber) && Boolean(nifNumber);
    const netCalculationError = !this.checkIfNetAmountIsCorrect(
      net,
      gross,
      ivaTax || igicTax
    );

    const anyError =
      isTaxRuleViolation || fiscalIdRuleViolation || netCalculationError;
    return !anyError;
  };

  private isUniqueIdInvoice = (
    invoice: string,
    index: number,
    allInvoices: string[]
  ) => {
    const getId = (invoice: string) => invoice.split(',')[0].trim();
    const allInvoiceIds = allInvoices.map(getId);
    const repitedIds = allInvoiceIds.filter((id) => id === getId(invoice));
    return repitedIds.length === 1;
  };
}
