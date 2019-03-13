import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Product } from '../models/Product';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ProductTrackerError } from '../models/ProductTrackerError';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
   // this is our local internal store
  // not accessable to external code that could manipulate
  // the data
  private _invoiceProducts: BehaviorSubject<Product[]>;

  private dataStore: {
    invoiceProducts: Product[];
  }

  constructor(private https: HttpClient) {
    this.dataStore = { invoiceProducts: [] };
    // new up our local internal store
    this._invoiceProducts = new BehaviorSubject<Product[]>([]);
    //new up a Customer
  }

  // subscribe to our local internal store
  get invoiceProducts(): Observable<Product[]> {
    return this._invoiceProducts.asObservable();
  }

  addCustomer(user: Product): Promise<Product> {
    return new Promise((resolve, reject) => {

      this.addCustomerDb(user)
        .subscribe(
          (data: Product) => user.id = data.id,
          (err: any) => console.log(err)
        );

      // push to internal data store
      this.dataStore.invoiceProducts.push(user);
      this._invoiceProducts.next(Object.assign({}, this.dataStore).invoiceProducts);

      resolve(user);
    });
  }

  //move to: data service
  addCustomerDb(newCustomer: Product): Observable<Product> {
    const userUrl = 'https://localhost:44334/api/products';

    return this.https.post<Product>(userUrl, newCustomer, {
      headers: new HttpHeaders({
        'Content': 'application/json'
      })
    });
  }

  getAllCustomers(): void {
    this.getAllCustomersDb().subscribe(
      (data: Product[]) => {
        console.log(data);
        this.dataStore.invoiceProducts = data;
        // Copy data obj to isolate the data from manipulation
        // and expose this data
        this._invoiceProducts.next(Object.assign({}, this.dataStore).invoiceProducts);
      },
      (err: ProductTrackerError) => console.log(err.friendlyMessage),
      () => console.log('Finished getting customer data from server:: LoadAll()')
    );
    this._invoiceProducts.next(Object.assign({}, this.dataStore).invoiceProducts);
  }
  //move to: data service
  getAllCustomersDb(): Observable<Product[] | ProductTrackerError> {
    const userUrl = 'https://localhost:44334/api/products ';

    console.log('Finished getting customer data from server:: getAllCustomers()');
    // Test: '/api/error/500'
    return this.https.get<Product[]>(userUrl)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  updateCustomer(customer: Product): void {
    // update database and remove from internal store
    this.updateCustomerDb(customer)
      .subscribe(
        (data: void) => {
          console.log(`${customer.productDescription} updated database successfully`);
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
    this.getCustomerById(customer.id)
      .subscribe(
        (data: Product) => {
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
  getCustomerById(id: number): Observable<Product> {
    const userUrl = `https://localhost:44334/api/products/${id}`;

    console.log('Getting customer from the server id: ' + id);
    return this.https.get<Product>(userUrl, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }

  //move to: data service
  updateCustomerDb(updatedCustomer: Product): Observable<void> {
    const userUrl = `https://localhost:44334/api/products/${updatedCustomer.id}`;

    return this.https.put<void>(userUrl, updatedCustomer, {
      headers: new HttpHeaders({
        'Content': 'application/json'
      })
    });
  }

  deleteOne(customer: Product): Promise<Product> {

    return new Promise((resolve, reject) => {
      this.deleteCustomerDb(customer.id).subscribe(
        null,
        (err: any) => console.log(err)
      )
      // pull from internal data store
      let arr: Product[] = this.dataStore.invoiceProducts;
      let value = arr.find(cust => cust.id === customer.id);
      this.dataStore.invoiceProducts = arr.filter(item => item !== value)

      // Copy data obj to isolate the data from manipulation
      // and expose this data
      this._invoiceProducts.next(Object.assign({}, this.dataStore).invoiceProducts);

      resolve(customer);
    });
  }

  //move to: data service
  deleteCustomerDb(id: number): Observable<void> {
    const userUrl = 'https://localhost:44334/api/products';

    return this.https.delete<void>(`userUrl/${id}`);
  }

  //move to: data service
  private handleHttpError(error: HttpErrorResponse): Observable<ProductTrackerError> {
    let dataError = new ProductTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occured retriving customer data.';

    return throwError(dataError);
  }

  customerById(id: number): Product {
    return this.dataStore.invoiceProducts.find(x => x.id == id);
  }
}
