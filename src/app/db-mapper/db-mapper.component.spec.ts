import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbMapperComponent } from './db-mapper.component';

describe('DbMapperComponent', () => {
  let component: DbMapperComponent;
  let fixture: ComponentFixture<DbMapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbMapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
