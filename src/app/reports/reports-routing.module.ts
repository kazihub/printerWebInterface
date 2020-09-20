import { CardReprintComponent } from './card-reprint/card-reprint.component';
import { RouteGuard } from './../utilities/route-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { CardReportComponent } from './card-report/card-report.component';

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
    component: CardReportComponent,
    data: {
      title: 'user accounts',
      headerDisplay: 'none'
    }
  },
  {
    path: 'card-reprint-reports/:id',
    canActivate: [RouteGuard],
    component: CardReprintComponent,
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
