import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../utilities/base.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private httpClient: HttpClient,
    private baseService: BaseService,
  ) { }

  getPrints(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Cards/GetCardPrint`);
  }

  getPrintsBy(data): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Cards/GetCardPrintByDate`, data);
  }

  getReprintPrints(id): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Cards/GetCardAllRePrint/${id}`);
  }

  getReprintPrintsByDate(id, data): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Cards/GetCardAllRePrint/${id}`, data);
  }

  getCardPrintByDate(data): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Cards/GetCardPrintByDate`, data);
  }
  getCardSummaryPrintByDate(data): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Cards/DailySummary`, data);
  }
  getCashReceiptReport(data): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Cards/CashReceiptReport`, data);
  }
  getCashReceiptSummaryReport(data): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Cards/CashReceiptSummaryReport`, data);
  }
}
