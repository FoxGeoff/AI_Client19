# AI_client19 (from angularmaterial)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## REF Project: PS Angular Material

# Project Work Log

## Ref: https://klarsys.github.io/angular-material-icons/

## Check: Install Angular Material

* Run: ```npm install --save @angular/material @angular/cdk```
* Run: ``` npm install --save @angular/animations```
* Add: to app.module.ts
```
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
...
...
 imports: [
    BrowserModule,
    BrowserAnimationsModule,
  ],
```
* Add material components as required:
```
import {MatButtonModule, MatCheckboxModule} from  '@angular/material';
...
   MatButtonModule,
    MatCheckboxModule,
  ],
```

## Check: Improved Angular Material Code handling
* Run: ```ng g m shared/material --dry-run --flat```
* update material.module
```
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from  '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
  ]
})
export class MaterialModule { }
```
* update app.module:
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
* Most components require a theme:
```@import "~@angular/material/prebuilt-themes/indigo-pink.css";```
* check run: add button ```<button mat-button>Click me!</button>```

## Check: Add Gesture support
* Run: ```npm install --save hammerjs```
* update "main.ts ```import 'hammerjs;' ```

## Check: Add material icons
* in index.html 
```<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">```
* Add to material.module ``` MatIconModule ... imports: MatIconModule ...exports: MatIconModule ```
* Run server to check
* Ref.: https://material.angular.io/guides
* Ref.: https://material.angular.io

## Check: Add full list of components to material.module

## Check: Add FormsModule
* ```import { FormsModule } from '@angular/forms';```

## Check: Add SCSS
* via angular.json
```
"projects:{
    "schematics": {
        "@schematics/angular:component": {
            "styleext": "scss"
        }
    }
}
```
# Module # :Layout -lazyload button
* Run: ``` ng g m demo/demo --flat --routing --dry-run ```
* Run: ```ng g c demo/buttons --dry-run ```
* Code: buttons.component (remove html from app.compoment and move to button.component)
* use <router-outlet></router-outlet> (app.component)
* Update: app.module move the material components to demo.module
* Add: routes to demo-routing.module
* Now test run check

# Module # layout - Flexbox
* Run ```ng g c demo/flexbox ```
* Add to demo-routing.module ```{ path: 'flex', coponent:'flexboxComponent } ```
* Run ```npm install --save @angular/flex-layout```
* Add: (in demo module)
```
import { FlexLayoutModule } from '@angular/flex-layout'; 
...
  FlexLayoutModule 
``` 
* Add html for flexbox component
```
<div class="flex-container">
  <div class="flex-item">1</div>
  <div class="flex-item">2</div>
  <div class="flex-item">3</div>
  <div class="flex-item">4</div>
  <div class="flex-item">5</div>
  <div class="flex-item">6</div>
</div>
```
* Add css
```
.flex-container{
    display: flex;
   /* flex-flow: row wrap; */
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: space-around;
}

@media all and (max-width:800px){
    .flex-container{
        justify-content: flex-start;
    }
}

.flex-item{
    width: 200px;
    height: 150px;
    background: tomato;
    color: white;
    font-weight: bold;
    font-size: 3em;
    text-align: center;
    line-height: 150px;
    margin-top: 5px;
}
```
* Additional ```<div class="flex-container" fxLayout.xs="columns"> ```

## Contact Manager Layout

# Check: Add Contact Manager layout components with their module

* Add (folder: contactmanger): contactmanager.module, contactmanager.component,toolbar.component, sidenav component
* Run: ```ng g m contactmanager```
* Run ``` ng g c contactmanager/contactmanager-app --flat --module contactmanager  --dry-run```
* Run: ```ng g c contactmanager/components/toolbar --dry-run ```
* Run: ```ng g c contactmanager/components/main-content```
* Run:``` ng g c contactmanager/components/sidenav```

# Check: Add to app.module lazyloading of contactmanager module.
```
const routes: Routes = [
  { path: 'demo', loadChildren: './demo/demo.module#DemoModule'},
  { path: 'contactmanager', loadChildren: './contactmanager/contactmanager.module#ContactmanagerModule'},
  { path: '**', redirectTo: 'contactmanager'},
]
```
# Check: add default path to Contactmanager Module

* Routes:
```
...
import { MaterialModule } from './../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
...
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModle.for(child),
  ],

```
## Check Fix ERROR: Run: to update to version 7.x.x
* Run:
```
npm uninstall -g angular-cli
npm cache clean or npm cache verify (if npm > 5)
npm install -g @angular/cli@latest
```
* Run on local project:
```
rm -rf node_modules ( just delete node_modules floder)
npm uninstall --save-dev angular-cli
npm install --save-dev @angular/cli@latest
npm install
ng update @angular/cli @angular/core --save
```

