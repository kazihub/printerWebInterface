import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../utilities/base.service';

@Injectable({
  providedIn: 'root'
})
export class SpoiltService {

  constructor(
    private httpClient: HttpClient,
    private baseService: BaseService,
  ) { }

  saveSpoilt(info): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Cards/RecordSpoilt`, info);
  }

  getSpoilt(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Cards/GetSpoiltCards`);
  }

  editSpoilt(info): any {
    return this.httpClient.put(`${this.baseService.getBaseUrl()}Cards/EditSpoilt`, info);
  }
}
