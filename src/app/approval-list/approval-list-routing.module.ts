import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RouteGuard} from '../utilities/route-guard.service';
import {ApprovalListComponent} from './approval-list.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    component: ApprovalListComponent,
    data: {
      title: 'approval',
      headerDisplay: 'none'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalListRoutingModule { }
