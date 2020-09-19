import {Component, OnInit} from '@angular/core';
import {BaseService} from './utilities/base.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  constructor(private baseService: BaseService) {
  }
  ngOnInit(): void {
    this.baseService.ConnectNotification();
  }
}
