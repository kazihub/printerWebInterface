import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SettingsService} from './settings.service';
import {NotifyService} from '../notify.service';
import {BaseService} from '../utilities/base.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  loading = false;
  idTypes: Array<any> = [];
  idType: FormGroup;
  dataSource: any;
  displayedColumns: string[] = [
    'ID Type',
    'action'
  ];
  constructor(private fb: FormBuilder,
              private settingsService: SettingsService,
              private baseService: BaseService,
              private router: Router,
              private notify: NotifyService) { }

  ngOnInit(): void {
    if (this.baseService.getUserRole() !== 'System Administrator') {
      this.router.navigate(['/dashboard']);
    }
    this.getIDTypes();
    this.idType = this.fb.group({
      id: [null],
      name: [null, Validators.required]
    });
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
      dateFormat: [null, Validators.required],
      unitCost: [null, Validators.required],
      pgPort: [null],
      generateAndPrintReceipt: [false]
    });

    this.form.get('enableReceiptNumbers').valueChanges.subscribe(u => {
      if (u === false){
        this.form.get('generateAndPrintReceipt').setValue(false);
      }
    });

    if (this.form.get('requestMasterPassBeforeSavingInAdminMode').value) {
      if (!this.form.get('keyCode').value) {
        this.notify.createMessage('info', 'please set your password');
        return;
      }
    }

    this.getAll();
  }

  getIDTypes() {
    this.loading = true;
    this.settingsService.getIDType().subscribe(
      result => {
        this.idTypes =  result.data;
        this.dataSource = new MatTableDataSource<any>(
          this.idTypes
        );
        this.loading = false;
      }
    );
  }

  editForm(item) {
    this.idType.patchValue({
      id: item.id,
      name: item.name
    });
  }

  saveIDTypes() {
    this.loading = true;
    this.settingsService.saveIDtype(this.idType.value).subscribe(
      u => {
        if (u.result === 100) {
          this.loading = false;
          this.idType.reset();
          this.getIDTypes();
          this.notify.createNotification('info', 'Success Message', u.message);
        } else {
          this.loading = false;
          this.notify.createNotification('danger', 'Failure Message', u.message);
        }
      },
      err => {
        this.loading = false;
        this.notify.createNotification('danger', 'Failure Message', `something went wrong, ${err.statuscode}`);
      }
    );
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
            dateFormat: data.dateFormat,
            unitCost: data.unitCost,
            pgPort: data.pgPort,
            generateAndPrintReceipt: data.generateAndPrintReceipt
          });
        }
        this.loading = false;
      }
    );
  }
}
