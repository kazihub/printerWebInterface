import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SettingsService} from './settings.service';
import {NotifyService} from '../notify.service';
import {MatTableDataSource} from '@angular/material/table';
import {BaseService} from '../utilities/base.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder,
              private settingsService: SettingsService,
              private baseService: BaseService,
              private router: Router,
              private notify: NotifyService) { }

  ngOnInit(): void {
    if (this.baseService.getUserRole() !== 'System Administrator') {
      this.router.navigate(['/dashboard']);
    }
    this.form = this.fb.group({
      useExternalDB: [true],
      facilityCode: [null, Validators.required],
      facilityName: [null, Validators.required],
      allowEditableFields: [false],
      allowReprint: [false],
      approveBeforeReprint: [false],
      requestMasterPassBeforeSavingInAdminMode: [false],
      savePrintData: [false],
      administrativeEmail: [null, Validators.required],
      keyCode: [null],
      enableReceiptNumbers: [false],
      dateFormat: [null, Validators.required]
    });

    if (this.form.get('requestMasterPassBeforeSavingInAdminMode').value) {
      if (!this.form.get('keyCode').value) {
        this.notify.createMessage('info', 'please set your password');
        return;
      }
    }

    this.getAll();
  }

  public add(): void {
    this.loading = true;
    if (!this.form.get('allowReprint').value) {
      this.form.get('approveBeforeReprint').setValue(false);
    }
    this.settingsService.saveConfig(this.form.value).subscribe(
      u => {
        if (u.result === 100) {
          this.loading = false;
          console.log(u.data);
          this.baseService.setPermission(u.data);
          this.notify.createNotification('info', 'Success Message', u.message);
        } else {
          this.loading = false;
          this.notify.createNotification('danger', 'Failure Message', u.message);
        }
      },
      err => {
        this.loading = false;
        this.notify.createNotification('danger', 'Failure Message', `something went wrong, ${err.statuscode}`);
      });
  }

  getAll() {
    this.loading = true;
    this.settingsService.getConfig().subscribe(
      result => {
        if (result.result === 100) {
          const data = result.data;
          this.form.patchValue({
            useExternalDB: data.useExternalDB,
            facilityCode: data.facilityCode,
            facilityName: data.facilityName,
            allowEditableFields: data.allowEditableFields,
            allowReprint: data.allowReprint,
            approveBeforeReprint: data.approveBeforeReprint,
            requestMasterPassBeforeSavingInAdminMode: data.requestMasterPassBeforeSavingInAdminMode,
            savePrintData: data.savePrintData,
            administrativeEmail: data.administrativeEmail,
            keyCode: data.keyCode,
            enableReceiptNumbers: data.enableReceiptNumbers,
            dateFormat: data.dateFormat
          });
        }
        this.loading = false;
      }
    );
  }
}
