import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { CustomerService } from './services/customer.service';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CustomermanagerAppComponent } from './customermanager-app.component';
import { NewCustomerDialogComponent } from './components/new-customer-dialog/new-customer-dialog.component';
import { DeleteCustomerDialogComponent } from './components/delete-customer-dialog/delete-customer-dialog.component';
import { CustomerParameterService } from './services/customer-parameter.service';
import { EditCustomerDialogComponent } from './components/edit-customer-dialog/edit-customer-dialog.component';
import { InvoicesComponent } from './components/invoices/invoices.component';

const routes: Routes = [
  {
    path: '', component: CustomermanagerAppComponent,
    children: [
      { path: ':id', component: MainContentComponent },
      { path: '', component: MainContentComponent }
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    CustomerService,
    CustomerParameterService,
  ],
  declarations: [
    CustomermanagerAppComponent, 
    ToolbarComponent, 
    MainContentComponent, 
    SidenavComponent, 
    NewCustomerDialogComponent, 
    DeleteCustomerDialogComponent, 
    EditCustomerDialogComponent, InvoicesComponent,
  ],
  entryComponents: [
    NewCustomerDialogComponent, 
    DeleteCustomerDialogComponent, 
    EditCustomerDialogComponent,
  ]
})
export class CustomermanagerModule { }