## Check: Configure Sidenav
* code (angular mataerial example):
```
<mat-drawer-container class="example-container">
  <mat-drawer mode="over" #sidenav  >Drawer content</mat-drawer>
  <mat-drawer-content> 
    <app-toolbar></app-toolbar>
    <router-outlet></router-outlet>
    <button type="button" mat-button (click) = "sidenav.toggle()">toggle</button>
  </mat-drawer-content>
</mat-drawer-container>
```
* CSS:
```
.example-container {
    width: 400px;
    height: 200px;
    margin: 10px;
    border: 1px solid #555;
  }
```

## Check: Add sidenav content

* Add toolbar to sidebar
* Add list to sidebar
* HOW TO DETECT BREAKPOINTS https://alligator.io/angular/breakpoints-angular-cdk/

## Check: Create a toggle button on the tool bar
*  Add CSS to show/hide button
```
.sidenav-toggle {
    display: none;  
}
@media (max-width: 500px) {
    .sidenav-toggle{
        display: flex;
    }   
}
```
* Add a Matrial Card
All working ready for next steps

## Check Add user service (http data reader)
* Data url: https://angular-material-api.azurewebsites.net/users
* Run: ``` ng g s contactmanager/services/user --dry-run ```
* "provide" this service" in the contactmanger.module
```
 providers: [
    UserService,
  ],
```
* model the data structure:
* Run: ```ng g class contactmanager/models/note--dry-run ```
* Run: ```ng g class contactmanager/models/user --dry-run ```
* Add httpClient:
* Add to module: HttpClientModule
* Code user service
* expose data with component sidenav to get user list

## Check: display user names in sideNav component
* check on the Material website the list component
* Change out to the Navigation List Component

## Check: display user avatar
* Register with MatIconRegistry (allows SVG Icons to be assoiated with svg urls)
* add SVG icons to the assets file: https://github.com/ajtowf/angularmaterial/
* source: assets/avatars.svg
* One time load MatIconRegistry and DomSanitizer
```
//contactmanager-app-compontent
...
constructor( iconRegisty: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegisty.addSvgIconSet(
      sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg')
    );
   }
```

## Check: Add routing to each user

## Check: Add details on a mat-card

## Check: Fix loading icon display

## Check: On smallscreen close the sidebar after user select

## Check: Introducing Tabs
* Add to main-container component

# Using Data Tables

## Check: Add Mat Data Table
* Run: ``` ng g c contactmanager\components\notes --dry-run ```
* From docs copy/paste html and css

## Check: Add Mat Pagination
* From Docs (check code on live demo too)

## Check: Add Mat Filtering

## Check: Add Mat Header Sorting

# Module # Dialogs and Popups

## Check: Add a basic dialog
* Add button to toolbar to open dailog
* Add dailog
* Add to module: ```entryComponents:[NewContactDialogComponent,]```
* Add dialogRef and form
## Check: Customize the form

## Check: Add Form Validation
* NOTE:
```
    It looks like you're using ngModel on the same form field as formControl. 
    Support for using the ngModel input property and ngModelChange event with 
    reactive form directives has been deprecated in Angular v6 and will be removed 
    in Angular v7.
    
    For more information on this, see our API docs here:
    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel
```    
## Check: Add Datepicker

## Check: Save Contact
* Code: new-contact-dialog.component
***
#    AI_Client Project - Work Log

## Check: Add Customer Manager layout components with their module

## Check:  Add to app.module lazyloading of contactmanager module.

## NOTE: To get <mat-icon> https://material.io/tools/icons/?style=baseline

## Check: Configure Sidenav 'slide draw'

## Check: Configure Sidenav 'toolbar'

## Check: Add customer name data list

* Ref. project: C:\Users\geoff\GitHub\booktracker_ver1 
* (https://github.com/FoxGeoff/booktracker/tree/370b5c3b894a2c60cd0b5099171bdfcd1d40a8cc)

## Check: Add httpclient under folder app/core

## Check: Add api read all customers

## Check: Add ReplaceLineBreaks pipe (better way: Add: notes to <mat-form-field> for multi line display)

* Ref: https://stackoverflow.com/questions/41563283/how-to-replace-string-in-angular-2#41564496
```
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'replaceLineBreaks'})
export class ReplaceLineBreaks implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\n/g, '<br/>');
  }
}
```
## Check: Add 'new customer' dialog component

* Note: in module we add:
```
entryComponents:[NewCustomerDialogComponent,]
```

## Check: Add 'new customer' to database

* TBD refactor to Observerables from Promise

## Check: Delete 'customer' from database

* delete local and datbase copies
* Ref. ```detailedCustomerId: number;``` property bag
* Code:
```
export class CustomerParameterService {
  detailedCustomerId: number;

  constructor() { }
}
```


 