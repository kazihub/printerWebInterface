import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDetailPrintCountComponent } from './daily-detail-print-count.component';

describe('DailyDetailPrintCountComponent', () => {
  let component: DailyDetailPrintCountComponent;
  let fixture: ComponentFixture<DailyDetailPrintCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyDetailPrintCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyDetailPrintCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
