import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoiltCardsComponent } from './spoilt-cards.component';

describe('SpoiltCardsComponent', () => {
  let component: SpoiltCardsComponent;
  let fixture: ComponentFixture<SpoiltCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpoiltCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpoiltCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
