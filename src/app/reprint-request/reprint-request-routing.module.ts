import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RouteGuard} from '../utilities/route-guard.service';
import {ReprintRequestComponent} from './reprint-request.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    component: ReprintRequestComponent,
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
export class ReprintRequestRoutingModule { }
