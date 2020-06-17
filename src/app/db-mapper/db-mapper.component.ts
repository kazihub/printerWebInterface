import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BaseService} from '../utilities/base.service';
import {AuthService} from '../authentication/authentication.service';
import {NotifyService} from '../notify.service';
import {DbService} from './db.service';

@Component({
  selector: 'app-db-mapper',
  templateUrl: './db-mapper.component.html',
  styleUrls: ['./db-mapper.component.css']
})
export class DbMapperComponent implements OnInit {
  form: FormGroup;
  loading = false;
  TableList: any[];
  TableList2: any[];
  FieldList: any[];
  FieldList2: any[];
  hasDependant = false;
  useDependantFields = false;
  searchField: any;
  DependantsearchField: any;
  primaryKey: any;
  DependantForeignKey: any;
  customQuery: any;
  generatedQuery = '';
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
    this.form = this.fb.group({
      server: [null, Validators.required],
      catalog: [null, Validators.required],
      user: [null, Validators.required],
      pass: [null, Validators.required]
    });
    this.getQuery();
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
    this.generatedQuery = 'Select';
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
