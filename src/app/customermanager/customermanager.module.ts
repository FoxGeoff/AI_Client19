import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidnavComponent } from './components/sidnav/sidnav.component';
import { CustomermanagerAppComponent } from './customermanager-app.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../contactmanager/services/user.service';

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
    UserService,
  ],
  declarations: [CustomermanagerAppComponent, ToolbarComponent, MainContentComponent, SidnavComponent, CustomermanagerAppComponent],
})
export class CustomermanagerModule { }
