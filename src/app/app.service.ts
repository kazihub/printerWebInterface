import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './utilities/base.service';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  AppService {

  constructor(
    private httpClient: HttpClient,
    private baseService: BaseService,
  ) { }

  save(info): any {
    return this.httpClient.post(this.baseService.getBaseUrl() + 'App/SaveTemplateData', info);
  }

  PrintCount(info): any {
    return this.httpClient.post(this.baseService.getBaseUrl() + 'App/PrintCount', info);
  }

  get(): any {
    return this.httpClient.get(this.baseService.getBaseUrl() + 'App/GetTemplateData');
  }

  getInput(): any {
    return this.httpClient.get(this.baseService.getBaseUrl() + 'App/GetInputFields');
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
    // FindPatient
    if (this.baseService.getPermission().useAccessDB) {
      return forkJoin({
        search: this.httpClient.get(this.baseService.getBaseUrl() + 'Db/FindPatient?Id=' + info),
        selectedFields: this.httpClient.get(this.baseService.getBaseUrl() + 'Db/getOnlyFields/')
      });
    } else {
      return forkJoin({
        search: this.httpClient.post(this.baseService.getBaseUrl() + 'App/RunQuery/', info),
        selectedFields: this.httpClient.get(this.baseService.getBaseUrl() + 'Db/getOnlyFields/')
      });
    }
  }

  getParams(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Db/getOnlyParams`);
  }

  getTotalPrinted(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}App/TotalPrinted`);
  }

  getActiveTaxes(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Account/GetActiveTax`);
  }

  getTaxes(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Account/GetAllTax`);
  }

  getInvoice(info): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}App/GetInvoice`, info);
  }

  sendInvoice(info): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}App/SendInvoice`, info);
  }

  addTax(info): any {
    return this.httpClient.post(this.baseService.getBaseUrl() + 'Account/AddTax', info);
  }

  editTax(info): any {
    return this.httpClient.put(this.baseService.getBaseUrl() + 'Account/EditTax', info);
  }

  public uuidv4() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:no-bitwise one-variable-per-declaration
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getReceipt(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Cards/GetReceiptNumbers`);
  }
}
