import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductmanagerAppComponent } from './productmanager-app.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { MainContentComponent } from './component/main-content/main-content.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';

import { RouterModule, Routes } from '@angular/router';
import { ProductService } from './services/product.service';
import { ProductPrameterService } from './services/product-prameter.service';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '', component: ProductmanagerAppComponent,
    children: [
      { path: ':id', component: MainContentComponent },
      { path: '', component: MainContentComponent }
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    SidenavComponent,
    ProductmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
  ],
  providers: [
    ProductService,
    ProductPrameterService,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class ProductmanagerModule { }
