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
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Db/DbConnect`, info);
  }

  getTables(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Db/GetTables`);
  }

  getAllDB(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Db/GetAllDB`);
  }

  setAsCurrent(id): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Db/SetDefaultDB/${id}`);
  }

  getOnlyFields(): any {
    if (this.baseService.getPermission().useAccessDB) {
      return this.httpClient.get(`${this.baseService.getBaseUrl()}Db/GetAccessDBTableSchema`);
    } else {
      return this.httpClient.get(`${this.baseService.getBaseUrl()}Db/getOnlyFields`);
    }
  }

  getFields(info): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Db/GetFields/${info}`);
  }

  SaveQueryGenerated(info): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Db/SaveQueryGenerated`, info);
  }

  GetQueryFields(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Db/GetQueryFields`);
  }
}
