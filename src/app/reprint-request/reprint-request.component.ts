import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserAccountService} from '../user-accounts/user-account.service';
import {FormBuilder} from '@angular/forms';
import {BaseService} from '../utilities/base.service';
import {Router} from '@angular/router';
import {NotifyService} from '../notify.service';
import {MatTableDataSource} from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-reprint-request',
  templateUrl: './reprint-request.component.html',
  styleUrls: ['./reprint-request.component.css']
})
export class ReprintRequestComponent implements OnInit {
  dataSource: any;
  loading = false;
  rePrints: Array<any> = [];
  displayedColumns: string[] = [
    'subtable',
    'ReceiptNumber',
    'User',
    'Reason',
    'action'
  ];

  mainColumns: string[] = [
    'field',
    'value'
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private userService: UserAccountService,
              private fb: FormBuilder,
              private baseService: BaseService,
              private router: Router,
              private notify: NotifyService) {
    baseService.currentApproval.subscribe(u => {
      this.getReprints();
    });
  }

  ngOnInit(): void {
    if (!this.baseService.getUserRole().includes('Administrator')) {
      this.router.navigate(['/dashboard']);
    }
    this.getReprints();
  }

  toggleRow(value): void {
    const index = this.dataSource.data.indexOf(value);
    this.dataSource.data[index].show = !this.dataSource.data[index].show;
  }

  getReprints() {
    this.loading = true;
    this.userService.getReprints().subscribe(
      result => {
        if (result.result === 100) {
          this.rePrints = result.data;
          this.dataSource = new MatTableDataSource<any>(
            this.rePrints
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        this.loading = false;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formateDate(text) {
    // console.log(this.text.substring(0, 9), 'text check');
    if (text) {
      const date = moment(new Date(text), 'LL', true).isValid();
      if (date) {
        // console.log('true');
        return moment(text).format('yyyy-MM-DD hh:mm A');
      } else {
        // console.log('false');
        return text;
      }
    } else {
      return text;
    }
  }

  public approve(id): void {
    this.loading = true;
    this.userService.approve(id).subscribe(
      u => {
        if (u.result === 100) {
          this.loading = false;
          this.getReprints();
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

  public disapprove(id): void {
    this.loading = true;
    this.userService.disapprove(id).subscribe(
      u => {
        if (u.result === 100) {
          this.loading = false;
          this.getReprints();
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
}
