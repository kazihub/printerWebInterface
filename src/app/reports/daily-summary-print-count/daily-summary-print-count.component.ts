import { Component, OnInit } from '@angular/core';
import {ReportService} from '../report.service';
import {UserAccountService} from '../../user-accounts/user-account.service';
import {BaseService} from '../../utilities/base.service';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';

@Component({
  selector: 'app-daily-summary-print-count',
  templateUrl: './daily-summary-print-count.component.html',
  styleUrls: ['./daily-summary-print-count.component.css']
})
export class DailySummaryPrintCountComponent implements OnInit {
  date: any;
  loading = false;
  filterList = [];
  showCard = false;
  allUsers: Array<any> = [];
  report: Array<any> = [];
  maindata: any;
  data = {
    startDate: new Date(),
    endDate: new Date(),
    useDate: false,
    printBy: null,
    printType: 0
  };
  state = [
    {
      id: 0,
      name: 'ALL',
    },
    {
      id: 1,
      name: 'NEW PRINT',
    },
    {
      id: 2,
      name: 'RE PRINT',
    }
  ];

  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'printable', // the id of html/table element
    options: {
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    }
  };
  constructor(private service: ReportService,
              private userService: UserAccountService,
              private exportAsService: ExportAsService,
              public baseService: BaseService) { }

  ngOnInit(): void {
    this.getAll();
    this.getReport();
  }

  dateChange(event) {
    this.data.startDate = event[0];
    this.data.endDate = event[1];
  }

  print() {
    this.exportAsService.save(this.exportAsConfig, `DAILY SUMMARY PRINT COUNT REPORT`).subscribe(() => {
      // save started
    });
  }

  getReport() {
    this.loading = true;
    this.service.getCardSummaryPrintByDate(this.data).subscribe(u => {
      this.loading = false;
      this.report = u.data.data;
      this.maindata = u.data;
    });
  }

  setUseDate(event) {
    this.data.useDate = event;
    if (this.data.useDate) {
      this.filterList.push('Date');
    } else {
      this.filterList.splice(this.filterList.findIndex(u => u === 'Date'), 1);
    }
  }

  checkDate(value): any{
    return !!new Date(value).getTime();
  }

  checkUndefined(text) {
    if (text) {
      return `${text} `;
    } else {
      return '';
    }
  }

  getAll() {
    this.loading = true;
    this.userService.getUsers().subscribe(
      result => {
        if (result.result === 100) {
          this.allUsers = result.data;
          this.allUsers = this.allUsers.filter(u => u.role !== 'System Administrator');
        }
        this.loading = false;
      }
    );
  }

  addItem(item1, item2) {
    return parseFloat(item1) + parseFloat(item2);
  }
}
