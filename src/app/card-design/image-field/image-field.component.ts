import {AfterViewInit, Component, ComponentRef, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ResizeEvent} from 'angular-resizable-element';
import {AppService} from '../../app.service';
import {CdkDragEnd} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-image-field',
  templateUrl: './image-field.component.html',
  styleUrls: ['./image-field.component.css']
})
export class ImageFieldComponent implements OnInit, AfterViewInit {
  @Input() src = 'assets/images/photo.svg';
  @Input() width = '100px';
  @Input() height = '100px';
  @Input() posX: any;
  @Input() posY: any;
  @Input() hasPos = false;
  @Input() id = this.appService.uuidv4();
  @Input() componentRef: ComponentRef<any>;
  @Output() elementSelected = new EventEmitter<any>();
  @Output() Destroy = new EventEmitter<any>();
  @Output() XYPosition = new EventEmitter<any>();

  constructor(private appService: AppService) { }
  @ViewChild('image') element: ElementRef;

  ngOnInit(): void {
  }

  onResizeEnd(event: ResizeEvent): void {
    const size = event.rectangle;
    this.width = `${size.width}px`;
    this.height = `${size.height}px`;
  }

  move() {
    this.elementSelected.emit({id: this.id, ref: this.componentRef});
  }

  destroy() {
    this.componentRef.destroy();
    this.Destroy.emit(true);
  }

  dragComplete(event: CdkDragEnd){
    this.XYPosition.emit(event.source.getFreeDragPosition());
  }

  ngAfterViewInit(): void {
    if (this.hasPos) {
      this.element.nativeElement.style.left = `${this.posX}px`;
      this.element.nativeElement.style.top = `${this.posY}px`;
    }
    console.log(this.element.nativeElement.style.left, this.element.nativeElement.style.top);
  }
}
