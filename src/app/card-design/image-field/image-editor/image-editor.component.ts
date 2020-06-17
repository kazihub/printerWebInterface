import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

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
  @Output() OnSubmit = new EventEmitter<any>();
  @Output() OnEditEnd = new EventEmitter<any>();
  constructor(public  sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  close() {
    this.OnSubmit.emit({
      src: this.src,
      width: this.width,
      height: this.height
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

}
