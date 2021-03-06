import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { InvoiceProduct } from '../models/InvoiceProduct';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { InvoiceProductTrackerError } from '../models/InvoiceProductTrackerError';

@Injectable({
  providedIn: 'root'
})
export class InvoiceProductService {

  // this is our local internal store
  // not accessable to external code that could manipulate
  // the data
  private _invoiceProducts: BehaviorSubject<InvoiceProduct[]>;

  private dataStore: {
    invoiceProducts: InvoiceProduct[];
  }

  constructor(private https: HttpClient) {
    this.dataStore = { invoiceProducts: [] };
    // new up our local internal store
    this._invoiceProducts = new BehaviorSubject<InvoiceProduct[]>([]);
    //new up a Customer
  }

  // subscribe to our local internal store
  get invoiceProducts(): Observable<InvoiceProduct[]> {
    return this._invoiceProducts.asObservable();
  }

  addinvoiceProduct(user: InvoiceProduct): Promise<InvoiceProduct> {
    return new Promise((resolve, reject) => {

      this.addinvoiceProductDb(user)
        .subscribe(
          (data: InvoiceProduct) => user.id = data.id,
          (err: any) => console.log(err)
        );

      // push to internal data store
      this.dataStore.invoiceProducts.push(user);
      this._invoiceProducts.next(Object.assign({}, this.dataStore).invoiceProducts);

      resolve(user);
    });
  }

  //move to: data service
  addinvoiceProductDb(newInvoiceProduct: InvoiceProduct): Observable<InvoiceProduct> {
    const userUrl = 'https://localhost:44334/api/invoiceproducts';

    return this.https.post<InvoiceProduct>(userUrl, newInvoiceProduct, {
      headers: new HttpHeaders({
        'Content': 'application/json'
      })
    });
  }

  getAllInvoiceProducts(): void {
    this.getAllInvoiceProductsDb().subscribe(
      (data: InvoiceProduct[]) => {
        console.log(data);
        this.dataStore.invoiceProducts = data;
        // Copy data obj to isolate the data from manipulation
        // and expose this data
        this._invoiceProducts.next(Object.assign({}, this.dataStore).invoiceProducts);
      },
      (err: InvoiceProductTrackerError) => console.log(err.friendlyMessage),
      () => console.log('Finished getting invoice-products data from server:: getAllInvoiceProducts()')
    );
    this._invoiceProducts.next(Object.assign({}, this.dataStore).invoiceProducts);
  }
  //move to: data service
  getAllInvoiceProductsDb(): Observable<InvoiceProduct[] | InvoiceProductTrackerError> {
    const userUrl = 'https://localhost:44334/api/invoiceproducts ';

    console.log('Finished getting invoice-products data from server:: getAllInvoiceProductsDb()');
    // Test: '/api/error/500'
    return this.https.get<InvoiceProduct[]>(userUrl)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  updateInvoiceProduct(invoiceProduct: InvoiceProduct): void {
    // update database and remove from internal store
    this.updateInvoiceProductByIdDb(invoiceProduct)
      .subscribe(
        (data: void) => {
          console.log(`${invoiceProduct.productDescription} updated database successfully`);
          // pull from internal data store
          /*
          let arr: Customer[] = this.dataStore.customers;
          let value = arr.find(cust => cust.id === customer.id);
          this.dataStore.customers = arr.filter(item => item !== value);
          // Copy data obj to isolate the data from manipulation and expose this data
          this._customers.next(Object.assign({}, this.dataStore).customers);
          */
        },
        (err: any) => console.log(err)
      );
    // retrieve from database and add to internal store
    this.getInvoiceProductByIdDb(invoiceProduct.id)
      .subscribe(
        (data: InvoiceProduct) => {
          console.log(`${data.productDescription} retrieved from database successfully`);
          // push onto internal data store
          this.dataStore.invoiceProducts.push(data);
          // Copy data obj to isolate the data from manipulation and expose this data
          this._invoiceProducts.next(Object.assign({}, this.dataStore).invoiceProducts);
        },
        (err) => console.log(err)
      );
  }

  //move to: data service
  getInvoiceProductByIdDb(id: number): Observable<InvoiceProduct> {
    const userUrl = `https://localhost:44334/api/invoiceproducts/${id}`;

    console.log('Getting Invoice-Product from the server id: ' + id);
    return this.https.get<InvoiceProduct>(userUrl, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }

  //move to: data service
  updateInvoiceProductByIdDb(updatedCustomer: InvoiceProduct): Observable<void> {
    const userUrl = `https://localhost:44334/api/invoiceproducts/${updatedCustomer.id}`;

    return this.https.put<void>(userUrl, updatedCustomer, {
      headers: new HttpHeaders({
        'Content': 'application/json'
      })
    });
  }

  deleteOne(invoiceProduct: InvoiceProduct): Promise<InvoiceProduct> {

    return new Promise((resolve, reject) => {
      this.deleteInvoiceProductDb(invoiceProduct.id).subscribe(
        null,
        (err: any) => console.log(err)
      )
      // pull from internal data store
      let arr: InvoiceProduct[] = this.dataStore.invoiceProducts;
      let value = arr.find(InvoiceProd => InvoiceProd.id === invoiceProduct.id);
      this.dataStore.invoiceProducts = arr.filter(item => item !== value)

      // Copy data obj to isolate the data from manipulation
      // and expose this data
      this._invoiceProducts.next(Object.assign({}, this.dataStore).invoiceProducts);

      resolve(invoiceProduct);
    });
  }

  //move to: data service
  deleteInvoiceProductDb(id: number): Observable<void> {
    const userUrl = 'https://localhost:44334/api/invoiceproducts';

    return this.https.delete<void>(`userUrl/${id}`);
  }

  //move to: data service
  private handleHttpError(error: HttpErrorResponse): Observable<InvoiceProductTrackerError> {
    let dataError = new InvoiceProductTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occured retriving Invoice-Products data.';

    return throwError(dataError);
  }

  invoiceProductById(id: number): InvoiceProduct {
    return this.dataStore.invoiceProducts.find(x => x.id == id);
  }
}