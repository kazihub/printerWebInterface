import {
  Component, OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory, ElementRef, AfterViewInit
} from '@angular/core';
import { TextFieldComponent } from './text-field/text-field.component';
import {TextFieldEditorComponent} from './text-field/text-field-editor/text-field-editor.component';
import {ImageFieldComponent} from './image-field/image-field.component';
import {ImageEditorComponent} from './image-field/image-editor/image-editor.component';
declare var $: any;
import htmlToImage from 'html-to-image';
import {DomSanitizer} from '@angular/platform-browser';
import {AppService} from '../app.service';
import {NotifyService} from '../notify.service';
import {BaseService} from '../utilities/base.service';
import {BarcodeFieldComponent} from './barcode-field/barcode-field.component';
import {BarcodeEditorComponent} from './barcode-field/barcode-editor/barcode-editor.component';
import {NewTemplateComponent} from './new-template/new-template.component';
import {NzModalService} from 'ng-zorro-antd';

export interface Components{
  ref?: ComponentRef<any>;
  meta?: Fields;
}


export interface Fields {
  src?: string;
  width?: string;
  height?: string;
  fontWeight?: string;
  fontSize?: string;
  fontStyle?: string;
  decorate?: boolean;
  underline?: string;
  text?: string;
  positionX?: any;
  positionY?: any;
  hasmapping?: boolean;
  mappedColumnName?: string;
  templateId?: string;
  type?: 'text' | 'image' | 'bg' | 'code';
}

@Component({
  selector: 'app-card-design',
  templateUrl: './card-design.component.html',
  styleUrls: ['./card-design.component.css']
})

export class CardDesignComponent implements OnInit, AfterViewInit {
  componentRef: ComponentRef<any>;
  setupRef: ComponentRef<any>;
  list: Array<Components> = [];
  selected: Array<any> = [];
  current: any;
  xposition = '0';
  yposition = '0';
  printimage: any;
  loading = false;
  edit = true;
  editIcon = 'edit';
  processing = false;
  bgimage: any = 'assets/images/photo.svg';
  currentRef: ComponentRef<any>;
  currentSetupRef: ComponentRef<any>;
  search: any;
  DataTable: any[];
  templates: any[];
  templatename: any;
  dataSource: Array<any> = [];
  mainControls = [
    {
      icon: 'folder',
      handle: (u) => u.click(),
      hasElement: true,
      disabled: false
    },
    {
      icon: 'font-size',
      handle: () => this.createTextField(),
      disabled: false,
      hasElement: false
    },
    {
      icon: 'file-image',
      handle: () => this.createImageBox(),
      disabled: false,
      hasElement: false
    },
    {
      icon: 'qrcode',
      handle: () => this.createCodeField(),
      disabled: false,
      hasElement: false
    },
    {
      icon: 'printer',
      handle: false,
      hasElement: false
    }
  ];

  textControls = [
    {
      icon: 'bold',
      hasIcon: true,
      handle: () => this.currentRef.instance.setBold(),
      disabled: true
    },
    {
      icon: 'italic',
      hasIcon: true,
      handle: () => this.currentRef.instance.setItalic(),
      disabled: true
    },
    {
      icon: 'underline',
      hasIcon: true,
      handle: () => this.currentRef.instance.setUnderline(),
      disabled: true
    },
    {
      icon: '',
      hasIcon: false,
      handle: () => {},
      text: this.xposition,
      disabled: false
    },
    {
      icon: '',
      hasIcon: false,
      handle: () => {},
      text: this.yposition,
      disabled: false
    },
    {
      icon: this.editIcon,
      hasIcon: true,
      handle: () => this.Editing(),
      disabled: false
    },
    {
      icon: 'save',
      hasIcon: true,
      handle: () => this.saveTemp(),
      disabled: false
    }
  ];

