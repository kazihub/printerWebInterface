import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardDesignRoutingModule } from './card-design-routing.module';
import { CardDesignComponent } from './card-design.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { TextFieldComponent } from './text-field/text-field.component';
import { TextFieldEditorComponent } from './text-field/text-field-editor/text-field-editor.component';
import {FormsModule} from '@angular/forms';
import { ImageFieldComponent } from './image-field/image-field.component';
import {ResizableModule} from 'angular-resizable-element';
import { ImageEditorComponent } from './image-field/image-editor/image-editor.component';
import {NgxPrintModule} from 'ngx-print';


@NgModule({
  declarations: [CardDesignComponent, TextFieldComponent, TextFieldEditorComponent, ImageFieldComponent, ImageEditorComponent],
  imports: [
    CommonModule,
    CardDesignRoutingModule,
    DragDropModule,
    NgZorroAntdModule,
    FormsModule,
    ResizableModule,
    NgxPrintModule
  ],
  entryComponents: [TextFieldEditorComponent]
})
export class CardDesignModule { }
