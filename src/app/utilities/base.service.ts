import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {HubConnection} from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import {NotifyService} from '../notify.service';


const baseUrL = 'https://localhost:44367/api/';

// const baseUrL = 'http://192.168.0.244:2029/api/';


@Injectable({
  providedIn: 'root'
})

export class BaseService {
  public hubConnect: HubConnection;
  constructor(private router: Router, private httpClient: HttpClient,
              private  notify: NotifyService
  ) { }

  private now: any;

  private approveSource = new BehaviorSubject<any>({});
  currentApproval = this.approveSource.asObservable();

  private nameSource = new BehaviorSubject<any>('');
  currentName = this.nameSource.asObservable();

  private searchSource = new BehaviorSubject<boolean>(false);
  currentSearch = this.searchSource.asObservable();

  Approval(menu): void {
    this.approveSource.next(menu);
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

  async ConnectNotification() {
    if (!this.hubConnect) {
      this.hubConnect = new signalR.HubConnectionBuilder()
        .withUrl(`${this.getBaseUrl()}notificationHub?userId=${this.getUserData().id}`)
        .withAutomaticReconnect()
        .build();
      this.hubConnect.start()
        .then(() => {
          console.log('connection started ...');
        }).catch( err => {
        console.log('Error while starting connection ' + err);
      });
      this.hubConnect.on('ApprovalPending', (message) => {
        this.notify.createNotification('info', 'QUIXMO', message.message, 8000);
        this.Approval(message.message);
      });
      this.hubConnect.on('ApprovalSuccess', (message) => {
        this.Approval(message);
      });
    }
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

  getPermission(): any {
    if (this.getSesstionData()) {
      return this.getSesstionData().permission;
    }
    return false;
  }

  setPermission(perm): any {
    if (this.getSesstionData()) {
      const session = this.getSesstionData();
      session.permission = perm;
      this.clearSeData();
      console.log(session);
      this.setSessionData(session);
    }
  }

  getUserRole(): any {
    if (this.getSesstionData()) {
      return this.getSesstionData().role;
    }
    return false;
  }

  changePassword(info): any {
    return this.httpClient.post(`${this.getBaseUrl()}Account/ChangePassword`, info);
  }

  check(): any {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post(this.getBaseUrl() + 'Account/CheckExpiry', { token: this.getToken().token });
  }
  logout(): any {
    return this.httpClient.get(this.getBaseUrl() + 'Account/Logout/');
  }
}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('newPassword');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};
