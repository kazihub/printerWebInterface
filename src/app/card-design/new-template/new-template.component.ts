import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.css']
})
export class NewTemplateComponent implements OnInit {
  @Input() templatename: any;
  constructor(private modal: NzModalRef) { }

  ngOnInit(): void {
  }

  close() {
    this.modal.destroy(this.templatename);
  }
}
