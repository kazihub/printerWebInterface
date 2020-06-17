import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RouteGuard} from '../utilities/route-guard.service';
import {DbMapperComponent} from './db-mapper.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    component: DbMapperComponent,
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
export class DbMapperRoutingModule { }
