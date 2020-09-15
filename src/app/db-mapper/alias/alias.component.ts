import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styleUrls: ['./alias.component.css']
})
export class AliasComponent implements OnInit {
  @Input() alias: any;

  constructor(private modal: NzModalRef) { }

  ngOnInit(): void {
  }
  close() {
    this.modal.close(this.alias);
  }
}
