import {AfterViewInit, Component, ComponentRef, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AppService} from '../../app.service';
import {ResizeEvent} from 'angular-resizable-element';
import {CdkDragEnd} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-barcode-field',
  templateUrl: './barcode-field.component.html',
  styleUrls: ['./barcode-field.component.css']
})
export class BarcodeFieldComponent implements OnInit, AfterViewInit {
  @Input() text: any;
  @Input() width = 2;
  @Input() height = 30;
  @Input() posX: any;
  @Input() posY: any;
  @Input() hasPos = false;
  @Input() id = this.appService.uuidv4();
  @Input() componentRef: ComponentRef<any>;
  @Output() elementSelected = new EventEmitter<any>();
  @Output() Destroy = new EventEmitter<any>();
  @Output() XYPosition = new EventEmitter<any>();
  @Input() useAsInput = false;
  @Input() inputName: any;
  offset = { x: 0, y: 0 };

  constructor(private appService: AppService) { }
  @ViewChild('bc') element: ElementRef;
  ngOnInit(): void {
  }

  move() {
    this.elementSelected.emit({id: this.id, ref: this.componentRef});
  }

  onResizeEnd(event: ResizeEvent): void {
    const size = event.rectangle;
    this.width = size.width;
    this.height = size.height;
  }

  destroy() {
    this.componentRef.destroy();
    this.Destroy.emit(true);
  }

  dragComplete(event: CdkDragEnd){
    this.XYPosition.emit(event.source.getFreeDragPosition());
  }

  ngAfterViewInit(): void {
    const ele = document.getElementById(this.id);
    if (this.hasPos) {
      ele.style.left = `${this.posX}px`;
      ele.style.top = `${this.posY}px`;
      console.log(this.posX, this.posY);
    }
  }

  public setPosition(u) {
    // console.log(u);
    this.posX = u.x;
    this.posY = u.y;
  }
}
