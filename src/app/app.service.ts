import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './utilities/base.service';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private httpClient: HttpClient,
    private baseService: BaseService,
  ) { }

  save(info): any {
    return this.httpClient.post(this.baseService.getBaseUrl() + 'App/SaveTemplateData', info);
  }

  PrintCount(): any {
    return this.httpClient.get(this.baseService.getBaseUrl() + 'App/PrintCount');
  }

  get(): any {
    return this.httpClient.get(this.baseService.getBaseUrl() + 'App/GetTemplateData');
  }

  saveTemplate(info): any {
    return this.httpClient.post(this.baseService.getBaseUrl() + 'App/SaveTemplate', info);
  }

  getTemplate(): any {
    return this.httpClient.get(this.baseService.getBaseUrl() + 'App/GetTemplate');
  }

  SaveTemplateFields(info): any {
    return this.httpClient.post(this.baseService.getBaseUrl() + 'App/SaveTemplateFields', info);
  }

  search(info): any {
    // return this.httpClient.post(this.baseService.getBaseUrl() + 'App/Search/', info);
    return forkJoin({
      search: this.httpClient.post(this.baseService.getBaseUrl() + 'App/RunQuery/', info),
      selectedFields: this.httpClient.get(this.baseService.getBaseUrl() + 'App/getOnlyFields/')
    });
  }

  getParams(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}App/getOnlyParams`);
  }

  getTotalPrinted(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}App/TotalPrinted`);
  }

  public uuidv4() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:no-bitwise one-variable-per-declaration
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
