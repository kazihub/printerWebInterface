import {Component, OnInit} from '@angular/core';
import { ROUTES } from './side-nav-routes.config';
import { ThemeConstantService } from '../../services/theme-constant.service';
import {BaseService} from '../../../utilities/base.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './side-nav.component.html'
})

export class SideNavComponent implements OnInit{

  public menuItems: any[];
  isFolded: boolean;
  isSideNavDark: boolean;

  adminMenu = [
    {
      path: '/dashboard',
      title: 'Dashboard',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'dashboard',
      submenu: []
    },
    {
      path: '/card-design',
      title: 'Card Design',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'idcard',
      submenu: []
    },
    {
      path: '/db-mapper',
      title: 'DB Settings',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'database',
      submenu: []
    }
  ];

  userMenu = [
    {
      path: '/dashboard',
      title: 'Dashboard',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'dashboard',
      submenu: []
    },
    {
      path: '/card-design',
      title: 'Card Design',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'idcard',
      submenu: []
    }
  ];

  constructor( private themeService: ThemeConstantService,
               private baseService: BaseService) {}

  ngOnInit(): void {
    if (this.baseService.getUserRole() !== 'Administrator') {
      this.menuItems = this.userMenu.filter(menu => menu);
    } else {
      this.menuItems = this.adminMenu.filter(menu => menu);
    }
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
    this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
  }
}
