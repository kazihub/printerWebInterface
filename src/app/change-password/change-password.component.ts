import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseService, confirmPasswordValidator} from '../utilities/base.service';
import {NotifyService} from '../notify.service';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder,
              private baseService: BaseService,
              private modal: NzModalRef,
              private notify: NotifyService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      passwordConfirm: [null, [Validators.required, confirmPasswordValidator]]
    });
  }

  save(): any {
    this.loading = true;
    this.baseService.changePassword(this.form.value).subscribe(
      result => {
        if (result.result === 100) {
          this.notify.createNotification('info', 'Success Message', result.message);
          this.modal.close(true);
        } else {
          this.notify.createNotification('danger', 'Failure Message', `Password change error, please check your old password and confirm the new password.`);
        }
        this.loading = false;
      }
    );
  }
}
