import {AfterViewInit, Component, ComponentRef, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ResizeEvent} from 'angular-resizable-element';
import {AppService} from '../../app.service';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
declare var $: any;
import * as moment from 'moment';
import {BaseService} from '../../utilities/base.service';


@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit, AfterViewInit {

  @Input() text: string;
  @Input() fontSize = 20;
  @Input() fontWeight = 'normal';
  @Input() fontStyle = 'normal';
  @Input() width = 'auto';
  @Input() height = 'auto';
  @Input() underline = 'none';
  @Input() decorate = false;
  @Input() mappedColumnName: any[];
  @Input() hasmapping = false;
  @Input() posX: number;
  @Input() posY: number;
  @Input() hasPos = false;
  @Input() mappinType: any;
  @Input() useAsInput = false;
  @Input() inputName: any;
  element: any;
  @Input() id = this.appService.uuidv4();
  @Output() elementSelected = new EventEmitter<any>();
  @Input() componentRef: ComponentRef<any>;
  @Output() formatChange = new EventEmitter<any>();
  @Output() Destroy = new EventEmitter<any>();
  @Output() XYPosition = new EventEmitter<any>();
  offset = { x: 0, y: 0 };

  constructor(private appService: AppService,
              private baseService: BaseService) { }

  ngOnInit(): void {
  }

  move() {
    this.elementSelected.emit({id: this.id, ref: this.componentRef});
  }

  setText() {
    const ele = document.getElementById(this.id);
    this.text = ele.innerText;
  }

  formateDate() {
    // console.log(this.text.substring(0, 9), 'text check');
    const date = moment(this.text).format(this.baseService.getPermission().dateFormat);
    if (date) {
      // console.log('true');
      return moment(this.text).format(this.baseService.getPermission().dateFormat);
    } else {
      // console.log('false');
      return moment().format(this.baseService.getPermission().dateFormat).toString();
    }
  }

  onResizeEnd(event: ResizeEvent): void {
    const size = event.rectangle;
    this.width = `${size.width}px`;
    this.height = `${size.height}px`;
  }

  public setItalic() {
    if (this.fontStyle === 'normal') {
      this.fontStyle = 'italic';
    } else {
      this.fontStyle = 'normal';
    }
    this.formatChange.emit({
      fontSize: this.fontSize,
      fontWeight: this.fontWeight,
      fontStyle: this.fontStyle,
      underline: this.underline,
      decorate: this.decorate,
      mappedColumnName: this.mappedColumnName,
      hasmapping: this.hasmapping,
      useAsInput: this.useAsInput,
      inputName: this.inputName
    });
  }

  public setBold() {
    if (this.fontWeight === 'bold') {
      this.fontWeight = 'normal';
    } else {
      this.fontWeight = 'bold';
    }
    this.formatChange.emit(
      {
        fontSize: this.fontSize,
        fontWeight: this.fontWeight,
        fontStyle: this.fontStyle,
        underline: this.underline,
        decorate: this.decorate,
        posY: this.posY,
        posX: this.posX,
        mappedColumnName: this.mappedColumnName,
        hasmapping: this.hasmapping,
        useAsInput: this.useAsInput,
        inputName: this.inputName
      });
  }

  public setUnderline() {
    if (this.underline === 'none') {
      this.decorate = true;
      this.underline = 'underline';
    } else {
      this.decorate = false;
      this.underline = 'none';
    }
    this.formatChange.emit({
      fontSize: this.fontSize,
      fontWeight: this.fontWeight,
      fontStyle: this.fontStyle,
      underline: this.underline,
      decorate: this.decorate,
      posY: this.posY,
      posX: this.posX,
      mappedColumnName: this.mappedColumnName,
      hasmapping: this.hasmapping,
      useAsInput: this.useAsInput,
      inputName: this.inputName
    });
  }

  destroy() {
    this.componentRef.destroy();
    this.Destroy.emit(true);
  }

  dragComplete(event: CdkDragEnd){
    // console.log(this.posX, event.source.getFreeDragPosition(), event.distance);
    this.XYPosition.emit(event.source.getFreeDragPosition());
  }

  ngAfterViewInit(): void {
    const ele = document.getElementById(this.id);
    if (this.hasPos) {
      ele.style.left = `${this.posX}px`;
      ele.style.top = `${this.posY}px`;
      // console.log(this.posX, this.posY);
    }
    // console.log(ele.style.left, ele.style.top, this.hasPos);
  }

  public setPosition(u) {
    // console.log(u);
    this.posX = u.x;
    this.posY = u.y;
  }
}
