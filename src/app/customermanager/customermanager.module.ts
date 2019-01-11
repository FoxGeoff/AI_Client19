import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAppComponent } from './customer-app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidnavComponent } from './components/sidnav/sidnav.component';

@NgModule({
  declarations: [CustomerAppComponent, ToolbarComponent, MainContentComponent, SidnavComponent],
  imports: [
    CommonModule
  ]
})
export class CustomermanagerModule { }
