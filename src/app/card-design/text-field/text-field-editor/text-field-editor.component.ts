import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {DbService} from '../../../db-mapper/db.service';

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
  @Input() mappinType: any;
  @Input() positionY: any;
  @Input() selectedFieldnames: any[];
  @Input() mappedColumnName: any[];
  @Input() hasmapping = false;
  @Input() useAsInput = false;
  @Input() inputName: any;
  options = [
    'DATE',
    'TEXT'
  ];
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
      mappinType: this.mappinType,
      mappedColumnName: JSON.stringify(this.mappedColumnName),
      hasmapping: this.hasmapping,
      useAsInput: this.useAsInput,
      inputName: this.inputName
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
      mappinType: this.mappinType,
      mappedColumnName: JSON.stringify(this.mappedColumnName),
      hasmapping: this.hasmapping,
      useAsInput: this.useAsInput,
      inputName: this.inputName
    });
  }
}
