import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CardReportComponent } from './card-report/card-report.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CardReprintComponent } from './card-reprint/card-reprint.component';
import { MomentModule } from 'ngx-moment';


@NgModule({
  declarations: [ReportsComponent, CardReportComponent, CardReprintComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableExporterModule,
    MomentModule
  ]
})
export class ReportsModule { }
