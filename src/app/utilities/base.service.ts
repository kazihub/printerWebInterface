import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {BehaviorSubject} from 'rxjs';


const baseUrL = 'https://localhost:44367/api/';

@Injectable({
  providedIn: 'root'
})

export class BaseService {

  constructor(private router: Router, private httpClient: HttpClient
  ) { }

  private now: any;

  // tslint:disable-next-line:ban-types
  private menuSource = new BehaviorSubject<String>('Main');
  currentMenu = this.menuSource.asObservable();

  Menu(menu): void {
    this.menuSource.next(menu);
    // console.log(menu);
  }

  getBaseUrl(): string {
    return baseUrL;
  }

  setSessionData(data: any): void {
    localStorage.setItem('tripsession', JSON.stringify(data));
  }

  getUserPermission(): any {
    if (this.getSesstionData()) {
      return this.getSesstionData().permission;
    }
    return false;
  }

  getSesstionData(): any {
    if (localStorage.getItem('tripsession')) {
      return JSON.parse(localStorage.getItem('tripsession'));
    }
    return false;
  }

  clearSeData(): void {
    localStorage.removeItem('tripsession');
    this.router.navigate(['/login']);
  }

  getToken(): any {
    if (this.getSesstionData()) {
      return this.getSesstionData().accesstoken;
    }
    return false;
  }

  getUserData(): any {
    if (this.getSesstionData()) {
      return this.getSesstionData().user;
    }
    return false;
  }

  getBranchData(): any {
    if (this.getSesstionData()) {
      return this.getSesstionData().branch;
    }
    return false;
  }

  getUserRole(): any {
    if (this.getSesstionData()) {
      return this.getSesstionData().role;
    }
    return false;
  }

  check(): any {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post(this.getBaseUrl() + 'Account/CheckExpiry', { token: this.getToken().token });
  }
  logout(): any {
    return this.httpClient.get(this.getBaseUrl() + 'Account/Logout/');
  }
}
