import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SpoiltService} from '../spoilt-cards/spoilt.service';
import {BaseService} from '../utilities/base.service';
import {Router} from '@angular/router';
import {NotifyService} from '../notify.service';
import {MatTableDataSource} from '@angular/material/table';
import {ReceiptService} from './receipt.service';

@Component({
  selector: 'app-receipt-number',
  templateUrl: './receipt-number.component.html',
  styleUrls: ['./receipt-number.component.css']
})
export class ReceiptNumberComponent implements OnInit {
  form: FormGroup;
  dataSource: any;
  loading = false;
  allUsers: Array<any> = [];
  id: any;
  editState = false;
  roles: Array<any> = [];
  displayedColumns: string[] = [
    'Receipt Number',
    'Date'
  ];

  displayedColumns2: string[] = [
    'Receipt Number',
    'Date',
    'User'
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private receiptService: ReceiptService,
              private fb: FormBuilder,
              private baseService: BaseService,
              private router: Router,
              private notify: NotifyService) { }

  ngOnInit(): void {
    if (this.baseService.getUserRole() === 'User') {
      this.router.navigate(['/card-design']);
    }
    this.form = this.fb.group({
      receiptNumber: [null, Validators.required]
    });
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.receiptService.getReceipt().subscribe(
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
    this.receiptService.saveReceipt(this.form.value).subscribe(
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reset() {
    this.form.reset();
    this.id = null;
  }
}
