import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
 
@Injectable({
  providedIn: 'root'
})
export class CustomerParameterService {
  username: string;

  private _detailedCustomer: Customer;

  get detailedCustomer(): Customer {
    if(!this._detailedCustomer) console.log(`Error: CustomerParameterService() detailedCutstomer called when not set`)
    return this._detailedCustomer;
  }

  set detailedCustomer(value: Customer) {
    this._detailedCustomer = value;
  }

  constructor() { }
}
