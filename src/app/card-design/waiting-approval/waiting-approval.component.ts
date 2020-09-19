import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../utilities/base.service';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-waiting-approval',
  templateUrl: './waiting-approval.component.html',
  styleUrls: ['./waiting-approval.component.css']
})
export class WaitingApprovalComponent implements OnInit {
  currentPrintId: any;
  constructor(private baseService: BaseService,
              private modal: NzModalRef) {
    baseService.currentApproval.subscribe(u => {
      if (u.hasdata) {
        if (u.id === this.currentPrintId) {
          this.modal.close(u.data);
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
