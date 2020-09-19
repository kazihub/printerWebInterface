import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptNumberRoutingModule } from './receipt-number-routing.module';
import { ReceiptNumberComponent } from './receipt-number.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MomentModule} from 'ngx-moment';


@NgModule({
  declarations: [ReceiptNumberComponent],
  imports: [
    CommonModule,
    ReceiptNumberRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MomentModule
  ]
})
export class ReceiptNumberModule { }
