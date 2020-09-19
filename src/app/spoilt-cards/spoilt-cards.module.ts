import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpoiltCardsRoutingModule } from './spoilt-cards-routing.module';
import { SpoiltCardsComponent } from './spoilt-cards.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {ReactiveFormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';


@NgModule({
  declarations: [SpoiltCardsComponent],
  imports: [
    CommonModule,
    SpoiltCardsRoutingModule,
    NgZorroAntdModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    MomentModule
  ]
})
export class SpoiltCardsModule { }
