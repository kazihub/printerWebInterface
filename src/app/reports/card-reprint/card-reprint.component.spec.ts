import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReprintComponent } from './card-reprint.component';

describe('CardReprintComponent', () => {
  let component: CardReprintComponent;
  let fixture: ComponentFixture<CardReprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardReprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardReprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
