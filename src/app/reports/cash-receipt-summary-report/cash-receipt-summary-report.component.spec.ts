import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashReceiptSummaryReportComponent } from './cash-receipt-summary-report.component';

describe('CashReceiptSummaryReportComponent', () => {
  let component: CashReceiptSummaryReportComponent;
  let fixture: ComponentFixture<CashReceiptSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashReceiptSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashReceiptSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
