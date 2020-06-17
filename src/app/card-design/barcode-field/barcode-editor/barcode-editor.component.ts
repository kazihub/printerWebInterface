import {Component, ComponentRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DbService} from '../../../db-mapper/db.service';

@Component({
  selector: 'app-barcode-editor',
  templateUrl: './barcode-editor.component.html',
  styleUrls: ['./barcode-editor.component.css']
})
export class BarcodeEditorComponent implements OnInit {
  @Input() text: any;
  @Input() width = 2;
  @Input() height = 30;
  background = '#ffffff';
  @Input() positionX: any;
  @Input() positionY: any;
  @Input() hasPos = false;
  @Input() hasmapping = false;
  @Input() mappedColumnName: any;
  @Input() selectedFieldnames: any[];
  @Output() OnSubmit = new EventEmitter<any>();
  @Output() OnEditEnd = new EventEmitter<any>();
  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    this.getQuery();
  }

  close() {
    this.OnSubmit.emit({
      text: this.text,
      positionX: this.positionX,
      positionY: this.positionY,
      width: this.width,
      height: this.height,
      mappedColumnName: this.mappedColumnName,
      hasmapping: this.hasmapping
    });
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

  endEdit() {
    this.OnEditEnd.emit(true);
  }
}
