import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbMapperRoutingModule } from './db-mapper-routing.module';
import { DbMapperComponent } from './db-mapper.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AliasComponent } from './alias/alias.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';


@NgModule({
  declarations: [DbMapperComponent, AliasComponent],
  imports: [
    CommonModule,
    DbMapperRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule
  ]
})
export class DbMapperModule { }
