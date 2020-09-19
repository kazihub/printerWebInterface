import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalListRoutingModule } from './approval-list-routing.module';
import { ApprovalListComponent } from './approval-list.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ApprovalListComponent],
  imports: [
    CommonModule,
    ApprovalListRoutingModule,
    NgZorroAntdModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    FormsModule
  ]
})
export class ApprovalListModule { }
