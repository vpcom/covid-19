import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCountryDialogComponent } from './select-country-dialog.component';

describe('SelectCountryDialogComponent', () => {
  let component: SelectCountryDialogComponent;
  let fixture: ComponentFixture<SelectCountryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCountryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCountryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
