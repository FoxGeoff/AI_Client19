import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDrawer } from '@angular/material';
import { InvoiceProduct } from '../../model/InvoiceProduct';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { UserService } from 'src/app/contactmanager/services/user.service';
import { User } from 'src/app/contactmanager/models/user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  smallWidthBreakpoint: boolean;
  users: Observable<User[]>;
  @ViewChild(MatDrawer) sidenav: MatDrawer;

  
  constructor(
    private breakpointObserver: BreakpointObserver, 
    private userService: UserService, 
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

      // display list from the internal store
      this.users = this.userService.users;
      this.userService.LoadAll();
      
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
