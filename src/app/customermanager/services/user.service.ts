import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // this is our local internal store
  // not accessable to external code that could manipulate
  // the data
  private _users: BehaviorSubject<Customer[]>;

  private dataStore: {
    users: Customer[];
  }

  constructor(private https: HttpClient) {
    this.dataStore = { users: [] };
    // new up our local internal store
    this._users = new BehaviorSubject<Customer[]>([]);
  }

  // subscribe to our local internal store
  get users(): Observable<Customer[]> {
    return this._users.asObservable();
  }

  //TODO: Fake save requires update to http
  addCustomer(user: Customer): Promise<Customer> {
    return new Promise((resolve, reject) => {
      // fake from Db
      user.id = this.dataStore.users.length + 1;
      // push to internal data store
      this.dataStore.users.push(user);
      this._users.next(Object.assign({}, this.dataStore).users);
      resolve(user)
    });
  }

  LoadAll() {
    const userUrl = 'https://localhost:44334/api/customers';

    return this.https.get<Customer[]>(userUrl)
      .subscribe(data => {
        this.dataStore.users = data;
        // Copy data obj to isolate the data from manipulation
        // and expose this data
        this._users.next(Object.assign({}, this.dataStore).users);
        console.log("Got customer data");
      }, error => {
        console.error("Failed to fetch customer data");
      }
      )
  }

  userById(id: number): Customer {
    return this.dataStore.users.find(x => x.id == id);
  }
}