import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { CustomerService } from '../../services/customer.service';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  smallWidthBreakpoint: boolean;
  customers: Observable<Customer[]>;
  @ViewChild(MatDrawer) sidenav: MatDrawer;

  constructor(private breakpointObserver: BreakpointObserver, private customerService: CustomerService, private router: Router) { }

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

    this.customers = this.customerService.customers;
    console.log('Finished getting all customers from internal store');

    this.customerService.getAllCustomers();
    console.log('Finished getting all customers from the server');

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
