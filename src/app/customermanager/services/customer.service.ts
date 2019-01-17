import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // this is our local internal store
  // not accessable to external code that could manipulate
  // the data
  private _customers: BehaviorSubject<Customer[]>;
  private _newCustomerId: number;

  private dataStore: {
    customers: Customer[];
  }

  constructor(private https: HttpClient) {
    this.dataStore = { customers: [] };
    // new up our local internal store
    this._customers = new BehaviorSubject<Customer[]>([]);
  }

  // subscribe to our local internal store
  get customers(): Observable<Customer[]> {
    return this._customers.asObservable();
  }

  // TODO: Refactor method addCustomer() and addCustomerDb
  addCustomer(user: Customer): Promise<Customer> {
    return new Promise((resolve, reject) => {

      this.addCustomerDb(user).subscribe(
        (data: Customer) => this._newCustomerId = data.id,
      );

      user.id = this._newCustomerId;
      // push to internal data store
      this.dataStore.customers.push(user);
      this._customers.next(Object.assign({}, this.dataStore).customers);
      resolve(user)
    });
  }

  //move to: data service
  addCustomerDb(newCustomer: Customer): Observable<Customer> {
    return this.https.post<Customer>('https://localhost:44334/api/customers', newCustomer, {
      headers: new HttpHeaders({
        'Content': 'application/json'
      })
    });
  }

  LoadAll() {
    const userUrl = 'https://localhost:44334/api/customers';

    return this.https.get<Customer[]>(userUrl)
      .subscribe(data => {
        this.dataStore.customers = data;
        // Copy data obj to isolate the data from manipulation
        // and expose this data
        this._customers.next(Object.assign({}, this.dataStore).customers);
        console.log("Got customer data");
      }, error => {
        console.error("Failed to fetch customer data");
      }
      )
  }

  customerById(id: number): Customer {
    return this.dataStore.customers.find(x => x.id == id);
  }
}