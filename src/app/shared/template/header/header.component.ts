import {Component, OnInit} from '@angular/core';
import { ThemeConstantService } from '../../services/theme-constant.service';
import {BaseService} from '../../../utilities/base.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit{
  Templatename: any;
  constructor( private themeService: ThemeConstantService,
               public baseService: BaseService,
               private router: Router) {
    baseService.currentName.subscribe(u => {
      this.Templatename = u;
    });
  }

  searchVisible = false;
  quickViewVisible = false;
  isFolded: boolean;
  isExpand: boolean;

  notificationList = [
    {
      title: 'You received a new message',
      time: '8 min',
      icon: 'mail',
      color: 'ant-avatar-' + 'blue'
    },
    {
      title: 'New user registered',
      time: '7 hours',
      icon: 'user-add',
      color: 'ant-avatar-' + 'cyan'
    },
    {
      title: 'System Alert',
      time: '8 hours',
      icon: 'warning',
      color: 'ant-avatar-' + 'red'
    },
    {
      title: 'You have a new update',
      time: '2 days',
      icon: 'sync',
      color: 'ant-avatar-' + 'gold'
    }
  ];

  ngOnInit(): void {
    this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
    this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
  }

  toggleFold() {
    this.isFolded = !this.isFolded;
    this.themeService.toggleFold(this.isFolded);
  }

  toggleExpand() {
    this.isFolded = false;
    this.isExpand = !this.isExpand;
    this.themeService.toggleExpand(this.isExpand);
    this.themeService.toggleFold(this.isFolded);
  }

  searchToggle(): void {
    this.searchVisible = !this.searchVisible;
    this.baseService.Search(this.searchVisible);
  }

  quickViewToggle(): void {
    this.quickViewVisible = !this.quickViewVisible;
  }

  logout(): void {
    this.baseService.logout().subscribe(
      result => {
        if (result.status === 105) {
          this.baseService.clearSeData();
          this.router.navigate(['/']);
        }
      }
    );
  }
}
