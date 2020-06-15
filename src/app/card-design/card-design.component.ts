import {
  Component, OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory, ElementRef
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

export interface Components{
  ref?: ComponentRef<any>;
  meta?: Fields;
}


export interface Fields {
  src?: string;
  width?: string;
  height?: string;
  fontWeight?: string;
  fontStyle?: string;
  decorate?: boolean;
  underline?: string;
  text?: string;
  positionX?: string;
  positionY?: string;
  type?: 'text' | 'image' | 'bg';
}

@Component({
  selector: 'app-card-design',
  templateUrl: './card-design.component.html',
  styleUrls: ['./card-design.component.css']
})

export class CardDesignComponent implements OnInit {
  componentRef: ComponentRef<any>;
  setupRef: ComponentRef<any>;
  list: Array<Components> = [];
  selected: Array<any> = [];
  current: any;
  xposition = 0;
  yposition = 0;
  printimage: any;
  loading = false;
  edit = true;
  processing = false;
  bgimage: any = 'assets/images/photo.svg';
  currentRef: ComponentRef<any>;
  currentSetupRef: ComponentRef<any>;

  mainControls = [
    {
      icon: 'font-size',
      handle: () => this.createTextField()
    },
    {
      icon: 'file-image',
      handle: () => this.createImageBox()
    },
    {
      icon: 'printer',
      handle: false
    }
  ];

  textControls = [
    {
      icon: 'bold',
      handle: () => this.currentRef.instance.setBold(),
      disabled: true
    },
    {
      icon: 'italic',
      handle: () => this.currentRef.instance.setItalic(),
      disabled: true
    },
    {
      icon: 'underline',
      handle: () => this.currentRef.instance.setUnderline(),
      disabled: true
    }
  ];
  @ViewChild('textcontainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild('setupcontainer', { read: ViewContainerRef }) setup: ViewContainerRef;
  @ViewChild('imagecontainer', { read: ViewContainerRef }) image: ViewContainerRef;
  constructor(private resolver: ComponentFactoryResolver,
              private notify: NotifyService,
              private appService: AppService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    $(document).keydown((e) => {
      if (this.selected.length > 0) {
        $('#' + this.selected[0].id).finish().clearQueue().stop();
      }
      this.selected = [];
      this.selected.push({id: this.current});
      if (e.which === 38) {
        $('#' + this.current).animate({
          top: '-=2'
        }).finish();
      }
      if (e.which === 40) {
        $('#' + this.current).animate({
          top: '+=2'
        }).finish();
      }
      if (e.which === 37) {
        $('#' + this.current).animate({
          left: '-=2'
        }).finish();
      }
      if (e.which === 39) {
        $('#' + this.current).animate({
          left: '+=2'
        }).finish();
      }
    });
    this.getTemp();
  }

  createTextField(options?: Fields, hasPos?: boolean) {
    const factory = this.resolver.resolveComponentFactory(TextFieldComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.hasPos = hasPos;
    this.componentRef.instance.text = 'Text Field';
    if (hasPos) {
      this.componentRef.instance.posX = options.positionX;
      this.componentRef.instance.posY = options.positionY;
      this.componentRef.instance.text = options.text;
    }
    this.componentRef.instance.componentRef = this.componentRef;
    this.componentRef.instance.elementSelected.subscribe(u => {
      this.current = u.id;
      this.currentRef = u.ref;
      this.textControls.forEach(x => x.disabled = false);
      this.OpenEditor(u.ref);
    });
    this.componentRef.instance.formatChange.subscribe(u => {
      this.currentSetupRef.instance.fontWeight = u.fontWeight;
      this.currentSetupRef.instance.fontStyle = u.fontStyle;
      this.currentSetupRef.instance.decorate = u.decorate;
      this.currentSetupRef.instance.underline = u.underline;
      const item = this.list.find(x => x.ref === this.currentRef);
      item.meta = {
        fontWeight: u.fontWeight,
        fontStyle: u.fontStyle,
        decorate: u.decorate,
        underline: u.underline,
        text: u.text
      };
    });
    this.componentRef.instance.Destroy.subscribe(u => {
      if (u === true) {
        this.list.splice(this.list.findIndex(c => c.ref === this.currentRef), 1);
        this.currentSetupRef.destroy();
      }
    });
    this.componentRef.instance.XYPosition.subscribe(u => {
      this.xposition = u.x;
      this.yposition = u.y;
      const item = this.list.find(x => x.ref === this.currentRef);
      item.meta.positionX = u.x;
      item.meta.positionY = u.y;
      console.log(item);
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
          fontWeight: this.componentRef.instance.fontWeight,
          fontStyle: this.componentRef.instance.fontStyle,
          decorate: this.componentRef.instance.decorate,
          underline: this.componentRef.instance.underline,
          text: this.componentRef.instance.text,
          positionX: null,
          positionY:  null,
          type: 'text'
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
      this.OpenImageEditor(u.ref);
    });
    this.componentRef.instance.Destroy.subscribe(u => {
      if (u === true) {
        this.list.splice(this.list.findIndex(c => c.ref === this.currentRef), 1);
        this.currentSetupRef.destroy();
      }
    });
    this.componentRef.instance.XYPosition.subscribe(u => {
      this.xposition = u.x;
      this.yposition = u.y;
      const item = this.list.find(x => x.ref === this.currentRef);
      item.meta.positionX = u.x;
      item.meta.positionY = u.y;
      console.log(item, this.list);
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
    this.setupRef.instance.OnSubmit.subscribe(u => {
      console.log(u);
      comp.instance.text = u.text;
      comp.instance.fontSize = u.fontSize;
      comp.instance.fontWeight = u.fontWeight;
      comp.instance.fontStyle = u.fontStyle;
      comp.instance.decorate = u.decorate;
      comp.instance.underline = u.underline;
      const item = this.list.find(x => x.ref === this.currentRef);
      item.meta.fontWeight = u.fontWeight;
      item.meta.fontStyle = u.fontStyle;
      item.meta.decorate = u.decorate;
      item.meta.underline = u.underline;
      item.meta.text = u.text;

    });
    this.setupRef.instance.OnEditEnd.subscribe(u => {
      if (u === true) {
        this.currentSetupRef.destroy();
        this.textControls.forEach(x => x.disabled = true);
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
    this.setupRef.instance.OnSubmit.subscribe(u => {
      console.log(u);
      comp.instance.src = u.src;
      comp.instance.width = u.width;
      comp.instance.height = u.height;
      const item = this.list.find(x => x.ref === this.currentRef);
      item.meta.src = u.src;
      item.meta.width = u.width;
      item.meta.height = u.height;
    });
    this.setupRef.instance.OnEditEnd.subscribe(u => {
      if (u === true) {
        this.currentSetupRef.destroy();
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
    const data = [];
    this.list.forEach(u => {
      data.push(u.meta);
    });

    data.push({
      type: 'bg',
      src: this.bgimage
    });
    console.log(data);
    this.appService.save(data).subscribe(result => {
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
    this.appService.get().subscribe(result => {
        if (result.result === 100) {
          this.notify.createMessage('info', result.message);
          this.loading = false;
          const data = result.data;
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
                type: u.type
              }, true);
            } else if (u.type === 'image') {
              this.createImageBox({
                src: u.src,
                width: u.width,
                height: u.height,
                positionX: u.positionX,
                positionY:  u.positionY,
                type: u.type
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

  disableEditing() {
    const ele = document.getElementById('disableOverlay');
    ele.style.display = 'block';
    this.edit = !this.edit;
  }

  enableEditing() {
    const ele = document.getElementById('disableOverlay');
    ele.style.display = 'none';
    this.edit = !this.edit;
  }
}
