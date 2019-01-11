import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomermanagerAppComponent } from './customermanager-app.component';

describe('CustomermanagerAppComponent', () => {
  let component: CustomermanagerAppComponent;
  let fixture: ComponentFixture<CustomermanagerAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomermanagerAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomermanagerAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
