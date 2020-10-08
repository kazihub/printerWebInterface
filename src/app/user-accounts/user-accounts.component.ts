import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {UserAccountService} from './user-account.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {NotifyService} from '../notify.service';
import {BaseService} from '../utilities/base.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css']
})
export class UserAccountsComponent implements OnInit {
  form: FormGroup;
  dataSource: any;
  loading = false;
  allUsers: Array<any> = [];
  id: any;
  editState = false;
  roles: Array<any> = [];
  displayedColumns: string[] = [
    'Name',
    'Email',
    'Role',
    'action'
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private userService: UserAccountService,
              private fb: FormBuilder,
              private baseService: BaseService,
              private router: Router,
              private notify: NotifyService) { }

  ngOnInit(): void {
    if (!this.baseService.getUserRole().includes('Administrator')) {
      this.router.navigate(['/dashboard']);
    }
    this.form = this.fb.group({
      fullName: [null, Validators.required],
      email: [null, Validators.required],
      role: [null, Validators.required],
    });
    this.getAll();
    this.getRoles();
  }

  getAll() {
    this.loading = true;
    this.userService.getUsers().subscribe(
      result => {
        if (result.result === 100) {
          this.allUsers = result.data;
          this.allUsers = this.allUsers.filter(u => u.role !== 'System Administrator');
          this.dataSource = new MatTableDataSource<any>(
            this.allUsers
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        this.loading = false;
      }
    );
  }

  getRoles() {
    this.userService.getRoles().subscribe(
      result => {
        if (result.result === 100) {
          this.roles = result.data;
        }
      }
    );
  }

  public add(): void {
    this.loading = true;
    this.userService.saveUser(this.form.value).subscribe(
      u => {
        if (u.result === 100) {
          this.loading = false;
          this.getAll();
          this.reset();
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

  public edit(): void {
    this.loading = true;
    const data = this.form.value;
    data.id = this.id;
    this.userService.editUser(data).subscribe(
      u => {
        if (u.result === 100) {
          this.loading = false;
          this.getAll();
          this.reset();
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

  save() {
    if (this.editState) {
      this.edit();
    } else {
      this.add();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editItem(item) {
    this.editState = true;
    this.form.patchValue({
      fullName: item.fullName,
      email: item.email,
      role: item.role
    });

    this.id = item.id;
  }

  reset() {
    this.form.reset();
    this.editState = false;
    this.id = null;
  }

  public resetPassword(email): void {
    this.loading = true;
    this.userService.resetPassword(email).subscribe(
      u => {
        if (u.result === 100) {
          this.loading = false;
          this.getAll();
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
