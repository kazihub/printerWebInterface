import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {CardDesignComponent} from './card-design.component';
import {RouteGuard} from '../utilities/route-guard.service';


const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    component: CardDesignComponent,
    data: {
      title: 'card design ',
      headerDisplay: 'none'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardDesignRoutingModule { }
