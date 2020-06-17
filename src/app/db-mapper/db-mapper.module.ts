import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbMapperRoutingModule } from './db-mapper-routing.module';
import { DbMapperComponent } from './db-mapper.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [DbMapperComponent],
  imports: [
    CommonModule,
    DbMapperRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DbMapperModule { }
