import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { InvoiceTrackerError } from '../models/invoice-traker-error';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  // this is our local internal store
  // not accessable to external code that could manipulate
  // the data
  private _invoices: BehaviorSubject<Invoice[]>;

  private dataStore: {
    invoices: Invoice[];
  }

  constructor(private https: HttpClient) {
    this.dataStore = { invoices: [] };
    // new up our local internal store
    this._invoices = new BehaviorSubject<Invoice[]>([]);
  }

  // subscribe to our local internal store
  get invoices(): Observable<Invoice[]> {
    return this._invoices.asObservable();
  }
  /*
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
  */
  getAllInvoices(): void {
    this.getAllInvoicesDb().subscribe(
      (data: Invoice[]) => {
        console.log(data);
        this.dataStore.invoices = data;
        // Copy data obj to isolate the data from manipulation
        // and expose this data
        this._invoices.next(Object.assign({}, this.dataStore).invoices);
      },
      (err: InvoiceTrackerError) => console.log(err.friendlyMessage),
      () => console.log('Finished getting invoice data from server:: getAllInvoices()')
    );
    this._invoices.next(Object.assign({}, this.dataStore).invoices);
  }
  //move to: data service
  getAllInvoicesDb(): Observable<Invoice[] | InvoiceTrackerError> {
    const invoiceUrl = 'https://localhost:44334/api/invoices';

    console.log('Finished getting invoice data from server:: getAllInvoices()');
    // Test: '/api/error/500'
    return this.https.get<Invoice[]>(invoiceUrl)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  /* updateCustomer(customer: Customer): void {} */

  //move to: data service
  getInvoiceById(id: number): Observable<Invoice> {
    const userUrl = `https://localhost:44334/api/invoices/${id}`;

    console.log('Getting customer from the server id: ' + id);
    return this.https.get<Invoice>(userUrl, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }

  invoiceById(id: number): Invoice {
    return this.dataStore.invoices.find(x => x.id == id);
  }

  //move to: data service
  private handleHttpError(error: HttpErrorResponse): Observable<InvoiceTrackerError> {
    let dataError = new InvoiceTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occured retriving invoice data.';

    return throwError(dataError);
  }
}
