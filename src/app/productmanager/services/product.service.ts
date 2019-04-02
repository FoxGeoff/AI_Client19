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
  private _products: BehaviorSubject<Product[]>;

  private dataStore: {
    products: Product[];
  }

  constructor(private https: HttpClient) {
    this.dataStore = { products: [] };
    // new up our local internal store
    this._products = new BehaviorSubject<Product[]>([]);
    //new up a Product
  }

  // subscribe to our local internal store
  get products(): Observable<Product[]> {
    return this._products.asObservable();
  }

  addProduct(user: Product): Promise<Product> {
    return new Promise((resolve, reject) => {

      this.addProductDb(user)
        .subscribe(
          (data: Product) => user.id = data.id,
          (err: any) => console.log(err)
        );

      // push to internal data store
      this.dataStore.products.push(user);
      this._products.next(Object.assign({}, this.dataStore).products);

      resolve(user);
    });
  }

  //move to: data service
  addProductDb(newCustomer: Product): Observable<Product> {
    const userUrl = 'https://localhost:44334/api/products';

    return this.https.post<Product>(userUrl, newCustomer, {
      headers: new HttpHeaders({
        'Content': 'application/json'
      })
    });
  }

  getAllProducts(): void {
    this.getAllProductsDb().subscribe(
      (data: Product[]) => {
        console.log(data);
        this.dataStore.products = data;
        // Copy data obj to isolate the data from manipulation
        // and expose this data
        this._products.next(Object.assign({}, this.dataStore).products);
      },
      (err: ProductTrackerError) => console.log(err.friendlyMessage),
      () => console.log('Finished getting product data from server:: getAllProducts()')
    );
    this._products.next(Object.assign({}, this.dataStore).products);
  }
  //move to: data service
  getAllProductsDb(): Observable<Product[] | ProductTrackerError> {
    const userUrl = 'https://localhost:44334/api/products ';

    console.log('Finished getting product data from server:: getAllProductsDb()');
    // Test: '/api/error/500'
    return this.https.get<Product[]>(userUrl)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  updateProduct(product: Product): void {
    // update database and remove from internal store
    this.updateProductDb(product)
      .subscribe(
        (data: void) => {
          console.log(`${product.productDescription} updated database successfully`);
          // pull from internal data store
          /*
          let arr: Customer[] = this.dataStore.customers;
          let value = arr.find(cust => cust.id === products.id);
          this.dataStore.customers = arr.filter(item => item !== value);
          // Copy data obj to isolate the data from manipulation and expose this data
          this._customers.next(Object.assign({}, this.dataStore).customers);
          */
        },
        (err: any) => console.log(err)
      );
    // retrieve from database and add to internal store
    this.getProductById(product.id)
      .subscribe(
        (data: Product) => {
          console.log(`${data.productDescription} retrieved from database successfully`);
          // push onto internal data store
          this.dataStore.products.push(data);
          // Copy data obj to isolate the data from manipulation and expose this data
          this._products.next(Object.assign({}, this.dataStore).products);
        },
        (err) => console.log(err)
      );
  }

  //move to: data service
  getProductById(id: number): Observable<Product> {
    const userUrl = `https://localhost:44334/api/products/${id}`;

    console.log('Getting products from the server id: ' + id);
    return this.https.get<Product>(userUrl, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }

  //move to: data service
  updateProductDb(updatedCustomer: Product): Observable<void> {
    const userUrl = `https://localhost:44334/api/products/${updatedCustomer.id}`;

    return this.https.put<void>(userUrl, updatedCustomer, {
      headers: new HttpHeaders({
        'Content': 'application/json'
      })
    });
  }

  deleteOne(products: Product): Promise<Product> {

    return new Promise((resolve, reject) => {
      this.deleteProductDb(products.id).subscribe(
        null,
        (err: any) => console.log(err)
      )
      // pull from internal data store
      let arr: Product[] = this.dataStore.products;
      let value = arr.find(cust => cust.id === products.id);
      this.dataStore.products = arr.filter(item => item !== value)

      // Copy data obj to isolate the data from manipulation
      // and expose this data
      this._products.next(Object.assign({}, this.dataStore).products);

      resolve(products);
    });
  }

  //move to: data service
  deleteProductDb(id: number): Observable<void> {
    const userUrl = 'https://localhost:44334/api/products';

    return this.https.delete<void>(`userUrl/${id}`);
  }

  //move to: data service
  private handleHttpError(error: HttpErrorResponse): Observable<ProductTrackerError> {
    let dataError = new ProductTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occured retriving product data.';

    return throwError(dataError);
  }

  productById(id: number): Product {
    return this.dataStore.products.find(x => x.id == id);
  }
}
