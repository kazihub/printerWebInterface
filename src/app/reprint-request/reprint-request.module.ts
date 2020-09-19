import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReprintRequestRoutingModule } from './reprint-request-routing.module';
import { ReprintRequestComponent } from './reprint-request.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [ReprintRequestComponent],
  imports: [
    CommonModule,
    ReprintRequestRoutingModule,
    NgZorroAntdModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ReprintRequestModule { }
