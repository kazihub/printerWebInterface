import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserAccountService} from '../user-accounts/user-account.service';
import {FormBuilder} from '@angular/forms';
import {BaseService} from '../utilities/base.service';
import {Router} from '@angular/router';
import {NotifyService} from '../notify.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-approval-list',
  templateUrl: './approval-list.component.html',
  styleUrls: ['./approval-list.component.css']
})
export class ApprovalListComponent implements OnInit {
  dataSource: any;
  loading = false;
  userlist: Array<any> = [];
  selectedUsers: Array<any> = [];
  allUsers: Array<any> = [];
  displayedColumns: string[] = [
    'Name',
    'Email',
    'action'
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private userService: UserAccountService,
              private fb: FormBuilder,
              public baseService: BaseService,
              private router: Router,
              private notify: NotifyService) { }

  ngOnInit(): void {
    if (!this.baseService.getUserRole().includes('Administrator')) {
      this.router.navigate(['/dashboard']);
    }
    if (this.baseService.getPermission().enableReceiptNumbers) {
      this.getAll();
      this.getApprovalList();
    }
  }

  getAll() {
    this.userService.getUsers().subscribe(
      result => {
        if (result.result === 100) {
          this.allUsers = result.data;
          this.allUsers = this.allUsers.filter(u => u.role.toUpperCase() === 'ADMINISTRATOR');
        }
      }
    );
  }

  getApprovalList() {
    this.loading = true;
    this.userService.getApprovalList().subscribe(
      result => {
        if (result.result === 100) {
          this.userlist = result.data;
          this.dataSource = new MatTableDataSource<any>(
            this.userlist
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        this.loading = false;
      }
    );
  }

  public add(): void {
    if (this.selectedUsers.length === 0) {
      this.notify.createNotification('info', 'Approvals', 'select at least one user');
      return;
    }
    this.loading = true;
    this.userService.saveApprovedList(this.selectedUsers).subscribe(
      u => {
        if (u.result === 100) {
          this.loading = false;
          this.getApprovalList();
          this.selectedUsers = [];
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

  public remove(id): void {
    this.loading = true;
    this.userService.removeApprovalUser(id).subscribe(
      u => {
        if (u.result === 100) {
          this.loading = false;
          this.getApprovalList();
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
