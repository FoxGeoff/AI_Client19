import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../models/customer';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CustomerParameterService } from '../../services/customer-parameter.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  customer: Customer;

  get detailCustomer(): Customer {
    return this.customerParameterService.detailedCustomer;
  }

  set detailCustomer(value: Customer) {
    this.customerParameterService.detailedCustomer = value;
  }

  constructor(private route: ActivatedRoute,
    private service: CustomerService,
    private customerParameterService: CustomerParameterService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) id = 11;
      this.customer = null;;

      this.service.customers.subscribe(customers => {
        if (customers.length == 0) return;

        setTimeout(() => {
          this.customer = this.service.customerById(id);
          this.detailCustomer = this.customer;
        }, 500);
      });
    });
  }
}
