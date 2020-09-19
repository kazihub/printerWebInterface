import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../utilities/base.service';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(
    private httpClient: HttpClient,
    private baseService: BaseService,
  ) { }

  saveReceipt(info): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Cards/RecordReceipt`, info);
  }

  getReceipt(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Cards/GetReceiptNumbers`);
  }
}
