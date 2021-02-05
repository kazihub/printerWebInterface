import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
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
  print = false;
  receipt: any;
  today = new Date();
  allUsers: Array<any> = [];
  id: any;
  visible = false;
  idTypes: Array<any> = [];
  editState = false;
  roles: Array<any> = [];
  displayedColumns: string[] = [
    'Receipt Number',
    'ID Type',
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
              public baseService: BaseService,
              private router: Router,
              private notify: NotifyService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.today = new Date();
    }, 1000);
    if (this.baseService.getUserRole() === 'User') {
      this.router.navigate(['/card-design']);
    }
    this.form = this.fb.group({
      receiptNumber: [null, Validators.required],
      idTypeId: [null, Validators.required]
    });
    this.getIDTypes();
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

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
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

  public generate(): void {
    this.loading = true;
    this.receiptService.generateReceipt().subscribe(
      u => {
        if (u.result === 100) {
          this.loading = false;
          this.getAll();
          this.print = true;
          this.receipt = u.data;
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

  getIDTypes() {
    this.loading = true;
    this.receiptService.getIDType().subscribe(
      result => {
        this.idTypes =  result.data;
      }
    );
  }

  reset() {
    this.form.reset();
    this.id = null;
  }
}
