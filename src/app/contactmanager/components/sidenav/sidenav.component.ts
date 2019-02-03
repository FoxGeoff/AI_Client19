import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

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
