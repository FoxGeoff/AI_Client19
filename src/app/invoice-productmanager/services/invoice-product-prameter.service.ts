import { Injectable } from '@angular/core';
import { InvoiceProduct } from '../models/InvoiceProduct';

@Injectable({
  providedIn: 'root'
})
export class InvoiceProductPrameterService {
  detailedInvoiceProduct: InvoiceProduct; // TODO: use get/set

  constructor() { }
}
