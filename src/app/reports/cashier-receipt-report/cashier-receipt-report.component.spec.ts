import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierReceiptReportComponent } from './cashier-receipt-report.component';

describe('CashierReceiptReportComponent', () => {
  let component: CashierReceiptReportComponent;
  let fixture: ComponentFixture<CashierReceiptReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashierReceiptReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierReceiptReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
