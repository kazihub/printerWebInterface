import { ReportService } from './../report.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/notify.service';
import { BaseService } from 'src/app/utilities/base.service';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-card-report',
  templateUrl: './card-report.component.html',
  styleUrls: ['./card-report.component.css']
})
export class CardReportComponent implements OnInit {
  dataSource: any;
  loading = false;
  exportValue: any;
  dateRange: any;
  rePrints: Array<any> = [];
  displayedColumns: string[] = [
    'subtable',
    'ReceiptNumber',
    'RePrints',
    'User',
    'action'
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
    private reportService: ReportService
  ) { }

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
      exporter.exportTable('xlsx', {fileName: 'card print report', sheet: 'card_print', Props: {Author: 'Quixmo'}});
    } else {
      exporter.exportTable(type, {fileName: 'card print report', Props: {Author: 'Quixmo'}});
    }
  }

  getReprints() {
    this.loading = true;
    this.reportService.getPrints().subscribe(
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
    this.reportService.getPrintsBy(data).subscribe(
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

  openReport(id) {
    this.router.navigate(['/reports/card-reprint-reports', id]);
  }
}
