import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contactmanager-app',
  templateUrl: './contactmanager-app.component.html',
  styleUrls: ['./contactmanager-app.component.css']
})
export class ContactmanagerAppComponent implements OnInit {

  constructor( iconRegisty: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegisty.addSvgIconSet(
      sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg')
    );
   }

  ngOnInit() {
  }

}
