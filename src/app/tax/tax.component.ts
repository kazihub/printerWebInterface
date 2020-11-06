import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../app.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BaseService} from '../utilities/base.service';
import {Router} from '@angular/router';
import {NotifyService} from '../notify.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {
  form: FormGroup;
  editstate = false;
  taxes: Array<any> = [];
  loading = false;
  dataSource: any;

  displayedColumns: string[] = [
    'Description',
    'Percentage',
    'Active',
    'action'
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private fb: FormBuilder,
              private appService: AppService,
              private router: Router,
              private notify: NotifyService,
              private baseService: BaseService) { }

  ngOnInit(): void {
    if (this.baseService.getUserRole() !== 'System Administrator') {
      this.router.navigate(['/dashboard']);
    }
    this.getTax();
    this.form = this.fb.group({
      id: [null],
      description: [null, Validators.required],
      percentage: [null, Validators.required],
      isActive: [false]
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reset() {
    this.form.reset();
    this.editstate = false;
  }

  getTax() {
    this.loading = true;
    this.appService.getTaxes().subscribe(u => {
      this.taxes = u;
      this.loading = false;
      this.dataSource = new MatTableDataSource<any>(
        this.taxes
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public add(): void {
    this.loading = true;
    this.appService.addTax(this.form.value).subscribe(
      u => {
        if (u.result === 100) {
          this.loading = false;
          this.getTax();
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
    this.appService.editTax(data).subscribe(
      u => {
        if (u.result === 100) {
          this.loading = false;
          this.getTax();
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
    if (this.editstate) {
      this.edit();
    } else {
      this.add();
    }
  }

  editItem(item) {
    this.editstate = true;
    this.form.patchValue({
      id: item.id,
      description: item.description,
      percentage: item.percentage,
      isActive: item.isActive
    });
  }
}
