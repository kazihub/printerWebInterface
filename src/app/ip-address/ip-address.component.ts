import {Component, Input, OnInit} from '@angular/core';
import {BaseService} from '../utilities/base.service';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-ip-address',
  templateUrl: './ip-address.component.html',
  styleUrls: ['./ip-address.component.css']
})
export class IpAddressComponent implements OnInit {
@Input() IPAddress: any;
  constructor(private baseService: BaseService,
              private modal: NzModalRef) { }

  ngOnInit(): void {
  }

  close() {
    this.baseService.setSession('static-ip-val-etteyesgh', this.IPAddress);
    this.modal.close();
  }
}
