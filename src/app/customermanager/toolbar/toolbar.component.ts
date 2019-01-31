import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatSnackBar, SimpleSnackBar, MatSnackBarRef } from '@angular/material';
import { NewCustomerDialogComponent } from '../components/new-customer-dialog/new-customer-dialog.component';
import { DeleteCustomerDialogComponent } from '../components/delete-customer-dialog/delete-customer-dialog.component';
import { CustomerParameterService } from '../services/customer-parameter.service';
import { EditCustomerDialogComponent } from '../components/edit-customer-dialog/edit-customer-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private custParamService: CustomerParameterService) { }

  ngOnInit() {

  }

  openDeleteCustomerSnackBar(): void {
    let isActive: boolean = false;
    let id = this.custParamService.detailedCustomer.id;

    this.openSnackBar(`Customer: ${id} deleted`, 'Undo').onAction()
      .subscribe(
        () => { isActive = true; },
        err => console.log(err),
        () => { isActive ? console.log(`Don't do anything for Customer: ${id}`) : console.log(`Delete Customer: ${id}`); }
      );
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  openEditCustomerDilog() {
    const dialogRef = this.dialog.open(EditCustomerDialogComponent,
      { width: '450px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dailog "Edit Customer" is closed', result);
    })
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
