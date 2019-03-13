import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Product } from '../models/Product';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ProductTrackerError } from '../models/ProductTrackerError';

@Injectable({
  providedIn: 'root'
})

export class ProductPrameterService {}