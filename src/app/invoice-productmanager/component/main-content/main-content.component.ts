import { Component, OnInit } from '@angular/core';
import { InvoiceProduct } from '../../models/InvoiceProduct';
import { ActivatedRoute } from '@angular/router';
import { InvoiceProductService } from '../../services/invoice-product.service';
import { InvoiceProductPrameterService } from '../../services/invoice-product-prameter.service';
import { InvoiceService } from 'src/app/invoicemanager/services/invoice.service';
import { CustomerService } from 'src/app/customermanager/services/customer.service';
import { Customer } from 'src/app/customermanager/models/customer';
import { Invoice } from 'src/app/invoicemanager/models/invoice';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  invoiceProduct: InvoiceProduct;
  id: number;
  invoice: Invoice;
  invoiceId: number;
  customer: Customer;
  custId: number;

  constructor(private route: ActivatedRoute,
    private service: InvoiceProductService,
    private invoiceProductPrameterService: InvoiceProductPrameterService,
    private invoiceService: InvoiceService,
    private customerService: CustomerService) { }

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.id = (params['id']) || null;
        this.invoiceProduct = null;
  
        this.service.invoiceProducts.subscribe(invoiceProds => {
          if (invoiceProds.length == 0) return;
  
          setTimeout(() => {
            //from local storeget invoice
            this.invoiceProduct = this.service.invoiceProductById(this.id);
            this.invoiceProductPrameterService.detailedInvoiceProduct = this.invoiceProduct;
            //from local store get customer
            this.customer = this.customerService.customerById(this.invoice.associatedCustomerId);
           }, 500);
        });
      });
    }

}
