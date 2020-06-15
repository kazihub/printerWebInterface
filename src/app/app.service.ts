import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './utilities/base.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private httpClient: HttpClient,
    private baseService: BaseService,
  ) { }

  save(info): any {
    return this.httpClient.post(this.baseService.getBaseUrl() + 'App/SaveTemplate', info);
  }

  get(): any {
    return this.httpClient.get(this.baseService.getBaseUrl() + 'App/GetTemplate');
  }


  public uuidv4() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:no-bitwise one-variable-per-declaration
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
