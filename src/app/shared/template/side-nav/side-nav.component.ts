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

  sysadminMenu = [
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
      path: '/reprint-request',
      title: 'Reprint Requests',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'idcard',
      submenu: []
    },
    {
      path: '/spoilt-cards',
      title: 'Spoilt Cards',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'idcard',
      submenu: []
    },
    {
      path: '/receipt-numbers',
      title: 'Receipt Numbers',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'idcard',
      submenu: []
    },
    {
      path: '/reports',
      title: 'Reports',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'idcard',
      submenu: [
        {
          path: '/reports/card-print-reports',
          title: 'Card Print Reports',
          iconType: 'nzIcon',
          iconTheme: 'outline',
          icon: 'idcard',
          submenu: []
        }
      ]
    },
    {
      path: '',
      title: 'Settings',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'setting',
      submenu: [
        {
          path: '/db-mapper',
          title: 'DB Settings',
          iconType: 'nzIcon',
          iconTheme: 'outline',
          icon: 'database',
          submenu: []
        },
        {
          path: '/settings',
          title: 'Configuration Settings',
          iconType: 'nzIcon',
          iconTheme: 'outline',
          icon: 'setting',
          submenu: []
        },
        {
          path: '/users',
          title: 'Users',
          iconType: 'nzIcon',
          iconTheme: 'outline',
          icon: 'user',
          submenu: []
        },
        {
          path: '/approval-list',
          title: 'Approval List',
          iconType: 'nzIcon',
          iconTheme: 'outline',
          icon: 'user',
          submenu: []
        }
      ]
    }
  ];

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
      path: '/reprint-request',
      title: 'Reprint Requests',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'idcard',
      submenu: []
    },
    {
      path: '/spoilt-cards',
      title: 'Spoilt Cards',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'idcard',
      submenu: []
    },
    {
      path: '/receipt-numbers',
      title: 'Receipt Numbers',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'idcard',
      submenu: []
    },
    {
      path: '/reports',
      title: 'Reports',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'idcard',
      submenu: [
        {
          path: '/reports/card-print-reports',
          title: 'Card Print Reports',
          iconType: 'nzIcon',
          iconTheme: 'outline',
          icon: 'idcard',
          submenu: []
        }
      ]
    },
    {
      path: '',
      title: 'Settings',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'setting',
      submenu: [
        {
          path: '/users',
          title: 'Users',
          iconType: 'nzIcon',
          iconTheme: 'outline',
          icon: 'user',
          submenu: []
        },
        {
          path: '/approval-list',
          title: 'Approval List',
          iconType: 'nzIcon',
          iconTheme: 'outline',
          icon: 'user',
          submenu: []
        }
      ]
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

  cashMenu = [
    {
      path: '/dashboard',
      title: 'Dashboard',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'dashboard',
      submenu: []
    },
    {
      path: '/receipt-numbers',
      title: 'Receipt Numbers',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'idcard',
      submenu: []
    }
  ];

  constructor( private themeService: ThemeConstantService,
               private baseService: BaseService) {}

  ngOnInit(): void {
    if (this.baseService.getUserRole() === 'Administrator') {
      this.menuItems = this.adminMenu.filter(menu => menu);
    } else if (this.baseService.getUserRole() === 'System Administrator') {
      this.menuItems = this.sysadminMenu.filter(menu => menu);
    } else if (this.baseService.getUserRole() === 'Data Clerk'){
      this.menuItems = this.cashMenu.filter(menu => menu);
    } else {
      this.menuItems = this.userMenu.filter(menu => menu);
    }
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
    this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
  }
}
