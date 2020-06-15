import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BaseService} from '../utilities/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private baseService: BaseService,
  ) { }

  login(userlogin): any {
    return this.httpClient.post(this.baseService.getBaseUrl() + 'Account/Login', userlogin);
  }
}
