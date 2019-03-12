import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InvoiceProductmanagerAppComponent } from './invoice-productmanager-app.component';
import { ToolbarComponent } from './../invoice-productmanager/component/toolbar/toolbar.component';
import { MainContentComponent } from './../invoice-productmanager/component/main-content/main-content.component';
import { SidenavComponent } from './../invoice-productmanager/component/sidenav/sidenav.component';

import { RouterModule, Routes } from '@angular/router';
import { InvoiceProductService } from './services/invoice-product.service';
import { InvoiceProductPrameterService } from './services/invoice-product-prameter.service';

const routes: Routes = [
  {
    path: '', component: InvoiceProductmanagerAppComponent,
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
    InvoiceProductService,
    InvoiceProductPrameterService,
  ],
  declarations: [
    InvoiceProductmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
  ]
})
export class InvoiceProductmanagerModule { }
