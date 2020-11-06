import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import {NzButtonModule, NzCardModule, NzDatePickerModule, NzResultModule, NzTableModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {NgxPrintModule} from 'ngx-print';


@NgModule({
  declarations: [InvoiceComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    NzCardModule,
    NzTableModule,
    NzDatePickerModule,
    FormsModule,
    NzButtonModule,
    NzResultModule,
    MomentModule,
    NgxPrintModule
  ]
})
export class InvoiceModule { }
