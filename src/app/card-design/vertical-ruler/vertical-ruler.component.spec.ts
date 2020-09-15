import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalRulerComponent } from './vertical-ruler.component';

describe('VerticalRulerComponent', () => {
  let component: VerticalRulerComponent;
  let fixture: ComponentFixture<VerticalRulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalRulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalRulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
