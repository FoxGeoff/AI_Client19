import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { CustomerParameterService } from '../../services/customer-parameter.service';

export interface DialogData {
  animal: 'panda';
}

@Component({
  selector: 'app-delete-customer-dialog',
  templateUrl: './delete-customer-dialog.component.html',
  styleUrls: ['./delete-customer-dialog.component.css']
})
export class DeleteCustomerDialogComponent implements OnInit {
  customer: Customer;
  detailedCustomerId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<DeleteCustomerDialogComponent>,
    private customerService: CustomerService, private custParamService:CustomerParameterService) { }

  ngOnInit() {
    this.customer = new Customer();
    this.detailedCustomerId = this.custParamService.detailedCustomer.id;
  }

  delete() {
    this.customerService.deleteOne(this.customer).then(customer => {
      this.dialogRef.close(this.customer);
    });
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
