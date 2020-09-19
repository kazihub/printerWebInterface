import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserAccountService} from '../user-accounts/user-account.service';
import {BaseService} from '../utilities/base.service';
import {Router} from '@angular/router';
import {NotifyService} from '../notify.service';
import {MatTableDataSource} from '@angular/material/table';
import {SpoiltService} from './spoilt.service';

@Component({
  selector: 'app-spoilt-cards',
  templateUrl: './spoilt-cards.component.html',
  styleUrls: ['./spoilt-cards.component.css']
})
export class SpoiltCardsComponent implements OnInit {
  form: FormGroup;
  dataSource: any;
  loading = false;
  allUsers: Array<any> = [];
  id: any;
  editState = false;
  roles: Array<any> = [];
  displayedColumns: string[] = [
    'Date',
    'Count',
    'action'
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private spoiltService: SpoiltService,
              private fb: FormBuilder,
              private baseService: BaseService,
              private router: Router,
              private notify: NotifyService) { }

  ngOnInit(): void {
    if (!this.baseService.getUserRole().includes('Administrator')) {
      this.router.navigate(['/dashboard']);
    }
    this.form = this.fb.group({
      date: [null, Validators.required],
      quantity: [null, Validators.required]
    });
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.spoiltService.getSpoilt().subscribe(
      result => {
        if (result.result === 100) {
          this.allUsers = result.data;
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

  public add(): void {
    this.loading = true;
    this.spoiltService.saveSpoilt(this.form.value).subscribe(
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
    this.spoiltService.editSpoilt(data).subscribe(
      u => {
        if (u.result === 100) {
          this.loading = false;
          this.getAll();
          this.reset();
          this.editState = false;
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
      date: item.date,
      quantity: item.quantity
    });

    this.id = item.id;
  }

  reset() {
    this.form.reset();
    this.editState = false;
    this.id = null;
  }
}
