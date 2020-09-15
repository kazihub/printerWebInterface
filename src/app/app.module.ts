import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './shared/template/template.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

import { NgChartjsModule } from 'ng-chartjs';
import { ThemeConstantService } from './shared/services/theme-constant.service';
import {ResizableModule} from 'angular-resizable-element';
import {NgZorroAntdModule, NzMessageModule, NzNotificationModule} from 'ng-zorro-antd';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpinterceptorService} from './utilities/httpinterceptor.service';
import {NgxBarcode6Module} from 'ngx-barcode6';
import { IpAddressComponent } from './ip-address/ip-address.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    FullLayoutComponent,
    IpAddressComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NzBreadCrumbModule,
        TemplateModule,
        SharedModule,
        NgChartjsModule,
        ResizableModule,
        NzNotificationModule,
        NzMessageModule,
        NgxBarcode6Module,
        NgZorroAntdModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true },
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    ThemeConstantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
