import {ComponentFactoryResolver, ComponentRef, Injectable, Input, ViewContainerRef} from '@angular/core';
import {ImageEditorComponent} from './image-field/image-editor/image-editor.component';
import {NotifyService} from '../notify.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  constructor(private notify: NotifyService) { }

  OpenImageEditor(
    comp: ComponentRef<any>,
    setupRef?: ComponentRef<any>,
    list?: Array<any>,
    current?: any,
    currentSetupRef?: ComponentRef<any>,
    currentRef?: ComponentRef<any>,
    resolver?: ComponentFactoryResolver,
    setup?: ViewContainerRef
  ): any {
    if (currentSetupRef) {
      currentSetupRef.destroy();
    }
    const factory = resolver.resolveComponentFactory(ImageEditorComponent);
    setupRef = setup.createComponent(factory);
    setupRef.instance.src = comp.instance.src;
    setupRef.instance.width = comp.instance.width;
    setupRef.instance.height = comp.instance.height;
    setupRef.instance.positionY = comp.instance.posY;
    setupRef.instance.positionX = comp.instance.posX;
    setupRef.instance.OnSubmit.subscribe(u => {
      console.log(u);
      comp.instance.src = u.src;
      comp.instance.width = u.width;
      comp.instance.height = u.height;
      comp.instance.posX = u.positionX;
      comp.instance.posY = u.positionY;
      const item = list.find(x => x.ref === currentRef);
      item.meta.src = u.src;
      item.meta.width = u.width;
      item.meta.height = u.height;
      item.meta.positionX = u.posX;
      item.meta.positionY = u.posY;
      this.notify.createMessage('info', 'Applied successfully');
    });
    setupRef.instance.OnEditEnd.subscribe(u => {
      if (u === true) {
        currentSetupRef.destroy();
        this.notify.createMessage('info', 'Editing ended');
      }
    });

    return setupRef;
  }

}
