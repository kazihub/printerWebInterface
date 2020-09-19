import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RouteGuard} from '../utilities/route-guard.service';
import {SettingsComponent} from './settings.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    component: SettingsComponent,
    data: {
      title: 'settings',
      headerDisplay: 'none'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
