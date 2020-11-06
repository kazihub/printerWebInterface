import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RouteGuard} from '../utilities/route-guard.service';
import {InvoiceComponent} from './invoice.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    component: InvoiceComponent,
    data: {
      title: 'db design ',
      headerDisplay: 'none'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
