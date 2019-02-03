import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

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

  LoadAll(): any {
    throw new Error("Method not implemented.");
  }

  userById(id: number): Invoice {
    return this.dataStore.invoices.find(x => x.id == id);
  }
}
