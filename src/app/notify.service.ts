import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private notification: NzNotificationService,
    private message: NzMessageService
  ) { }

  createNotification(type: string, title: string, message: string, duration?): void {
    if (duration) {
      this.notification.create(type, title, message, { nzDuration: duration});
    } else {
      this.notification.create(type, title, message);
    }
  }

  createMessage(type: string, message: string, duration?): void {
    if (duration) {
      this.message.create(type, message, { nzDuration: duration});
    } else {
      this.message.create(type, message);
    }
  }
}
