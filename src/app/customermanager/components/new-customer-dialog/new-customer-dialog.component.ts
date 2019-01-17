import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-customer-dialog',
  templateUrl: './new-customer-dialog.component.html',
  styleUrls: ['./new-customer-dialog.component.css']
})
export class NewCustomerDialogComponent implements OnInit {
  avatars = ['people'];
  customer: Customer;
  name = new FormControl('', [Validators.required]);

  constructor(private dialogRef: MatDialogRef<NewCustomerDialogComponent>, private customerService: CustomerService) { }

  ngOnInit() {
    this.customer = new Customer();
  }

  save() {
    this.customerService.addCustomer(this.customer).then(customer => {
      this.dialogRef.close(this.customer);
    });
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
