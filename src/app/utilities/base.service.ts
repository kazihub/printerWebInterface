import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {BehaviorSubject} from 'rxjs';


const baseUrL = 'https://localhost:44367/api/';

// const baseUrL = 'http://192.168.0.244:2029/api/';


@Injectable({
  providedIn: 'root'
})

export class BaseService {

  constructor(private router: Router, private httpClient: HttpClient
  ) { }

  private now: any;

  private menuSource = new BehaviorSubject<string>('Main');
  currentMenu = this.menuSource.asObservable();

  private nameSource = new BehaviorSubject<any>('');
  currentName = this.nameSource.asObservable();

  private searchSource = new BehaviorSubject<boolean>(false);
  currentSearch = this.searchSource.asObservable();

  Menu(menu): void {
    this.menuSource.next(menu);
    // console.log(menu);
  }
  Name(name): void {
    this.nameSource.next(name);
    // console.log(menu);
  }

  Search(menu): void {
    this.searchSource.next(menu);
    // console.log(menu);
  }

  getBaseUrl(): string {
    return `${this.getSesstion('static-ip-val-etteyesgh')}/api/`;
  }

  setSessionData(data: any): void {
    localStorage.setItem('static-keyc-ghjty', JSON.stringify(data));
  }

  setSession(value, data: any): void {
    localStorage.setItem(value, JSON.stringify(data));
  }

  getUserPermission(): any {
    if (this.getSesstionData()) {
      return this.getSesstionData().permission;
    }
    return false;
  }

  getSesstionData(): any {
    if (localStorage.getItem('static-keyc-ghjty')) {
      return JSON.parse(localStorage.getItem('static-keyc-ghjty'));
    }
    return false;
  }

  getSesstion(value): any {
    if (localStorage.getItem(value)) {
      return JSON.parse(localStorage.getItem(value));
    }
    return false;
  }

  clearSeData(): void {
    localStorage.removeItem('static-keyc-ghjty');
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
