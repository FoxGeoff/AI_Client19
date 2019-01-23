import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewCustomerDialogComponent } from '../components/new-customer-dialog/new-customer-dialog.component';
import { DeleteCustomerDialogComponent } from '../components/delete-customer-dialog/delete-customer-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {

  }

  openAddCustomerDialog(): void {
    const dialogRef = this.dialog.open(NewCustomerDialogComponent,
      { width: '450px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dailog "New Customer" is closed', result);
    })
  }

  openDeleteCustomerDialog(): void {
    const dialogRef = this.dialog.open(DeleteCustomerDialogComponent, {
      width: '450px',
      data: {
        animal: 'panda'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dailog "Delete Customer" is closed', result);

      // result === true then delete the customer
      if (result) {
        console.log('Deleting Customer')
      } else {
        console.log('Not deleting Customer')
      }

    })
  }

}
