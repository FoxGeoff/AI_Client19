import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

import { UserService } from '../../services/user.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  smallWidthBreakpoint: boolean;
  customers: Observable<Customer[]>;
  @ViewChild(MatDrawer) sidenav: MatDrawer;

  constructor(public breakpointObserver: BreakpointObserver, private customerService: UserService, private router: Router) { }

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


    // display user list from the internal store
    this.customers = this.customerService.users;
    this.customerService.LoadAll();

    this.customers.subscribe(data => {
      console.log(data);
    })


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
