import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../utilities/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(
    private httpClient: HttpClient,
    private baseService: BaseService,
  ) { }

  saveUser(info): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Account/AddUser`, info);
  }

  getUsers(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Account/GetAllUsers`);
  }

  editUser(info): any {
    return this.httpClient.put(`${this.baseService.getBaseUrl()}Account/EditUser`, info);
  }

  getRoles(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Account/GetRoles`);
  }

  getApprovalList(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Account/GetApprovalUser`);
  }

  saveApprovedList(info): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Account/AddApprovalUser`, info);
  }

  removeApprovalUser(id): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Account/RemoveApprovalUser/${id}`);
  }

  getReprints(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Cards/GetCardReprint`);
  }

  approve(id): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Cards/ReprintApproval/${id}`);
  }

  disapprove(id): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Cards/ReprintDisApproval/${id}`);
  }
}
