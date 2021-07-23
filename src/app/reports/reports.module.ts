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
import { MatTableExporterModule } from 'mat-table-exporter';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { DailyDetailPrintCountComponent } from './daily-detail-print-count/daily-detail-print-count.component';
import { DailySummaryPrintCountComponent } from './daily-summary-print-count/daily-summary-print-count.component';
import { CashierReceiptReportComponent } from './cashier-receipt-report/cashier-receipt-report.component';
import { CashReceiptSummaryReportComponent } from './cash-receipt-summary-report/cash-receipt-summary-report.component';
import {ExportAsModule} from 'ngx-export-as';


@NgModule({
  declarations: [ReportsComponent,
    DailyDetailPrintCountComponent,
    DailySummaryPrintCountComponent,
    CashierReceiptReportComponent,
    CashReceiptSummaryReportComponent],
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
    MomentModule,
    ExportAsModule,
  ]
})
export class ReportsModule { }
