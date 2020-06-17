import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeEditorComponent } from './barcode-editor.component';

describe('BarcodeEditorComponent', () => {
  let component: BarcodeEditorComponent;
  let fixture: ComponentFixture<BarcodeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
