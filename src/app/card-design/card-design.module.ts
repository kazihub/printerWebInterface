import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardDesignRoutingModule } from './card-design-routing.module';
import { CardDesignComponent } from './card-design.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { TextFieldComponent } from './text-field/text-field.component';
import { TextFieldEditorComponent } from './text-field/text-field-editor/text-field-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ImageFieldComponent } from './image-field/image-field.component';
import {ResizableModule} from 'angular-resizable-element';
import { ImageEditorComponent } from './image-field/image-editor/image-editor.component';
import {NgxPrintModule} from 'ngx-print';
import { BarcodeFieldComponent } from './barcode-field/barcode-field.component';
import { BarcodeEditorComponent } from './barcode-field/barcode-editor/barcode-editor.component';
import {NgxBarcode6Module} from 'ngx-barcode6';
import { NewTemplateComponent } from './new-template/new-template.component';
import {MomentModule} from 'ngx-moment';
import { HorizontalRulerComponent } from './horizontal-ruler/horizontal-ruler.component';
import { VerticalRulerComponent } from './vertical-ruler/vertical-ruler.component';


@NgModule({
  declarations: [CardDesignComponent, TextFieldComponent, TextFieldEditorComponent, ImageFieldComponent, ImageEditorComponent, BarcodeFieldComponent, BarcodeEditorComponent, NewTemplateComponent, HorizontalRulerComponent, VerticalRulerComponent],
  imports: [
    CommonModule,
    CardDesignRoutingModule,
    DragDropModule,
    NgZorroAntdModule,
    FormsModule,
    ResizableModule,
    NgxPrintModule,
    NgxBarcode6Module,
    ReactiveFormsModule,
    MomentModule
  ],
  entryComponents: [TextFieldEditorComponent, NewTemplateComponent]
})
export class CardDesignModule { }
