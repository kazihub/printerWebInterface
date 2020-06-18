import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {DbService} from '../../../db-mapper/db.service';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css']
})
export class ImageEditorComponent implements OnInit {
  @Input() src: any;
  @Input() width: any;
  @Input() height: any;
  default = 'assets/images/photo.svg';
  @Input() mappedColumn: string;
  @Input() positionX: any;
  @Input() positionY: any;
  @Input() mappedColumnName: string;
  @Input() hasmapping = false;
  @Input() selectedFieldnames: any[];
  @Output() OnSubmit = new EventEmitter<any>();
  @Output() OnEditEnd = new EventEmitter<any>();
  constructor(public  sanitizer: DomSanitizer,
              private  dbService: DbService) { }

  ngOnInit(): void {
    this.getQuery();
  }

  close() {
    this.OnSubmit.emit({
      positionX: this.positionX,
      positionY: this.positionY,
      src: this.src,
      width: this.width,
      height: this.height,
      mappedColumnName: this.mappedColumnName,
      hasmapping: this.hasmapping
    });
  }

  endEdit() {
    this.OnEditEnd.emit(true);
  }

  sanitize(img): any {
    if (img) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(img);
    } else {
      return null;
    }
  }

  onFileChange(file): void {
    if (file.target.files && file.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.src = event.target.result;
      };
      reader.readAsDataURL(file.target.files[0]);
    } else {
      this.src = this.default;
    }
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

}
