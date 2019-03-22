import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/invoicemanager/models/invoice';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/invoicemanager/services/invoice.service';
import { InvoiceParameterService } from '../../services/invoice-parameter.service';
 
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  invoice: Invoice;

  constructor(private route: ActivatedRoute,
    private service: InvoiceService,
    private customerParameterService: InvoiceParameterService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) id = 11;
      this.invoice = null;;

      this.service.invoices.subscribe(invoices => {
        if (invoices.length == 0) return;

        setTimeout(() => {
          this.invoice = this.service.invoiceById(id);
          this.customerParameterService.detailedInvoice = this.invoice;
        }, 500);
      });
    });
  }
}

