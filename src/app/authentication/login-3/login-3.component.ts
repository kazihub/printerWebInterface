import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../authentication.service';
import {NotifyService} from '../../notify.service';
import {BaseService} from '../../utilities/base.service';
import {NewTemplateComponent} from '../../card-design/new-template/new-template.component';
import {NzModalService} from 'ng-zorro-antd';
import {IpAddressComponent} from '../../ip-address/ip-address.component';


@Component({
  templateUrl: './login-3.component.html'
})

export class Login3Component implements OnInit{
  loginForm: FormGroup;
  loginClick = false;
  date = new Date();
  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private baseService: BaseService,
              private authService: AuthService,
              private notify: NotifyService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });

    if (!this.baseService.getSesstion('static-ip-val-etteyesgh')) {
      this.modalService.create({
        nzTitle: 'Set Api IP',
        nzFooter: null,
        nzClosable: false,
        nzMaskClosable: false,
        nzContent: IpAddressComponent
      });
    }
  }

  login(): void {
    this.loginClick = true;
    this.authService.login(this.loginForm.value).subscribe(
      result => {
        if (result.status === 100) {
          this.notify.createMessage('info', result.message);
          this.setUserData(result.data);
          this.baseService.ConnectNotification();
          this.loginClick = false;
          if (this.baseService.getUserRole() !== 'Administrator') {
            this.router.navigate(['/card-design']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        } else {
          this.notify.createMessage('error', result.message);
          this.loginClick = false;
        }
      },
      error => {
        this.notify.createMessage('error', 'Please check your internet connection, and try again');
        this.loginClick = false;
      }
    );
  }

  setUserData(result: any): void {
    console.log(result);
    this.baseService.setSessionData(result);
  }
}
