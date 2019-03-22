import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
 
@Injectable({
  providedIn: 'root'
})
export class InvoiceParameterService {
  username: string;

  private _detailedInvoice: Invoice;

  get detailedInvoice(): Invoice {
    if(!this._detailedInvoice) console.log(`Error: InvoiceParameterService() detailedCutstomer called when not set`)
    return this._detailedInvoice;
  }

  set detailedInvoice(value: Invoice) {
    this._detailedInvoice = value;
  }

  constructor() { }
}
