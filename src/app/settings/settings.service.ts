import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../utilities/base.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private httpClient: HttpClient,
    private baseService: BaseService,
  ) { }

  saveConfig(info): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Account/SaveConfiguration`, info);
  }

  getConfig(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Account/GetConfig`);
  }

  saveIDtype(info): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}App/IDType`, info);
  }

  getIDType(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}App/GetIDType`);
  }
}
