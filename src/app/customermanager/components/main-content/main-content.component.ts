import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../models/customer';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  customer: Customer;

  constructor(private route: ActivatedRoute, private service: CustomerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) id = 11;
      this.customer = null;;

      this.service.customers.subscribe(users => {
        if (users.length == 0) return;

        setTimeout(() => {
          this.customer = this.service.customerById(id);
        }, 500);
      });
    });
  }
}
