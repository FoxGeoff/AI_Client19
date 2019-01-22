import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Customer } from '../models/customer';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { userInfo } from 'os';
import { BookTrackerError } from 'src/app/models/bookTrackerError';
import { catchError } from 'rxjs/operators';
import { CustomerTrackerError } from '../models/CustomerTrackerError';

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
    //new up a Customer
  }

  // subscribe to our local internal store
  get customers(): Observable<Customer[]> {
    return this._customers.asObservable();
  }

  // TODO: Refactor method not using promise
  addCustomer(user: Customer): Promise<Customer> {
    return new Promise((resolve, reject) => {

      this.addCustomerDb(user)
        .subscribe(
          (data: Customer) => user.id = data.id,
          (err: any) => console.log(err)
        );

      // push to internal data store
      this.dataStore.customers.push(user);
      this._customers.next(Object.assign({}, this.dataStore).customers);

      resolve(user);
    });
  }

  //move to: data service
  addCustomerDb(newCustomer: Customer): Observable<Customer> {
    const userUrl = 'https://localhost:44334/api/customers';

    return this.https.post<Customer>(userUrl, newCustomer, {
      headers: new HttpHeaders({
        'Content': 'application/json'
      })
    });
  }

  LoadAll(): void {
    this.getAllCustomers().subscribe(
      (data: Customer[]) => {
        console.log(data);
        this.dataStore.customers = data;
        // Copy data obj to isolate the data from manipulation
        // and expose this data
        this._customers.next(Object.assign({}, this.dataStore).customers);
      },
      (err: CustomerTrackerError) => console.log(err.friendlyMessage),
      () => console.log('Finished getting customer data.')
    );
    this._customers.next(Object.assign({}, this.dataStore).customers);
  }

  //move to: data service
  getAllCustomers(): Observable<Customer[] | CustomerTrackerError> {
    const userUrl = 'https://localhost:44334/api/customers';

    console.log('Getting all customers from the server');
    // Test: '/api/error/500'
    return this.https.get<Customer[]>(userUrl)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  //move to: data service
  private handleHttpError(error: HttpErrorResponse): Observable<CustomerTrackerError> {
    let dataError = new CustomerTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occured retriving customer data.';

    return throwError(dataError);
  }

  customerById(id: number): Customer {
    return this.dataStore.customers.find(x => x.id == id);
  }
}