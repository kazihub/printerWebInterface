import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-text-field-editor',
  templateUrl: './text-field-editor.component.html',
  styleUrls: ['./text-field-editor.component.css']
})
export class TextFieldEditorComponent implements OnInit, OnDestroy, OnChanges {
  @Input() text: string;
  @Input() fontSize: string;
  @Input() fontWeight: string;
  @Input() fontStyle: string;
  @Input() underline = 'none';
  @Input() decorate = false;
  @Output() OnSubmit = new EventEmitter<any>();
  @Output() OnEditEnd = new EventEmitter<any>();

  weight = [
    'normal',
    'bold',
    'lighter'
  ];

  style = [
    'italic',
    'normal'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.OnSubmit.emit({
      text: this.text,
      fontSize: this.fontSize,
      fontWeight: this.fontWeight,
      fontStyle: this.fontStyle,
      underline: this.underline,
      decorate: this.decorate
    });
  }

  endEdit() {
    this.OnEditEnd.emit(true);
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.decorate.currentValue === false) {
      this.underline = 'none';
    } else {
      this.underline = 'underline';
    }
    this.OnSubmit.emit({
      text: this.text,
      fontSize: this.fontSize,
      fontWeight: this.fontWeight,
      fontStyle: this.fontStyle,
      underline: this.underline,
      decorate: this.decorate
    });
  }
}
