import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprintRequestComponent } from './reprint-request.component';

describe('ReprintRequestComponent', () => {
  let component: ReprintRequestComponent;
  let fixture: ComponentFixture<ReprintRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReprintRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprintRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
