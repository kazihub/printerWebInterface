import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../authentication.service';
import {NotifyService} from '../../notify.service';
import {BaseService} from '../../utilities/base.service';


@Component({
  templateUrl: './login-3.component.html'
})

export class Login3Component implements OnInit{
  loginForm: FormGroup;
  loginClick = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private baseService: BaseService,
              private authService: AuthService,
              private notify: NotifyService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });
  }

  login(): void {
    this.loginClick = true;
    this.authService.login(this.loginForm.value).subscribe(
      result => {
        if (result.status === 100) {
          this.notify.createMessage('info', result.message);
          this.setUserData(result.data);
          this.loginClick = false;
          this.router.navigate(['/dashboard']);
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
