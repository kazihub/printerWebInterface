import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/notify.service';
import { BaseService } from 'src/app/utilities/base.service';
import { ReportService } from '../report.service';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-card-reprint',
  templateUrl: './card-reprint.component.html',
  styleUrls: ['./card-reprint.component.css']
})
export class CardReprintComponent implements OnInit {
  dataSource: any;
  loading = false;
  exportValue: any;
  dateRange: any;
  id: any;
  rePrints: Array<any> = [];
  displayedColumns: string[] = [
    'subtable',
    'receiptNumber',
    'User',
    'needApproval',
    'approver',
    'Approved',
    'ApprovedDate'
  ];

  mainColumns: string[] = [
    'field',
    'value'
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(
    private baseService: BaseService,
    private router: Router,
    private notify: NotifyService,
    private reportService: ReportService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!this.baseService.getUserRole().includes('Administrator')) {
      this.router.navigate(['/dashboard']);
    }

    this.getReprints();
  }

  toggleRow(value): void {
    const index = this.dataSource.data.indexOf(value);
    this.dataSource.data[index].show = !this.dataSource.data[index].show;
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
        return moment(text).format('LL hh:mm A');
      } else {
        // console.log('false');
        return text;
      }
    } else {
      return text;
    }
  }

  exportData(exporter, type) {
    if (type === 'Excel') {
      exporter.exportTable('xlsx', {fileName: 'card reprint report', sheet: 'card_print', Props: {Author: 'Quixmo'}});
    } else {
      exporter.exportTable(type, {fileName: 'card reprint report', Props: {Author: 'Quixmo'}});
    }
  }

  getReprints() {
    this.loading = true;
    this.reportService.getReprintPrints(this.id).subscribe(
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

  findData() {
    console.log(this.dateRange);
    this.loading = true;
    const data = {
      startDate: this.dateRange[0],
      endDate: this.dateRange[1]
    };
    this.reportService.getReprintPrintsByDate(this.id, data).subscribe(
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
}
