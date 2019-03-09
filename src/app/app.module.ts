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


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'contactmanager', loadChildren: './contactmanager/contactmanager.module#ContactmanagerModule' },
  { path: 'customermanager', loadChildren: './customermanager/customermanager.module#CustomermanagerModule' },
  { path: 'invoicemanager', loadChildren: './invoicemanager/invoicemanager.module#InvoicemanagerModule' },
 // { path: 'invoiceproductsmanager', loadChildren: './invoiceproductsmanager/invoiceproductsmanager.module#InvoiceproductsmanagerModule' },
  { path: 'demo', loadChildren: './demo/demo.module#DemoModule' },
  { path: '**', redirectTo: '' },
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
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
