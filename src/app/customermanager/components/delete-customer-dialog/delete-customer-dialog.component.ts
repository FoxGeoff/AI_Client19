import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-customer-dialog',
  templateUrl: './delete-customer-dialog.component.html',
  styleUrls: ['./delete-customer-dialog.component.css']
})
export class DeleteCustomerDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteCustomerDialogComponent>) { }

  ngOnInit() {
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
