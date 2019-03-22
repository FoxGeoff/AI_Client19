import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/invoicemanager/models/invoice';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/invoicemanager/services/invoice.service';
import { InvoiceParameterService } from '../../services/invoice-parameter.service';
import { isNull } from 'util';
import { NullViewportScroller } from '@angular/common/src/viewport_scroller';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  invoice: Invoice;
  id: number;

  constructor(private route: ActivatedRoute,
    private service: InvoiceService,
    private invoiceParameterService: InvoiceParameterService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = (params['id']) || null;
      this.invoice = null;

      this.service.invoices.subscribe(invoices => {
        if (invoices.length == 0) return;
    
        setTimeout(() => {
          console.log(this.id);
          this.invoice = this.service.invoiceById(this.id);
          this.invoiceParameterService.detailedInvoice = this.invoice;
        }, 500);
      });
    });
  }
}

