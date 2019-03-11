import { Invoice } from 'src/app/invoicemanager/models/invoice';

export class InvoiceProduct {
    id: number;
    associatedInvoiceId: number;
    associatedProductId: number;
    aiPartNumber: string;
    productDescription: string;
    sellPrice: number;
    cost: number;
    sellPriceWithTax: number;
    addionalCost: number;
    newCost: number;
    room: string;
    qty: number;
    priority: number;
    dateAdded: Date;
    invoice: Invoice;

} 