export class csvFilter {
  constructor(private readonly file: string) {}

  static create(file: string) {
    const rows = file.split('\n');
    if (rows.length === 1) throw new Error('Single line is not allowed');
    return new csvFilter(file);
  }

  get filteredInvoices() {
    const rows = this.file.split('\n');
    const headers = rows[0];
    const invoices = rows.slice(1);

    const validInvoices = invoices
      .filter(this.isValidInvoice)
      .filter(this.isUniqueIdInvoice);

    return [headers, ...validInvoices].join('\n');
  }

  private hasCorrectNetAmount(fields: string[]) {
    const gross = parseInt(fields[2]);
    const net = parseInt(fields[3]);
    const ivaTax = fields[4];
    const igicTax = fields[5];
    const tax = parseInt(ivaTax || igicTax);
    return net === gross * (1 - tax / 100);
  }

  private isTaxRuleViolation(fields: string[]) {
    const ivaTax = fields[4];
    const igicTax = fields[5];
    return Boolean(ivaTax) && Boolean(igicTax);
  }

  private isFiscalIdRuleViolation(fields: string[]) {
    const cifNumber = fields[7];
    const nifNumber = fields[8];
    return Boolean(cifNumber) && Boolean(nifNumber);
  }

  private isValidInvoice = (invoice: string) => {
    const fields = invoice.split(',').map((field) => field.trim());
    if (this.isTaxRuleViolation(fields)) return false;
    if (this.isFiscalIdRuleViolation(fields)) return false;
    if (!this.hasCorrectNetAmount(fields)) return false;
    return true;
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
