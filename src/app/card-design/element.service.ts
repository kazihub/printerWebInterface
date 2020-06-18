import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {NotifyService} from '../notify.service';
import {EditorService} from './editor.service';
import {ImageFieldComponent} from './image-field/image-field.component';
import {Fields} from './card-design.component';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  constructor(private notify: NotifyService, private editor: EditorService) { }

  createImageBox(options?: Fields,
                 hasPos?: boolean,
                 componentRef?: ComponentRef<any>,
                 list?: Array<any>,
                 current?: any,
                 currentRef?: ComponentRef<any>,
                 resolver?: ComponentFactoryResolver,
                 entry?: ViewContainerRef,
                 currentSetupRef?: ComponentRef<any>,
                 xposition?: any,
                 yposition?: any,
                 templateId?: any,
                 setup?: ViewContainerRef,
                 setupRef?: ComponentRef<any>
  ): any {
    const factory = resolver.resolveComponentFactory(ImageFieldComponent);
    componentRef = entry.createComponent(factory);
    componentRef.instance.componentRef = componentRef;
    componentRef.instance.hasPos = hasPos;
    if (hasPos) {
      componentRef.instance.posX = options.positionX;
      componentRef.instance.posY = options.positionY;
      componentRef.instance.src = options.src;
    }
    componentRef.instance.elementSelected.subscribe(u => {
      current = u.id;
      currentRef = u.ref;
      const item = list.find(x => x.ref === currentRef);
      item.meta.positionX = xposition;
      item.meta.positionY = yposition;
      if (!currentSetupRef) {
        return this.editor.OpenImageEditor(u.ref, setupRef, list, current, currentSetupRef, currentRef, resolver, setup);
      }
    });
    componentRef.instance.Destroy.subscribe(u => {
      if (u === true) {
        list.splice(list.findIndex(c => c.ref === currentRef), 1);
        currentSetupRef.destroy();
      }
    });
    componentRef.instance.XYPosition.subscribe(u => {
      const item = list.find(x => x.ref === currentRef);
      const ele = document.getElementById(current);
      item.meta.positionX = parseFloat(item.meta.positionX) + parseFloat(u.x);
      item.meta.positionY = parseFloat(item.meta.positionY) + parseFloat(u.y);
      xposition = item.meta.positionX;
      yposition = item.meta.positionY;
    });
    if (options) {
      list.push({
        ref: componentRef,
        meta: options
      });
    } else {
      list.push({
        ref: componentRef,
        meta: {
          src: componentRef.instance.src,
          width: componentRef.instance.width,
          height: componentRef.instance.height,
          templateId,
          positionX: null,
          positionY:  null,
          type: 'image'
        }
      });
    }
  }
}
