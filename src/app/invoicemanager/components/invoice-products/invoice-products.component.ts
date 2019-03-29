import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { InvoiceProduct } from 'src/app/invoice-productmanager/models/InvoiceProduct';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-invoice-products',
  templateUrl: './invoice-products.component.html',
  styleUrls: ['./invoice-products.component.css']
})
export class InvoiceProductsComponent implements OnInit {
  @Input() invoiceProducts: InvoiceProduct[];

  displayedColumns: string[] = ['position', 'title', 'room', 'amount', 'date'];
  dataSource: MatTableDataSource<InvoiceProduct>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<InvoiceProduct>(this.invoiceProducts);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
