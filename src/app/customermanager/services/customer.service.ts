import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // this is our local internal store
  // not accessable to external code that could manipulate
  // the data
  private _customers: BehaviorSubject<Customer[]>;

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

  //TODO: Fake save requires update to http
  addCustomer(user: Customer): Promise<Customer> {
    return new Promise((resolve, reject) => {
      // fake from Db
      user.id = this.dataStore.customers.length + 1;
      // push to internal data store
      this.dataStore.customers.push(user);
      this._customers.next(Object.assign({}, this.dataStore).customers);
      resolve(user)
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