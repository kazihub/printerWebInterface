import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BaseService} from '../utilities/base.service';
import {AuthService} from '../authentication/authentication.service';
import {NotifyService} from '../notify.service';
import {DbService} from './db.service';

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
  constant: any;
  tableAlias: any;
  fieldAlias: any;
  TableList2: any[];
  FieldList: any[];
  FieldList2: any[];
  AliasList: Array<any> = [];
  hasDependant = false;
  useDependantFields = false;
  searchField: any;
  searchFieldList: Array<any> = [];
  finalSearchFieldList: Array<any> = [];
  DependantsearchField: any;
  primaryKey: any;
  DependantForeignKey: any;
  customQuery: any;
  generatedQuery = '';
  actionList: Array<Action> = [];
  @Input() tablename: any;
  @Input() Depentdanttablename: any;
  @Input() selectedFieldnames: any[];
  @Input() DependantselectedFieldnames: any[];
  constructor(private fb: FormBuilder,
              private router: Router,
              private baseService: BaseService,
              private dbService: DbService,
              private notify: NotifyService) { }

  ngOnInit(): void {
    if (this.baseService.getUserRole() !== 'Administrator') {
      this.router.navigate(['/card-design']);
    }
    this.form = this.fb.group({
      server: [null, Validators.required],
      catalog: [null, Validators.required],
      user: [null, Validators.required],
      pass: [null, Validators.required]
    });
    // this.getQuery();
    this.getSavedQuery();
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

  getDependantTables(): void {
    this.loading = true;
    this.dbService.getTables().subscribe(
      result => {
        if (result.result === 100) {
          this.notify.createMessage('info', result.message);
          this.loading = false;
          this.TableList2 = result.data;
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

  getDependantFields(): void {
    this.loading = true;
    this.dbService.getFields(this.Depentdanttablename).subscribe(
      result => {
        if (result.result === 100) {
          this.notify.createMessage('info', result.message);
          this.loading = false;
          this.FieldList2 = result.data;
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


  generateQuery() {
    this.loading = true;
    const data = [];
    if (!this.tablename) {
      this.notify.createMessage('info', 'please select main table name');
      return;
    }
    if (!this.primaryKey) {
      this.notify.createMessage('info', 'please select primary key');
      return;
    }
    if (!this.searchField) {
      this.notify.createMessage('info', 'please select search field');
      return;
    }
    if (this.hasDependant) {
      if (!this.DependantForeignKey) {
        this.notify.createMessage('info', 'please select dependant foreign key');
        return;
      }
      if (!this.DependantsearchField) {
        this.notify.createMessage('info', 'please select dependant search field');
        return;
      }
      if (!this.Depentdanttablename) {
        this.notify.createMessage('info', 'please select dependant table name');
        return;
      }
    }
    if (this.useDependantFields) {
      this.generatedQuery = 'Select';
      this.DependantselectedFieldnames.forEach((u, index) => {
        this.generatedQuery = `${this.generatedQuery} A.${u}`;
      });
      this.generatedQuery = `${this.generatedQuery} FROM ${this.Depentdanttablename} AS A INNER JOIN ${this.tablename} AS B ON A.${this.DependantForeignKey} = B.${this.primaryKey} WHERE B.${this.DependantsearchField} = '${this.searchField}.VALUE'`;
    } else {
      this.generatedQuery = 'Select';
      this.selectedFieldnames.forEach((u, index) => {
        this.generatedQuery = `${this.generatedQuery} ${u}`;
      });
      this.generatedQuery = `${this.generatedQuery} FROM ${this.tablename} WHERE ${this.searchField} = ${this.searchField}.value;`;
    }

    if (this.selectedFieldnames.length > 0) {
      this.selectedFieldnames.forEach((u, index) => {
        data.push({
          columnName: u,
          isDependantField: false
        });
      });
    }

    if (this.DependantselectedFieldnames.length > 0) {
      this.DependantselectedFieldnames.forEach((u, index) => {
        data.push({
          columnName: u,
          isDependantField: true
        });
      });
    }

    const value = {
      table: {
        name: this.tablename,
        dependantTableName: this.Depentdanttablename,
        hasDependant: this.hasDependant,
        useDependantFields: this.useDependantFields,
        dependantSearchField: this.DependantsearchField,
        searchField: this.searchField,
        primaryKey: this.primaryKey,
        dependantForeignKey: this.DependantForeignKey
      },
      fields: data
    };

    console.log(value);

    this.dbService.saveQuery(value).subscribe(
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

  getQuery() {
    this.loading = true;
    this.dbService.getQuery().subscribe(
      result => {
        if (result.result === 100) {
          this.DependantselectedFieldnames = result.data.fields.filter(u => u.isDependantField === true);
          this.selectedFieldnames = result.data.fields.filter(u => u.isDependantField === false);
          this.DependantselectedFieldnames = this.DependantselectedFieldnames.map(u => u.columnName);
          this.selectedFieldnames = this.selectedFieldnames.map(u => u.columnName);
          this.getTables();
          this.getDependantTables();
          this.tablename = result.data.table.name;
          this.Depentdanttablename = result.data.table.dependantTableName;
          this.hasDependant = result.data.table.hasDependant;
          this.useDependantFields = result.data.table.useDependantFields;
          this.DependantForeignKey = result.data.table.dependantForeignKey;
          this.primaryKey = result.data.table.primaryKey;
          this.searchField = result.data.table.searchField;
          this.DependantsearchField = result.data.table.dependantSearchField;
          this.getFields();
          this.getDependantFields();
          this.notify.createMessage('info', result.message);

          if (this.useDependantFields) {
            this.generatedQuery = 'Select';
            this.DependantselectedFieldnames.forEach((u, index) => {
              this.generatedQuery = `${this.generatedQuery} A.${u},`;
            });

            this.generatedQuery = `${this.generatedQuery} FROM ${this.Depentdanttablename} AS A INNER JOIN ${this.tablename} AS B ON A.${this.DependantForeignKey} = B.${this.primaryKey} WHERE B.${this.DependantsearchField} = '${this.searchField}.VALUE'`;
          } else {
            this.generatedQuery = 'Select';
            this.selectedFieldnames.forEach((u, index) => {
              this.generatedQuery = `${this.generatedQuery} ${u}`;
            });
            this.generatedQuery = `${this.generatedQuery} FROM ${this.tablename} WHERE ${this.searchField} = ${this.searchField}.value;`;
          }
          this.loading = false;
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
}
