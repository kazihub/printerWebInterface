import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {ThemeConstantService} from '../shared/services/theme-constant.service';
import * as moment from 'moment';
import {BaseService} from '../utilities/base.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {
  loading = false;
  monthYear: any;
  total = '0';
  today = '0';
  reprintTotal = '0';
  reprintToday = '0';
  WeekNumber: any;
  date = new Date();
  todayDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
  currentWeek: any;
  ChartData: Array<any> = [
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      label: 'Cards Printed',
      categoryPercentage: 0.35,
      barPercentage: 0.3,
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      label: 'Cards Reprinted',
      categoryPercentage: 0.35,
      barPercentage: 0.3,
    }
  ];
  printedData: Array<any> = [];
  reprintedData: Array<any> = [];
  selectedWeek: any;
  AllDays: string[] = [
    'SUN',
    'MON',
    'TUES',
    'WED',
    'THURS',
    'FRI',
    'SAT'
  ];
  ChartLabel = this.AllDays;
  ChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: false,
          labelString: 'Month'
        },
        gridLines: false,
        ticks: {
          display: true,
          beginAtZero: true,
          fontSize: 13,
          padding: 10
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: false,
          labelString: 'Value'
        },
        gridLines: {
          drawBorder: false,
          offsetGridLines: false,
          drawTicks: false,
          borderDash: [3, 4],
          zeroLineWidth: 1,
          zeroLineBorderDash: [3, 4]
        },
        ticks: {
          stepSize: 10,
          display: true,
          beginAtZero: true,
          fontSize: 13,
          padding: 10
        }
      }]
    }
  };

  AllMonths: string[] = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
  ];

  themeColors = this.colorConfig.get().colors;
  blue = this.themeColors.blue;
  blueLight = this.themeColors.blueLight;
  cyan = this.themeColors.cyan;
  cyanLight = this.themeColors.cyanLight;
  gold = this.themeColors.gold;
  purple = this.themeColors.purple;
  purpleLight = this.themeColors.purpleLight;
  red = this.themeColors.red;
  weeks: Array<any> = [];
  ChartColors: Array<any> = [
    {
      backgroundColor: this.blue,
      borderWidth: 0
    },
    {
      backgroundColor: this.purple,
      borderWidth: 0
    }
  ];

  doughnutChartLabels: string[] = ['Total Cards Printed', 'Total Cards Reprinted'];
  doughnutChartData: number[] = [];
  doughnutChartColors: Array<any> =  [{
    backgroundColor: [this.blue, this.purple],
    pointBackgroundColor : [this.blueLight, this.purpleLight]
  }];
  doughnutChartType = 'doughnut';
  constructor(private appService: AppService,
              private baseService: BaseService,
              private router: Router,
              private colorConfig: ThemeConstantService) { }

  ngOnInit(): void {
    // if (this.baseService.getUserRole() !== 'Administrator') {
    //   this.router.navigate(['/card-design']);
    // }
    this.loading = true;
    this.appService.getTotalPrinted().subscribe(
      u => {
        const dates = [];
        if (u.result === 100) {
          console.log(u.data);
          u.data.total.forEach(x => {
            this.total = `${parseFloat(this.total) + parseFloat(x.count)}`;
            dates.push(new Date(x.date));
          });
          this.today = u.data.today?.count;
          this.reprintTotal = u.data.reprintsCount.length;
          this.reprintToday = u.data.todayReprints.length;
          this.doughnutChartData.push(parseFloat(this.total));
          this.doughnutChartData.push(parseFloat(this.reprintTotal));
          const AllDates = this.DaysInMonth(new Date().getFullYear(), new Date().getMonth());
          this.GetWeeks(AllDates);
          this.selectedWeek = this.weeks.find(x => x.week === this.currentWeek);
          this.ChartLabel = this.selectedWeek.dates.map(x => moment(x).format('LL'));
          this.WeekNumber = this.selectedWeek.week;
          this.selectedWeek.dates.forEach(
            x => {
              const comp = u.data.total.find(y =>  this.simpleDate(new Date(y.date)).getTime() === x.getTime());
              if (comp) {
                this.printedData.push(comp.count);
              } else {
                this.printedData.push(0);
              }

              const rep = u.data.reprintsCount.filter(y =>  this.simpleDate(new Date(y.date)).getTime() === x.getTime());
              if (rep) {
                this.reprintedData.push(rep.length);
              } else {
                this.printedData.push(0);
              }
            }
          );
          this.ChartData = [];
          this.ChartData.push({
            data: this.printedData,
            label: 'Cards Printed',
            categoryPercentage: 0.35,
            barPercentage: 0.3,
          });
          this.ChartData.push({
            data: this.reprintedData,
            label: 'Cards Reprinted',
            categoryPercentage: 0.35,
            barPercentage: 0.3,
          });
          this.loading = false;
          console.log(this.weeks, this.selectedWeek, this.printedData, this.ChartLabel);
        }
      }
    );
  }

  simpleDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private DaysInMonth(year, month): any {
    const date = new Date(year, month, 1);
    this.monthYear = `${this.GetMonth(date)} ${year}`;
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  GetMonth(date: Date): any {
    return this.AllMonths[date.getMonth()];
  }

  GetDay(date: Date): any {
    return this.AllDays[date.getDay()];
  }

  GetDate(date: Date): any {
    return date.getDate();
  }

  GetWeeks(dates) {
    this.weeks = [];
    console.log(this.todayDate);
    dates.forEach((elements) => {
      // this.AllDates.f
      const week = moment(elements).week();
      if (new Date(elements).getTime() === this.todayDate.getTime()) {
        console.log('today', this.todayDate);
        this.currentWeek = week;
      }
      const getWeek = this.weeks.find((u) => u.week === week);
      if (getWeek === undefined) {
        // if(this.GetDay(element) ===)
        this.weeks.push({
          week,
          dates: [elements],
        });
      } else {
        getWeek.dates.push(elements);
      }
    });

    const nMRT = this.weeks[0].dates;
    const n = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < nMRT.length; i++) {
      console.log('day', nMRT[i].getDay());
      if (nMRT[i].getDay() > 0) {
        const newArray = new Array(nMRT[i].getDay());
        // tslint:disable-next-line: prefer-for-of
        for (let x = 0; x < newArray.length; x++) {
          n.push(null);
        }
        console.log('nn', n);
        nMRT.forEach((ele) => {
          n.push(ele);
        });
        this.weeks[0].dates = n;
        break;
      } else {
        break;
      }
    }
  }
}
