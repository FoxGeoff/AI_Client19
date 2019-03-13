import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { ProductmanagerAppComponent } from './productmanager-app.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { MainContentComponent } from './component/main-content/main-content.component';
 
@NgModule({
  declarations: [
    SidenavComponent,
    ProductmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
  ],
  imports: [
    CommonModule,
  ]
 })
export class ProductmanagerModule { }
