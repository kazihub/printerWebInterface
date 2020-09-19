import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BaseService} from '../utilities/base.service';
import {AuthService} from '../authentication/authentication.service';
import {NotifyService} from '../notify.service';
import {DbService} from './db.service';
import {IpAddressComponent} from '../ip-address/ip-address.component';
import {NzModalService} from 'ng-zorro-antd';
import {AliasComponent} from './alias/alias.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface Action {
  value?: string;
  action?: 'query' | 'searchParam' | 'fields';
  param?: string;
}

@Component({
  selector: 'app-db-mapper',
  templateUrl: './db-mapper.component.html',
  styleUrls: ['./db-mapper.component.css']
})
export class DbMapperComponent implements OnInit {
  form: FormGroup;
  realloading = false;
  dataSource: any;
  loading = false;
  TableList: any[];
  useTableAlias = false;
  Constants = [
    'SELECT',
    'FROM',
    'WHERE',
    'AS',
    'ON',
    '=',
    'AND',
    'INNER JOIN',
    'RIGHT JOIN',
    'LEFT JOIN',
    'FULL JOIN'
  ];
  editState = false;
  displayedColumns: string[] = [
    'Name',
    'Current',
    'action'
  ];
  allDb: Array<any> = [];
  constant: any;
  tableAlias: any;
  fieldAlias: any;
  FieldList: any[];
  FieldList2: any[];
  AliasList: Array<any> = [];
  searchField: any;
  searchFieldList: Array<any> = [];
  finalSearchFieldList: Array<any> = [];
  DependantsearchField: any;
  generatedQuery = '';
  actionList: Array<Action> = [];
  id: any;
  @Input() tablename: any;
  @Input() Depentdanttablename: any;
  @Input() selectedFieldnames: any[];
  @Input() DependantselectedFieldnames: any[];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private fb: FormBuilder,
              private router: Router,
              private modalService: NzModalService,
              private baseService: BaseService,
              private dbService: DbService,
              private notify: NotifyService) { }

  ngOnInit(): void {
    if (this.baseService.getUserRole() !== 'System Administrator') {
      this.router.navigate(['/dashboard']);
    }
    this.form = this.fb.group({
      name: [null, Validators.required],
      server: [null, Validators.required],
      catalog: [null, Validators.required],
      user: [null, Validators.required],
      pass: [null, Validators.required]
    });
    this.getSavedQuery();
    this.getAll();
  }

  getAll() {
    this.realloading = true;
    this.dbService.getAllDB().subscribe(
      result => {
        if (result.result === 100) {
          this.allDb = result.data;
          this.dataSource = new MatTableDataSource<any>(
            this.allDb
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        this.realloading = false;
      }
    );
  }

  addConstToQuery() {
    if (this.actionList.length === 0) {
      this.generatedQuery = `${this.constant} `;
    } else {
      this.generatedQuery = `${this.generatedQuery} ${this.constant} `;
    }
    this.actionList.push({
      value: this.generatedQuery,
      action: 'query'
    });
  }

  addTableToQuery() {
    if (this.useTableAlias) {
      this.AliasList.push({
        table: this.tablename,
        alias: this.tableAlias
      });
      this.generatedQuery = `${this.generatedQuery} ${this.tablename} AS ${this.tableAlias}`;
    } else {
      this.generatedQuery = `${this.generatedQuery} ${this.tablename}`;
    }
    this.actionList.push({
      value: this.generatedQuery,
      action: 'query'
    });
  }

  aliasChange() {
    const data = this.AliasList.find(u => u.alias === this.fieldAlias);
    if (data) {
      this.tablename = data.table;
      this.tableAlias = data.alias;
      this.selectedFieldnames = [];
      this.getFields();
    } else {
      alert('not found');
    }
  }

  addtoAlias() {
    if (this.tablename) {
      this.AliasList.push({
        table: this.tablename,
        alias: this.tableAlias
      });
      this.fieldAlias = this.tableAlias;
    }
  }

  addSearchParam() {
    this.generatedQuery = `${this.generatedQuery} @${this.searchField}`;
    this.searchFieldList.push({
      param: `@${this.searchField}`,
      field: this.searchField
    });
    this.actionList.push({
      value: this.generatedQuery,
      action: 'searchParam',
      param: this.searchField
    });
  }

  addValue() {
    const val = ',';
    this.generatedQuery = `${this.generatedQuery}${val}`;
    this.actionList.push({
      value: this.generatedQuery,
      action: 'query'
    });
  }

  addFieldsToQuery() {
    if (this.useTableAlias) {
      this.selectedFieldnames.forEach((u, index) => {
        if (index === this.selectedFieldnames.length - 1) {
          this.generatedQuery = `${this.generatedQuery} ${this.tableAlias}.${u}`;
        } else {
          this.generatedQuery = `${this.generatedQuery} ${this.tableAlias}.${u},`;
        }
        if (!this.finalSearchFieldList.find(x => x.columnName === u)) {
          this.finalSearchFieldList.push({
            columnName: u,
            tablename: this.tablename
          });
        }
      });
    } else {
      this.selectedFieldnames.forEach((u, index) => {
        if (index === this.selectedFieldnames.length - 1) {
          this.generatedQuery = `${this.generatedQuery} ${u}`;
        } else {
          this.generatedQuery = `${this.generatedQuery} ${u},`;
        }
        if (!this.finalSearchFieldList.find(x => x.columnName === u)) {
          this.finalSearchFieldList.push({
            columnName: u,
            tablename: this.tablename
          });
        }
      });
    }
    this.actionList.push({
      value: this.generatedQuery,
      action: 'query'
    });
  }

  removeField(val) {
    this.finalSearchFieldList.splice(this.finalSearchFieldList.findIndex(u => u.columnName === val), 1);
  }

  removeParam(val) {
    this.searchFieldList.splice(this.searchFieldList.findIndex(u => u.param === val), 1);
  }

  updateAlias(val) {
    const modal = this.modalService.create({
      nzTitle: 'Set Alias',
      nzFooter: null,
      nzContent: AliasComponent
    });

    modal.afterClose.subscribe(u => {
      if (u) {
        this.finalSearchFieldList.find(x => x.columnName === val).alias = u;
      }
    });
  }

  undoAction() {
    this.generatedQuery = '';
    const data = this.actionList[this.actionList.length - 1];
    if (data.action === 'searchParam') {
      this.searchFieldList.splice(this.searchFieldList.findIndex(u => u.field === data.param), 1);
    }
    this.actionList.splice(this.actionList.length - 1, 1);
    this.generatedQuery = this.actionList[this.actionList.length - 1].value;
  }

  savedb(): void {
    this.loading = true;
    this.dbService.savedb(this.form.value).subscribe(
      result => {
        if (result.result === 100) {
          this.notify.createMessage('info', result.message);
          this.loading = false;
          this.form.reset();
        } else {
          this.notify.createMessage('error', result.message);
          this.loading = false;
        }
      },
      error => {
        this.notify.createMessage('error', error.message);
        this.loading = false;
      }
    );
  }

  getTables(): void {
    this.loading = true;
    this.dbService.getTables().subscribe(
      result => {
        if (result.result === 100) {
          this.notify.createMessage('info', result.message);
          this.loading = false;
          this.TableList = result.data;
        } else {
          this.notify.createMessage('error', result.message);
          this.loading = false;
        }
      },
      error => {
        this.notify.createMessage('error', error.message);
        this.loading = false;
      }
    );
  }

  getFields(): void {
    this.loading = true;
    this.dbService.getFields(this.tablename).subscribe(
      result => {
        if (result.result === 100) {
          this.notify.createMessage('info', result.message);
          this.loading = false;
          this.FieldList = result.data;
        } else {
          this.notify.createMessage('error', result.message);
          this.loading = false;
        }
      },
      error => {
        this.notify.createMessage('error', error.message);
        this.loading = false;
      }
    );
  }

  saveQuery() {
    this.loading = true;
    const data = {
      query: this.generatedQuery,
      queryFields: this.searchFieldList,
      selectedFields: this.finalSearchFieldList
    };

    this.dbService.SaveQueryGenerated(data).subscribe( result => {
        if (result.result === 100) {
          this.notify.createMessage('info', result.message);
          this.loading = false;
          this.FieldList = result.data;
        } else {
          this.notify.createMessage('error', result.message);
          this.loading = false;
        }
      },
      error => {
        this.notify.createMessage('error', error.message);
        this.loading = false;
      });
  }

  getSavedQuery() {
    this.loading = true;
    this.dbService.GetQueryFields().subscribe(
      result => {
        if (result.result === 100) {
          this.searchFieldList = result.data.queryFields;
          this.finalSearchFieldList = result.data.selectedFields;
          this.generatedQuery = result.data.query.text;
        }
        console.log(result);
        this.loading = false;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(item) {
    this.form.patchValue({
      name: item.name,
      current: item.currentMenu
    });

    this.id = item.id;
  }

  setAsCurrent(id) {
    this.realloading = true;
    this.dbService.setAsCurrent(id).subscribe(
      result => {
        if (result.result === 100) {
          this.getAll();
          this.getSavedQuery();
          this.notify.createMessage('info', result.message);
        } else {
          this.notify.createMessage('info', result.message);
        }
        this.realloading = false;
      }
    );
  }
}
