import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySummaryPrintCountComponent } from './daily-summary-print-count.component';

describe('DailySummaryPrintCountComponent', () => {
  let component: DailySummaryPrintCountComponent;
  let fixture: ComponentFixture<DailySummaryPrintCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySummaryPrintCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySummaryPrintCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