  @ViewChild('textcontainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild('setupcontainer', { read: ViewContainerRef }) setup: ViewContainerRef;
  constructor(private resolver: ComponentFactoryResolver,
              private notify: NotifyService,
              private baseService: BaseService,
              private appService: AppService,
              private modalService: NzModalService,
              private sanitizer: DomSanitizer) { }

  ngAfterViewInit(): void {
    this.getTemp();
    if (this.baseService.getUserRole() !== 'Administrator') {
      this.textControls.forEach(u => u.disabled = true);
      this.mainControls.forEach(u => u.disabled = true);
      this.disableEditing();
    }
  }

  ngOnInit(): void {
    $(document).keydown((e) => {
      if (this.selected.length > 0) {
        $('#' + this.selected[0].id).finish().clearQueue().stop();
      }
      this.selected = [];
      const data = 0;
      this.selected.push({id: this.current});
      if (e.which === 38) {
        $('#' + this.current).animate({
          top: '-=2'
        }).finish();
        // data = this.currentRef.instance.posY -= 2;
        // this.yposition = `y: ${data}`;
      }
      if (e.which === 40) {
        $('#' + this.current).animate({
          top: '+=2'
        }).finish();
        // data = this.currentRef.instance.posY += 2;
        // this.yposition = `y: ${data}`;
      }
      if (e.which === 37) {
        $('#' + this.current).animate({
          left: '-=2'
        }).finish();
        // data = this.currentRef.instance.posX -= 2;
        // this.xposition = `x: ${data}`;
      }
      if (e.which === 39) {
        $('#' + this.current).animate({
          left: '+=2'
        }).finish();
        // data = this.currentRef.instance.posX += 2;
        // this.xposition = `x: ${data}`;
      }
    });
  }

  createTextField(options?: Fields, hasPos?: boolean) {
    const factory = this.resolver.resolveComponentFactory(TextFieldComponent);
    this.componentRef = this.entry.createComponent(factory);

    this.componentRef.instance.componentRef = this.componentRef;
    this.componentRef.instance.elementSelected.subscribe(u => {
      this.current = u.id;
      this.currentRef = u.ref;
      console.log(this.current);
      const item = this.list.find(x => x.ref === this.currentRef);
      const ele = document.getElementById(this.current);
      this.textControls.forEach(x => x.disabled = false);
      this.OpenEditor(u.ref);
    });

    this.componentRef.instance.formatChange.subscribe(u => {
      this.currentSetupRef.instance.fontWeight = u.fontWeight;
      this.currentSetupRef.instance.fontStyle = u.fontStyle;
      this.currentSetupRef.instance.decorate = u.decorate;
      this.currentSetupRef.instance.underline = u.underline;

      const item = this.list.find(x => x.ref === this.currentRef);
      item.meta.fontWeight = u.fontWeight;
      item.meta.fontStyle = u.fontStyle;
      item.meta.decorate = u.decorate;
      item.meta.underline = u.underline;
      item.meta.text = u.text;
      item.meta.hasmapping = u.hasmapping;
      item.meta.mappedColumnName = u.mappedColumnName;
    });
    this.componentRef.instance.XYPosition.subscribe(u => {
      const item = this.list.find(x => x.ref === this.currentRef);
      const ele = document.getElementById(this.current);
      item.meta.positionX = parseFloat(item.meta.positionX) + parseFloat(u.x);
      item.meta.positionY = parseFloat(item.meta.positionY) + parseFloat(u.y);
      // item.meta.positionX = parseFloat(u.x);
      // item.meta.positionY = parseFloat(u.y);
      this.xposition = item.meta.positionX;
      this.yposition = item.meta.positionY;
    });
    this.componentRef.instance.Destroy.subscribe(u => {
      if (u === true) {
        this.list.splice(this.list.findIndex(c => c.ref === this.currentRef), 1);
        this.currentRef.destroy();
      }
    });
    if (options) {
      this.componentRef.instance.hasmapping = options.hasmapping;
      this.componentRef.instance.mappedColumnName = options.mappedColumnName;
      this.componentRef.instance.hasPos = hasPos;
      this.componentRef.instance.text = options.text;
      this.componentRef.instance.fontWeight = options.fontWeight;
      this.componentRef.instance.fontSize = options.fontSize;
      this.componentRef.instance.fontStyle = options.fontStyle;
      this.componentRef.instance.underline = options.underline;
      this.componentRef.instance.decorate = options.decorate;
      this.xposition = options.positionX;
      this.yposition = options.positionY;
      this.componentRef.instance.setPosition({x: options.positionX, y: options.positionY });
      this.list.push({
        ref: this.componentRef,
        meta: options
      });
    } else {
      this.componentRef.instance.text = 'Text Field';
      this.componentRef.instance.posX = 200;
      this.componentRef.instance.posY = 200;
      this.list.push({
        ref: this.componentRef,
        meta: {
          fontWeight: this.componentRef.instance.fontWeight,
          fontStyle: this.componentRef.instance.fontStyle,
          decorate: this.componentRef.instance.decorate,
          underline: this.componentRef.instance.underline,
          text: this.componentRef.instance.text,
          positionX: this.componentRef.instance.posX,
          positionY:  this.componentRef.instance.posY,
          hasmapping: this.componentRef.instance.hasmapping,
          mappedColumnName: this.componentRef.instance.mappedColumnName,
          type: 'text'
        }
      });
    }
  }

  createCodeField(options?: Fields, hasPos?: boolean) {
    const factory = this.resolver.resolveComponentFactory(BarcodeFieldComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.componentRef = this.componentRef;
    this.componentRef.instance.elementSelected.subscribe(u => {
      this.current = u.id;
      this.currentRef = u.ref;
      this.OpenCodeEditor(this.currentRef);
    });

    this.componentRef.instance.XYPosition.subscribe(u => {
      const item = this.list.find(x => x.ref === this.currentRef);
      const ele = document.getElementById(this.current);
      item.meta.positionX = parseFloat(item.meta.positionX) + parseFloat(u.x);
      item.meta.positionY = parseFloat(item.meta.positionY) + parseFloat(u.y);
      // item.meta.positionX = parseFloat(u.x);
      // item.meta.positionY = parseFloat(u.y);
      this.xposition = item.meta.positionX;
      this.yposition = item.meta.positionY;
    });
    this.componentRef.instance.Destroy.subscribe(u => {
      if (u === true) {
        this.list.splice(this.list.findIndex(c => c.ref === this.currentRef), 1);
        this.currentRef.destroy();
      }
    });
    if (options) {
      this.componentRef.instance.hasmapping = options.hasmapping;
      this.componentRef.instance.mappedColumnName = options.mappedColumnName;
      this.componentRef.instance.hasPos = hasPos;
      this.componentRef.instance.text = options.text;
      this.componentRef.instance.width = options.width;
      this.componentRef.instance.height = options.height;
      this.xposition = options.positionX;
      this.yposition = options.positionY;
      this.componentRef.instance.setPosition({x: options.positionX, y: options.positionY });
      this.list.push({
        ref: this.componentRef,
        meta: options
      });
    } else {
      this.componentRef.instance.posX = 200;
      this.componentRef.instance.posY = 200;
      this.componentRef.instance.text = '1234567890';
      this.list.push({
        ref: this.componentRef,
        meta: {
          text: this.componentRef.instance.text,
          positionX: this.componentRef.instance.posX,
          positionY:  this.componentRef.instance.posY,
          width: this.componentRef.instance.width,
          height: this.componentRef.instance.height,
          hasmapping: this.componentRef.instance.hasmapping,
          mappedColumnName: this.componentRef.instance.mappedColumnName,
          type: 'code'
        }
      });
    }
  }

  createImageBox(options?: Fields, hasPos?: boolean) {
    const factory = this.resolver.resolveComponentFactory(ImageFieldComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.componentRef = this.componentRef;
    this.componentRef.instance.hasPos = hasPos;
    if (hasPos) {
      this.componentRef.instance.posX = options.positionX;
      this.componentRef.instance.posY = options.positionY;
      this.componentRef.instance.src = options.src;
    }
    this.componentRef.instance.elementSelected.subscribe(u => {
      this.current = u.id;
      this.currentRef = u.ref;
      const item = this.list.find(x => x.ref === this.currentRef);
      const ele = document.getElementById(this.current);
      // this.xposition = this.getOffset(ele).left;
      // this.yposition = this.getOffset(ele).top;
      item.meta.positionX = this.xposition;
      item.meta.positionY = this.yposition;
      this.OpenImageEditor(u.ref);
    });
    this.componentRef.instance.Destroy.subscribe(u => {
      if (u === true) {
        this.list.splice(this.list.findIndex(c => c.ref === this.currentRef), 1);
        this.currentSetupRef.destroy();
      }
    });
    this.componentRef.instance.XYPosition.subscribe(u => {
      const item = this.list.find(x => x.ref === this.currentRef);
      const ele = document.getElementById(this.current);
      // this.xposition = this.getOffset(ele).left;
      // this.yposition = this.getOffset(ele).top;
      item.meta.positionX = this.xposition;
      item.meta.positionY = this.yposition;
    });
    if (options) {
      this.list.push({
        ref: this.componentRef,
        meta: options
      });
    } else {
      this.list.push({
        ref: this.componentRef,
        meta: {
          src: this.componentRef.instance.src,
          width: this.componentRef.instance.width,
          height: this.componentRef.instance.height,
          positionX: null,
          positionY:  null,
          type: 'image'
        }
      });
    }
  }

  OpenEditor(comp: ComponentRef<any>): void {
    if (this.currentSetupRef) {
      this.currentSetupRef.destroy();
    }
    const factory = this.resolver.resolveComponentFactory(TextFieldEditorComponent);
    this.setupRef = this.setup.createComponent(factory);
    this.setupRef.instance.text = comp.instance.text;
    this.setupRef.instance.fontSize = comp.instance.fontSize;
    this.setupRef.instance.fontWeight = comp.instance.fontWeight;
    this.setupRef.instance.fontStyle = comp.instance.fontStyle;
    this.setupRef.instance.underline = comp.instance.underline;
    this.setupRef.instance.decorate = comp.instance.decorate;
    this.setupRef.instance.hasmapping = comp.instance.hasmapping;
    this.setupRef.instance.mappedColumnName = comp.instance.mappedColumnName;
    this.setupRef.instance.OnSubmit.subscribe(u => {
      console.log(u);
      comp.instance.text = u.text;
      comp.instance.fontSize = u.fontSize;
      comp.instance.fontWeight = u.fontWeight;
      comp.instance.fontStyle = u.fontStyle;
      comp.instance.decorate = u.decorate;
      comp.instance.underline = u.underline;
      comp.instance.hasmapping = u.hasmapping;
      comp.instance.mappedColumnName = u.mappedColumnName;
      const item = this.list.find(x => x.ref === this.currentRef);
      item.meta.fontWeight = u.fontWeight;
      item.meta.fontStyle = u.fontStyle;
      item.meta.decorate = u.decorate;
      item.meta.underline = u.underline;
      item.meta.text = u.text;
      item.meta.mappedColumnName = u.mappedColumnName;
      item.meta.hasmapping = u.hasmapping;
      this.notify.createMessage('info', 'Applied successfully');
    });
    this.setupRef.instance.OnEditEnd.subscribe(u => {
      if (u === true) {
        this.currentSetupRef.destroy();
        this.textControls.forEach(x => {
          if (x.icon !== 'save') {
            x.disabled = true;
          }
        });
        this.notify.createMessage('info', 'Editing ended');
      }
    });

    this.currentSetupRef = this.setupRef;
  }

  OpenCodeEditor(comp: ComponentRef<any>): void {
    if (this.currentSetupRef) {
      this.currentSetupRef.destroy();
    }
    const factory = this.resolver.resolveComponentFactory(BarcodeEditorComponent);
    this.setupRef = this.setup.createComponent(factory);
    this.setupRef.instance.text = comp.instance.text;
    this.setupRef.instance.width = comp.instance.width;
    this.setupRef.instance.height = comp.instance.height;
    this.setupRef.instance.hasmapping = comp.instance.hasmapping;
    this.setupRef.instance.mappedColumnName = comp.instance.mappedColumnName;
    this.setupRef.instance.OnSubmit.subscribe(u => {
      console.log(u);
      comp.instance.text = u.text;
      comp.instance.width = u.width;
      comp.instance.height = u.height;
      comp.instance.hasmapping = u.hasmapping;
      comp.instance.mappedColumnName = u.mappedColumnName;
      const item = this.list.find(x => x.ref === this.currentRef);
      item.meta.width = u.width;
      item.meta.height = u.height;
      item.meta.text = u.text;
      item.meta.mappedColumnName = u.mappedColumnName;
      item.meta.hasmapping = u.hasmapping;
      this.notify.createMessage('info', 'Applied successfully');
    });
    this.setupRef.instance.OnEditEnd.subscribe(u => {
      if (u === true) {
        this.currentSetupRef.destroy();
        this.textControls.forEach(x => {
          if (x.icon !== 'save') {
            x.disabled = true;
          }
        });
        this.notify.createMessage('info', 'Editing ended');
      }
    });

    this.currentSetupRef = this.setupRef;
  }

  OpenImageEditor(comp: ComponentRef<any>): void {
    if (this.currentSetupRef) {
      this.currentSetupRef.destroy();
    }
    const factory = this.resolver.resolveComponentFactory(ImageEditorComponent);
    this.setupRef = this.setup.createComponent(factory);
    this.setupRef.instance.src = comp.instance.src;
    this.setupRef.instance.width = comp.instance.width;
    this.setupRef.instance.height = comp.instance.height;
    this.setupRef.instance.positionY = comp.instance.posY;
    this.setupRef.instance.positionX = comp.instance.posX;
    this.setupRef.instance.OnSubmit.subscribe(u => {
      console.log(u);
      comp.instance.src = u.src;
      comp.instance.width = u.width;
      comp.instance.height = u.height;
      comp.instance.posX = u.positionX;
      comp.instance.posY = u.positionY;
      const item = this.list.find(x => x.ref === this.currentRef);
      item.meta.src = u.src;
      item.meta.width = u.width;
      item.meta.height = u.height;
      item.meta.positionX = u.posX;
      item.meta.positionY = u.posY;
      this.notify.createMessage('info', 'Applied successfully');
    });
    this.setupRef.instance.OnEditEnd.subscribe(u => {
      if (u === true) {
        this.currentSetupRef.destroy();
        this.notify.createMessage('info', 'Editing ended');
      }
    });

    this.currentSetupRef = this.setupRef;
  }

  printStuff(){
    this.processing = true;
    const mydata = document.getElementById('printsection');
    // mydata.style.backgroundColor = 'white';
    htmlToImage.toJpeg(mydata)
      .then(async dataUrl => {
        this.printimage = this.sanitizer.bypassSecurityTrustResourceUrl(dataUrl);
        this.processing = false;
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
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
        this.bgimage = event.target.result;
      };
      reader.readAsDataURL(file.target.files[0]);
    } else {
      this.bgimage = 'assets/images/photo.svg';
    }
  }

  saveTemp() {
    if (!this.templatename) {
      this.notify.createMessage('info', 'please create a template or choose one');
      return;
    }
    const data = [];
    this.list.forEach(u => {
      data.push(u.meta);
    });

    console.log(data);
    this.loading = true;
    this.appService.SaveTemplateFields(data).subscribe(result => {
        if (result.result === 100) {
          this.notify.createMessage('info', result.message);
          this.loading = false;
        } else {
          this.notify.createMessage('error', result.message);
          this.loading = false;
        }
      },
      error => {
        this.notify.createMessage('error', error.message);
        this.loading = false;
      });
  }

  getTemp() {
    this.loading = true;
    this.appService.get().subscribe(result => {
        if (result.result === 100) {
          this.templates = result.data;
          console.log(this.templates);
          this.notify.createMessage('info', result.message);
          this.loading = false;
          this.templatename = this.templates[0].name;
          this.templates[0].data.forEach(u => {
            if (u.type === 'bg') {
              this.bgimage = u.src;
            } else if (u.type === 'text') {
              this.createTextField({
                fontWeight: u.fontWeight,
                fontStyle: u.fontStyle,
                decorate: u.decorate,
                underline: u.underline,
                text: u.text,
                positionX: u.positionX,
                positionY:  u.positionY,
                mappedColumnName: u.mappedColumnName,
                hasmapping: u.hasmapping,
                templateId: u.templateId,
                type: u.type
              }, true);
            } else if (u.type === 'image') {
              this.createImageBox({
                src: u.src,
                width: u.width,
                height: u.height,
                positionX: u.positionX,
                positionY:  u.positionY,
                templateId: u.templateId,
                type: u.type
              }, true);
            } else if (u.type === 'code') {
              this.createCodeField({
                text: u.text,
                width: u.width,
                height: u.height,
                positionX: u.positionX,
                positionY:  u.positionY,
                mappedColumnName: u.mappedColumnName,
                hasmapping: u.hasmapping,
                type: u.type,
                templateId: u.templateId
              }, true);
            }
          });
        } else {
          this.notify.createMessage('error', result.message);
          this.loading = false;
        }
      },
      error => {
        this.notify.createMessage('error', error.message);
        this.loading = false;
      });
  }

  Editing() {
    if (this.edit) {
      this.notify.createMessage('info', 'editing disabled');
    } else {
      this.notify.createMessage('info', 'editing enabled');
    }
    this.edit = !this.edit;
  }

  disableEditing() {
    const ele = document.getElementById('disableOverlay');
    ele.style.display = 'block';
  }

  searchQuery() {
    this.loading = true;
    this.appService.search({search: this.search}).subscribe(u => {
      console.log(u);
      if (u.result === 100) {
        this.DataTable = u.data;
        const data = Object.keys(this.DataTable[0]);
        console.log(data);
        data.forEach((x, i) => {
          this.dataSource.push({
            field: x.toUpperCase(),
            value: this.DataTable[0][Object.keys(this.DataTable[0])[i]]
          });
        });
        console.log(this.dataSource);
        this.loading = false;
      }
    });
  }

  Apply() {
    this.list.forEach(u => {
      if (u.meta.mappedColumnName) {
        console.log(u.meta.mappedColumnName);
        u.ref.instance.text =  this.dataSource.find(x => x.field === u.meta.mappedColumnName.toUpperCase())?.value;
      }
    });
  }

  GetTemplate() {
    this.appService.getTemplate().subscribe(u => {
      if (u.result === 100) {
        this.templates = u.data;
      }
    });
  }

  selectTemp(temp) {
    console.log(temp);
    const data = this.templates.find(u => u.name === temp)?.data;
    this.list.forEach(u => {
      this.currentRef = u.ref;
      console.log(this.currentRef);
      this.currentRef.destroy();
    });

    console.log(this.templates, data);
    this.list = [];

    this.templatename = temp;
    data.forEach(u => {
      if (u.type === 'bg') {
        this.bgimage = u.src;
      } else if (u.type === 'text') {
        this.createTextField({
          fontWeight: u.fontWeight,
          fontStyle: u.fontStyle,
          decorate: u.decorate,
          underline: u.underline,
          text: u.text,
          positionX: u.positionX,
          positionY:  u.positionY,
          mappedColumnName: u.mappedColumnName,
          hasmapping: u.hasmapping,
          templateId: u.templateId,
          type: u.type
        }, true);
      } else if (u.type === 'image') {
        this.createImageBox({
          src: u.src,
          width: u.width,
          height: u.height,
          positionX: u.positionX,
          positionY:  u.positionY,
          templateId: u.templateId,
          type: u.type
        }, true);
      } else if (u.type === 'code') {
        this.createCodeField({
          text: u.text,
          width: u.width,
          height: u.height,
          positionX: u.positionX,
          positionY:  u.positionY,
          mappedColumnName: u.mappedColumnName,
          templateId: u.templateId,
          hasmapping: u.hasmapping,
          type: u.type
        }, true);
      }
    });
  }

  openTemplate() {
    const modal = this.modalService.create({
      nzTitle: 'New Template',
      nzFooter: null,
      nzContent: NewTemplateComponent
    });

    modal.afterClose.subscribe(x => {
      this.templatename = x;
      const data = [];
      this.list.forEach(u => {
        data.push(u.meta);
      });

      data.push({
        type: 'bg',
        src: this.bgimage
      });

      const val = {
        temp: {
          name: this.templatename
        },
        model: data
      };

      this.loading = true;
      this.appService.save(val).subscribe(result => {
          if (result.result === 100) {
            this.notify.createMessage('info', result.message);
            this.loading = false;
            this.getTemp();
          } else {
            this.notify.createMessage('error', result.message);
            this.loading = false;
          }
        },
        error => {
          this.notify.createMessage('error', error.message);
          this.loading = false;
        });
    });
  }
}
