import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../utilities/base.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(
    private httpClient: HttpClient,
    private baseService: BaseService,
  ) { }

  savedb(info): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}App/DbConnect`, info);
  }

  getTables(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}App/GetTables`);
  }

  getQuery(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}App/getQuery`);
  }
  getOnlyFields(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}App/getOnlyFields`);
  }
  getFields(info): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}App/GetFields/${info}`);
  }

  saveQuery(info): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}App/SaveQuery`, info);
  }
}
