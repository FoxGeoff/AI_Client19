import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { InvoiceParameterService } from 'src/app/invoicemanager/services/invoice-parameter.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  product: Product;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private productParameterService: InvoiceParameterService) { }

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.id = (params['id']) || null;
        this.product = null;
  
        this.service.products.subscribe(invoices => {
          if (invoices.length == 0) return;
  
          setTimeout(() => {
            //from local store get invoice
            this.product = this.service.productById(this.id);
            //this.productParameterService.detailedInvoice = this.product;
            }, 500);
        });
      });
    }

}
