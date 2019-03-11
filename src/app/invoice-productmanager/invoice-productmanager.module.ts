import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceProductmanagerAppComponent } from './invoice-productmanager-app.component';
import { SidenavComponent } from  './../invoice-productmanager/component/sidenav/sidenav.component';
import { ToolbarComponent } from  './../invoice-productmanager/component/toolbar/toolbar.component';

@NgModule({
  declarations: [InvoiceProductmanagerAppComponent, SidenavComponent, ToolbarComponent],
  imports: [
    CommonModule
  ]
})
export class InvoiceProductmanagerModule { }
