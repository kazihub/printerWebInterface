import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'card-design',
    loadChildren: () => import('../../card-design/card-design.module').then(m => m.CardDesignModule)
  }
];
