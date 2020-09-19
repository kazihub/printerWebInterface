import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RouteGuard} from '../utilities/route-guard.service';
import {UserAccountsComponent} from './user-accounts.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    component: UserAccountsComponent,
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
export class UserAccountsRoutingModule { }
