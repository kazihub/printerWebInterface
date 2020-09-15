import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalRulerComponent } from './horizontal-ruler.component';

describe('HorizontalRulerComponent', () => {
  let component: HorizontalRulerComponent;
  let fixture: ComponentFixture<HorizontalRulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalRulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalRulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
