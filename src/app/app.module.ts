import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModule } from './core/core.module';
import { BackComponent } from './back/back.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'contactmanager', loadChildren: './contactmanager/contactmanager.module#ContactmanagerModule' },
  { path: 'customermanager', loadChildren: './customermanager/customermanager.module#CustomermanagerModule' },
  { path: 'invoicemanager', loadChildren: './invoicemanager/invoicemanager.module#InvoicemanagerModule' }, 
  { path: 'invoiceproductmanager', loadChildren: './invoice-productmanager/invoice-productmanager.module#InvoiceProductmanagerModule' },
  { path: 'productmanager', loadChildren: './productmanager/productmanager.module#ProductmanagerModule' },
  { path: 'demo', loadChildren: './demo/demo.module#DemoModule' },
  { path: '**', redirectTo: '' },
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BackComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
