import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { FormControl, Validators } from '@angular/forms';
import { CustomerParameterService } from '../../services/customer-parameter.service';

@Component({
  selector: 'app-edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.css']
})
export class EditCustomerDialogComponent implements OnInit {
  avatars = ['people'];
  customer: Customer;
  userName = new FormControl('', [Validators.required]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  companyName = new FormControl('', [Validators.required]);

  constructor(
    private dialogRef: MatDialogRef<EditCustomerDialogComponent>,
    private customerService: CustomerService,
    private customerParameterService: CustomerParameterService) { }

  ngOnInit() {
    this.customer = this.customerParameterService.detailedCustomer;
  }

  save() {
    this.customerService.updateCustomer(this.customer);
    
    this.dialogRef.close(this.customer);
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
