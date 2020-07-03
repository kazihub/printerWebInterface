import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

/** Import any ng-zorro components as the module required except icon module */
import { NzButtonModule } from 'ng-zorro-antd/button';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {NgChartjsModule} from 'ng-chartjs';
import {MomentModule} from 'ngx-moment';

const antdModule = [
    NzButtonModule,
];

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    ...antdModule,
    NgZorroAntdModule,
    NgChartjsModule,
    MomentModule
  ],
    exports: [],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule { }
