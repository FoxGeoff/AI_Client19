import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { Customer } from 'src/app/customermanager/models/customer';

@Injectable({
  providedIn: 'root'
})
export class InvoiceParameterService {
  customer: Customer;

  _customerInvoices: Invoice[];

  get CustomerInvoices(): Invoice[] {
    if (!this._customerInvoices) console.log(`Error: InvoiceParameterService() invoiceCutstomer called when not set`)
    return this._customerInvoices;
  }

  set CustomerInvoices(value: Invoice[]) {
    this._customerInvoices = value;
  }

  constructor() { }
}
