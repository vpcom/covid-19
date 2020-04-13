import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesDeathsComponent } from './cases-deaths.component';

describe('CasesDeathsComponent', () => {
  let component: CasesDeathsComponent;
  let fixture: ComponentFixture<CasesDeathsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesDeathsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesDeathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
