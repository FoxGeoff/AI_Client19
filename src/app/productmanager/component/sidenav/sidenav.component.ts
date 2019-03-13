import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDrawer } from '@angular/material';
import { Product } from '../../models/Product';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  smallWidthBreakpoint: boolean;
  Products: Observable<Product[]>;
  @ViewChild(MatDrawer) sidenav: MatDrawer;

  
  constructor(
    private breakpointObserver: BreakpointObserver, 
    private ProductService: ProductService, 
    private router: Router) { }

  ngOnInit() {
     // make layout responsive
     this.breakpointObserver
     .observe(['(min-width: 500px)'])
     .subscribe((state: BreakpointState) => {
       if (state.matches) {
         console.log('Viewport is 500px or over!');
         this.smallWidthBreakpoint = false;
       } else {
         console.log('Viewport is getting smaller!');
         this.smallWidthBreakpoint = true;
       }
     });

     this.Products = this.ProductService.invoiceProducts;
     console.log('Finished getting all invoiceProducts from internal store');
 
     this.ProductService.getAllCustomers();
     console.log('Finished getting all invoiceProducts from the server');
     
     this.router.events.subscribe(() => {
       if (this.smallWidthBreakpoint) {
         console.log('Selection made on Smallscreen, close side bar');
         this.sidenav.close();
       }
     })
 
   }

  isScreenSmall(): boolean {
    return this.smallWidthBreakpoint;
  }

}
