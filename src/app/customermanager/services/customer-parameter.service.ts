import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
 
@Injectable({
  providedIn: 'root'
})
export class CustomerParameterService {
  detailedCustomer: Customer;

  //TODO: check for null Customer
  constructor() { }
}
