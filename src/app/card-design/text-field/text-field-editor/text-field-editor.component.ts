import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {DbService} from '../../../db-mapper/db.service';
import {NotifyService} from '../../../notify.service';

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
  @Input() tablename: any;
  @Input() positionX: any;
  @Input() positionY: any;
  @Input() selectedFieldnames: any[];
  @Input() mappedColumnName: string;
  @Input() hasmapping = false;
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

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    this.getQuery();
  }

  close() {
    this.OnSubmit.emit({
      text: this.text,
      fontSize: this.fontSize,
      fontWeight: this.fontWeight,
      fontStyle: this.fontStyle,
      underline: this.underline,
      decorate: this.decorate,
      positionX: this.positionX,
      positionY: this.positionY,
      mappedColumnName: this.mappedColumnName,
      hasmapping: this.hasmapping
    });
  }

  endEdit() {
    this.OnEditEnd.emit(true);
  }

  getQuery() {
    this.dbService.getOnlyFields().subscribe(
      result => {
        if (result.result === 100) {
          this.selectedFieldnames = [];
          this.selectedFieldnames = result.data.map(u => u.columnName);
        } else {
        }
      },
      error => {
      }
    );
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
      decorate: this.decorate,
      positionX: this.positionX,
      positionY: this.positionY,
      mappedColumnName: this.mappedColumnName,
      hasmapping: this.hasmapping
    });
  }
}