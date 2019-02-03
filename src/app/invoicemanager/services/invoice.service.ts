import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  userById(id: number): Invoice {
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
