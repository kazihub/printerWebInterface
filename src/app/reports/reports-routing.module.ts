import { RouteGuard } from '../utilities/route-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import {DailyDetailPrintCountComponent} from './daily-detail-print-count/daily-detail-print-count.component';
import {DailySummaryPrintCountComponent} from './daily-summary-print-count/daily-summary-print-count.component';
import {CashierReceiptReportComponent} from './cashier-receipt-report/cashier-receipt-report.component';
import {CashReceiptSummaryReportComponent} from './cash-receipt-summary-report/cash-receipt-summary-report.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    component: ReportsComponent,
    data: {
      title: 'user accounts',
      headerDisplay: 'none'
    }
  },
  {
    path: 'card-print-reports',
    canActivate: [RouteGuard],
    component: DailyDetailPrintCountComponent,
    data: {
      title: 'user accounts',
      headerDisplay: 'none'
    }
  },
  {
    path: 'card-summary-print-report',
    canActivate: [RouteGuard],
    component: DailySummaryPrintCountComponent,
    data: {
      title: 'user accounts',
      headerDisplay: 'none'
    }
  },
  {
    path: 'cash-receipt-report',
    canActivate: [RouteGuard],
    component: CashierReceiptReportComponent,
    data: {
      title: 'user accounts',
      headerDisplay: 'none'
    }
  },
  {
    path: 'cash-receipt-summary-report',
    canActivate: [RouteGuard],
    component: CashReceiptSummaryReportComponent,
    data: {
      title: 'user accounts',
      headerDisplay: 'none'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
