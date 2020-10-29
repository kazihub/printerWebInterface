import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import {map} from 'rxjs/operators';
import {NzModalService} from 'ng-zorro-antd';
import {ChangePasswordComponent} from '../change-password/change-password.component';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor {

  constructor(public baseService: BaseService,
              private modalService: NzModalService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.baseService.getToken().token}`,
        'Content-Type': 'application/json',
      }
    });

    return next.handle(request).pipe(
      map(event => {
        if ( event instanceof HttpResponse) {
          if (event.body.status === 102) {
            this.setUserData(event.body.data);
            this.changePass(event);
          } else {
            return event;
          }
        } else {
          return event;
        }
      })
    );
  }

  changePass(event): any {
    const modal = this.modalService.create({
      nzTitle: 'Change Password',
      nzClosable: false,
      nzFooter: null,
      nzMaskClosable: false,
      nzWrapClassName: 'vertical-center-modal',
      nzKeyboard: false,
      nzContent: ChangePasswordComponent
    });

    modal.afterClose.subscribe(u => {
      if (u === true) {
        return event;
      } else {
        this.changePass(event);
      }
    });
  }

  setUserData(result: any): void {
    console.log(result);
    this.baseService.setSessionData(result);
  }
}
